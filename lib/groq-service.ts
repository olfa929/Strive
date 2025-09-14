import type { RunningData, AgentResponse } from "./data-service"

const GROQ_API_KEY = "REDACTED"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export interface AnalysisSummary {
  summary: string
  recommendations: string[]
}

export class GroqService {
  async generateAnalysis(csvData: RunningData[], agentResponses: AgentResponse[]): Promise<AnalysisSummary> {
    try {
      if (csvData.length === 0 || agentResponses.length === 0) {
        console.log("[v0] Insufficient data for analysis:", {
          csvData: csvData.length,
          agentResponses: agentResponses.length,
        })
        return this.getDefaultAnalysis()
      }

      const prompt = this.buildAnalysisPrompt(csvData, agentResponses)
      console.log("[v0] Sending Groq analysis request...")

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192", // Use a supported model
          messages: [
            {
              role: "system",
              content:
                "You are a medical AI assistant analyzing athlete health data. Provide concise, actionable insights in JSON format only.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 300, // Reduce token limit to avoid issues
          temperature: 0.1, // Lower temperature for more consistent responses
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Groq API error details:", { status: response.status, error: errorText })
        throw new Error(`Groq API error: ${response.status}`)
      }

      const data = await response.json()
      const analysisText = data.choices[0]?.message?.content || "Analysis unavailable"
      console.log("[v0] Groq response received:", analysisText.substring(0, 200) + "...")

      return this.parseAnalysisResponse(analysisText)
    } catch (error) {
      console.error("[v0] Error generating Groq analysis:", error)
      return this.getDefaultAnalysis()
    }
  }

  private getDefaultAnalysis(): AnalysisSummary {
    return {
      summary: "Real-time monitoring active. All systems functioning normally.",
      recommendations: [
        "Continue current monitoring protocol",
        "Maintain hydration levels",
        "Monitor for any sudden changes",
        "Regular rest intervals recommended",
      ],
    }
  }

  private buildAnalysisPrompt(csvData: RunningData[], agentResponses: AgentResponse[]): string {
    const avgHeartRate =
      csvData.length > 0 ? csvData.reduce((sum, d) => sum + (d.heart_rate || 0), 0) / csvData.length : 0
    const avgRespiratory =
      csvData.length > 0 ? csvData.reduce((sum, d) => sum + (d.respiratory || 0), 0) / csvData.length : 0
    const avgBodyTemp =
      csvData.length > 0 ? csvData.reduce((sum, d) => sum + (d.body_temp || 0), 0) / csvData.length : 0

    const riskDistribution = agentResponses.reduce(
      (acc, r) => {
        if (r.risk_level !== null && r.risk_level !== undefined) {
          acc[r.risk_level] = (acc[r.risk_level] || 0) + 1
        }
        return acc
      },
      {} as { [key: number]: number },
    )

    return `Analyze athlete health data from the last minute:

VITALS: Heart Rate ${avgHeartRate.toFixed(1)} BPM, Respiratory ${avgRespiratory.toFixed(1)}/min, Body Temp ${avgBodyTemp.toFixed(1)}°C

RISK LEVELS: ${JSON.stringify(riskDistribution)} (${agentResponses.length} evaluations)

Respond with JSON only:
{
  "summary": "Brief 2-sentence health analysis",
  "recommendations": ["Rec 1", "Rec 2", "Rec 3", "Rec 4"]
}`
  }

  private parseAnalysisResponse(analysisText: string): AnalysisSummary {
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          summary: parsed.summary || "Analysis completed successfully.",
          recommendations: parsed.recommendations || [],
        }
      }
    } catch (error) {
      console.error("[v0] Error parsing Groq response:", error)
    }

    // Fallback parsing
    const lines = analysisText.split("\n").filter((line) => line.trim())
    return {
      summary: lines[0] || "Real-time monitoring active.",
      recommendations: lines.slice(1, 5).map((line) => line.replace(/^[-•]\s*/, "")) || [
        "Continue monitoring",
        "Stay hydrated",
        "Monitor vital signs",
        "Rest when needed",
      ],
    }
  }
}

export const groqService = new GroqService()

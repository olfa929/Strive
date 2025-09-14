export interface RunningData {
  heart_rate: number
  respiratory: number
  body_temp: number
  motion_acc: number
  activity_type: string
}

export interface AgentResponse {
  risk_level: number
  decision: string
}

import { MockAgentService } from "./mock-agent"

class DataService {
  private csvData: RunningData[] = []
  private currentIndex = 0
  private agentResponses: AgentResponse[] = []
  private csvUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/running_only-Hq69w80YFPucoUIqaxeWXeVsUP3old.csv"
  private agentUrl = "https://a84671abe290.ngrok-free.app/analyze"
  private useMockAgent = true // Enable mock agent by default since external service is unavailable
  private consecutiveFailures = 0

  async loadCSVData(): Promise<void> {
    try {
      const response = await fetch(this.csvUrl)
      const csvText = await response.text()

      // Parse CSV data
      const lines = csvText.split("\n")
      const headers = lines[0].split(",")

      this.csvData = lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line) => {
          const values = line.split(",")
          return {
            heart_rate: Number.parseInt(values[0]) || 0,
            respiratory: Number.parseInt(values[1]) || 0,
            body_temp: Number.parseFloat(values[2]) || 0,
            motion_acc: Number.parseInt(values[3]) || 0,
            activity_type: values[4]?.trim() || "Running",
          }
        })

      console.log("[v0] Loaded CSV data:", this.csvData.length, "rows")
      console.log("[v0] Using mock AI agent service (external service unavailable)") // Log that we're using mock agent by default
    } catch (error) {
      console.error("[v0] Error loading CSV data:", error)
    }
  }

  getNextDataPoint(): RunningData | null {
    if (this.csvData.length === 0) return null

    const dataPoint = this.csvData[this.currentIndex]
    this.currentIndex = (this.currentIndex + 1) % this.csvData.length

    return dataPoint
  }

  async sendToAgent(data: RunningData): Promise<AgentResponse | null> {
    if (this.useMockAgent) {
      try {
        const mockResponse = await MockAgentService.analyze(data)
        this.agentResponses.push(mockResponse)

        if (this.agentResponses.length > 60) {
          this.agentResponses = this.agentResponses.slice(-60)
        }

        return mockResponse
      } catch (error) {
        console.error("[v0] Mock agent error:", error)
        return this.getFallbackResponse(data)
      }
    }

    // Only try real agent if mock is disabled
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000) // Reduced timeout

      const response = await fetch(this.agentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Agent response not ok: ${response.status}`)
      }

      const responseData = await response.json()

      let agentResponse: AgentResponse
      if (responseData.ok && responseData.result) {
        agentResponse = responseData.result
      } else if (responseData.risk_level !== undefined && responseData.decision) {
        agentResponse = responseData
      } else {
        throw new Error("Invalid agent response structure")
      }

      this.agentResponses.push(agentResponse)

      if (this.agentResponses.length > 60) {
        this.agentResponses = this.agentResponses.slice(-60)
      }

      this.consecutiveFailures = 0
      console.log("[v0] Real agent response processed successfully:", agentResponse)
      return agentResponse
    } catch (error) {
      this.consecutiveFailures++

      // Switch to mock agent after failures
      if (this.consecutiveFailures >= 2) {
        console.log("[v0] Switching to mock agent service due to external service issues")
        this.useMockAgent = true
        return this.sendToAgent(data) // Retry with mock agent
      }

      return this.getFallbackResponse(data)
    }
  }

  private getFallbackResponse(data: RunningData): AgentResponse {
    const heartRate = data.heart_rate
    let defaultResponse: AgentResponse

    if (heartRate > 180) {
      defaultResponse = {
        risk_level: 3,
        decision: "⛔ High risk: Player must stop, medical attention needed.",
      }
    } else if (heartRate > 150) {
      defaultResponse = {
        risk_level: 2,
        decision: "⚠️ Moderate risk: Monitor player closely.",
      }
    } else {
      defaultResponse = {
        risk_level: 1,
        decision: "✅ Safe: Player can continue playing.",
      }
    }

    this.agentResponses.push(defaultResponse)

    if (this.agentResponses.length > 60) {
      this.agentResponses = this.agentResponses.slice(-60)
    }

    return defaultResponse
  }

  enableMockAgent(): void {
    this.useMockAgent = true
    this.consecutiveFailures = 0
    console.log("[v0] Mock agent service enabled")
  }

  disableMockAgent(): void {
    this.useMockAgent = false
    this.consecutiveFailures = 0
    console.log("[v0] Mock agent service disabled, will retry real agent")
  }

  getRecentAgentResponses(): AgentResponse[] {
    return this.agentResponses.slice(-60)
  }

  getRecentCSVData(): RunningData[] {
    if (this.csvData.length === 0) return []

    const endIndex = this.currentIndex
    const startIndex = Math.max(0, endIndex - 60)

    console.log("[v0] Getting recent CSV data:", { startIndex, endIndex, totalRows: this.csvData.length })

    if (startIndex >= 0) {
      return this.csvData.slice(startIndex, endIndex)
    } else {
      const result = [...this.csvData.slice(this.csvData.length + startIndex), ...this.csvData.slice(0, endIndex)]
      console.log("[v0] Wrap-around case:", { result: result.length })
      return result
    }
  }

  getMostFrequentDecision(): string {
    const recentResponses = this.getRecentAgentResponses()
    const decisions = recentResponses.map((r) => r.decision).filter(Boolean)
    const frequency: { [key: string]: number } = {}

    decisions.forEach((decision) => {
      frequency[decision] = (frequency[decision] || 0) + 1
    })

    console.log("[v0] Decision frequency:", frequency)

    let mostFrequent = "✅ Safe: Player can continue playing."
    let maxCount = 0

    Object.entries(frequency).forEach(([decision, count]) => {
      if (count > maxCount) {
        maxCount = count
        mostFrequent = decision
      }
    })

    console.log("[v0] Most frequent decision:", mostFrequent)
    return mostFrequent
  }

  getAverageRiskLevel(): number {
    const recentResponses = this.getRecentAgentResponses()
    if (recentResponses.length === 0) return 1

    const riskLevels = recentResponses
      .map((r) => r.risk_level)
      .filter((level) => level !== null && level !== undefined && !isNaN(level))

    if (riskLevels.length === 0) return 1

    const sum = riskLevels.reduce((acc, level) => acc + level, 0)
    const average = sum / riskLevels.length
    const rounded = Math.max(1, Math.min(3, Math.round(average)))

    console.log("[v0] Risk level calculation:", {
      responses: recentResponses.length,
      validRiskLevels: riskLevels.length,
      riskLevels: riskLevels.slice(0, 10),
      average,
      rounded,
    })

    return rounded
  }
}

export const dataService = new DataService()

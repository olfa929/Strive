"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Activity, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { dataService } from "@/lib/data-service"
import { groqService, type AnalysisSummary } from "@/lib/groq-service"

export default function HeartMonitoringPage() {
  const [user, setUser] = useState<{ fullName: string } | null>(null)
  const [currentBPM, setCurrentBPM] = useState(72)
  const [respiratoryRate, setRespiratoryRate] = useState(25)
  const [bodyTemperature, setBodyTemperature] = useState(38.5)
  const [decision, setDecision] = useState("✅ Safe: Player can continue playing.")
  const [cardiacRisk, setCardiacRisk] = useState(1)
  const [heartPulse, setHeartPulse] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [analysisCount, setAnalysisCount] = useState(0)
  const [analysisSummary, setAnalysisSummary] = useState<AnalysisSummary>({
    summary: "Real-time monitoring active. Processing live data from running session.",
    recommendations: [
      "Real-time monitoring active",
      "AI analysis in progress",
      "Follow safety protocols",
      "Stay hydrated during activity",
    ],
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const heartVideoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/signin")
    }
  }, [router])

  useEffect(() => {
    const loadData = async () => {
      await dataService.loadCSVData()
      setIsDataLoaded(true)
      console.log("[v0] CSV data loaded successfully")
    }
    loadData()
  }, [])

  useEffect(() => {
    if (heartVideoRef.current) {
      // GIF is 5 seconds long with 5 heartbeats, so for 60 BPM (1 beat/second), we need 5 seconds duration
      // For other BPM values, we adjust the animation-duration CSS property
      const animationDuration = (5 * 60) / currentBPM // Calculate duration in seconds
      heartVideoRef.current.style.animationDuration = `${animationDuration}s`
      console.log(`[v0] Heart GIF animation duration set to ${animationDuration}s for ${currentBPM} BPM`)
    }
  }, [currentBPM])

  useEffect(() => {
    if (!isDataLoaded) return

    const minuteInterval = setInterval(async () => {
      setIsAnalyzing(true)
      console.log("[v0] Starting minute-based analysis...")

      // Update decision to most frequent from last minute
      const mostFrequentDecision = dataService.getMostFrequentDecision()
      setDecision(mostFrequentDecision)
      console.log("[v0] Most frequent decision:", mostFrequentDecision)

      // Update cardiac risk to average from last minute
      const averageRisk = dataService.getAverageRiskLevel()
      setCardiacRisk(averageRisk)
      console.log("[v0] Average risk level:", averageRisk)

      // Get data for Groq analysis
      const recentCSVData = dataService.getRecentCSVData()
      const recentAgentResponses = dataService.getRecentAgentResponses()

      console.log("[v0] Analyzing data:", {
        csvRows: recentCSVData.length,
        agentResponses: recentAgentResponses.length,
      })

      // Generate LLM analysis and recommendations
      try {
        const analysis = await groqService.generateAnalysis(recentCSVData, recentAgentResponses)
        setAnalysisSummary(analysis)
        console.log("[v0] Groq analysis completed:", analysis)
      } catch (error) {
        console.error("[v0] Error in Groq analysis:", error)
        setAnalysisSummary({
          summary: `Monitoring ${recentCSVData.length} data points. Current status: ${mostFrequentDecision.includes("Safe") ? "Normal activity levels" : "Elevated risk detected"}.`,
          recommendations: [
            "Continue real-time monitoring",
            "Maintain current activity level",
            "Stay hydrated during exercise",
            "Monitor for any sudden changes",
          ],
        })
      }

      setAnalysisCount((prev) => prev + 1)
      setIsAnalyzing(false)
      console.log("[v0] Minute analysis completed:", {
        cycle: analysisCount + 1,
        mostFrequentDecision,
        averageRisk,
        dataPoints: recentCSVData.length,
        agentResponses: recentAgentResponses.length,
      })
    }, 10000) // Temporarily reduce to 10 seconds for testing, change back to 60000 for production

    return () => clearInterval(minuteInterval)
  }, [isDataLoaded, analysisCount])

  useEffect(() => {
    if (!isDataLoaded) return

    const interval = setInterval(async () => {
      try {
        // Get next data point from CSV
        const dataPoint = dataService.getNextDataPoint()
        if (!dataPoint) return

        console.log("[v0] Processing data point:", dataPoint)

        // Update UI with real data
        setCurrentBPM(dataPoint.heart_rate)
        setRespiratoryRate(dataPoint.respiratory)
        setBodyTemperature(dataPoint.body_temp)

        try {
          const agentResponse = await dataService.sendToAgent(dataPoint)
          if (agentResponse) {
            console.log("[v0] Agent response processed:", agentResponse)
          }
        } catch (error) {
          console.warn("[v0] Agent processing error (handled):", error)
          // Continue execution even if agent fails
        }

        // Trigger heart pulse animation
        setHeartPulse(true)
        setTimeout(() => setHeartPulse(false), 200)
      } catch (error) {
        console.error("[v0] Data processing error:", error)
        // Continue the interval even if there's an error
      }
    }, 1000) // Every second

    return () => clearInterval(interval)
  }, [isDataLoaded])

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-[#38241c] text-white">Loading...</div>
  }

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#38241c] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading health monitoring data...</p>
        </div>
      </div>
    )
  }

  const getHeartRateZone = (bpm: number) => {
    if (bpm < 60) return { zone: "Low", color: "text-blue-400", bg: "bg-blue-500/20" }
    if (bpm < 70) return { zone: "Resting", color: "text-green-400", bg: "bg-green-500/20" }
    if (bpm < 85) return { zone: "Normal", color: "text-yellow-400", bg: "bg-yellow-500/20" }
    return { zone: "Elevated", color: "text-red-400", bg: "bg-red-500/20" }
  }

  const getRiskLevelDisplay = (riskLevel: number) => {
    const colors = ["bg-green-400", "bg-yellow-400", "bg-red-400"]
    return [...Array(3)].map((_, i) => (
      <div
        key={i}
        className={`w-4 h-2 rounded transition-all duration-500 ${
          i < riskLevel ? colors[Math.min(riskLevel - 1, 2)] : "bg-white/20"
        }`}
      />
    ))
  }

  const getDecisionColor = (decision: string) => {
    if (decision.includes("Safe")) return "text-green-400"
    if (decision.includes("Moderate")) return "text-yellow-400"
    if (decision.includes("High risk")) return "text-red-400"
    return "text-white"
  }

  const heartZone = getHeartRateZone(currentBPM)

  return (
    <div className="min-h-screen bg-[#38241c] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Heart Monitoring Dashboard</h1>
          <p className="text-white/70">Real-time cardiac analysis for {user.fullName}</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white/60">Live Data Stream Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isAnalyzing ? "bg-yellow-400 animate-pulse" : "bg-blue-400"}`}
              ></div>
              <span className="text-sm text-white/60">
                {isAnalyzing ? "Analyzing..." : `AI Analysis: ${analysisCount} cycles`}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Left Analysis Panel */}
          <div className="bg-[#38241c] p-6 rounded-lg">
            <div className="mb-6">
              <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-white" />
                Heart Rate Analysis
              </h2>
            </div>
            <div className="text-white space-y-4">
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg transition-all duration-300 ${heartZone.bg} ${heartPulse ? "scale-105 shadow-lg" : "scale-100"}`}
                >
                  <p className="text-sm text-white/70">Current BPM</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-3xl font-bold ${heartZone.color} transition-colors duration-300`}>
                      {currentBPM}
                    </p>
                    <Heart
                      className={`h-6 w-6 ${heartZone.color} ${heartPulse ? "animate-pulse" : ""} transition-all duration-200`}
                    />
                  </div>
                  <p className={`text-xs ${heartZone.color} mt-1`}>{heartZone.zone} Zone</p>
                </div>

                <div className="p-4 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Respiratory Rate</p>
                  <p className="text-2xl font-bold text-white">{respiratoryRate}</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, (respiratoryRate / 30) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Body Temperature</p>
                  <p className="text-2xl font-bold text-white">{bodyTemperature.toFixed(1)}°C</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, ((bodyTemperature - 36) / 4) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-3 text-white">Analysis Summary</h4>
                <p className="text-sm text-white/70 leading-relaxed">{analysisSummary.summary}</p>
              </div>
            </div>
          </div>

          {/* Center - Digital Twin Space */}
          <div className="bg-[#38241c] p-6 rounded-lg">
            <div className="mb-6">
              <h2 className="text-white text-xl font-semibold text-center flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-white" />
                Digital Heart Twin
              </h2>
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  ref={heartVideoRef}
                  src="/images/heart-animation.gif"
                  alt="Animated heart"
                  className="w-full h-full object-contain rounded-lg scale-110 hover:scale-125 transition-transform duration-500 cursor-pointer"
                  onClick={() => setHeartPulse(true)}
                  style={{
                    animation: `heartbeat ${(5 * 60) / currentBPM}s infinite linear`,
                  }}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="flex justify-center items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-8 rounded-full transition-all duration-300 ${
                      i < Math.floor(currentBPM / 20) ? "bg-red-400" : "bg-white/20"
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animation: "pulse 1s infinite",
                    }}
                  />
                ))}
              </div>
              <p className="text-white/70 text-xs mt-2">Heart Rate Intensity</p>
            </div>
          </div>

          {/* Right Analysis Panel */}
          <div className="bg-[#38241c] p-6 rounded-lg">
            <div className="mb-6">
              <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-white" />
                Health Insights
              </h2>
            </div>
            <div className="text-white space-y-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Cardiac Risk</p>
                  <div className="flex gap-1 mt-2">{getRiskLevelDisplay(cardiacRisk)}</div>
                  <p className="text-xs text-white/50 mt-1">Averaged over last minute</p>
                </div>

                <div className="p-4 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Decision</p>
                  <p className={`text-lg font-bold ${getDecisionColor(decision)} transition-colors duration-300`}>
                    {decision}
                  </p>
                  <p className="text-xs text-white/50 mt-1">Most frequent decision</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-3 text-white flex items-center gap-2">
                  Recommendations
                  {isAnalyzing && (
                    <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                  )}
                </h4>
                <div className="space-y-2 text-sm text-white/70">
                  {analysisSummary.recommendations.map((rec, index) => (
                    <p key={index} className="hover:text-white transition-colors cursor-pointer">
                      • {rec}
                    </p>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full mt-8 bg-white hover:bg-white/90 text-[#38241c] font-medium hover:scale-105 transition-transform duration-200"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

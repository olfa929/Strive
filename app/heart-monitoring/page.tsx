"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Activity, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeartMonitoringPage() {
  const [user, setUser] = useState<{ fullName: string } | null>(null)
  const [currentBPM, setCurrentBPM] = useState(72)
  const [heartPulse, setHeartPulse] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/signin")
    }
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBPM((prev) => {
        const variation = Math.random() * 6 - 3 // ±3 BPM variation
        return Math.round(Math.max(60, Math.min(85, prev + variation)))
      })
      setHeartPulse(true)
      setTimeout(() => setHeartPulse(false), 200)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-[#38241c] text-white">Loading...</div>
  }

  const getHeartRateZone = (bpm: number) => {
    if (bpm < 60) return { zone: "Low", color: "text-blue-400", bg: "bg-blue-500/20" }
    if (bpm < 70) return { zone: "Resting", color: "text-green-400", bg: "bg-green-500/20" }
    if (bpm < 85) return { zone: "Normal", color: "text-yellow-400", bg: "bg-yellow-500/20" }
    return { zone: "Elevated", color: "text-red-400", bg: "bg-red-500/20" }
  }

  const heartZone = getHeartRateZone(currentBPM)

  return (
    <div className="min-h-screen bg-[#38241c] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Heart Monitoring Dashboard</h1>
          <p className="text-white/70">Real-time cardiac analysis for {user.fullName}</p>
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

                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Resting Heart Rate</p>
                  <p className="text-2xl font-bold text-white">65</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-green-400 h-2 rounded-full w-[75%] transition-all duration-1000"></div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Heart Rate Variability</p>
                  <p className="text-2xl font-bold text-white">42ms</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-blue-400 h-2 rounded-full w-[85%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-3 text-white">Analysis Summary</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  Your heart rhythm shows excellent stability with normal sinus rhythm. Heart rate variability indicates
                  good cardiovascular fitness. No irregular patterns detected in the current monitoring session.
                </p>
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/heart-unscreen-y5uOOocI7UbXQnmjDA2BgbHEdvNnA6.gif"
                  alt="Animated anatomical heart"
                  className="w-full h-full object-contain rounded-lg scale-110 hover:scale-125 transition-transform duration-500 cursor-pointer"
                  onClick={() => setHeartPulse(true)}
                  style={{
                    animationDuration: `${60 / currentBPM}s`,
                    animationIterationCount: "infinite",
                    animationTimingFunction: "ease-in-out",
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
                      i < Math.floor(currentBPM / 15) ? "bg-red-400" : "bg-white/20"
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
                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Cardiovascular Score</p>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-green-400">8.7/10</p>
                    <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-green-400 animate-spin-slow"></div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Stress Level</p>
                  <p className="text-2xl font-bold text-green-400">Low</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-4 h-2 rounded ${i < 1 ? "bg-green-400" : "bg-white/20"}`} />
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <p className="text-sm text-white/70">Recovery Status</p>
                  <p className="text-2xl font-bold text-blue-400">Optimal</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-blue-400 h-2 rounded-full w-[95%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-3 text-white">Recommendations</h4>
                <div className="space-y-2 text-sm text-white/70">
                  <p className="hover:text-white transition-colors cursor-pointer">
                    • Maintain current exercise routine
                  </p>
                  <p className="hover:text-white transition-colors cursor-pointer">
                    • Consider increasing cardio intensity by 10%
                  </p>
                  <p className="hover:text-white transition-colors cursor-pointer">
                    • Excellent heart health indicators
                  </p>
                  <p className="hover:text-white transition-colors cursor-pointer">
                    • Continue monitoring for optimal performance
                  </p>
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

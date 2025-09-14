"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<{ fullName: string } | null>(null)
  const [isConnectingBodySuit, setIsConnectingBodySuit] = useState(false)
  const [isConnectingWatch, setIsConnectingWatch] = useState(false)
  const [bodySuitConnected, setBodySuitConnected] = useState(false)
  const [watchConnected, setWatchConnected] = useState(false)
  const [showHeartMessage, setShowHeartMessage] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/signin")
    }
  }, [router])

  const handleConnectBodySuit = async () => {
    setIsConnectingBodySuit(true)

    // Show loading for exactly 3 seconds
    setTimeout(() => {
      setIsConnectingBodySuit(false)
      setBodySuitConnected(true)

      // Show "smart body suit connected" message
      setTimeout(() => {
        setShowHeartMessage(true)

        // After showing heart monitoring message, redirect to heart monitoring page
        setTimeout(() => {
          router.push("/heart-monitoring")
        }, 2000)
      }, 1000)
    }, 3000)
  }

  const handleConnectWatch = async () => {
    setIsConnectingWatch(true)

    setTimeout(() => {
      setIsConnectingWatch(false)
      setWatchConnected(true)
    }, 3000)
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-[#38241c] text-white">Loading...</div>
  }

  return (
    <div
      className="min-h-screen bg-[#38241c] bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/dark-runner-bg.png')",
      }}
    >
      <div className="absolute right-8 top-0 w-1/2 h-full flex items-center justify-start pl-12">
        <div className="max-w-lg space-y-8">
          {/* Welcome message with elegant white typography */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-light text-white tracking-wide">Welcome</h1>
            <h2 className="text-3xl font-medium text-white/90">{user?.fullName}</h2>
            <div className="w-20 h-px bg-white/40 mx-auto mb-6"></div>
            <p className="text-white/80 text-lg leading-relaxed font-light">
              Connect your devices to begin your personalized health journey
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleConnectBodySuit}
              disabled={isConnectingBodySuit || bodySuitConnected}
              className="flex-1 h-14 bg-black/40 hover:bg-black/60 text-white font-light tracking-wide transition-all duration-300 rounded-lg border border-white/30 backdrop-blur-sm hover:border-white/50"
            >
              {isConnectingBodySuit ? "Connecting..." : bodySuitConnected ? "Body Suit ✓" : "Connect Body Suit"}
            </Button>

          </div>

          {/* Status messages with refined white styling */}
          {bodySuitConnected && !showHeartMessage && (
            <div className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/30">
              <p className="text-white font-light">Smart body suit connected</p>
            </div>
          )}

          {showHeartMessage && (
            <div className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/30">
              <p className="text-white font-light">Initializing heart monitoring...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

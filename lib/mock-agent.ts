import type { RunningData, AgentResponse } from "./data-service"

export class MockAgentService {
  static async analyze(data: RunningData): Promise<AgentResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200))

    const { heart_rate, respiratory, body_temp } = data

    // Simple risk assessment logic
    let risk_level = 1
    let decision = "✅ Safe: Player can continue playing."

    // High heart rate risk
    if (heart_rate > 180) {
      risk_level = 3
      decision = "⛔ High risk: Player must stop, medical attention needed."
    } else if (heart_rate > 160) {
      risk_level = 2
      decision = "⚠️ Moderate risk: Monitor player closely."
    }

    // High body temperature risk
    if (body_temp > 39.5) {
      risk_level = Math.max(risk_level, 3)
      decision = "⛔ High risk: Player must stop, medical attention needed."
    } else if (body_temp > 38.8) {
      risk_level = Math.max(risk_level, 2)
      decision = "⚠️ Moderate risk: Monitor player closely."
    }

    // High respiratory rate risk
    if (respiratory > 35) {
      risk_level = Math.max(risk_level, 2)
      if (risk_level < 3) {
        decision = "⚠️ Moderate risk: Monitor player closely."
      }
    }

    // Add some randomness to simulate real AI variability
    if (Math.random() < 0.1 && risk_level === 1) {
      risk_level = 2
      decision = "⚠️ Moderate risk: Monitor player closely."
    }

    console.log("[v0] Mock agent analysis:", { heart_rate, respiratory, body_temp, risk_level, decision })

    return { risk_level, decision }
  }
}

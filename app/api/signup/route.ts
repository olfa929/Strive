import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    await request.json() // Still parse the request but ignore the data

    // Always return success regardless of input
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

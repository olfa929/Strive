import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { fullName, password } = await request.json()

    const REGISTERED_USER = {
      fullName: "Olfa Boutiti",
      password: "20030047",
      id: 1,
    }

    // Check if credentials match the hardcoded user
    if (fullName === REGISTERED_USER.fullName && password === REGISTERED_USER.password) {
      return NextResponse.json({
        success: true,
        user: {
          id: REGISTERED_USER.id,
          fullName: REGISTERED_USER.fullName,
        },
      })
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ error: "An error occurred during sign in" }, { status: 500 })
  }
}

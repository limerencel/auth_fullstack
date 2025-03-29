import { NextResponse } from "next/server";

const MOCK_USER_EMAIL = "test@example.com";
const MOCK_USER_PASSWORD = "123456";
const MOCK_USER_NAME = "Test User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    console.log("login attempt", { email });
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    // Simulate a login check (replace with actual authentication logic)
    if (email === MOCK_USER_EMAIL && password === MOCK_USER_PASSWORD) {
      // Simulate a successful login response
      // In a real app, you'd generate a session token/JWT here
      console.log("Login successful for:", email);
      return NextResponse.json(
        { message: "Login successful", user: { name: MOCK_USER_NAME, email } },
        { status: 200 }
      );
    } else {
      // Simulate an error response for invalid credentials
      console.log("Login failed for:", email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

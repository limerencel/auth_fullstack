import { NextResponse } from "next/server";

let registeredUsers: Record<string, any> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, username } = body;
    console.log("Register attempt", { email });
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Email, password and username are required" },
        { status: 400 }
      );
    }
    // Check if the user is already registered
    if (registeredUsers[email]) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 409 }
      );
    }
    // Simulate a registration process (replace with actual logic)
    registeredUsers[email] = { password, username };
    console.log("Registration successful for:", email);
    return NextResponse.json(
      { message: "Registration successful", user: { name: username, email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

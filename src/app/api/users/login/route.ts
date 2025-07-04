import { NextResponse } from "next/server";
import User from "../../../../models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connect();
    const { email, password } = await req.json();

    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    } else {
      console.log(`User found: ${user.email}`);
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    console.log(`Password match: ${isMatch}`);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Optionally, you can return user info (not password) or a token here
    return NextResponse.json({ message: "Login successful", user: { id: user._id, email: user.email, username: user.username } }, { status: 200 });
  } catch (error) {
    console.log("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

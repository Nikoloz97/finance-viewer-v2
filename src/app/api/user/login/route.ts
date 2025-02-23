import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/api/mongodb";
import { User } from "@/lib/models/user";
import { compare } from "bcryptjs";

const client = await clientPromise;
const users = client.db("FinanceViewer").collection<User>("Users");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = body.username;
    const password = body.password;

    // Find user by username
    const user = await users.findOne({ username, password });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // TODO: eventually integrate this
    // // Compare password (assuming stored as hashed)
    // const isMatch = await compare(password, user.password);

    // if (!isMatch) {
    //   return NextResponse.json(
    //     { message: "Invalid credentials." },
    //     { status: 401 }
    //   );
    // }

    return NextResponse.json({ message: "Login successful", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/api/mongodb";
import { User } from "@/lib/models/user";
import bcrypt from "bcryptjs";

const client = await clientPromise;
const users = client.db("FinanceViewer").collection<User>("Users");

export async function POST(req: NextRequest) {
  try {
    const signupInfo = await req.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signupInfo.password, saltRounds);

    const user = await users.insertOne({
      ...signupInfo,
      password: hashedPassword,
    });

    if (user) {
      return NextResponse.json({ message: "Signup successful", user });
    } else {
      return NextResponse.json({
        message: "Error inserting user into database",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

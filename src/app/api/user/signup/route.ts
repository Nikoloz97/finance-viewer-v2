import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/api/mongodb";
import { User } from "@/lib/models/user";
import { compare } from "bcryptjs";

const client = await clientPromise;
const users = client.db("FinanceViewer").collection<User>("Users");

export async function POST(req: NextRequest) {
  try {
    const signupInfo = await req.json();

    // Middleware 1: password-hashing
    // TODO: Uncomment
    // const hashedPassword = await bcrypt.hash(signupInfo.password, saltRounds)
    // signupInfo.password = hashedPassword;

    // Middleware 2: profile image storage (blob)
    // TODO: Uncomment
    // const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString)
    // const containerClient = blobServiceClient.getContainerClient("profile-images")
    // const blockBlobClient = containerClient.getBlockBlobClient("financeviewer")

    // // TODO: implement a try-catch here
    // const uploadBlobResponse = await blockBlobClient.uploadFile(signupInfo.profileImgUrl)

    const user = await users.insertOne(signupInfo);

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

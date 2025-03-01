import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/api/mongodb";
import { User } from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { BlobServiceClient } from "@azure/storage-blob";

const client = await clientPromise;
const users = client.db("FinanceViewer").collection<User>("Users");

export async function POST(req: NextRequest) {
  try {
    // Prevents using env variable during build time
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING || ""
    );
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const formData = await req.formData();
    const profileImageFile = formData.get("profileImageFile") as
      | File
      | undefined;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const occupation = formData.get("occupation") as string | undefined;

    let imageFilePath = null;
    if (profileImageFile && profileImageFile.size > 0) {
      const fileExtension = path.extname(profileImageFile.name);
      const fileName = `${uuidv4()}${fileExtension}`;

      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      const arrayBuffer = await profileImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: {
          blobContentType: profileImageFile.type,
        },
      });

      imageFilePath = blockBlobClient.url;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      occupation,
      profileImagePath: imageFilePath,
    };

    const user = await users.insertOne(userData);

    if (user) {
      return NextResponse.json({
        message: "Signup successful",
        user: { ...userData, password: undefined }, // Don't return the hashed password
      });
    } else {
      return NextResponse.json({
        message: "Error inserting user into database",
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

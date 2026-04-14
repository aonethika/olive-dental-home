import { dbConnect } from "@/lib/connectDB";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export async function GET() {
  await dbConnect();

  const existing = await Admin.findOne({ email: "hmstestuser123@gmail.com" });
  if (existing) return Response.json({ message: "Already exists" });

  const hashed = await bcrypt.hash("admin123", 10);

  await Admin.create({
    username: "admin",
    email: "hmstestuser123@gmail.com",
    password: hashed,
  });

  return Response.json({ message: "Admin created" });
}
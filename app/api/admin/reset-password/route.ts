import { dbConnect } from "@/lib/connectDB";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  const { token, password } = await req.json();

  const admin = await Admin.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!admin) {
    return Response.json(
      { success: false, message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  admin.password = await bcrypt.hash(password, 10);
  admin.resetToken = undefined;
  admin.resetTokenExpiry = undefined;

  await admin.save();

  return Response.json({
    success: true,
    message: "Password updated successfully",
  });
}
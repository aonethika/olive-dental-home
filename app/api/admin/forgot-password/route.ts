import { dbConnect } from "@/lib/connectDB";
import Admin from "@/models/admin";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  await dbConnect();

  const { email } = await req.json();

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return Response.json(
      { success: false, message: "Email not found" },
      { status: 404 }
    );
  }

  const token = crypto.randomBytes(32).toString("hex");

  admin.resetToken = token;
  admin.resetTokenExpiry = Date.now() + 1000 * 60 * 15; 
  await admin.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

 const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;;
 const resetLink = `${baseUrl}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `<p>Click below to reset password</p><a href="${resetLink}">Reset Password</a>`,
  });

  return Response.json({
    success: true,
    message: "Reset link sent to email",
  });
}
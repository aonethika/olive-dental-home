import { dbConnect } from "@/lib/connectDB";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();

  const admin = await Admin.findOne({ username });

  if (!admin) {
    return Response.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return Response.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return Response.json({ success: true });
}
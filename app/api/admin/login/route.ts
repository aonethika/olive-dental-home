import { dbConnect } from "@/lib/connectDB";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();

  const admin = await Admin.findOne({ username });

  if (!admin) {
    return Response.json({ success: false }, { status: 401 });
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return Response.json({ success: false }, { status: 401 });
  }

  const cookieStore = await cookies();

  cookieStore.set("token", "admin-auth", {
    httpOnly: true,
    path: "/",
  });

  return Response.json({ success: true });
}
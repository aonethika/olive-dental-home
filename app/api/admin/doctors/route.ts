import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import Doctor from "@/models/doctor";

export async function GET() {
  await dbConnect();
  const doctors = await Doctor.find();
  return NextResponse.json({ doctors });
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const doctor = await Doctor.create(data);
  return NextResponse.json({ doctor });
}
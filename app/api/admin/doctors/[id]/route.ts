import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import Doctor from "@/models/doctor";

export async function PATCH(req: Request, context: any) {
  await dbConnect();

  const { id } = await context.params;   
  const { isActive } = await req.json();

  console.log("PARAM ID:", id);

  const updated = await Doctor.findByIdAndUpdate(
    id,
    { isActive },
    { returnDocument: "after" }
  );

  return NextResponse.json({ doctor: updated });
}
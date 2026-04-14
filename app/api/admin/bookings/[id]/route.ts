import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import Booking from "@/models/booking";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const body = await req.json();

    const { id } = await context.params;

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      booking: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
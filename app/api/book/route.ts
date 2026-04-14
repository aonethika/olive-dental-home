import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import Booking from "@/models/booking";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await dbConnect();

    const booking = await Booking.create(data);

    return NextResponse.json({
      success: true,
      message: "Booking saved successfully",
      booking,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error saving booking" },
      { status: 500 }
    );
  }
}
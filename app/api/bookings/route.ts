import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import Booking from "@/models/booking";

export async function GET() {
  try {
    await dbConnect();

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
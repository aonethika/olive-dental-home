import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import Booking from "@/models/booking";

export async function GET() {
  await dbConnect();

  const bookings = await Booking.find({}).populate("doctor");

  return NextResponse.json({ bookings });
}

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  const newBooking = await Booking.create({
    patientName: body.patientName,
    phone: body.phone,
    date: body.date,
    time: body.time,
    doctor: body.doctor,
    status: "pending",
  });

  return NextResponse.json({ booking: newBooking });
}
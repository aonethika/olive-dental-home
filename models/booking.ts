import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    patientName: String,
    phone: String,
    date: String,
    time: String,

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
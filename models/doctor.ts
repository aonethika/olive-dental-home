import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: String,
    specialization: String,
    phone: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor ||
  mongoose.model("Doctor", DoctorSchema);
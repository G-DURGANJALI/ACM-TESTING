import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String },
  photo: { type: String },
  isApproved: { type: Boolean, default: false },
   clubCouncil: [
    {
      name: String,
      role: String,
      profilepic: String 
    },
  ], // Array of council members
}, { timestamps: true });

const Club = mongoose.model('Club', clubSchema);
export default Club;
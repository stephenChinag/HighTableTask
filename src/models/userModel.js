import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    require: [true, "please provide a Username"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "please provide a password"],
    unique: true,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

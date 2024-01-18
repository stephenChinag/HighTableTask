import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if the user exist
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not Exit " },
        { status: 400 }
      );
    }
    // check if password Exist
    const validatePassword = await bcryptjs.compare(password, user.password);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

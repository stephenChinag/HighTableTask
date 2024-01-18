import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    jwt.verify(token, process.env.TOKEN_SECRETE);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import { useState } from "react";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSingUp = async () => {};

  const userChangeHandler = () => {};
  const emailChangeHandler = () => {};
  const passwordChangeHandler = () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> SignUp</h1>
      <hr />
      <label htmlFor="username">UserName</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={userChangeHandler}
      />
      <label htmlFor="username">UserName</label>
      <input
        id="email"
        type="text"
        value={user.email}
        onChange={emailChangeHandler}
      />
    </div>
  );
}

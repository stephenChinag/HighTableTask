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

  const onSingUp = async () => {
    console.log(user);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="mg-33"> SignUp</h1>
      <hr />
      <label htmlFor="username">UserName</label>
      <input
        className="p-3 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="username"
      />
      <label htmlFor="username">Email</label>
      <input
        className="p-3 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      />
      <label htmlFor="username">Password</label>
      <input
        className="p-3 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
        id="email"
        type="text"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      />
      <button
        onClick={onSingUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {" "}
        Signup Here
      </button>
      <Link href="/login"> Vist Login</Link>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtondisabled] = useState(false);

  const onSingUp = async () => {
    console.log(user);

    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="mg-33"> SignUp</h1>
      <hr />
      <label htmlFor="username">UserName</label>
      <input
        className="p-3 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
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
        className="p-3 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
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
        className="p-3 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
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
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login"> Vist Login</Link>
    </div>
  );
}

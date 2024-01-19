"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  const onLogOuttHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("LogOut Succesful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
      <Navbar />

      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white front-bold py-2 px-4 rounded"
        onClick={onLogOuttHandler}
      >
        LogOut
      </button>
    </div>
  );
}

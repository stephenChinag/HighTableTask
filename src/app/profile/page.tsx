"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
//https://api.openweathermap.org/data/2.5/forecast?q=nigeria&appid=a693fb80205a2a0c4661350f7d698afe&cnt=56

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<WeatherItem>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

type WeatherItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { isLoading, error, data } = useQuery(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=nigeria&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
    // await fetch(
    //   "https://api.openweathermap.org/data/2.5/forecast?q=nigeria&appid=a693fb80205a2a0c4661350f7d698afe&cnt=56"
    // ).then((res) => res.json())
  );
  const firstData = data?.list[0];
  console.log("data", data?.city.name);
  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  // if (error)
  //   return (
  //     <div className="flex items-center min-h-screen justify-center">
  //       <p className="text-red-400">{error}</p>
  //     </div>
  //   );

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
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9  w-full  pb-10 pt-4 ">
        <section>
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl  items-end ">
              {" "}
              <p> {format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
            </h2>
            <div></div>
          </div>
        </section>
        <section></section>
      </main>

      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white front-bold py-2 px-4 rounded"
        onClick={onLogOuttHandler}
      >
        LogOut
      </button>
    </div>
  );
}

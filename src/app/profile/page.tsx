"use client";
import axios from "axios";
import Link from "next/link";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import { format, parseISO, fromUnixTime } from "date-fns";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import WeatherDetails from "@/components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
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
  const [place, setPlace] = useAtom(placeAtom);
  const router = useRouter();
  const { isLoading, error, data, refetch } = useQuery(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
    // await fetch(
    //   "https://api.openweathermap.org/data/2.5/forecast?q=nigeria&appid=a693fb80205a2a0c4661350f7d698afe&cnt=56"
    // ).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);
  const firstData = data?.list[0];

  console.log("data", data?.list);
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
  //   )

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry: any) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

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

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry: any) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9  w-full  pb-10 pt-4 ">
        <section>
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl  items-end ">
              <p> {format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <Container className=" gap-10 px-6 items-center">
              <div className=" flex flex-col px-4 ">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span> Feels like</span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                    °↓{" "}
                  </span>
                  <span>
                    {" "}
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                    °↑
                  </span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
                  >
                    <p className="whitespace-nowrap">
                      {" "}
                      {format(parseISO(d.dt_txt), "h:mm a")}{" "}
                    </p>
                    {/* <WeatherIcon iconName={d.weather[0].icon} /> */}{" "}
                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                    />
                    <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className=" flex gap-4">
            {/* left  */}
            <Container className="w-fit  justify-center flex-col px-4 items-center ">
              <p className=" capitalize text-center">
                {firstData?.weather[0].description}{" "}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt ?? ""
                )}
              />
            </Container>
            <Container className="bg-yellow-300/80  px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails
                visability={metersToKilometers(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1702949452),
                  "H:mm"
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702517657),
                  "H:mm"
                )}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
              />
            </Container>
            {/* right  */}
          </div>
        </section>

        {/* 7 Day Forcast */}
        <section className="flex w-full flex-col gap-4  ">
          <p className="text-2xl">Forcast (7 days)</p>
          {firstDataForEachDate.map((d, i) => (
            <ForecastWeatherDetail
              key={i}
              description={d?.weather[0].description ?? ""}
              weatehrIcon={d?.weather[0].icon ?? "01d"}
              date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
              day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
              feels_like={d?.main.feels_like ?? 0}
              temp={d?.main.temp ?? 0}
              temp_max={d?.main.temp_max ?? 0}
              temp_min={d?.main.temp_min ?? 0}
              airPressure={`${d?.main.pressure} hPa `}
              humidity={`${d?.main.humidity}% `}
              sunrise={format(
                fromUnixTime(data?.city.sunrise ?? 1702517657),
                "H:mm"
              )}
              sunset={format(
                fromUnixTime(data?.city.sunset ?? 1702517657),
                "H:mm"
              )}
              visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
              windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
            />
          ))}
        </section>
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

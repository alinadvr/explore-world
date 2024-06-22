import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { APIResponse, CityDetails } from "@/types";

import Error from "@/components/Error";

import "@/styles/city.scss";
import emptyImg from "@/public/empty.jpg";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default async function CityPage({
  params,
}: {
  params: { cityId: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/cities/${params.cityId}`,
  );

  const cityRes = (await res.json()) as APIResponse<CityDetails>;

  if (cityRes.isError) return <Error message={cityRes.message} />;

  const {
    name,
    population,
    region,
    country,
    image,
    latitude,
    longitude,
    timezone,
  } = cityRes.data;

  return (
    <main>
      <nav>
        <Link href="/">Home</Link>
        <Link href={`/?country=${country}`}>{country}</Link>
        <span>{name}</span>
      </nav>
      <h1 className="city-title">
        {name}, {country}
      </h1>
      <div className="city-image">
        <Image src={image ? image : emptyImg} alt={name} fill />
      </div>
      <p>
        Population: <span>{population}</span>
      </p>
      <p>
        Region: <span>{region}</span>
      </p>
      <p>
        Timezone: <span>{timezone}</span>
      </p>
      <p>
        Country: <span>{country}</span>
      </p>
      <Map latitude={latitude} longitude={longitude} />
    </main>
  );
}

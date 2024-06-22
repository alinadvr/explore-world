import Link from "next/link";
import Image from "next/image";

import { City } from "@/types";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

import emptyImg from "@/public/empty.jpg";

export default function CityCard({
  id,
  name,
  population,
  country,
  region,
  image,
}: City) {
  return (
    <div className="card">
      <div className="image">
        <Image
          src={image ? image : emptyImg}
          alt={name}
          fill
          quality={100}
          sizes="(max-width: 470px) 100vw, (max-width: 750px) 50vw, (max-width: 1000px) 33vw, 350px"
        />
      </div>
      <h2>{name}</h2>
      <p>
        <span className="description">Population: </span>
        {population}
      </p>
      <p>
        <span className="description">Country: </span>
        {country}
      </p>
      <p>
        <span className="description">Region: </span>
        {region}
      </p>
      <Link href={`/${id}`} className="learn-more-button">
        Learn More
        <ArrowRightIcon />
      </Link>
    </div>
  );
}

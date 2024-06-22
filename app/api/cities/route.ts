import { NextResponse } from "next/server";

import getSortParams from "@/utils/getSortParams";
import { APIResponse, CitiesResponse } from "@/types";

export async function GET(
  req: Request,
): Promise<NextResponse<APIResponse<CitiesResponse>>> {
  const params = getSortParams(req.url);

  if (params?.country) {
    try {
      const countriesRes = await fetch(
        `${process.env.GEODB_API}/countries?namePrefix=${params.country}`,
      );

      if (!countriesRes.ok)
        return NextResponse.json({
          isError: true,
          status: countriesRes.status,
          message: countriesRes.statusText,
        });

      const data = (await countriesRes.json()) as {
        data: { wikiDataId: string }[];
      };

      if (data.data.length === 0)
        return NextResponse.json({
          isError: true,
          status: 404,
          message: `Country ${params.country} not found`,
        });

      params.countryIds = data.data
        .flatMap(({ wikiDataId }) => wikiDataId)
        .join(",");
    } catch (error) {
      console.error(`ERROR WHILE GETTING COUNTRIES:\n`, error);
      return NextResponse.json({
        isError: true,
        status: 500,
        message: "Error happened on the server",
      });
    }
  }

  try {
    const citiesRes = await fetch(
      `${process.env.GEODB_API}/cities${
        params
          ? `?${Object.entries(params)
              .map(([key, value]) => `${key}=${value}`)
              .join("&")}`
          : ""
      }`,
    );

    if (!citiesRes.ok)
      return NextResponse.json({
        isError: true,
        status: citiesRes.status,
        message: citiesRes.statusText,
      });

    const cities = (await citiesRes.json()) as CitiesResponse;

    if (cities.metadata.totalCount === 0)
      return NextResponse.json({
        isError: true,
        status: 404,
        message: `Cities not found`,
      });

    for (let i = 0; i < cities.data.length; i++) {
      try {
        const imagesRes = await fetch(
          `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${cities.data[i].name}`,
        );

        const data = (await imagesRes.json()) as {
          total: number;
          results: { urls: { raw } }[];
        };
        if (data.total > 0 && data.results[0].urls.raw)
          cities.data[i].image = data.results[0].urls.raw;
      } catch (error) {
        console.error("ERROR WHILE GETTING CITIES IMAGES:\n", error);
      }
    }

    return NextResponse.json({
      isError: false,
      data: cities,
    });
  } catch (error) {
    console.error(`ERROR WHILE GETTING CITIES:\n`, error);
    return NextResponse.json({
      isError: true,
      status: 500,
      message: "Error happened on the server",
    });
  }
}

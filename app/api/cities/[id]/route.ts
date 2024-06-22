import { NextResponse } from "next/server";

import { APIResponse, City } from "@/types";

export async function GET(
  req: Request,
): Promise<NextResponse<APIResponse<City>>> {
  console.log("get city");
  const cityId = new URL(decodeURI(req.url)).pathname.split("/")[3];

  try {
    const cityRes = await fetch(`${process.env.GEODB_API}/cities${cityId}`);

    if (!cityRes.ok)
      return NextResponse.json({
        isError: true,
        status: cityRes.status,
        message: cityRes.statusText,
      });

    const city = (await cityRes.json()) as City;

    console.log("city", city);

    try {
      const imagesRes = await fetch(
        `https://api.unsplash.com/search/photos?client_id=_GD90UlwSnAcZxRRBY-m66ngE2A2d5fYUtYUDxxZQFE&query=${city.name}`,
      );

      const data = (await imagesRes.json()) as {
        results: { urls: { raw } }[];
      };
      console.log("image", data.results[0]);
      if (data.results[0].urls.raw) city.image = data.results[0].urls.raw;
    } catch (error) {
      console.error("ERROR WHILE GETTING CITIES IMAGES:\n", error);
    }

    return NextResponse.json({
      isError: false,
      data: city,
    });
  } catch (error) {
    console.error(`ERROR WHILE GETTING CITY ${cityId}:\n`, error);
    return NextResponse.json({
      isError: true,
      status: 500,
      message: "Error happened on the server",
    });
  }
}

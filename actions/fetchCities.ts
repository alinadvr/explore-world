import { APIResponse, CitiesResponse, SortParams } from "@/types";

export default async function fetchCities(
  params?: SortParams,
): Promise<APIResponse<CitiesResponse>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/cities${
      params
        ? `?${Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")}`
        : ""
    }`,
  );

  return await res.json();
}

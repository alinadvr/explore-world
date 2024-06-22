import { SortParams } from "@/types";

export const CITIES_PER_PAGE = 6;

export default function getSortParams(url: string): SortParams {
  const searchParams = new URL(decodeURI(url)).searchParams;

  const offsetParam = parseInt(searchParams.get("offset") ?? "");
  const offset = !isNaN(offsetParam) ? offsetParam : undefined;
  const limitParam = parseInt(searchParams.get("limit") ?? "");
  const limit = !isNaN(limitParam) ? limitParam : CITIES_PER_PAGE;
  const namePrefix = searchParams.get("namePrefix");
  const country = searchParams.get("country");
  const minPopulationParam = parseInt(searchParams.get("minPopulation") ?? "");
  const minPopulation = !isNaN(minPopulationParam)
    ? minPopulationParam
    : undefined;
  const maxPopulationParam = parseInt(searchParams.get("maxPopulation") ?? "");
  const maxPopulation = !isNaN(maxPopulationParam)
    ? maxPopulationParam
    : undefined;
  const sortParam = searchParams.get("sort") ?? "";
  const sort =
    sortParam === "+population" || sortParam === "-population"
      ? sortParam
      : undefined;

  return {
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(sort && { sort }),
    ...(namePrefix && { namePrefix }),
    ...(country && { country }),
    ...(minPopulation && { minPopulation }),
    ...(maxPopulation && { maxPopulation }),
  };
}

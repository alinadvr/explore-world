export type City = {
  id: number;
  type: "CITY";
  placeType: "CITY";
  wikiDataId: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
  distance: number | null;
  image?: string;
};

export type CityDetails = {
  elevationMeters: number;
  timezone: string;
  deleted: boolean;
} & City;

export type CitiesResponse = {
  links: (Record<"rel", "first" | "prev" | "next" | "last"> &
    Record<"href", string>)[];
  data: City[];
  metadata: { currentOffset: number; totalCount: number };
};

export type APIResponse<T> =
  | {
      isError: true;
      message: string;
      status: number;
    }
  | { isError: false; data: T };

export type SortParams = {
  offset?: number;
  namePrefix?: string;
  country?: string;
  countryIds?: string;
  minPopulation?: number;
  maxPopulation?: number;
  sort?: "+population" | "-population";
};

export const isFilter = (str: string): str is keyof SortParams => {
  return (
    str === "offset" ||
    str === "namePrefix" ||
    str === "country" ||
    str === "countryIds" ||
    str === "minPopulation" ||
    str === "maxPopulation" ||
    str === "sort"
  );
};

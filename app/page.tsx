import fetchCities from "@/actions/fetchCities";
import { CITIES_PER_PAGE } from "@/utils/getSortParams";
import { SortParams } from "@/types";

import Header from "@/components/Header";
import CitiesList from "@/components/CitiesList";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import FiltersContextProvider from "@/components/FiltersContext";

import "@/styles/home.scss";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page?: string;
    namePrefix?: string;
    country?: string;
    sort?: string;
  };
}) {
  const page = !isNaN(Number(searchParams.page))
    ? Number(searchParams.page)
    : 1;
  const citiesRes = await fetchCities({
    offset: (page - 1) * CITIES_PER_PAGE,
    ...(searchParams as SortParams),
  });

  return (
    <FiltersContextProvider>
      <Header />
      <ReactQueryProvider>
        <main className="container">
          <CitiesList citiesInit={citiesRes} />
        </main>
      </ReactQueryProvider>
    </FiltersContextProvider>
  );
}

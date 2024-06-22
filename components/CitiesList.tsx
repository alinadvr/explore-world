"use client";

import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import fetchCities from "@/actions/fetchCities";
import { APIResponse, CitiesResponse } from "@/types";
import { FiltersContext } from "@/components/FiltersContext";

import CityCard from "@/components/CityCard";
import Pagination from "@/components/Pagination";
import Error from "@/components/Error";
import { CITIES_PER_PAGE } from "@/utils/getSortParams";
import CityCardSkeleton from "@/components/CityCardSkeleton";

export default function CitiesList({
  citiesInit,
}: {
  citiesInit: APIResponse<CitiesResponse>;
}) {
  const { filters, updateFilters } = useContext(FiltersContext);

  const { data: citiesRes, isLoading } = useQuery({
    queryKey: ["cities", ...Object.entries(filters)],
    queryFn: () => fetchCities(filters),
    enabled: Object.keys(filters).length > 0,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <>
      {Object.keys(filters).length === 0 ? (
        citiesInit.isError ? (
          <Error message={citiesInit.message} />
        ) : (
          <div className="cards-list">
            {citiesInit.data.data.map((city) => (
              <CityCard key={city.id} {...city} />
            ))}
          </div>
        )
      ) : isLoading ? (
        <div className="cards-list">
          {Array(CITIES_PER_PAGE)
            .fill(null)
            .map((_, i) => (
              <CityCardSkeleton key={i} />
            ))}
        </div>
      ) : (
        citiesRes &&
        (citiesRes.isError ? (
          <Error message={citiesRes.message} />
        ) : (
          <div className="cards-list">
            {citiesRes.data.data.map((city) => (
              <CityCard key={city.id} {...city} />
            ))}
          </div>
        ))
      )}
      {(citiesRes
        ? !citiesRes.isError && citiesRes.data.metadata.totalCount > 0
        : !citiesInit.isError && citiesInit.data.metadata.totalCount > 0) && (
        <Pagination
          currentPage={
            (filters?.offset
              ? filters.offset / CITIES_PER_PAGE
              : !citiesInit.isError
                ? citiesInit.data.metadata.currentOffset / CITIES_PER_PAGE
                : 0) + 1
          }
          updatePage={(page) =>
            updateFilters("offset", ((page - 1) * CITIES_PER_PAGE).toString())
          }
          lastPage={
            citiesRes && !citiesRes.isError
              ? Math.ceil(citiesRes.data.metadata.totalCount / CITIES_PER_PAGE)
              : !citiesInit.isError
                ? Math.ceil(
                    citiesInit.data.metadata.totalCount / CITIES_PER_PAGE,
                  )
                : 0
          }
        />
      )}
    </>
  );
}

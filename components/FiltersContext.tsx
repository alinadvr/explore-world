"use client";

import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

import { isFilter, SortParams } from "@/types";

export const FiltersContext = createContext<{
  filters: SortParams;
  updateFilters: (filter: keyof SortParams, value?: string) => void;
  clearFilters: () => void;
}>({
  filters: {},
  updateFilters: (filter, value) =>
    console.info(`filter ${filter}, value ${value}`),
  clearFilters: () => console.info("filters cleared"),
});

export default function FiltersContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<SortParams>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    [...params.entries()].forEach(
      ([filter, value]) =>
        isFilter(filter) && updateFilters(filter, value.toString()),
    );
  }, []);

  const updateFilters = (filter: keyof SortParams, value?: string | number) => {
    setFilters((prevState) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(filter);
      window.history.replaceState(null, "", `?${params.toString()}`);

      if (value !== undefined) {
        params.set(filter, value.toString());
        console.log("params to string", params.toString());
        window.history.replaceState(null, "", `?${params.toString()}`);
        return { ...prevState, [filter]: value };
      }

      const prevStateCopy = { ...prevState };
      delete prevStateCopy[filter];
      return prevStateCopy;
    });
  };

  const clearFilters = () => setFilters({});

  return (
    <FiltersContext.Provider value={{ filters, updateFilters, clearFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

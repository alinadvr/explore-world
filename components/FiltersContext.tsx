"use client";

import { createContext, ReactNode, useState } from "react";

import { SortParams } from "@/utils/getURLParams";

const Context = createContext<{
  filters: SortParams;
  updateFilters: (filter: string, value?: string) => void;
}>({
  filters: {},
  updateFilters: (filter, value) =>
    console.log(`filter ${filter}, value ${value}`),
});

export default function FiltersContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<SortParams>({});

  const updateFilters = (filter: keyof SortParams, value?: string | number) => {
    setFilters((prevState) => {
      if (value !== undefined) return { ...prevState, [filter]: value };

      const prevStateCopy = { ...prevState };
      delete prevStateCopy[filter];
      return prevStateCopy;
    });
  };

  return (
    <Context.Provider value={{ filters, updateFilters }}>
      {children}
    </Context.Provider>
  );
}

"use client";

import Link from "next/link";

import { useContext, useEffect } from "react";

import Search from "@/components/Search";
import CustomSelect from "@/components/CustomSelect";
import { FiltersContext } from "@/components/FiltersContext";
import CustomInput from "@/components/CustomInput";
import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "next/navigation";
import { isFilter } from "@/types";

const SORT_BY = [
  { title: "Population (high to low)", value: "-population" },
  { title: "Population (low to high)", value: "+population" },
] as const;

export default function Header() {
  const { filters, updateFilters, clearFilters } = useContext(FiltersContext);
  const debounceFn = useDebounce();

  return (
    <header>
      <h1 className="title">
        <Link href="/">Explore The World</Link>
      </h1>
      <p className="title-description">
        Discover, Interact, and Explore Cities Across the Globe Just in Your
        Device!
      </p>
      <Search
        defaultValue={filters?.namePrefix}
        onChange={(value) => {
          updateFilters("offset", undefined);
          updateFilters("namePrefix", value);
        }}
      />
      <div className="filters">
        <div className="sort">
          <span>Sort by:</span>
          <CustomSelect
            selected={SORT_BY.find(({ value }) => value === filters?.sort)}
            options={SORT_BY}
            onChange={(value) =>
              updateFilters("sort", value ? value?.toString() : undefined)
            }
          />
        </div>
        <CustomInput
          defaultValue={filters?.country}
          onChange={(value) => {
            debounceFn(() => {
              updateFilters("offset", undefined);
              updateFilters("country", value);
            });
          }}
          placeholder="Search by country name"
        />
        <button
          className="btn-clear"
          onClick={clearFilters}
          disabled={Object.keys(filters).length === 0}
        >
          Clear all filters
        </button>
      </div>
    </header>
  );
}

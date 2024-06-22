import useDebounce from "@/hooks/useDebounce";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Search({
  onChange,
  defaultValue,
}: {
  onChange: (value: string | undefined) => void;
  defaultValue?: string;
}) {
  const debounceFn = useDebounce();

  return (
    <div className="search">
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          placeholder="Search by city name"
          defaultValue={defaultValue}
          onChange={(e) =>
            debounceFn(() =>
              onChange(e.target.value !== "" ? e.target.value : undefined),
            )
          }
        />
        <MagnifyingGlassIcon />
      </label>
    </div>
  );
}

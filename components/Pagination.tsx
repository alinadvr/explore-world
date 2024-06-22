import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import classNames from "@/utils/classNames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function PaginationItem({
  page,
  currentPage,
  updatePage,
}: {
  page: number;
  currentPage: number;
  updatePage: (value: number) => void;
}) {
  return (
    <li
      onClick={() => updatePage(page)}
      className={classNames(
        "cursor-pointer rounded-full px-3 py-1",
        currentPage === page ? "bg-secondary-500 text-white" : "",
      )}
    >
      {page}
    </li>
  );
}

export default function Pagination({
  currentPage,
  updatePage,
  lastPage = 1,
}: {
  currentPage: number;
  updatePage: (page: number) => void;
  lastPage?: number;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage !== 1) params.set("page", currentPage.toString());
    else params.delete("page");
    window.history.pushState(null, "", `?${params.toString()}`);
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (lastPage === 1) return null;

  const visiblePages = Array.from(
    { length: lastPage > 3 ? 3 : lastPage },
    (_, i) =>
      (currentPage - 1 <= 1
        ? 1
        : currentPage + 1 >= lastPage
          ? lastPage - 2
          : currentPage - 1) + i,
  );

  return (
    <ul className="mx-auto flex w-fit items-center text-black">
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => currentPage !== 1 && updatePage(currentPage - 1)}
          className="mr-2 rounded-full border border-secondary-500 p-1.5 text-secondary-500 transition-colors duration-300 enabled:hover:bg-secondary-50 disabled:opacity-50"
        >
          <ChevronLeftIcon className="w-4" />
        </button>
      </li>
      {lastPage > 3 && currentPage > 2 && (
        <>
          <PaginationItem
            page={1}
            currentPage={currentPage}
            updatePage={updatePage}
          />
          {lastPage !== 4 && currentPage - 2 > 1 && (
            <span className="px-2">...</span>
          )}
        </>
      )}
      {visiblePages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          currentPage={currentPage}
          updatePage={updatePage}
        />
      ))}
      {lastPage > 3 && currentPage < lastPage - 1 && (
        <>
          {lastPage !== 4 && currentPage < lastPage - 2 && (
            <span className="px-2">...</span>
          )}
          <PaginationItem
            page={lastPage}
            currentPage={currentPage}
            updatePage={updatePage}
          />
        </>
      )}
      <li>
        <button
          disabled={currentPage >= lastPage}
          onClick={() => currentPage < lastPage && updatePage(currentPage + 1)}
          className="ml-2 rounded-full border border-secondary-500 p-1.5 text-secondary-500 transition-colors duration-300 enabled:hover:bg-secondary-50 disabled:opacity-50"
        >
          <ChevronRightIcon className="w-4" />
        </button>
      </li>
    </ul>
  );
}

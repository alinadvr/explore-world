import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

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
      className={"pagination-item" + (currentPage === page ? " active" : "")}
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
    <ul className="pagination">
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => currentPage !== 1 && updatePage(currentPage - 1)}
          className="btn prev"
        >
          <ChevronLeftIcon />
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
            <span className="divider">...</span>
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
            <span className="divider">...</span>
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
          className="btn next"
        >
          <ChevronRightIcon />
        </button>
      </li>
    </ul>
  );
}

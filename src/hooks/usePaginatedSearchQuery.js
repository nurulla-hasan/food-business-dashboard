import { useState } from "react";
import useDebounce from "./usedebounce";

export default function usePaginatedSearchQuery(queryHook,{ limit = 10, debounceMs = 600, resultsKey = "results" } = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, debounceMs, setCurrentPage);

  const { data, isLoading, isError } = queryHook({
    page: currentPage,
    limit,
    searchTerm: debouncedSearch,
  });

  const rawResults = data?.data?.[resultsKey];
  const items = Array.isArray(rawResults) ? rawResults : [];
  const totalPages = data?.data?.pagination?.totalPage || 1;
  const page = data?.data?.pagination?.page || 1;

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    items,
    totalPages,
    page,
    isLoading,
    isError,
  };
}
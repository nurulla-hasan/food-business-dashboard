import { useState, useEffect } from "react";

const useDebounce = (value, delay = 400, setCurrentPage) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    setCurrentPage(1);
    return () => clearTimeout(id);
  }, [value, delay, setCurrentPage]);
  return debounced;
}

export default useDebounce
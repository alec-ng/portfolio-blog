import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const queryString = require("query-string");

/**
 * Key value pairing of location search url params
 */
export default function useFilters() {
  const [filters, setFilters] = useState({});
  const location = useLocation();

  useEffect(() => {
    setFilters(queryString.parse(location.search));
  }, [location]);

  return filters;
}

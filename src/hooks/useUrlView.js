import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { APP_VIEW, VIEW_PATHS } from "../util/constants";

/**
 * Returns the current blog view depending on URL structure
 */
export default function useUrlView() {
  const [view, setView] = useState();
  const location = useLocation();

  useEffect(() => {
    const [, blogPath, urlCollection, viewVar] = location.pathname.split("/");
    const minimalPath = [, blogPath, urlCollection, viewVar].join("/");
    setView(minimalPath === VIEW_PATHS.map ? APP_VIEW.map : APP_VIEW.post);
  }, [location]);

  return view;
}

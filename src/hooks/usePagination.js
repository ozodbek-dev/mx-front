import { useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import qs from "qs";

const usePagination = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const changePage = useCallback(
    (page = 1) => {
      setSearchParams({ ...qs.parse(search.slice(1)), page });
    },
    [setSearchParams, search]
  );

  const page = +searchparams.get("page");
  return { changePage, page: page ? page : 1 };
};

export default usePagination;

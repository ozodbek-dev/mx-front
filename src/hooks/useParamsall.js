import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useParamsall = (parametrs = []) => {
  const [query, setQuery] = useState(null);
  const [searchparams, setSearchParams] = useSearchParams();
  useEffect(() => {
    parametrs?.forEach((el) => {
      if (searchparams.get(`${el}`)) {
        return setQuery((prev) => ({
          ...prev,
          [el]: searchparams.get(`${el}`),
        }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeParams = (e = 0, name = "") => {
    setSearchParams({ ...query, [name]: e });
    setQuery({ ...query, [name]: e });
  };
  return { query, change: changeParams };
};

export default useParamsall;

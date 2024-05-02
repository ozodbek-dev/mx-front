import { useEffect, useState } from "react";
import { request } from "../api/request";

const useGet = ({
  url,
  config = {},
  onSuccess = () => {},
  onError = () => {},
  initialState = [],
  enabled = true,
  filter = (data) => data,
  api = request,
  extraToken = localStorage.getItem("token"),
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(initialState ? initialState : []);
  const getData = () => {
    const token = extraToken;
    setIsLoading(true);
    api
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...config,
        },
      })
      .then((res) => {
        setIsLoading(false);
        onSuccess(res);
        setData(filter(res.data));
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsLoading(false);
        onError(err);
        setError(err);
      });
  };

  useEffect(() => {
    if (enabled) {
      getData();
    }
  }, [url, enabled]);

  return { isLoading, isSuccess, error, data, refetch: getData };
};

export default useGet;

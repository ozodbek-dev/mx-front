import { useState } from "react";
import { request } from "../api/request";

const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const mutate = ({
    url,
    data = {},
    config = {},
    method = "post",
    onSuccess = () => {},
    onError = () => {},
    extraToken = localStorage.getItem("token"),
    api = request,
  }) => {
    const token = extraToken;
    setIsLoading(true);
    api[method](url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...config,
      },
    })
      .then((res) => {
        setIsLoading(false);
        onSuccess(res);
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsLoading(false);
        onError(err);
        setError(err);
      });
  };

  return { isLoading, isSuccess, error, mutate };
};

export default usePost;

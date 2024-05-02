import { useState, useEffect } from "react";
import axios from "axios";

const useInfinityScroll = ({ url, search = "" }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}?page=${page}&search=${search}`);
      const newData = response.data;
      if (!search) {
        setData((prevData) => [...prevData, ...newData.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setPage(1);
        setData(newData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [search]);

  return { data, loading, handleClick };
};

export default useInfinityScroll;

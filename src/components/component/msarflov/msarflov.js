import { Contextvalue } from "context/context";
import useGet from "hooks/useGet";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Applicationdetail from "./components/applicationdetail";

const Msarflov = () => {
  const { id, type } = useParams();
  const { setCountapplications } = useContext(Contextvalue);
  const baseUrl = type === "com" ? "/ariza/moh/" : "/ariza/moh/yaratish/";
  const {
    data: { data },
  } = useGet({
    url: baseUrl + `?filter[id]=${id}`,
    enabled: id,
    onSuccess: (res) => {
      if (res.data.data !== "O'qildi") {
        setCountapplications(true);
        setTimeout(() => setCountapplications(false), 1000);
      }
    },
  });
  return (
    <>
      <Applicationdetail person={data ? data[0] : null} type={type} />
    </>
  );
};

export default Msarflov;

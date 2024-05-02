import Loading from "components/loading/loading.js";
import useGet from "hooks/useGet.js";
import {useParams, useSearchParams} from "react-router-dom";
import Freemessagedetail from "./components/freemessagedetail.js";

function Mohbilerkin() {
  const { id, name } = useParams();
  const [searchparams] = useSearchParams();
  const value1 = searchparams.get("value1");
  const url =
    +value1 === 0 ? "/bildirishnoma/erkin/MOHga/" : "/bildirishnoma/moh/erkin/";
  const {
    data: { data },
    isLoading,
  } = useGet({
    url: url + `?filter[id]=${id}&filter[qabul_qiluvchi]=${name}`,
    enabled: id,
    name,
    value1,
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <Freemessagedetail data={data ? data[0] : null} />
    </>
  );
}
export default Mohbilerkin;

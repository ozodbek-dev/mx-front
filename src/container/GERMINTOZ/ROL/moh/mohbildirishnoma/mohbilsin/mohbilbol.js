import useGet from "hooks/useGet.js";
import {useParams, useSearchParams} from "react-router-dom";
import Childrensmessagedetail from "./components/childerensmessagedetail.js";

function Mohbilbol() {
  const { id } = useParams();

  const [searchparams] = useSearchParams();
  const value1 = searchparams.get("value1");
  const baseUrl =
    value1 === "0"
      ? "/bildirishnoma/respublikaga/"
      : "/bildirishnoma/respublika/";
  const {
    data: { data },
  } = useGet({
    url: baseUrl + `?filter[id]=${id}`,
    enabled: id,
  });
  return (
    <>
      <Childrensmessagedetail person={data ? data[0] : null} />
    </>
  );
}
export default Mohbilbol;

import useGet from "hooks/useGet.js";
import {useParams, useSearchParams} from "react-router-dom";
import Loading from "../../../../../../components/loading/loading.js";
import Childrenmessagedetail from "./components/childrenmessagedetail.js";

function Uzbilbol() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const name = searchParams.get("name");
  const {
    data: { data },
    isLoading,
  } = useGet({
    url: `/bildirishnoma/uzmedimpeks/?filter[id]=${id}`,
    enabled: id,
  });
  const {
    data: { data: freemessageData },
  } = useGet({
    url: `/bildirishnoma/erkin/UzMedImpeksdanVSSBga/?filter[id]=${id}&filter[qabul_qiluvchi]=${name}`,
    enabled: id,
    name,
  });
  if (isLoading) return <Loading />;
  return name ? (
    <Childrenmessagedetail
      person={freemessageData ? freemessageData[0] : null}
      id={id}
      name={name}
    />
  ) : (
    <Childrenmessagedetail person={data ? data[0] : null} id={id} />
  );
}
export default Uzbilbol;

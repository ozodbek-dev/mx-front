import useGet from "hooks/useGet.js";
import { useParams } from "react-router-dom";
import Loading from "../../../../../../components/loading/loading.js";
import Applicationdetail from "./components/applicationsdetail";

function Uzarizasin() {
  const { id } = useParams();
  const {
    data: { data },
    isLoading,
  } = useGet({
    url: `/ariza/uzmedimpeks/?filter[id]=${id}`,
    enabled: id,
  });

  if (isLoading) return <Loading />;
  return <Applicationdetail data={data ? data[0] : null} />;
}
export default Uzarizasin;

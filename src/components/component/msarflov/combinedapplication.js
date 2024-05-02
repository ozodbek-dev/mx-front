import useGet from "hooks/useGet";
import { useParams } from "react-router-dom";
import Combinedapplicationsdetail from "./components/combinedapplicationsdetail";

const Combinedapplication = () => {
  const { id } = useParams();
  const {
    data: { data },
  } = useGet({
    url: `ariza/moh/birlashtirish/?filter[id]=${id}`,
    enabled: id,
  });

  return (
    <>
      <Combinedapplicationsdetail person={data ? data[0] : null} />
    </>
  );
};

export default Combinedapplication;

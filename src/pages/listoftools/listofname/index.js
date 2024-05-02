import useGet from "hooks/useGet";
import { useParams } from "react-router-dom";
import Listoftoolsmodal from "../components/listoftoolsmodal";
import Listoftoolstable from "../components/listoftoolstable";

function Listofname() {
  const { id } = useParams();
  const baseUrl = `/vosita_nomi/${id}/`;
  const { data, refetch } = useGet({ url: baseUrl });
  return (
    <>
      <Listoftoolsmodal
        id={id}
        baseUrl={baseUrl}
        name={false}
        refetch={refetch}
      />
      <Listoftoolstable
        name={false}
        baseUrl={"/vosita_nomi/"}
        data={data}
        refetch={refetch}
      />
    </>
  );
}
export default Listofname;

import Loading from "components/loading/loading";
import useGet from "hooks/useGet";
import Listoftoolsmodal from "./components/listoftoolsmodal";
import Listoftoolstable from "./components/listoftoolstable";

function Listoftools() {
  const baseUrl = "/vosita_turi/";
  const { data, isLoading, refetch } = useGet({ url: baseUrl });

  if (isLoading) return <Loading />;
  return (
    <>
      <Listoftoolsmodal baseUrl={baseUrl} refetch={refetch} name={true} />
      <Listoftoolstable
        baseUrl={baseUrl}
        data={data}
        name={true}
        refetch={refetch}
      />
    </>
  );
}
export default Listoftools;

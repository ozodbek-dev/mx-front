import Loading from "components/loading/loading";
import useGet from "hooks/useGet";
import { useParams } from "react-router-dom";
import ArchiveList from "./components";
import "./singlebemor.scss";
const SingleArxiv = () => {
  const { id } = useParams();
  const {
    data: { bolalar },
    isLoading,
  } = useGet({
    url: `/muassasa/arxiv/?filter[id]=${id}`,
  });
  if (isLoading) return <Loading />;
  return (
    <div>
      <ArchiveList person={bolalar?.find((el) => +el?.id === +id)} />
    </div>
  );
};

export default SingleArxiv;

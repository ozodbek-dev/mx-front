import useGet from "hooks/useGet";
import { useParams } from "react-router-dom";
import Orderdetail from "./components/orderdetail";

function Withinorders() {
  const { id } = useParams();
  const { data } = useGet({
    url: "/omborxona/buyurtma/yaratish",
  });

  return (
    <Orderdetail data={data?.data?.find((el) => +el?.buyurtma?.id === +id)} />
  );
}
export default Withinorders;

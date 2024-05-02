import { Button } from "antd";
import { requestIMMUNO } from "api/request";
import useDebounce from "hooks/useDebounce";
import useInfiniteScroll from "hooks/useInfinityScrool";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import ListHeader from "./listHeader";
import OutputCard from "./outputCard";
const List = ({ query, change }) => {
  const { t } = useTranslation();
  const debounceValue = useDebounce(get(query, "search", ""), 600);
  const { loading, data, handleClick } = useInfiniteScroll({
    url: `http://128.199.113.181/api/storehouse/list/expense/uzmedimpeks`,
    search: debounceValue,
  });
  return (
    <div className="bg-[#FFF] w-[49%] rounded-[12px] p-[28px]">
      <ListHeader change={change} query={query} />
      <div className="mt-[16px] h-[900px] overflow-y-auto">
        <OutputCard data={data} />
        {loading && <p>Loading...</p>}
        <Button onClick={handleClick}>{t("Yana")}</Button>
      </div>
    </div>
  );
};
export default List;

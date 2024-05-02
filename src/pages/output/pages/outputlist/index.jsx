import useParamsall from "hooks/useParamsall";
import { Details, List, OutputHeader } from "./components";
const OutputList = () => {
  const { query, change } = useParamsall(["tab", "search", "date"]);
  return (
    <div className="p-[20px]">
      <OutputHeader change={change} query={query} />
      <div className="mt-[28px] flex  justify-between ">
        <List query={query} change={change} />
        <Details />
      </div>
    </div>
  );
};
export default OutputList;

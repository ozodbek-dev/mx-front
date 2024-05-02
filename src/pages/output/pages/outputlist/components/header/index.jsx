import { Button, Input } from "antd";
import { requestIMMUNO } from "api/request";
import Output from "assets/icon/Output";
import TextIcon from "assets/icon/TextIcon";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import OpenModal from "./modal";
const { Search } = Input;

const OutputHeader = ({ change, query }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data } = useGet({
    url: `/storehouse/detail/expense/uzmedimpeks/${get(query, "tab", 0)}`,
    api: requestIMMUNO,
    enabled: get(query, "tab", 0),
  });

  return (
    <div className="flex items-center justify-between">
      <OpenModal open={open} setOpen={setOpen} />
      <div className="flex items-center">
        <h1 className="text-[24px] leading-[32px] text-[#111] font-normal ml-[40px]">
          {t("Chiqim ro'yxati")}
        </h1>
        <Search
          className="ml-[40px]"
          placeholder="Qidirish..."
          onChange={(e) => change(e.target.value, "search")}
          value={get(query, "search", "")}
          style={{ width: 200 }}
        />
      </div>
      <div className="flex items-center">
        <Button
          className="flex items-center mr-[16px] bg-[#F69641] h-[40px] rounded-[12px] hover:!text-[#FFF] hover:!bg-[#F69641] border-[#F69641] hover:!bg-[#F69641 text-[#FFF] text-[16px] font-semibold leading-[24px]"
          onClick={() => setOpen(true)}
          icon={
            <Output
              className="[&_path]:fill-[#FFFFFF]"
              width={20}
              height={20}
            />
          }
        >
          {"Chiqim qilish"}
        </Button>
        <Button
          size="large"
          // disabled={!data.length}
          className="bg-[#0EC562]   text-white capitalize !rounded  -[12px] flex justify-center align-center w-min hover:!text-gray-50 border-none  hover:!bg-[#0EC562] [&_path]:fill-[white] !px-0"
        >
          <CSVLink
            className="w-full h-full flex items-center   gap-3 px-3"
            filename={`ts.csv`}
            data={[data]}
          >
            <TextIcon />
            <span>{t("Excelga yuklab olish")}</span>
          </CSVLink>
        </Button>
      </div>
    </div>
  );
};
export default OutputHeader;

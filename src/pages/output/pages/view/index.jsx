import { Button } from "antd";
import { requestIMMUNO } from "api/request";
import BackArrowIcon from "assets/icon/BackArrowIcon";
import ClearIcon from "assets/icon/ClearIcon";
import ReadIcon from "assets/icon/ReadIcon";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import RightMenu from "../components/rightMenu";
import Files from "./components/Files";
import PdfFile from "./components/PdfDownload";
import RecommendDrugs from "./components/RecommendDrugs";
import Status from "./components/Status";
import WhereOutPut from "./components/WhereOutPut";

const OutPutView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = useGet({
    url: `/storehouse/detail/expense/uzmedimpeks/${id}`,
    api: requestIMMUNO,
  });

  console.log("🚀 ~ OutPutView ~ data:", data);
  return (
    <div className="p-20">
      <div className="flex items-center  justify-between">
        <div className="flex items-center gap-[2rem]">
          <Button
            onClick={() => window.history.back()}
            type="primary"
            className="flex items-center bg-[#DDEBFB] hover:!bg-[#DDddFb] !text-[#1464C0] !rounded-[12px] h-[40px]"
            icon={<BackArrowIcon />}
          >
            {t("Ortga")}
          </Button>
          <h1 className="font-semibold text-[#111111] text-[24px] min-w-max">
            {t("Chiqim qilish")}
          </h1>
        </div>
        <PdfFile />
      </div>
      <main className="p-[24px] flex justify-center ">
        <div className="w-[790px]">
          <Status
            className={
              get(data, "storehouse_status", "") === "Rad qilindi"
                ? "text-[#E63943] border-[#F6B5B9]"
                : "text-[#0EC562] border-[#63EDA2]"
            }
            icon={
              get(data, "storehouse_status", "") === "Rad qilindi" ? (
                <ClearIcon />
              ) : (
                <ReadIcon />
              )
            }
            text={get(data, "storehouse_status", "-")}
          />
          <WhereOutPut data={data} />
          <RecommendDrugs data={get(data, "medicine_type", [])} />
          <Files data={get(data, "storehouse.file", [])} />
        </div>
        <RightMenu className={" top-[90px] w-[385px] h-[168px] ml-[20px]"} />
      </main>
    </div>
  );
};
export default OutPutView;

import { Button } from "antd";
import Output from "assets/icon/Output";
import ViewICon from "assets/icon/ViewIcon";
import dayjs from "dayjs";
import useParamsall from "hooks/useParamsall";
import useTab from "hooks/useTab";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const OutputCard = ({ data }) => {
  const { t } = useTranslation();
  const { change } = useParamsall(["tab", "search"]);
  return (
    <div>
      {data?.map((el) => {
        return (
          <div
            className={`border-[1px] hover:bg-[#F4F4F4] border-[#E1E1E1] rounded-[12px] w-[100%] flex justify-between mb-[16px] bg-[#F4F4F4]`}
            key={get(el, "storehouse.id")}
          >
            <div className="w-[120px] border-r-[1px] border-r-[#E1E1E1] flex items-center justify-center flex-col ">
              <Output />
              <p>
                {t("Jami")}:
                {get(el, "medicine_type[0].medicine[0].quantity", 0)}
              </p>
            </div>
            <div className="flex items-center justify-between w-[85%] flex-wrap px-[28px] py-[12px]">
              <h1 className="text-[20px] leading-[28px] font-normal">
                <span className="text-[16px] text-[#888888]">
                  {t("Kimga")}:
                </span>{" "}
                {get(el, "storehouse.institution", "")
                  ? get(el, "storehouse.institution.name", "-")
                  : get(el, "storehouse.region.name", "-")}
              </h1>
              <div className="flex items-center">
                <div className="mr-[24px] ">
                  <p className="text-[#4D4D4D] text-[16px] font-normal leading-[20px] ">
                    {dayjs(get(el, "storehouse.created_at", "-")).format(
                      "DD.MM.YYYY"
                    )}
                  </p>
                  <p className="text-[#888] text-[14px] font-normal leading-[20px] text-right">
                    {dayjs(get(el, "storehouse.created_at", "-")).format(
                      "hh:mm"
                    )}
                  </p>
                </div>
                <Button
                  className=" border-[1px]  border-[#63EDA2] blorder-solid bg-[#EFFFF6]"
                  onClick={() => change(get(el, "storehouse.id"), "tab")}
                  icon={<ViewICon />}
                />
              </div>
              <div className="flex items-center  w-[100%] flex-wrap border-t-[1px] border-t-[#E1E1E1]  gap-5 p-[12px] mt-[16px]">
                {get(el, "medicine_type", [])?.map((drugs, index) => {
                  return (
                    <p
                      className="text-[#F69641] tetx-[16px] font-medium leading-[20px] py-[8px] px-[16px] border-[1px] border-[#F6B5B9] rounded-[40px] flex-wrap "
                      key={index}
                    >
                      {get(drugs, "medicine_type.name_uz", "-")}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default OutputCard;

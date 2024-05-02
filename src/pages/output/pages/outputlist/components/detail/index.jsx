import { CloseOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { requestIMMUNO } from "api/request";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import DetailTable from "./table";
const Details = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searChParams] = useSearchParams();
  const tab = searChParams.get("tab");
  const { data } = useGet({
    url: `/storehouse/detail/expense/uzmedimpeks/${tab}`,
    api: requestIMMUNO,
  });
  return (
    <div
      className={`bg-[#FFF] w-[49%] h-[820px] rounded-[12px] p-[28px] ${
        !tab ? " flex items-center justify-center" : ""
      }`}
    >
      {tab ? (
        <>
          <div className="flex items-center justify-between mb-[16px]">
            <h1 className="text-[24px] font-medium leading-[32px] text-[#1464C0]">
              {get(data, "storehouse.region")
                ? t(get(data, "storehouse.region.name", "-"))
                : t(get(data, "storehouse.institution.name", "-"))}
            </h1>
            <Button
              onClick={() => navigate("")}
              className="flex items-center bg-[#DDEBFB] hover:!bg-[#DDddFb] !text-[#4D4D4D] border-[0px] !rounded-[12px] h-[40px]"
              icon={<CloseOutlined />}
            >
              {t("Yopish")}
            </Button>
          </div>
          <Tabs
            className="[&_.ant-tabs-nav-list]:justify-between [&_.ant-tabs-nav-list]:w-[100%] border-[#E1E1E1] border-[1px] px-24 h-[6%]"
            items={[{ key: "1", label: "Dorilar" }]}
          />
          <div
            className={`border-[#E1E1E1] border-[1px] border-t-[0px] rounded-b-[12px] overflow-y-scroll    `}
          >
            <DetailTable data={data} tab={tab} />
          </div>
        </>
      ) : (
        <p className="w-[364px] text-center">
          {t(
            "Bu yerda batafsil ma'lumotni ko'rishingiz mumkin, uning uchun kirim yoki chiqimlardan birini tanlang"
          )}
        </p>
      )}
    </div>
  );
};
export default Details;

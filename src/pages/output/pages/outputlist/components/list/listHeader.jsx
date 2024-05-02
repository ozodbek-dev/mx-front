import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const ListHeader = ({ change, query }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[24px] font-medium leading-[32px] text-[#1464C0]">
        {t("Ro'yxat")}
      </h1>
      <div className="flex items-center">
        <DatePicker
          onChange={(e) =>
            e === null
              ? change("", "date")
              : change(dayjs(e).format("YYYY-MM-DD"), "date")
          }
          value={get(query, "date", "") ? dayjs(get(query, "date", "")) : null}
          className="w-[260px] h-[40px]"
          placeholder={t("Sana bo'yicha qidirish")}
          format={"DD.MM.YYYY"}
        />
      </div>
    </div>
  );
};
export default ListHeader;

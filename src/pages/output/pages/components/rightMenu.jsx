import { useTranslation } from "react-i18next";

const RightMenu = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        "sticky top-0 bg-[#FFF] rounded-[12px] p-[12px] w-[100%] flex items-start flex-col " +
        className
      }
    >
      <a
        className={`${
          window.location.hash == "#where"
            ? "text-[#111] bg-[#F4F4F4] rounded-[6px]"
            : "text-[#4D4D4D]"
        } pl-[24px] py-[14px]  border-b-[#EFF2F5] border-b-[1px] w-[100%] text-[15px] leading-[20px] font-normal `}
        href="#where"
      >
        {t("Qayerga chiqim amalga oshiriladi")}
      </a>
      <a
        className={`${
          window.location.hash == "#drugs"
            ? "text-[#111] bg-[#F4F4F4] rounded-[6px]"
            : "text-[#4D4D4D]"
        } pl-[24px] py-[14px]  border-b-[#EFF2F5] border-b-[1px] w-[100%] text-[15px] leading-[20px] font-normal `}
        href="#drugs"
      >
        {t("Dorilar")}
      </a>
      <a
        className={`${
          window.location.hash == "#docs"
            ? "text-[#111] bg-[#F4F4F4] rounded-[6px]"
            : "text-[#4D4D4D]"
        } pl-[24px] py-[14px]  border-b-[#EFF2F5] border-b-[1px] w-[100%] text-[15px] leading-[20px] font-normal `}
        href="#docs"
      >
        {t("Fayl biriktirish")}
      </a>
    </div>
  );
};
export default RightMenu;

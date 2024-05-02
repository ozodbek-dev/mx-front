import DrugIcon from "assets/icon/DrugIcon";
import TrashIcon from "assets/icon/TrashIcon";
import ItemWrapper from "components/item-wrraper";
import { useTranslation } from "react-i18next";

function DrugComponentWrapper({
  children,
  onDelete = () => {},
  rootClassName,
}) {
  const { t } = useTranslation();
  return (
    <ItemWrapper
      title=""
      className="!bg-[#FBFBFB] p-0 px-2 py-2 border border-1 border-[#ccc] "
    >
      <div className="flex flex-col gap-[1rem]">
        <div
          className={
            "h-[59px] flex items-center justify-between bg-[#1876E2] text-[#fff] rounded-t-[8px] px-[1rem] " +
            rootClassName
          }
        >
          <span className="flex items-center text-[20px] leading-[28px] font-bold gap-[0.5rem]">
            <DrugIcon /> {t("Dori turi")}
          </span>
          <span className="flex cursor-pointer  items-center gap-[1rem] leading-[20px] text-[16px] font-[400]">
            {t("Dori turini o'chirish")}{" "}
            <TrashIcon
              onClick={onDelete}
              className="tranform transition-all active:scale-[1.1]"
              fill="#fff"
            />
          </span>
        </div>
        <div>{children}</div>
      </div>
    </ItemWrapper>
  );
}

export default DrugComponentWrapper;

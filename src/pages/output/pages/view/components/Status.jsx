import ItemWrapper from "components/item-wrraper";
import { useTranslation } from "react-i18next";

const Status = ({
  className = "",
  text = "",
  borderColor = "",
  textColor = "",
  icon,
}) => {
  const { t } = useTranslation();
  return (
    <ItemWrapper title="Chiqim statusi" className="mb-[20px]">
      <div
        className={
          `w-full py-[8px] px-4 flex justify-center items-center  rounded-[40px] bg-[#fff] border-solid tex-base font-semibold   border-[1px]  ` +
          className
        }
      >
        <span className="mr-2">{icon}</span>
        <p>{t(text)}</p>
      </div>
    </ItemWrapper>
  );
};
export default Status;

import TrashIcon from "assets/icon/TrashIcon";
import { useTranslation } from "react-i18next";

const FormWrapper = (props) => {
  const { t } = useTranslation();
  const {
    title,
    children,
    count,
    className,
    id,
    onClick,
    hasDelete = false,
  } = props;
  return (
    <div
      key={id}
      className={"w-[100%] border rounded border-[#E9E9E9] " + className}
    >
      {title && (
        <div className="flex justify-between items-center rounded-t-[4px] leading-[20px] border-x-[1px]  px-[16px]  py-[10px] bg-[#F4F4F4] ">
          <h1 className="text-[14px] flex items-center font-bold text-[#111111]">
            {count && (
              <p className="text-[14px] font-extrabold leading-[20px] text-[#FFF] bg-[#1876E2] rounded-[20px] w-[24px] h-[24px] flex items-center justify-center not-italic mr-[6px] ">
                {count}
              </p>
            )}
            {t(title)}
          </h1>
          {hasDelete && (
            <button onClick={onClick}>
              <TrashIcon fill="#E63943" />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default FormWrapper;

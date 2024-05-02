import { useTranslation } from "react-i18next";

const ItemWrapper = (prop) => {
  const { t } = useTranslation();
  const { title, children, className, id, extraTitle, extraComponent } = prop;

  return (
    <div id={id} className={`p-[28px] bg-[#FFF] rounded-[12px] ${className}`}>
      <div className="flex justify-between">
        {title && (
          <h1
            className={`text-[20px] font-semibold leading-[28px] text-[#1464C0] mb-[16px]`}
          >
            {t(title)}
          </h1>
        )}

        <div>
          {extraTitle && (
            <p className="text-[16px] font-normal leading-[20px] text-[#888]">
              {t(extraTitle)}
            </p>
          )}
          {extraComponent ? extraComponent : null}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default ItemWrapper;

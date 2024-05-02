import DownloadIcon from "assets/icon/DownLoadIcon";
import PdfFile from "assets/icon/PdfFIle";
import ItemWrapper from "components/item-wrraper";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const Files = ({ data }) => {
  console.log("🚀 ~ Files ~ data:", data);
  const { t } = useTranslation();
  return (
    <ItemWrapper
      id={"docs"}
      title="Biriktirilgan fayllar"
      className="mt-[20px]"
    >
      <div
        className={`flex items-center justify-between bg-[#F4F4F4] rounded-[4px] px-[12px] py-[8px] mb-[10px]  `}
      >
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <PdfFile />
            <span className="text-[#888888]">{"type"}</span>
          </div>
          <h1 className="ml-[16px] text-[16px not-italic font-normal leading-[20px] text-[#111] ">
            {t(get(data, "[0].file_name", "-"))}
          </h1>
        </div>
        <div className="flex items-center">
          <p className="mr-[16px] text-[16px] not-italic font-normal leading-[20px] text-[#4D4D4D] ">
            {t(get(data, "[0].extension", "-"))}
          </p>
          <a
            target="_blank"
            href={"https://sma.ssv.uz/api" + get(data, "[0].url", "-")}
            download={true}
          >
            <DownloadIcon />
          </a>
        </div>
      </div>
    </ItemWrapper>
  );
};
export default Files;

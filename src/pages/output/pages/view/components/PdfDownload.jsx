import { Button } from "antd";
import PdfICon from "assets/icon/PdfIcon";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PdfFile = ({ className = "", url = "", fileName = "" }) => {
  const { t } = useTranslation();
  const handleDownload = async () => {
    axios
      .get("http://128.199.113.181/api" + url, {
        responseType: "arraybuffer",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName ?? "pdf-file.pdf");
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Button
      className={`${className} flex items-center h-[40px] px-[16px] bg-[#1464C0] rounded-[12px] text-[16px] font-semibold leading-[24px] text-[#FFF]`}
      icon={<PdfICon />}
      onClick={() => handleDownload()}
    >
      {t("PDFga yuklab olish")}
    </Button>
  );
};
export default PdfFile;

import BasicTabs from "./muitab";
import {useTranslation} from "react-i18next";

const Royxat = () => {
  const { t } = useTranslation();
  return (
    <div className="royxatbox">
      <div className="tab_1">
        <div className="header_r">
          <h2>{t("Kirim va chiqim")}</h2>
        </div>
        <BasicTabs />
      </div>
    </div>
  );
};

export default Royxat;

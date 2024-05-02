import React, {useState} from "react";
import "./index.scss";
import OshpAdd from "./oshpAdd";
import {useTranslation} from "react-i18next";

const AddMonitor = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  return (
    
    <div className="monitor">
      {active ? (
        <div className="oshpadd">
          {" "}
          <OshpAdd setActive={setActive} active={active}/>
        </div>
      ) : ( 
        <div className="monitor__section">
          <div className="header__monitor">
            <div className="oshp__title">{t("pdf.oshp")} {t("input.monitor")}</div>
            <div className="button">
              <button className="addButton" onClick={() => setActive(true)}>
                + {t("pdf.oshp")} {t("bola.add")}
              </button>
              <button className="downoaldBtn">{t("bola.excel")}</button>
            </div>
          </div>
          <div className="section__monitor">
            <div className="title__nothing">
              <h3>Oilaviy shifokorlik punktlar qo’shilmagan</h3>
              <p>
                Bu yerda {t("pdf.oshp")} va ularning «{t("bildirishnoma.single.ortga")}» <br /> va «bolalar
                ro’yhati» monitoringi ko’rsatilinadi
              </p>
              <button className="addButton" onClick={() => setActive(true)}>+ {t("pdf.oshp")} {t("bola.add")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMonitor;

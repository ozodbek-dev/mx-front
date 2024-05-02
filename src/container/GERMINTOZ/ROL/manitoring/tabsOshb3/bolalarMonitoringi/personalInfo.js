import {get} from "lodash";
import React from "react";
import {useTranslation} from "react-i18next";

const PersonalInfo = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="inspections-box-person-info-content">
      <div className="grid grid-cols-2">
        <div className="f-bold">{t("Ismi")}</div>
        <div>{get(data, "ism")}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="f-bold">{t("Familiyasi")}</div>
        <div>{get(data, "familiya")}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="f-bold">{t("Jinsi")}</div>
        <div>{get(data, "jinsi")}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="f-bold">{t("Pasport seriyasi va raqami")}</div>
        <div>{get(data, "passport_seriya_va_raqami")}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="f-bold">{t("Telefon raqami")}</div>
        <div>{get(data, "tel_raqami")}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="f-bold">{t("Ro'yxatga olingan sana")}</div>
        <div>{get(data, "royxatga_olingan_sana")}</div>
      </div>
    </div>
  );
};

export default PersonalInfo;

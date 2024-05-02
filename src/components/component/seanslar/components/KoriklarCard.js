import React from "react";
import "./style.scss";
import { get } from "lodash";
import { t } from "i18next";
import { Button } from "@mui/material";

const KoriklarCard = (props) => {
  const { index, korik, handleClick } = props;
  return (
    <div className="examinations__item">
      <div className="examinations__item--header">
        <span className="examinations__item--number">
          #{index < 10 ? "0" + index : index} {t("ko'rik")}
        </span>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={handleClick}
        >
          {t("Batafsil")}
        </Button>
      </div>
      <div className="examinations__item--table">
        <div className="bordered">{t("Shifokor")}</div>
        <div className="bordered">
          {get(korik, "bola_shifokori.ismi")}{" "}
          {get(korik, "bola_shifokori.familiyasi")}
          {get(korik, "bola_shifokori.otasini_ismi")}
        </div>
        <div className="bordered">{t("Ko’rikdan o’tilgan sana")}</div>
        <div className="bordered">{get(korik, "created_at")}</div>
      </div>
    </div>
  );
};

export default KoriklarCard;

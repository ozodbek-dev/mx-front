import {TextField} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

const FromWhomAndToWhom = ({ bildirishnoma = {} }) => {
  const { t } = useTranslation();
  return (
    <div className="sarflov_block">
      <h4 className="sarflov_block_title">
        {t("bildirishnoma.new.kimdankimga")}
      </h4>
      <div className="sarflov_block_inner grid grid-cols-2">
        <div className="">
          <h5 className="sarflov_block_inner_div_title">
            {t("bildirishnoma.single.kimdan")}
          </h5>
          <TextField
            id="outlined-basic"
            disabled
            name="kimdan"
            label={bildirishnoma && bildirishnoma.kimdan}
            variant="outlined"
          />
        </div>
        <div className="">
          <h5 className="sarflov_block_inner_div_title">
            {t("bildirishnoma.send")}
          </h5>
          <TextField
            id="outlined-basic"
            label="Tuman Tibbiyot Birlashmasi"
            variant="outlined"
            name="kimga"
            required
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default FromWhomAndToWhom;

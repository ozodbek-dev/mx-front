import {Box, Modal} from "@mui/material";
import useGet from "hooks/useGet";
import {get} from "lodash";
import React from "react";
import {useTranslation} from "react-i18next";
import {customUrl} from "utils/urlswitcher";
import "./style.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "98%",
  bgcolor: "#fff",
  border: "2px solid #e7ebf2",
  boxShadow: 24,
  borderRadius: 3,
  overflow: "auto",
  pt: 1,
  px: 4,
  pb: 4,
};
const InstrumentStatistcsModal = ({ isOpen, handleClose = () => {}, url }) => {
  const { data } = useGet({ url: `/omborxona/vositalar/${customUrl()}${url}` });
  const chiqimlar = get(data, "shu_oy_chiqim", []);
  const kirimlar = get(data, "shu_oy_kirim", []);
  const { t } = useTranslation();
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <div>
          <div className="mb-40">
            <h1>{t("bildirishnoma.ki3")}</h1>
            {kirimlar.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 divide">
                  <div className="p-10">{t("Vosita nomi")}</div>
                  <div className="p-10">{t("vosita.vositaturi")}</div>
                  <div className="p-10">{t("vosita.miq")}</div>
                </div>
                {kirimlar.map((chiqim, index) => {
                  return (
                    <div className="grid grid-cols-3 divide" key={index}>
                      <div className="p-10">
                        {get(chiqim, "vosita_nomi.nomi")}
                      </div>
                      <div className="p-10">
                        {get(chiqim, "vosita_turi.nomi")}
                      </div>
                      <div className="p-10">
                        {get(chiqim, "vosita_miqdori")}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-1o">{t("input.mavjud")}</div>
            )}
          </div>
          <div>
            <h1>{t("bildirishnoma.ch3")}</h1>
            {chiqimlar.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 divide">
                  <div className="p-10">{t("Vosita nomi")}</div>
                  <div className="p-10">{t("vosita.vositaturi")}</div>
                  <div className="p-10">{t("vosita.miq")}</div>
                </div>
                {chiqimlar.map((chiqim, index) => {
                  return (
                    <div className="grid grid-cols-3 divide" key={index}>
                      <div className="p-10">
                        {get(chiqim, "vosita_nomi.nomi")}
                      </div>
                      <div className="p-10">
                        {get(chiqim, "vosita_turi.nomi")}
                      </div>
                      <div className="p-10">
                        {get(chiqim, "vosita_miqdori")}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-1o">{t("input.mavjud")}</div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default InstrumentStatistcsModal;

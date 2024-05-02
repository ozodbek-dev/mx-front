import React, {useState} from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {get} from "lodash";
import useGet from "hooks/useGet";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";

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

const DoctorExaminations = ({ id, isOpen, handleClose }) => {
  const { data, isLoading, isSuccess } = useGet({
    url: `korik/bola/malumotlari/${id}`,
    enabled: id ? true : false,
  });
  const [vositalar, setVositalar] = useState({
    korik: {},
    vositalar: [],
    show: false,
  });
  const examination = get(data, "koriklar_hammasi", []);
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={
          vositalar.show
            ? () => setVositalar({ ...vositalar, show: false })
            : handleClose
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="close-icon">
            <Button
              onClick={
                vositalar.show
                  ? () => setVositalar({ ...vositalar, show: false })
                  : handleClose
              }
            >
              {/* <CloseIcon /> */}
              {t("bildirishnoma.single.ortga")}
            </Button>
          </div>
          {vositalar.show ? (
            <div>
              <div className="doctor-examination-box-fields v-list">
                <div className="doctor-examination-box-fields-field v-list">
                  {t("vosita.vositaturi")}
                </div>
                <div className="doctor-examination-box-fields-field v-list">
                  {t("bildirishnoma.single.miqdori")}
                </div>
                <div className="doctor-examination-box-fields-field">
                  {t("input.turi")}
                </div>
              </div>
              {get(vositalar, "vositalar", []).map((item, index) => (
                <div
                  className="doctor-examination-box-fields v-list"
                  key={index}
                >
                  <div className="doctor-examination-box-fields-field v-list">
                    {get(item, "vosita_nomi.nomi")}
                  </div>
                  <div className="doctor-examination-box-fields-field v-list">
                    {get(item, "vosita_miqdori")}
                  </div>
                  <div className="doctor-examination-box-fields-field">
                    {get(item, "vosita_turi.nomi")}
                  </div>
                </div>
              ))}
              <div className="doctor-examination-box-fields">
                <div className="doctor-examination-box-fields-field">
                  {t("input.opi")}
                </div>
                <div className="doctor-examination-box-fields-field">
                  {get(vositalar, "korik.korik_tarif")}
                </div>
              </div>
              <div className="doctor-examination-box-fields">
                <div className="doctor-examination-box-fields-field">
                  {t("input.otshik")}
                </div>
                <div className="doctor-examination-box-fields-field">
                  {get(vositalar, "korik.ota_ona_shikoyati")}
                </div>
              </div>
              <div className="doctor-examination-box-fields">
                <div className="doctor-examination-box-fields-field">
                  {t("sidebar.li4")}
                </div>
                <div className="doctor-examination-box-fields-field">
                  {get(vositalar, "korik.bola_shifokori.ismi")}{" "}
                  {get(vositalar, "korik.bola_shifokori.familiyasi")}{" "}
                  {get(vositalar, "korik.bola_shifokori.otasini_ismi")}{" "}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <h1 className="doctor-examination-title">{t("input.bk")}</h1>
              </div>
              <div className="">
                {isLoading && <div>Yuklanmoqda...</div>}
                {!(isSuccess && examination?.length && !isLoading) && (
                  <div>{t("input.mavjud")}</div>
                )}
                <div className="doctor-examination-content">
                  {examination.map((item, index) => (
                    <div
                      className="doctor-examination-box-1"
                      key={get(item, "korik.id")}
                    >
                      <div className="doctor-examination-box-header">
                        <h4
                          className="doctor-examination-box-title"
                          style={{ textTransform: "capitalize" }}
                        >
                          #{index + 1} {t("ko'rik")}
                        </h4>
                        <button
                          className="btn"
                          onClick={() => setVositalar({ ...item, show: true })}
                        >
                          {t("bildirishnoma.batafsil")}
                        </button>
                      </div>
                      <div>
                        <div className="doctor-examination-box-fields">
                          <div className="doctor-examination-box-fields-field">
                            {t("bildirishnoma.sana")}
                          </div>
                          <div className="doctor-examination-box-fields-field">
                            {dayjs(
                              get(item, "korik.created_at"),
                              "DD.MM.YYYY HH:mm"
                            ).format("DD.MM.YYYY")}
                          </div>
                        </div>
                        <div className="doctor-examination-box-fields">
                          <div className="doctor-examination-box-fields-field">
                            {t("jihoz.soat")}
                          </div>
                          <div className="doctor-examination-box-fields-field">
                            {dayjs(
                              get(item, "korik.created_at"),
                              "DD.MM.YYYY HH:mm"
                            ).format("HH:mm")}
                          </div>
                        </div>
                        <div className="doctor-examination-box-fields">
                          <div className="doctor-examination-box-fields-field">
                            {t("sidebar.li4")}
                          </div>
                          <div className="doctor-examination-box-fields-field">
                            {get(item, "korik.bola_shifokori.ismi")}{" "}
                            {get(item, "korik.bola_shifokori.familiyasi")}{" "}
                            {get(item, "korik.bola_shifokori.otasini_ismi")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default DoctorExaminations;

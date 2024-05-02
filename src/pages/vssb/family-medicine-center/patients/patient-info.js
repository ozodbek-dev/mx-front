import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {get} from "lodash";
import {useTranslation} from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "92%",
  maxHeight: "98%",
  bgcolor: "#e7ebf2",
  border: "2px solid #e7ebf2",
  boxShadow: 24,
  borderRadius: 3,
  overflow: "auto",
  pt: 1,
  px: 4,
  pb: 4,
};

export default function PatientInfo({
  isOpen = false,
  handleClose,
  data = {},
}) {
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="close-icon">
            <Button onClick={handleClose}>
              {/* <CloseIcon /> */}
              {t("bildirishnoma.single.ortga")}
            </Button>
          </div>
          <div className="patient-info">
            <div className="patient-info-content">
              <div className="patient-info-box">
                <h1 className="patient-info-title">{t("sbola.sh")}</h1>
                <div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("shifokor.alladd.name")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "ism")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("shifokor.alladd.surname")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "familiya")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("shifokor.alladd.otch")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "otasining_ismi")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("input.pfl")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "JSHSHIR")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("shifokor.birthday")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "tugilgan_sana")}
                    </div>
                  </div>

                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("bola.guruh")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "qon_guruhi")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("shifokor.alladd.male")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "jinsi")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="patient-info-box">
                <h1 className="patient-info-title">{t("sbola.b4")}</h1>
                <div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("shifokor.tel")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "tel_raqami")
                        ? get(data, "tel_raqami")
                        : t("bola.kir")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("input.qosh1")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "qoshimcha_raqam")?.trim()
                        ? get(data, "qoshimcha_raqam")
                        : t("bola.kir")}
                    </div>
                  </div>

                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("input.m")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "manzil_uyi")
                        ? get(data, "manzil_uyi")
                        : t("bola.kir")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="patient-info-box">
                <h1 className="patient-info-title">{t("sbola.p3")}</h1>
                <div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("sbola.p1")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "passport_seriya_va_raqami")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="patient-info-content">
              <div className="patient-info-box">
                <h1 className="patient-info-title">{t("sbola.b10")}</h1>
                <div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">ID</div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "id")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("sidebar.li4")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "biriktirilgan_shifokor.ismi")}{" "}
                      {get(data, "biriktirilgan_shifokor.familiyasi")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("sbola.birl")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "biriktirilgan_muassasa.manzili")}{" "}
                      {get(data, "biriktirilgan_muassasa.nomi")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("bola.rxt")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "royxatga_olingan_sana")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="patient-info-box">
                <h1 className="patient-info-title">{t("sbola.onot")}</h1>
                <div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("sbola.ot1")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "otasi.ism")} {get(data, "otasi.familiya")}{" "}
                      {get(data, "otasi.otasining_ismi")}
                    </div>
                  </div>
                  <div className="patient-info-box-fields">
                    <div className="patient-info-box-fields-field">
                      {t("sbola.on1")}
                    </div>
                    <div className="patient-info-box-fields-field">
                      {get(data, "onasi.ism")} {get(data, "onasi.familiya")}{" "}
                      {get(data, "onasi.otasining_ismi")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

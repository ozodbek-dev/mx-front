import { useState } from "react";
import l1 from "../../../../../../../assets/icon/l1.svg";
import { Box, Button, Modal, SvgIcon, Tab, Tabs } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { get } from "lodash";

const Eyemodal = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ border: "none", backgroundColor: "transparent" }}
      >
        <img src={l1} alt="..." />
      </button>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-two" sx={{ ...style, width: 860 }}>
          <Button
            style={{
              marginBottom: "14px",
              marginLeft: "-25px",
            }}
            variant="text"
            onClick={() => setOpen(false)}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </Button>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginBottom: "28px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t("input.m1")} />
              <Tab label={t("input.fayl")} />
            </Tabs>
          </Box>
          <div className={value === 1 ? "visually-hidden" : "card-block"}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 className="card-block__head">{t("input.mal1")}</h2>
            </div>
            <ul style={{ listStyle: "none" }}>
              <li className="site-list__item">
                <span className="border-list">{t("vosita.vositaturi")}</span>
                <span className="border-list">
                  {get(data, "vosita_turi.nomi")}
                </span>
              </li>
              <li className="site-list__item">
                <span className="border-list">
                  {t("bildirishnoma.single.nomi")}
                </span>
                <span className="border-list">
                  {get(data, "vosita_nomi.nomi")}
                </span>
              </li>
              <li className="site-list__item">
                <span className="border-list">{t("sbola.olchov")}</span>
                <span className="border-list">{data?.olchov_birligi}</span>
              </li>
              <li className="site-list__item">
                <span className="border-list">{t("vosita.b1")}</span>
                <span className="border-list">
                  {data?.olchov_birligi_narxi}
                </span>
              </li>
              <li className="site-list__item">
                <span className="border-list">{t("vosita.b2")}</span>
                <span className="border-list">{data?.omborxona_nomi}</span>
              </li>
              <li className="site-list__item">
                <span className="border-list">
                  {t("bildirishnoma.single.miqdori")}
                </span>
                <span className="border-list">{data?.vosita_miqdori}</span>
              </li>
              <li className="site-list__item">
                <span className="border-list">{t("bildirishnoma.yet")}</span>
                <span className="border-list">
                  {data?.partiyadan_kelgan_vosita_miqdori}
                </span>
              </li>
            </ul>
          </div>
          <section className={+value === 0 ? "visually-hidden" : "card-block"}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4
                className="sarflov_block_title"
                style={{ marginBottom: "1.5rem" }}
              >
                {t("bildirishnoma.single.fayl")}
              </h4>
            </div>
            {data?.file ? (
              <a
                href={
                  data?.file !== null
                    ? `https://admin-mpbt.ssv.uz/static${data?.file}`
                    : "#"
                }
                className="download_document_t9"
              >
                <Button variant="contained">{t("input.yuklab")}</Button>
              </a>
            ) : (
              t("input.mavjud") + "!"
            )}
          </section>
        </Box>
      </Modal>
    </>
  );
};
export default Eyemodal;

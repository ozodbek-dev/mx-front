import AddIcon from "@mui/icons-material/Add";
import { Button, Fade, Modal } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownload from "@mui/icons-material/CloudDownload";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Person } from "@mui/icons-material";

function Comsbol() {
  const classes = {
    table: {
      minWidth: 700,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: "white",
      border: "2px solid #000",
      padding: "50px",
      width: "80%",
      margin: "30px auto 0 auto",
    },
    formControl: {
      margin: "1px",
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: "5px",
    },
    button: {
      padding: "8px",
      borderRadius: "12px",
    },
  };
  const [open3, setOpen3] = useState(false);

  const [person, setPerson] = useState({});

  const { t } = useTranslation();

  const params = useParams();
  useGet({
    url: `/bildirishnoma/viloyatga/?filter[id]=${params.id}`,
    onSuccess: (res) => {
      setPerson(get(res, "data.data[0]", {}));
    },
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="rol_ariza">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="rol_ariza_top">
            <Button onClick={() => navigate(-1)} variant="contained">
              {t("bildirishnoma.single.ortga")}
            </Button>
          </div>
          <Button
            onClick={() => setOpen3(true)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            {t("bildirishnoma.add")}
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal_one}
            open={open3}
            onClose={() => setOpen3(false)}
            closeAfterTransition
            BackdropProps={{
              timeout: 400,
            }}
            style={{
              marginTop: "200px",
              width: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Fade in={open3}>
              <div style={classes.paper}>
                <div className="zayavka_block">
                  <Button
                    style={{
                      color: "black",
                      textAlign: "right",
                      margin: "0 0 auto auto",
                      display: "flex",
                    }}
                    startIcon={<CloseIcon />}
                    onClick={() => setOpen3(false)}
                  ></Button>
                  <h4 className="zayavka_title">{t("input.bildir")}</h4>
                  <div className="delete_btn_group">
                    <Link
                      to={`/notificationvsb/tuman/${params.id}`}
                      className="jayavka_btn"
                    >
                      {t("bildirishnoma.tuman")}
                    </Link>
                    <Link
                      Link
                      to={`/notificationvsb/oilaviy/${params.id}`}
                      className="jayavka_btn"
                    >
                      {t("bildirishnoma.single.vositainf")}
                    </Link>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
        <div className="rol_ariza_bottom">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.turi")}
                  </h4>
                  <div className="div-1">{t("vosita.bola")}</div>
                </div>
              </div>
            </div>

            <div
              style={{ marginLeft: "20px", width: "52%" }}
              className="rol_ariza_bottom_div"
            >
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.new.vazifasi")}
                  </h4>
                  <div className="div-1--1">{person.muddati}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rol_ariza_bottom_top">
            <h4 className="rol_ariza_bottom_title">
              {t("bildirishnoma.single.iddata")}
            </h4>
            <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.id")}</p>
                <p className="info_single">{person.id}</p>
              </div>
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.data")}</p>
                <p className="info_single">{person.sana}</p>
              </div>
            </div>
          </div>
          <div className="rol_ariza_flex">
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.kimdan")}
                  </h4>
                  <div className="rol_ariza_bottom_div_t6">
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{t("bildirishnoma.single.kimdan")}</p>
                    </div>
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{t(person.kimdan)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.kimga")}
                  </h4>
                  <div className="rol_ariza_bottom_div_t6">
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{t("bildirishnoma.single.kimga")}</p>
                    </div>
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{person.kimga}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="single_table_document">
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <h4 className="rol_ariza_bottom_title">{t("input.toif")}</h4>
              <ul className="site-list">
                {person?.yosh_toifa &&
                JSON?.parse(person.yosh_toifa).length > 0 ? (
                  JSON.parse(person.yosh_toifa).map((el) => (
                    <li className="site-list__items">{el}</li>
                  ))
                ) : (
                  <p
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {t("input.mavjud")}
                  </p>
                )}
              </ul>
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <h4 className="rol_ariza_bottom_title">{t("modalariza.toif")}</h4>
              <ul className="silte-list">
                {person?.oy_toifa && JSON.parse(person?.oy_toifa).length > 0 ? (
                  JSON.parse(person.oy_toifa).map((el) => (
                    <li className="site-list__items">{el}</li>
                  ))
                ) : (
                  <p
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {t("input.mavjud")}
                  </p>
                )}
              </ul>
            </div>

            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.qoshimcha")}
                </h4>
                <div className="document_left_title_block">
                  <p className="document_left_title">
                    <p>
                      {person.qoshimcha === "undefined"
                        ? t("Kiritilmagan")
                        : person.qoshimcha
                        ? person.qoshimcha
                        : t("Kiritilmagan")}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.fayl")}
                </h4>
                <div className="rol_ariza_bottom_div_t6">
                  {person.fayl ? (
                    <a
                      style={{
                        border: "none",
                        backgroundColor: "#1464C0",
                        color: "#fff",
                        borderRadius: "8px",
                        paddingLeft: "5px",
                        paddingRight: "15px",
                      }}
                      className="items-center gap-8 flex "
                      rel="noreferrer"
                      target="_blank"
                      href={`https://admin-mpbt.ssv.uz/static/${
                        person.fayl && person.fayl.fayl
                      }`}
                      download
                    >
                      <CloudDownload />
                      <p className="m-0 py-10">{t("input.yuklab")}</p>
                    </a>
                  ) : (
                    t("input.mavjud")
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comsbol;

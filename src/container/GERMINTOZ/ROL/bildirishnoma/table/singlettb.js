import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Fade, Modal } from "@mui/material";
import { useEffect, useState } from "react";
// import "../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { request } from "../../../../../api/request";
import { get } from "lodash";
import { CloudDownload } from "@mui/icons-material";
//   import { request } from "../../../../../../api/request.js";
// import Loading from "../../components/loading/loading.js";

function Singlettb() {
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
      // boxShadow: theme.shadows[5],
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

  const [person, setPerson] = useState({
    isFetched: false,
    data: [],
    error: null,
  });

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [open2, setOpen2] = useState(false);

  const { t } = useTranslation();

  const params = useParams();

  useEffect(() => {
    request
      .get(`/bildirishnoma/tumanga/?filter[id]=${params.id}`, config)
      .then((res) => {
        setPerson(get(res, "data.data[0]"));
      });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="rol_ariza">
        <div
          className="rol_ariza_top"
          style={{ justifyContent: "space-between" }}
        >
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            style={{
              borderRadius: "12px",
              backgroundColor: "#DDEBFB",
              padding: "8px",
            }}
            variant="text"
          >
            <span className="text-capitalize">
                {t("bildirishnoma.single.ortga")}
              </span>
          </Button>
          <Button
            onClick={() => setOpen2(true)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            {t("bildirishnoma.add")}
          </Button>
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
              style={{ marginLeft: "20px" }}
              className="rol_ariza_bottom_div"
            >
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.new.vazifasi")}
                  </h4>
                  <div className="div-1--1">
                    {person.muddati && person?.muddati}
                  </div>
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
                <p className="info_single">{person.sana && person?.sana}</p>
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
                      <p>{person.kimdan}</p>
                      {/* <p>{current.kimdan}</p> */}
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
              <h4 className="rol_ariza_bottom_title">{t("modalariza.toif")}</h4>
              <ul className="site-list">
                {person.oy_toifa && JSON.parse(person.oy_toifa).length ? (
                  JSON.parse(person.oy_toifa).map((el) => {
                    return (
                      <li className="site-list__items">
                        {el} 
                      </li>
                    );
                  })
                ) : (
                  <div className="no-data">{t("Ma'lumot mavjud emas")}</div>
                )}
              </ul>
            </div>

            <div className="rol_ariza_bottom_div_inner">
              <h4 className="rol_ariza_bottom_title">{t("input.toif")}</h4>
              <ul className="site-list">
                {person.yosh_toifa && JSON.parse(person.yosh_toifa).length ? (
                  JSON.parse(person.yosh_toifa).map((el) => {
                    return (
                      <li className="site-list__items">
                        {el}
                      </li>
                    );
                  })
                ) : (
                  <div className="no-data">{t("Ma'lumot mavjud emas")}</div>
                )}
              </ul>
            </div>
          </div>
          <div style={{ width: "48%" }} className="rol_ariza_bottom_div_inner">
            <div className="rol_ariza_bottom_div_inner_block">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.qoshimcha")}
              </h4>
              <div className="document_left_title_block">
                <p className="document_left_title">
                  <p>
                    {!person?.qoshimcha || person?.qoshimcha == "undefined"
                      ? t("input.mavjud")
                      : person.qoshimcha}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="t9">
          <div style={{ width: "48%" }} className="rol_ariza_bottom_div_inner">
            <div className="rol_ariza_bottom_div_inner_block">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.fayl")}
              </h4>
              <div className="rol_ariza_bottom_div_t6">
                {person?.fayl ? (
                  <a
                    style={{ border: "none" }}
                    href={`https://admin-mpbt.ssv.uz/static/${person?.fayl?.fayl}`}
                    target="_blank"
                    download
                    rel="noreferrer"
                  >
                    <Button variant="contained" startIcon={<CloudDownload />}>
                      {t("input.yuklab")}
                    </Button>
                  </a>
                ) : (
                  "Biriktirlgan fayllar mavjud emas"
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modal_one_99">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal_one}
            open={open2}
            onClose={() => setOpen2(false)}
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
            <Fade in={open2}>
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
                    // onClick={() => handleClose2()}
                  ></Button>
                  <h4 className="zayavka_title">{t("modalariza.arizaturi")}</h4>
                  <div className="delete_btn_group">
                    <Link to={`/rmoariza/${params.id}`} className="jayavka_btn">
                      {t("vosita.bola")}
                    </Link>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
}
export default Singlettb;

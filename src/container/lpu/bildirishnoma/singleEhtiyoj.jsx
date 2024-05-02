import {Button} from "@mui/material";
import {useEffect, useState} from "react";
// import "../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {request} from "../../../api/request";
import {get} from "lodash";

function SingleEhtiyoj() {
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

  const { t } = useTranslation();

  const params = useParams();

  useEffect(() => {
    request
      .get("/bildirishnoma/muassasa/", config)
      .then((data) =>
        setPerson(data.data.data.find((el) => +el.id === +params.id))
      )
      .catch(() => {});
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="rol_ariza">
        <div className="rol_ariza_top">
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
            {t("bildirishnoma.single.ortga")}
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
                      <p>Kimdan</p>
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
        {/* <div className="rol_ariza_bottom_div_inner">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.vosita")}
          </h4>
          <div className="single_table_all_block">
            <p className="single_table_all_title">
              {t("bildirishnoma.single.vositainf")} A
            </p>
            <div className="single_table_all_block_inner">
              <div className="single_table_all_block_top">
                <button>{t("bildirishnoma.single.vosi")}</button>
                <button>{t("bildirishnoma.single.bolalar")}</button>
              </div>
              <div className="single_table_all_block_bottom">
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.nomi")}
                        </TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.seriyasi")}
                        </TableCell>
  
                        <TableCell align="left">
                          {t("bildirishnoma.single.miqdori")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">01</TableCell>
                        <TableCell align="left">Dori A</TableCell>
                        <TableCell align="left">AB123456789</TableCell>
                        <TableCell align="left">15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">01</TableCell>
                        <TableCell align="left">Dori A</TableCell>
                        <TableCell align="left">AB123456789</TableCell>
                        <TableCell align="left">15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">01</TableCell>
                        <TableCell align="left">Dori A</TableCell>
                        <TableCell align="left">AB123456789</TableCell>
                        <TableCell align="left">15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">01</TableCell>
                        <TableCell align="left">Dori A</TableCell>
                        <TableCell align="left">AB123456789</TableCell>
                        <TableCell align="left">15</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div> */}

        <div className="single_table_document">
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <h4 className="rol_ariza_bottom_title">{t("input.toif")}</h4>
              <ul className="site-list">
                {person.yosh_toifa &&
                  JSON.parse(get(person, "yosh_toifa", "[]")).map((el) => {
                    return (
                      <li className="site-list__items" key={el}>
                        {t("input.yosh1")}: {el} {t("bola.yosh")}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <h4 className="rol_ariza_bottom_title">{t("modalariza.toif")}</h4>
              <ul className="silte-list">
                {person.oy_toifa &&
                  JSON.parse(get(person, "oy_toifa", "[]")).map((el, index) => {
                    return (
                      <li className="site-list__items" key={index}>
                        {t("input.oy1")}: {el} {t("vosita.oy")}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="single_table_document">
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.qoshimcha")}
                </h4>
                <div className="document_left_title_block">
                  <p className="document_left_title">
                    <p>{person.qoshimcha}</p>
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
                {person.fayl ? (
                  <div className="rol_ariza_bottom_div_t6">
                    <a
                      style={{ border: "none" }}
                      className="div-1"
                      href={`https://admin-mpbt.ssv.uz/static/${
                        person.fayl && person.fayl.fayl
                      }`}
                      download
                    >
                      {person.fayl && person.fayl.fayl}
                    </a>
                  </div>
                ) : (
                  <p>{t("Fayl mavjud emas")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleEhtiyoj;

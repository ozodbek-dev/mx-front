import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../../../api/request";
import "./singletable.scss";
import { v4 } from "uuid";
import { CloudDownload } from "@mui/icons-material";

const RolarizasinglebYuborilgan = () => {
  const navigate = useNavigate();
  const { yubId } = useParams();

  const [person, setPerson] = useState({});

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { t } = useTranslation();
  const [tab, setTab] = useState(false);
  useEffect(() => {
    request
      .get(`/ariza/rmo/yuborish/?filter[id]=${yubId}`, config)
      .then((res) => {
        const person = get(res, "data.data[0]", {});
        setPerson(person);
      });
  }, [yubId]);

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

  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Button onClick={() => navigate(-1)} variant="contained">
          {t("bildirishnoma.single.ortga")}
        </Button>
      </div>
      <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.status")}
        </h4>
        {person?.status === "O'qildi" ? (
          <div className="status_info" style={{ background: "green" }}>
            <p className="status_info_title" style={{ color: "white" }}>
              {/* {t("bildirishnoma.single.statusinf")} */}
              {t(person?.status)}
            </p>
          </div>
        ) : (
          <div className="status_info">
            <p className="status_info_title">
              {/* {t("bildirishnoma.single.statusinf")} */}
              {person?.status}
            </p>
          </div>
        )}
      </div>
      <div className="rol_ariza_bottom">
        <div className="rol_ariza_bottom_top">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.iddata")}
          </h4>
          <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.id")}</p>
              <p className="info_single">{person?.id}</p>
            </div>
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.data")}</p>
              <p className="info_single">{get(person, "vaqti")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rol_ariza_bottom_div_inner" style={{ marginTop: "20px" }}>
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.vosita")}
        </h4>
        <div className="single_table_all_block">
          <div className="single_table_all_block_inner">
            <div className="single_table_all_block_top">
              <button
                onClick={() => setTab(!tab)}
                style={
                  tab === false
                    ? { color: "#1464C0", borderBottom: "2px solid #1464C0" }
                    : { color: "black" }
                }
              >
                {t("bildirishnoma.single.vosi")}
              </button>
              <button
                onClick={() => setTab(!tab)}
                style={
                  tab === true
                    ? { color: "#1464C0", borderBottom: "2px solid #1464C0" }
                    : { color: "black" }
                }
              >
                {t("bildirishnoma.single.bolalar")}
              </button>
            </div>
            <div className="single_table_all_block_bottom">
              {tab === false ? (
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                        <TableCell align="left">
                          {t("vosita.vositaturi")}
                        </TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.nomi")}
                        </TableCell>

                        <TableCell align="left">
                          {t("bildirishnoma.single.miqdori")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {person.ariza?.vositalar2?.length &&
                        person?.ariza?.vositalar2.map((item, index) =>
                          item.data.map((innerItem) => (
                            <TableRow key={v4()}>
                              <TableCell align="left">{index + 1}</TableCell>
                              <TableCell align="left">{item.turi}</TableCell>
                              <TableCell align="left">
                                {innerItem.nomi}
                              </TableCell>
                              <TableCell align="left">
                                {innerItem.soni}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("input.toif")}</TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.bolalar")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {person.ariza &&
                      Object.keys(person.ariza.yosh_toifa).length ? (
                        Object.keys(person.ariza.yosh_toifa).map(
                          (it, index) => (
                            <TableRow key={index}>
                              <TableCell align="left">{it}</TableCell>
                              <TableCell align="left">
                                {person.ariza.yosh_toifa &&
                                  person.ariza?.yosh_toifa[it]}
                              </TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <TableRow>
                          <TableCell align="left">{t("bola.kir")}</TableCell>
                          <TableCell align="left">{t("bola.kir")}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                    <TableHead style={{ marginTop: "20px" }}>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("modalariza.toif")}</TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.bolalar")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {person.ariza &&
                      Object.keys(person.ariza.oy_toifa).length ? (
                        Object.keys(person.ariza.oy_toifa).map((it, index) => (
                          <TableRow>
                            <TableCell align="left">{it}</TableCell>
                            <TableCell align="left">
                              {person.ariza.oy_toifa &&
                                person.ariza?.oy_toifa[it]}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell align="left">{t("bola.kir")}</TableCell>
                          <TableCell align="left">{t("bola.kir")}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
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
                {person?.qoshimcha || "Qoshimcha ma'lumot kiritilmagan"}
              </div>
            </div>
          </div>
        </div>
        <div className="rol_ariza_bottom_div">
          <div className="rol_ariza_bottom_div_inner">
            <div className="sarflov_top_blocks">
              <div>
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.single.fayl")}
                </h4>
                <div className="mt-30">
                  {person?.fayl ? (
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
                      target="_blank"
                      href={`https://admin-mpbt.ssv.uz/static/${person.fayl}`}
                      download
                      rel="noreferrer"
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
    </div>
  );
};

export default RolarizasinglebYuborilgan;

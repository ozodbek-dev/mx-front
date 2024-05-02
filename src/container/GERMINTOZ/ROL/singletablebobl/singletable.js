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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../../../api/request";
import "./singletable.scss";
import { get } from "lodash";
import { v4 } from "uuid";

const Rolarizasinglebobl = () => {
  const navigate = useNavigate();
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

  const [person, setPerson] = useState({});
  const { t } = useTranslation();
  const [tab, setTab] = useState(false);
  const params = useParams();
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    request.get(`/ariza/vssb/?filter[id]=${params.id}`, config).then((res) => {
      setPerson(get(res, "data.data[0]"));
    });
  }, [params.id]);
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
              {t(person.status)}
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
              <p className="info_single">
                {person?.vaqti && person.vaqti.slice(0, 10)}
              </p>
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
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
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
                      {person.ariza &&
                        person.ariza.map((item, index) => {
                          return (
                            <TableRow key={v4()}>
                              <TableCell align="left">{index + 1}</TableCell>
                              <TableCell align="left">
                                {get(item, "vosita_turi")}
                              </TableCell>
                              <TableCell align="left">
                                {get(item, "vosita_nomi")}
                              </TableCell>
                              <TableCell align="left">
                                {get(item, "miqdori")}
                              </TableCell>
                            </TableRow>
                          );
                        })}
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
                      {Object.keys(person.yosh_toifa).map((it, index) => {
                        const child = Object.values(person.yosh_toifa)[index];
                        return (
                          <TableRow>
                            <TableCell align="left">{it}</TableCell>
                            <TableCell align="left">{child}</TableCell>
                          </TableRow>
                        );
                      })}
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
                      {Object.keys(person.oy_toifa).map((it, index) => {
                        const child = Object.values(person.oy_toifa)[index];
                        return (
                          <TableRow>
                            <TableCell align="left">{it}</TableCell>
                            <TableCell align="left">{child}</TableCell>
                          </TableRow>
                        );
                      })}
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
                <p>
                  {person?.qoshimcha ? person?.qoshimcha : t("Kiritilmagan")}
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
                {person.fayl === "None" ? (
                  t("input.mavjud")
                ) : person.fayl ? (
                  <a
                    target={"_blank"}
                    href={
                      person?.fayl !== "None"
                        ? `https://admin-mpbt.ssv.uz/static/${person?.fayl}`
                        : "#"
                    }
                    className="download_document_t9"
                    rel="noreferrer"
                  >
                    <Button variant="contained">{t("input.yuklab")}</Button>
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
  );
};

export default Rolarizasinglebobl;

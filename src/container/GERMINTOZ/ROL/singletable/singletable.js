import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
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
import { Link, useParams } from "react-router-dom";
import { request } from "../../../../api/request";
import "./singletable.scss";
import { get } from "lodash";

const Rolarizasingle = () => {
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

  const [application, setApplication] = useState({});
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { t } = useTranslation();
  const [tab, setTab] = useState(false);
  const params = useParams();
  useEffect(() => {
    request.get(`/ariza/rmo/?filter[id]=${params.id}`, config).then((res) => {
      setApplication(get(res, "data.data[0]"));
    });
  }, [params.id]);
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Link to={"/arizalar"}>
          <Button variant="contained">{t("bildirishnoma.single.ortga")}</Button>
        </Link>
      </div>
      <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.status")}
        </h4>
        {application?.status === "O'qildi" ? (
          <div className="status_info" style={{ background: "green" }}>
            <p className="status_info_title" style={{ color: "white" }}>
              {/* {t("bildirishnoma.single.statusinf")} */}
              {application?.status}
            </p>
          </div>
        ) : (
          <div className="status_info">
            <p className="status_info_title">
              {/* {t("bildirishnoma.single.statusinf")} */}
              {application?.status}
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
              <p className="info_single">{application?.id}</p>
            </div>
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.data")}</p>
              <p className="info_single">
                {application?.vaqti && application.vaqti.slice(0, 10)}
              </p>
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
                    <p>{t("bildirishnoma.single.muas")}</p>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{application?.kimdan}</p>
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
                    <p>{application?.kimga}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rol_ariza_bottom_div_inner">
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
                <div>
                  {application?.vositalar?.length ? (
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow style={{ backgroundColor: "white" }}>
                            <TableCell>
                              {t("bildirishnoma.single.soni")}
                            </TableCell>
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
                          {application?.vositalar.map((item, index) => (
                            <TableRow>
                              <TableCell align="left">{index + 1}</TableCell>
                              <TableCell align="left">
                                {item.vosita_turi}
                              </TableCell>
                              <TableCell align="left">
                                {item.vosita_nomi}
                              </TableCell>
                              <TableCell align="left">{item.miqdori}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <div className="no-data">{t("Malumot mavjud emas")}</div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-20 mt-20">
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
                        {application?.bildirishnoma &&
                        Object.keys(application?.bildirishnoma.bola).length ? (
                          Object.keys(application?.bildirishnoma.bola).map(
                            (item, index) => (
                              <TableRow>
                                <TableCell align="left">{item}</TableCell>
                                <TableCell align="left">
                                  {application.bildirishnoma &&
                                    application?.bildirishnoma.bola[item]}
                                </TableCell>
                              </TableRow>
                            )
                          )
                        ) : (
                          <TableRow>
                            <TableCell align="right">Mavjud emas</TableCell>
                            <TableCell align="left"></TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow style={{ backgroundColor: "white" }}>
                          <TableCell>{t("Bolalarning oy toifasi")}</TableCell>
                          <TableCell align="left">
                            {t("bildirishnoma.single.bolalar")}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {application?.bildirishnoma &&
                        Object.keys(application?.bildirishnoma.bola_oy)
                          .length ? (
                          Object.keys(application?.bildirishnoma.bola_oy).map(
                            (item, index) => (
                              <TableRow>
                                <TableCell align="left">{item}</TableCell>
                                <TableCell align="left">
                                  {application.bildirishnoma &&
                                    application?.bildirishnoma.bola_oy[item]}
                                </TableCell>
                              </TableRow>
                            )
                          )
                        ) : (
                          <TableRow>
                            <TableCell align="right">Mavjud emas</TableCell>
                            <TableCell align="left"></TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
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
                {application?.qoshimcha ? (
                  <p className="document_left_title">
                    {application?.qoshimcha}
                  </p>
                ) : (
                  <div className="no-data">{t("Kiritilmagan")}</div>
                )}
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
              {application?.fayl ? (
                <div className="rol_ariza_bottom_div_t6">
                  <a
                    href={`https://admin-mpbt.ssv.uz/static/${application?.fayl}`}
                    target="_blank"
                    className="download_document_t9"
                  >
                    <Button
                      variant="contained"
                      startIcon={<CloudDownloadIcon />}
                    >
                      {t("input.yuklab")}
                    </Button>
                  </a>
                </div>
              ) : (
                t("Fayl mavjud emas")
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Button variant="contained">{t("bildirishnoma.single.qayta")}</Button>
      <Button variant="contained" style={{margin:'10px'}}>{t("bildirishnoma.single.korildi")}</Button> */}
    </div>
  );
};

export default Rolarizasingle;

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "api/request";
import "./singletable.scss";
import { get } from "lodash";
import { v4 } from "uuid";

const Rolarizasingleb = () => {
  const navigate = useNavigate();
  const [tit, setTit] = useState("");
  const [pass, setPass] = useState();

  function Send() {
    const formmdata = new FormData();
    pass && formmdata.append("fayl", pass);
    formmdata.append("birlashtirilgan_ariza_id", params.id);
    formmdata.append("qoshimcha", tit);

    request
      .post(`ariza/rmo/yuborish/`, formmdata, config)
      .then((res) => {
        alert("Yuborildi!");
        navigate("/arizalar");
      })
      .catch(function (err) {
        alert("Yuborilmadi!");
      });
  }

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

  const File = (e) => {
    if (e.target.files[0]) setPass(e.target.files[0]);
  };
  const [person, setPerson] = useState([]);
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
    request
      .get(`/ariza/rmo/birlashtirish/?filter[id]=${params.id}`, config)
      .then((res) => {
        setPerson(get(res, "data.data[0]"));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.id]);

  const fileInput = useRef(null);
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Button onClick={() => navigate(-1)} variant="contained">
          <span className="text-capitalize">
            {t("bildirishnoma.single.ortga")}
          </span>
        </Button>
      </div>
      <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.status")}
        </h4>
        {person?.status === "O'qildi" ? (
          <div className="status_info" style={{ background: "green" }}>
            <p
              className="status_info_title"
              style={{ color: "white", textTransform: "capitalize" }}
            >
              {person?.status}
            </p>
          </div>
        ) : (
          <div className="status_info">
            <p
              className="status_info_title"
              style={{ textTransform: "capitalize" }}
            >
              {t(person?.status)}
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
              <p className="info_single">{person?.sana && person.sana}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rol_ariza_bottom_div_inner" style={{ marginTop: "20px" }}>
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.vosita")}
        </h4>
        <div className="single_table_all_block">
          {/* <p className="single_table_all_title">
            {t("bildirishnoma.single.vositainf")}
          </p> */}
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
                        {/* <TableCell align="left">
                        {t("bildirishnoma.single.seriyasi")}
                      </TableCell> */}

                        <TableCell align="left">
                          {t("bildirishnoma.single.miqdori")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {person.vositalar2?.length &&
                        person?.vositalar2.map((item, index) =>
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
                      {person?.yosh_toifa &&
                        Object.keys(person?.yosh_toifa).map((item, index) => (
                          <TableRow>
                            <TableCell align="left">{item}</TableCell>
                            <TableCell align="left">
                              {person.yosh_toifa && person?.yosh_toifa[item]}
                            </TableCell>
                          </TableRow>
                        ))}
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
                      {person?.oy_toifa &&
                        Object.keys(person?.oy_toifa).map((item, index) => (
                          <TableRow>
                            <TableCell align="left">{item}</TableCell>
                            <TableCell align="left">
                              {person.oy_toifa && person?.oy_toifa[item]}
                            </TableCell>
                          </TableRow>
                        ))}
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
                <TextareaAutosize
                  className="document_left_title"
                  onChange={(e) => setTit(e.target.value)}
                >
                  {person?.qoshimcha}
                </TextareaAutosize>
              </div>
            </div>
          </div>
        </div>
        <div className="rol_ariza_bottom_div">
          <div className="rol_ariza_bottom_div_inner">
            <div className="sarflov_top_blocks">
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")}
              </h4>

              {pass ? (
                <Button
                  className="delets_icons_file"
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => {
                    fileInput.current.value = null;
                    setPass(null);
                  }}
                  variant="contained"
                  type="button"
                >
                  {t("bildirishnoma.new.del")}
                </Button>
              ) : (
                ""
              )}
            </div>
            <input
              onChange={(e) => File(e)}
              type="file"
              ref={fileInput}
              id="files"
              className="file_add_input"
              name="fayl"
            />
            <label className="download_label" htmlFor="files">
              <div className="files_block_title">
                <p className="files_add_title">
                  {pass
                    ? t("bildirishnoma.new.failinf1")
                    : t("bildirishnoma.new.failinf")}
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
      <Button variant="contained" onClick={() => Send()}>
        {t("input.otp")}
      </Button>
    </div>
  );
};

export default Rolarizasingleb;

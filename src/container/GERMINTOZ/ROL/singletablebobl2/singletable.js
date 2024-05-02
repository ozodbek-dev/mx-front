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
import { request } from "api/request";
import Loading from "components/loading/loading";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./singletable.scss";

const RolarizasingleboblTwo = () => {
  const [extra, setExtra] = useState("");
  const [file, setFile] = useState(null);
  const { t } = useTranslation();

  function Send() {
    const formmdata = new FormData();
    if (!file) {
      toast.error(t("Fayl birlashtirish majburiy!"));
      return;
    }
    formmdata.append("id", params.id);
    formmdata.append("fayl", file);
    formmdata.append("qoshimcha", extra);
    request
      .post(`ariza/vssb/mohgayuborish/`, formmdata, config)
      .then((res) => {
        alert("Yuborildi!");
        navigate(-1);
      })
      .catch(function (err) {
        alert("Yuborilmadi!");
      });
  }

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [tab, setTab] = useState(false);

  const params = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useGet({
    url: `/ariza/vssb/birlashtirish/?filter[id]=${params.id}`,
  });

  if (isLoading) return <Loading />;
  if (!data?.data?.[0]) return <></>;

  const person = get(data, "data[0]");

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
              {t("O'qildi")}
            </p>
          </div>
        ) : (
          <div className="status_info">
            <p className="status_info_title">
              {/* {t("bildirishnoma.single.statusinf")} */}
              {t(`${person?.status?.toLowerCase()}`)}
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
              <p className="info_single">{person.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rol_ariza_bottom_div_inner" style={{ marginTop: "20px" }}>
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.vosita")}
        </h4>
        <div className="single_table_all_block">
          <p className="single_table_all_title"></p>
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
                      {person?.vositalar2 &&
                        person?.vositalar2.map((item, index) => (
                          <TableRow>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left">{item.turi}</TableCell>
                            <TableCell align="left">{item.nomi}</TableCell>
                            <TableCell align="left">{item.miqdori}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("input.toif")}</TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.bolalar")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(person.yosh_toifa).length ? (
                        Object.keys(person.yosh_toifa).map((it, index) => {
                          return (
                            <TableRow>
                              <TableCell align="left">{it}</TableCell>
                              <TableCell align="left">
                                {person.yosh_toifa && person?.yosh_toifa[it]}
                              </TableCell>
                            </TableRow>
                          );
                        })
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
                      {Object.keys(person.oy_toifa).length ? (
                        Object.keys(person.oy_toifa).map((it, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{it}</TableCell>
                              <TableCell align="left">
                                {person.oy_toifa && person?.oy_toifa[it]}
                              </TableCell>
                            </TableRow>
                          );
                        })
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
                <TextareaAutosize
                  className="document_left_title"
                  onChange={(e) => setExtra(e.target.value)}
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
                {t("bildirishnoma.new.fail")} <span>*</span>
              </h4>

              {file ? (
                <Button
                  className="delets_icons_file"
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => setFile(null)}
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
              onChange={(e) => handleChangeFile(e)}
              type="file"
              id="files"
              className="file_add_input"
              name="fayl"
            />
            <label className="download_label" htmlFor="files">
              <div className="files_block_title">
                <p className="files_add_title">
                  {file
                    ? t("bildirishnoma.new.failinf1")
                    : t("bildirishnoma.new.failinf")}
                </p>
                {/* <span className="files_add_span">
                  {pass ? "" : t("bildirishnoma.new.biriktir")}
                </span> */}
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

export default RolarizasingleboblTwo;

import CheckIcon from "@mui/icons-material/Check";
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
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../../../../api/request.js";
import { Contextvalue } from "../../../../../context/context.js";
import "./bildirish.scss";
import dayjs from "dayjs";
import { CloudDownload } from "@mui/icons-material";
import { get } from "lodash";

function Tizimttb() {
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
  const { setValues } = useContext(Contextvalue);
  const navigate = useNavigate();
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
      .get(`/omborxona/tizimli/xabarnoma/ttb/detail/${params.id}`, config)
      .then((data) => setPerson(data.data));
  }, [params.id]);

  const [isLoading, setLoading] = useState(false);

  const Tru = () => {
    setLoading(true);
    const body = {
      status: "qabul_qilindi",
    };
    const role =
      get(person, "kirim_chiqim.kimdan_kelgan") === "UzMedImpeks"
        ? "UzMedImpeks"
        : get(person, "kirim_chiqim.kimdan_kelgan", "").toLowerCase();
    request
      .post(
        `/omborxona/tizimli/xabarnoma/ttb/tasdiqlash/${role}/${params.id}`,
        body,
        config
      )
      .then(() => {
        navigate(-1);
        setValues(2);
        setLoading(false);
        alert("Tasdiqlandi!");
      })
      .catch(() => {
        setLoading(false);
        alert("Tasdiqlanmadi!");
      });
  };
  // if (!person.isFetched) return <Loading/>
  return (
    <>
      <div className="rol_ariza">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="rol_ariza_top">
            <Button
              onClick={() => navigate(-1)}
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
          </div>
          {person?.kirim_chiqim?.qabul_qilish_status !== "qabul_qilindi" && (
            <div>
              <Button
                disabled={isLoading}
                onClick={Tru}
                startIcon={<CheckIcon />}
                variant="contained"
              >
                {t("bildirishnoma.arstatus.qabulqil")}
              </Button>
            </div>
          )}
        </div>
        <div className="rol_ariza_bottom">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.turi")}
                  </h4>
                  <div className="div-1">{t("vosita.tizim")}</div>
                </div>
              </div>
            </div>

            {/* <div style={{marginLeft:"20px"}} className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  Vazifani topshirish muddati
                </h4>
                  <div className="div-1--1">
                          {person && person.muddati}
                  </div>
              </div>
            </div>
          </div> */}
            <div
              style={{ width: "48%", marginLeft: "62px", marginBottom: "20px" }}
              className="rol_ariza_bottom_top"
            >
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.iddata")}
              </h4>
              <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
                <div className="rol_ariza_bottom_block1">
                  <p className="info_single">{t("bildirishnoma.single.id")}</p>
                  <p className="info_single">{params.id}</p>
                </div>
                <div className="rol_ariza_bottom_block1">
                  <p className="info_single">
                    {t("bildirishnoma.single.data")}
                  </p>
                  <p className="info_single">
                    {person.kirim_chiqim &&
                      dayjs(
                        person.kirim_chiqim.created_at,
                        "DD.MM.YYYY HH:mm"
                      ).format("DD.MM.YYYY")}
                  </p>
                </div>
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
                      <p>
                        {person.kirim_chiqim &&
                          person.kirim_chiqim.kimdan_kelgan}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "49%" }} className="t9">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.fayl")}
                  </h4>
                  <div className="rol_ariza_bottom_div_t6">
                    {person?.kirim_chiqim?.file ? (
                      <a
                        style={{ border: "none" }}
                        href={`https://admin-mpbt.ssv.uz/static${person.kirim_chiqim.file}`}
                        target="_blank"
                        download
                        rel="noreferrer"
                      >
                        <Button
                          variant="contained"
                          startIcon={<CloudDownload />}
                        >
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
          </div>
        </div>
        <div className="single_table_document">
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">Qo'shilgan Vositalar</h4>
                <div className="document_left_title_block">
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {t("bildirishnoma.single.soni")}
                          </TableCell>
                          <TableCell>
                            {t("bildirishnoma.single.nomi")}
                          </TableCell>
                          <TableCell>{t("vosita.vositaturi")}</TableCell>
                          <TableCell>
                            {t("bildirishnoma.single.seriyasi")}
                          </TableCell>
                          <TableCell>
                            {t("bildirishnoma.single.miqdori")}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {person.vositalar &&
                          person.vositalar.map((el, index) => {
                            return (
                              <TableRow>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">
                                  {el.vosita_nomi.nomi}
                                </TableCell>
                                <TableCell align="left">
                                  {el.vosita_turi.nomi}
                                </TableCell>
                                <TableCell align="left">
                                  {el.vosita_seryasi}
                                </TableCell>
                                <TableCell align="left">
                                  {el.vosita_miqdori}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Tizimttb;

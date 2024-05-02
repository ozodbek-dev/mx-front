import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Button,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { get } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { request } from "../../../../../api/request";
import { Contextvalue } from "../../../../../context/context";
import "../.././kirim/kirim.scss";
import Kirimcard from "../kirimkard/kirmkard";
import KirimModal from "../kirimmodal/kirimmodal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
  button2: {
    backgroundColor: "#F69641",
  },
};
const Uzkirim = () => {
  const { cur } = useContext(Contextvalue);
  const [kirim, setKirim] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [close, setClose] = useState(false);
  const [date, setDate] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpen2(false);
  };
  const { t } = useTranslation();
  useEffect(() => {
    request
      .get("/omborxona/buyurtma/vositalari/partiya/yaratish", config)
      .then((data) => {
        if (date) {
          setKirim(
            data.data.filter(
              (el) =>
                el.created_at.split(" ")[0] ===
                `${moment(date).format("DD.MM.YYYY")}`
            )
          );
        } else setKirim(data.data);
      });
  }, [date, refetch]);
  return (
    <div style={{ paddingTop: "24px" }} className="prihod">
      <div className="prihod_top">
        <div className="prihod_top_inner">
          <Link to="/">
            <Button
              className="site-btn"
              startIcon={<ArrowBackIcon />}
              variant="contained"
            >
              {t("bildirishnoma.single.ortga")}
            </Button>
          </Link>
          <h4 className="monitoring_top_inner_title">
            {t("bildirishnoma.kirim")}
          </h4>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <KirimModal
            setOpens={setOpen}
            setOpen2={setOpen2}
            setRefetch={setRefetch}
          />
          <CSVLink
            data={kirim.map((item) => ({
              ...item,
              created_at: moment(get(item, "created_at")).format("YYYY-MM-DD"),
            }))}
            headers={[
              { label: "Sana", key: "created_at" },
              {
                label: "Shartnoma raqami",
                key: "vositalar.buyurtma.shartnoma_raqami",
              },
              {
                label: "Ajratilgan pul miqdori",
                key: "vositalar.buyurtma.ajratilgan_pul_miqdori",
              },
              {
                label: "Ajratilgan umumiy pul miqdori",
                key: "vositalar.buyurtma.shartnomaning_umumiy_pul_miqdori",
              },
              {
                label: "Xarid qilish usuli",
                key: "vositalar.buyurtma.xarid_qilish_usuli",
              },
              {
                label: "Yetkazib beruvchi firma nomi",
                key: "vositalar.buyurtma.yetgazib_beruvchi_firma_nomi",
              },
              {
                label: "O'lchov birligi",
                key: "vositalar.olchov_birligi",
              },
              {
                label: "O'lchov birligi narxi",
                key: "vositalar.olchov_birligi_narxi",
              },
              {
                label: "Partiyadan kelgan vosita miqdori",
                key: "vositalar.partiyadan_kelgan_vosita_miqdori",
              },
              {
                label: "Vosita miqdori",
                key: "vositalar.vosita_miqdori",
              },
              {
                label: "Vosita nomi",
                key: "vositalar.vosita_nomi.nomi",
              },
              {
                label: "Vosita turi",
                key: "vositalar.vosita_turi.nomi",
              },
              {
                label: "Vosita shakli",
                key: "vositaning_shakli",
              },
              {
                label: "Xalqaro patentlangan nomi",
                key: "xalqaro_patentlangan_nomi",
              },
              {
                label: "Yetkazib berilgan qadoq miqdori",
                key: "yetkazib_berilgan_qadoq_soni",
              },
            ]}
            filename="Vositalar-kirimi"
            separator=";"
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#18CF6C", borderRadius: "12px" }}
              size="large"
              className={classes.button}
              startIcon={<DescriptionIcon />}
            >
              {t("bola.excel")}
            </Button>
          </CSVLink>
          <div className="excel_bl"></div>
        </div>
      </div>
      <div className="prihod_block">
        <div className="prihod_block_inner">
          <div className="prihod_block_inner_top">
            <h4 className="prihod_block_inner_title">{t("input.sps")}</h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                type="date"
                onChange={(e) => setDate(e.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
              {date ? (
                <Button
                  onClick={() => setDate(null)}
                  startIcon={<CloseIcon />}
                />
              ) : null}
            </div>
          </div>
          <div className="prihod_block_inner_middle">
            <div
              style={{ overflowY: "scroll", height: "500px" }}
              className="card_blocks"
            >
              <Kirimcard classes={classes} kirim={kirim} setClose={setClose} />
              {date && !kirim[0] && (
                <div style={{ textAlign: "center", paddingTop: "170px" }}>
                  <p>{t("pdf.sana")}</p>
                  <Button onClick={() => setDate(false)} variant="contained">
                    {t("pdf.bar")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="prihod_block_inner">
          <div className="kirim_right_inner_top">
            <h4>{t("input.kr")}</h4>
            <Button
              onClick={() => setClose(false)}
              variant="contained"
              startIcon={<CloseIcon />}
            >
              {t("input.yop")}
            </Button>
          </div>
          <div className="kirim_right_inner_bottom">
            <div className="kirim_right_inner_bottom_top"></div>
            {close ? (
              <div className="kirim_right_inner_bottom_bottom">
                <TableContainer
                  style={{ borderRadius: "12px" }}
                  component={Paper}
                >
                  <Table
                    style={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center"
                        >
                          {t("vosita.vositaturi")}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center"
                        >
                          {t("bildirishnoma.single.nomi")}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center"
                        >
                          {t("input.shart")}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center"
                        >
                          {t("bildirishnoma.single.miqdori")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          {cur.vositalar && cur.vositalar.vosita_turi.nomi}
                        </TableCell>
                        <TableCell align="center">
                          {cur.vositalar && cur.vositalar.vosita_nomi.nomi}
                        </TableCell>
                        <TableCell align="center">
                          {cur.vositalar &&
                            cur.vositalar.buyurtma.shartnoma_raqami}
                        </TableCell>
                        <TableCell align="center">
                          {cur.vositalar && cur.vositalar.vosita_miqdori}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div>
                <h2
                  style={{
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "20px",
                    textAlign: "center",
                    color: "#4D4D4D",
                    padding: "235px 119px",
                  }}
                  className="empty-text"
                >
                  {t("sbola.bir")}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Kirim Qilindi!
          </Alert>
        </Snackbar>
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Kirim Qilinmadi!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};
export default Uzkirim;

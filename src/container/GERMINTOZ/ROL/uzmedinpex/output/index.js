import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Button,
  IconButton,
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
import useGet from "hooks/useGet";
import React, { useContext, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Contextvalue } from "../../../../../context/context";
import "../.././kirim/kirim.scss";
import Chiqimcarduz from "../chiqimkard/chiqimkard";
import Chiqimmodal from "../chiqimmodal/chiqimmodal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Output() {
  const [opens, setOpens] = React.useState(false);
  const [excel, setExcel] = React.useState([]);
  const [opens2, setOpens2] = React.useState(false);
  const [date, setDate] = useState();
  const [close, setClose] = useState(false);
  const { cur2 } = useContext(Contextvalue);
  console.log("🚀 ~ file: index.js:39 ~ Output ~ cur2:", cur2);
  // const {
  //   data: { chiqim },
  // } = useGet({
  //   url: "/omborxona/UzMedImpeks/kirim/chiqim/malumotlar?id=142",
  // });
  // console.log(chiqim);
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
  const handleCloses = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpens(false);
    setOpens2(false);
  };

  const { t } = useTranslation();
  return (
    <div className="prihod">
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
            {t("bildirishnoma.chiqim")}
          </h4>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Chiqimmodal setOpens={setOpens} setOpens2={setOpens2} />
          <div className="excel_bl">
            <CSVLink
              filename="Chiqimlar"
              data={excel.map((el) => el.kirim_chiqim)}
              separator={";"}
            >
              <Button
                variant="contained"
                // color="primary"
                size="large"
                className={classes.button}
                startIcon={<DescriptionIcon />}
              >
                {t("bola.excel")}
              </Button>
            </CSVLink>
          </div>
        </div>
      </div>
      <div className="prihod_block">
        <div className="prihod_block_inner">
          <div className="prihod_block_inner_top">
            <h4 className="prihod_block_inner_title">{t("input.sps")}</h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                onChange={(e) => setDate(e.target.value)}
                value={date}
                type="date"
                id="outlined-basic"
                variant="outlined"
              />
              {!!date && (
                <IconButton onClick={() => setDate("")}>
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          </div>
          <div className="prihod_block_inner_middle">
            <div
              style={{ overflowY: "scroll", height: "700px" }}
              className="card_blocks"
            >
              <Chiqimcarduz
                date={date}
                setClose={setClose}
                classes={classes}
                setExcel={setExcel}
              />
            </div>
          </div>
        </div>
        <div className="prihod_block_inner">
          <div className="kirim_right_inner_top">
            <h4>{t("input.chq")}</h4>
            <Button
              onClick={() => setClose(false)}
              variant="contained"
              startIcon={<CloseIcon />}
            >
              {t("input.yop")}
            </Button>
          </div>
          <div className="kirim_right_inner_bottom">
            {close && (
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
                          {t("input.ser")}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center"
                        >
                          {t("input.barkod")}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center"
                        >
                          {t("input.yuk")}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center"
                        >
                          {t("bildirishnoma.single.miqdori")}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center"
                        >
                          {t("input.rasm")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          {cur2 && cur2.vosita_turi.nomi}
                        </TableCell>
                        <TableCell align="center">
                          {cur2 && cur2.vosita_nomi.nomi}
                        </TableCell>
                        <TableCell align="center">
                          {cur2 && cur2.vosita_seryasi}
                        </TableCell>
                        <TableCell align="center">
                          {!cur2?.kirim_chiqim?.unique_raqam
                            ? t("bola.kir")
                            : cur2?.kirim_chiqim?.unique_raqam}
                        </TableCell>
                        <TableCell align="center">
                          {cur2?.kirim_chiqim?.comment}
                        </TableCell>
                        <TableCell align="center">
                          {cur2 && cur2?.vosita_miqdori}
                        </TableCell>
                        <TableCell align="center">
                          {cur2?.kirim_chiqim.image ? (
                            <a
                              href={`https://admin-mpbt.ssv.uz/static${
                                cur2 && cur2?.kirim_chiqim.image
                              }`}
                            >
                              {t("yuklab olish")}
                            </a>
                          ) : (
                            t("bola.kir")
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
          <Alert onClose={handleCloses} severity="error" sx={{ width: "100%" }}>
            Chiqim Qilinmadi!
          </Alert>
        </Snackbar>
        <Snackbar open={opens2} autoHideDuration={6000} onClose={handleCloses}>
          <Alert
            onClose={handleCloses}
            severity="success"
            sx={{ width: "100%" }}
          >
            Chiqim Qilindi!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
export default Output;

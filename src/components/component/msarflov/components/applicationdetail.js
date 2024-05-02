import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

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

function Applicationdetail({ person, type }) {
  const [tab, setTab] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Button variant="contained" onClick={() => window.history.back()}>
          {t("bildirishnoma.single.ortga")}
        </Button>
      </div>
      <div
        style={
          type === "send"
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }
            : null
        }
      >
        {type === "send" && (
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">{t("input.ta")}</h4>
                <div className="div-1">{person?.mavzu}</div>
              </div>
            </div>
          </div>
        )}
        <div
          style={type === "send" ? { width: "50%" } : null}
          className="rol_ariza_bottom_top rol_ariza_bottom_top2"
        >
          <h4 className="rol_ariza_bottom_title">{t("Arizaning statusi")}</h4>
          {person?.status === "O'qildi" ? (
            <div className="status_info" style={{ background: "green" }}>
              <p className="status_info_title" style={{ color: "white" }}>
                {t("O'qildi")}
              </p>
            </div>
          ) : (
            <div className="status_info">
              <p className="status_info_title">{t("vosita.yubor")}</p>
            </div>
          )}
        </div>
      </div>
      {type === "com" && (
        <div
          className="rol_ariza_bottom_div_inner"
          style={{ marginTop: "20px" }}
        >
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.vosita")}
          </h4>
          <div className="single_table_all_block">
            <p className="single_table_all_title">
    
            </p>
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
                        {person?.ariza &&
                          Object.keys(person?.ariza[0]?.vositalar).map(
                            (item, index) => (
                              <TableRow>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">{item}</TableCell>
                                <TableCell align="left">
                                  {person.ariza &&
                                    Object.keys(
                                      person.ariza[0]?.vositalar[item]
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                  {person.ariza &&
                                    Object.keys(
                                      person.ariza[0]?.vositalar[item]
                                    ).map(
                                      (els) =>
                                        person.ariza[0].vositalar[item][els]
                                    )}
                                </TableCell>
                              </TableRow>
                            )
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
                        {person?.ariza
                          && Object.keys(person?.ariza[0]?.yosh_toifa).map(
                              (it, index) => (
                                <TableRow>
                                  <TableCell align="left">{it}</TableCell>
                                  <TableCell align="left">
                                    {person?.ariza[0]?.yosh_toifa &&
                                      person?.ariza[0]?.yosh_toifa[it]}
                                  </TableCell>
                                </TableRow>
                              )
                            )
                          }
                      </TableBody>
                      <TableHead style={{ marginTop: "20px" }}>
                        <TableRow style={{ backgroundColor: "white" }}>
                          <TableCell>Bolalarning Oy toifasi</TableCell>
                          <TableCell align="left">
                            {t("bildirishnoma.single.bolalar")}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {person?.ariza
                          ? Object.keys(person?.ariza[0]?.oy_toifa).map(
                              (it, index) => (
                                <TableRow>
                                  <TableCell align="left">{it}</TableCell>
                                  <TableCell align="left">
                                    {person?.ariza[0]?.oy_toifa &&
                                      person?.ariza[0]?.oy_toifa[it]}
                                  </TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
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
              <p className="info_single">{person?.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "24px" }} className="single_table_document">
        <div className="t9">
          <div className="rol_ariza_bottom_div_inner">
            <div className="rol_ariza_bottom_div_inner_block">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.qoshimcha")}
              </h4>
              <div className="document_left_title_block">
                <p>
                  {person?.qoshimcha === "undefined"
                    ? t("Kiritilmagan")
                    : person?.qoshimcha
                    ? person?.qoshimcha
                    : t("Kiritilmagan")}
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
              {person?.file ? (
                <div className="rol_ariza_bottom_div_t6">
                  <a
                    target="_blank"
                    href={`https://admin-mpbt.ssv.uz/static/${person?.file}`}
                    className="download_document_t9"
                    rel="noreferrer"
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
                t("input.mavjud")
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Applicationdetail;

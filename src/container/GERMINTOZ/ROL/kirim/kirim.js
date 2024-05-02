import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import Chiqimcard from "components/component/RMO/chiqim/chiqim";
import Kirimcard from "components/component/RMO/kirimcard/kirimcard";
import { Contextvalue } from "context/context";
import dayjs from "dayjs";
import useGet from "hooks/useGet";
import { Fragment, useCallback, useContext, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./kirim.scss";

const Prihod = () => {
  const { cur5, cur6 } = useContext(Contextvalue);
  const [close, setClose] = useState(false);
  const [close2, setClose2] = useState(false);
  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  const {
    data: {
      kirim: { data: kirim = [], meta: metaKirim = {} } = {},
      chiqim: { data: chiqim = [], meta: metaChiqim = {} } = {},
    },
  } = useGet({
    url: `/omborxona/ttb/kirim/chiqim/malumotlar?page=${page}`,
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
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const handleChanges = (event, index) => {
    setTabIndex(index);
    setPage(1);
  };
  const monitoringMapper = (data = []) =>
    data.map((item) => ({
      ...item?.chiqim,
      ...item?.kirim,
      vositalar: item.vositalar,
      date: dayjs(item.created_at).format("YYYY-MM-DD"),
      time: dayjs(item.created_at).format("HH:mm"),
    }));
  const maxLengthVositalar = (data = []) => {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].vositalar.length > max) {
        max = data[i].vositalar.length;
      }
    }
    const result = [];
    for (let i = 0; i < max; i++) {
      result.push(
        { label: "Vosita nomi", key: `vositalar[${i}].vosita_nomi.nomi` },
        { label: "Vosita turi", key: `vositalar[${i}].vosita_turi.nomi` },
        { label: "Vosita seriyasi", key: `vositalar[${i}].vosita_seryasi` },
        { label: "Vosita miqdori", key: `vositalar[${i}].vosita_miqdori` }
      );
    }
    return result;
  };
  return (
    <div className="prihod">
      <div className="prihod_top">
        <div className="prihod_top_inner">
          <Link to="/rmosklad">
            <Button startIcon={<ArrowBackIcon />} variant="contained">
              <span className="text-capitalize">
                {t("bildirishnoma.single.ortga")}
              </span>
            </Button>
          </Link>
          <h4 className="monitoring_top_inner_title">{t("input.a1")}</h4>
        </div>
        <div className="excel_bl">
          <CSVLink
            data={monitoringMapper(tabIndex === 0 ? kirim?.data : chiqim?.data)}
            headers={[
              { label: "Sanasi", key: "date" },
              { label: "Vaqti", key: "time" },
              { label: "Partiya raqami", key: "partiya_raqam" },
              { label: "Kimdan kelgan", key: "kimdan_kelgan" },
              { label: "Miqdori", key: "vosita_miqdori" },
              { label: "Qabul qilish statusi", key: "qabul_qilish_status" },
              { label: "Yuk xati", key: "comment" },
              { label: "Barkod", key: "unique_raqam" },
              ...maxLengthVositalar(
                tabIndex === 0 ? kirim?.data : chiqim?.data
              ),
            ]}
            filename={tabIndex === 0 ? "Kirimlar" : "Chiqimlar"}
            className="excel_download"
            separator=";"
          >
            <Button
              style={{ backgroundColor: "#18CF6C", marginLeft: "20px" }}
              variant="contained"
              // color="primary"
              size="large"
              startIcon={<DescriptionIcon />}
            >
              {t("bola.excel")}
            </Button>
          </CSVLink>
        </div>
      </div>
      <div className="prihod_block">
        <div className="prihod_block_inner">
          <div className="prihod_block_inner_top">
            <h4 className="prihod_block_inner_title">{t("input.sps")}</h4>
            {/* <TextField type="date" id="outlined-basic" variant="outlined" /> */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                style={{ backgroundColor: "#fff" }}
                value={tabIndex}
                onChange={handleChanges}
                aria-label="basic tabs example"
              >
                <Tab label={t("bildirishnoma.kirim")} value={0} />
                <Tab label={t("bildirishnoma.chiqim")} value={1} />
              </Tabs>
            </Box>
          </div>
          <div className="prihod_block_inner_middle">
            <div className="card_blocks">
              {tabIndex === 0 && (
                <div>
                  <div style={{ overflowY: "scroll", height: "600px" }}>
                    <Kirimcard setClose={setClose} data={kirim} />
                  </div>
                  <div className="table-pagination-content">
                    <Pagination
                      page={page}
                      count={metaKirim?.total_pages ?? 1}
                      onChange={(e, page) => handleChangePage(page)}
                      color="primary"
                    />
                  </div>
                </div>
              )}
              {tabIndex === 1 && (
                <div>
                  <div style={{ overflowY: "scroll", height: "600px" }}>
                    <Chiqimcard
                      setClose={setClose2}
                      data={chiqim}
                      classes={classes}
                    />
                  </div>

                  <div className="table-pagination-content">
                    <Pagination
                      page={page}
                      count={metaChiqim?.total_pages ?? 1}
                      onChange={(e, page) => handleChangePage(page)}
                      color="primary"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="prihod_block_inner">
          <div className="kirim_right_inner_top">
            <h4>
              {tabIndex === 0 && t("bildirishnoma.kirim")}
              {tabIndex === 1 && t("bildirishnoma.chiqim")}
            </h4>
            <Button
              onClick={() => {
                setClose(false);
                setClose2(false);
              }}
              variant="contained"
              startIcon={<CloseIcon />}
            >
              {t("input.yop")}
            </Button>
          </div>
          <div className="kirim_right_inner_bottom">
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
                      <TableCell align="center">
                        {t("vosita.vositaturi")}
                      </TableCell>
                      <TableCell align="center">
                        {t("bildirishnoma.single.nomi")}
                      </TableCell>
                      <TableCell align="center">{t("input.ser")}</TableCell>
                      <TableCell align="center">
                        {t("bildirishnoma.single.miqdori")}
                      </TableCell>
                      <TableCell align="center">{t("input.barkod")}</TableCell>
                      <TableCell align="center">{t("input.yuk")}</TableCell>
                      <TableCell align="center">{t("input.rasm")}</TableCell>
                      <TableCell align="center">
                        {t("bildirishnoma.status")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {close &&
                      cur5.vositalar.map((el) => {
                        return (
                          <TableRow>
                            <TableCell align="center">
                              {el.vosita_turi.nomi}
                            </TableCell>
                            <TableCell align="center">
                              {el.vosita_nomi.nomi}
                            </TableCell>
                            <TableCell align="center">
                              {el.vosita_seryasi}
                            </TableCell>
                            <TableCell align="center">
                              {el.vosita_miqdori}
                            </TableCell>
                            <TableCell align="center">
                              {cur5?.kirim?.unique_raqam || t("input.mavjud")}
                            </TableCell>
                            <TableCell align="center">
                              {cur5?.kirim?.comment || t("input.mavjud")}
                            </TableCell>
                            <TableCell align="center">
                              {cur5?.kirim && cur5?.kirim.image ? (
                                <a
                                  href={`https://admin-mpbt.ssv.uz/static${
                                    cur5?.kirim && cur5.kirim.image
                                  }`}
                                  target="_blank"
                                >
                                  {t("yuk")}
                                </a>
                              ) : (
                                t("input.mavjud")
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {t("bildirishnoma.kirim")}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {close2 &&
                      cur6.vositalar.map((el) => {
                        return (
                          <Fragment key={el.id}>
                            <TableRow>
                              <TableCell align="center">
                                {el.vosita_turi.nomi}
                              </TableCell>
                              <TableCell align="center">
                                {el.vosita_nomi.nomi}
                              </TableCell>
                              <TableCell align="center">
                                {el.vosita_seryasi}
                              </TableCell>
                              <TableCell align="center">
                                {el.vosita_miqdori}
                              </TableCell>
                              <TableCell align="center">
                                {(cur6.chiqim && cur6?.chiqim?.unique_raqam) ||
                                  t("input.mavjud")}
                              </TableCell>
                              <TableCell align="center">
                                {(cur6.chiqim && cur6?.chiqim?.comment) ||
                                  t("input.mavjud")}
                              </TableCell>
                              <TableCell align="center">
                                {cur6?.chiqim && cur6?.chiqim.image ? (
                                  <a
                                    href={`https://admin-mpbt.ssv.uz/static${
                                      cur6?.chiqim && cur6.chiqim.image
                                    }`}
                                    target="_blank"
                                  >
                                    {t("yuk")}
                                  </a>
                                ) : (
                                  t("input.mavjud")
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {t("bildirishnoma.chiqim")}
                              </TableCell>
                              {/* <TableCell align="center">+ 1 &#10132; 1</TableCell> */}
                            </TableRow>
                          </Fragment>
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
  );
};

export default Prihod;

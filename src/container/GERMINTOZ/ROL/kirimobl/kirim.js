import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import useGet from "hooks/useGet";
import useTab from "hooks/useTab";
import { useCallback, useContext, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Contextvalue } from "../../../../context/context";
import Chiqimvss from "./chiqimvsb";
import "./kirim.scss";
import Kirimobl from "./kirimobl";
import { v4 } from "uuid";
import { get } from "lodash";

const PrihodObl = () => {
  const { t } = useTranslation();
  const [close, setClose] = useState(false);
  const [close2, setClose2] = useState(false);
  const [filter, setFilter] = useState();
  const { cur3, cur4 } = useContext(Contextvalue);
  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  console.log(filter);
  const {
    data: {
      kirim: { data: kirim = [], meta: metaKirim = {} } = {},
      chiqim: { data: chiqim = [], meta: metaChiqim = {} } = {},
    },
  } = useGet({
    url: `/omborxona/vssb/kirim/chiqim/malumotlar?page=${page}${
      filter ? `&date=${filter}` : ""
    }`,
  });

  const monitoringMapper = (data) =>
    data.map((item) => ({
      ...item?.chiqim,
      ...item?.kirim,
      vositalar: item.vositalar,
      date: item[`${tab === "1" ? "kirim" : "chiqim"}`]?.created_at?.split(
        " "
      )[0],
      time: item[`${tab === "1" ? "kirim" : "chiqim"}`]?.created_at?.split(
        " "
      )[1],
    }));
  const maxLengthVositalar = (data = []) => {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].vositalar.length > max) {
        max = data[i].vositalar?.length;
      }
    }
    const result = [];
    for (let i = 0; i < max; i++) {
      result.push(
        { label: "Vosita nomi", key: `vositalar[${i}].vosita_nomi.nomi` },
        { label: "Vosita turi", key: `vositalar[${i}].vosita_turi.nomi` },
        { label: "Vosita seriyasi", key: `vositalar[${i}].vosita_seryasi` },
        { label: "Miqdori", key: `vositalar[${i}].vosita_miqdori` }
      );
    }
    return result;
  };
  const { handleTabChange, tab } = useTab();
  console.log(cur3);
  return (
    <div className="prihod">
      <div className="prihod_top">
        <div className="prihod_top_inner">
          <Link to="/vsbsklad">
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
            data={monitoringMapper(tab === "1" ? kirim : chiqim)}
            headers={[
              { label: "Sanasi", key: "date" },
              { label: "Vaqti", key: "time" },
              { label: "Partiya raqami", key: "partiya_raqam" },
              { label: "Yuk xati", key: "comment" },
              { label: "Barkod", key: "unique_raqam" },
              ...maxLengthVositalar(tab === 0 ? kirim : chiqim),
            ]}
            filename={tab === "1" ? "Kirimlar" : "Chiqimlar"}
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <DatePicker
                className="search-ariza"
                format="DD.MM.YYYY"
                value={filter}
                onChange={(e) => setFilter(dayjs(e).format("YYYY-MM-DD"))}
              />
              {filter ? (
                <Button
                  onClick={() => setFilter(null)}
                  startIcon={<ClearIcon />}
                />
              ) : null}
            </div>
          </div>
          <div className="prihod_block_inner_middle">
            <div className="card_blocks">
              <TabContext value={tab}>
                <Box sx={{}}>
                  <TabList
                    onChange={(e, v) => {
                      handleTabChange(v);
                      setPage(1);
                    }}
                    aria-label="lab API tabs example"
                    className="n-tabs"
                  >
                    <Tab label={t("bildirishnoma.kirim")} value="1" />
                    <Tab label={t("bildirishnoma.chiqim")} value="2" />
                  </TabList>
                  <TabPanel value="1" style={{ padding: 0 }}>
                    <div style={{ overflowY: "scroll", height: "500px" }}>
                      <Kirimobl setClose={setClose} kirim={kirim} />
                    </div>

                    <div className="table-pagination-content">
                      <Pagination
                        page={page}
                        count={metaKirim?.total_pages ?? 1}
                        onChange={(e, page) => handleChangePage(page)}
                        color="primary"
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value="2" style={{ padding: 0 }}>
                    <div style={{ overflowY: "scroll", height: "500px" }}>
                      <Chiqimvss setClose2={setClose2} data={chiqim} />
                    </div>
                    <div className="table-pagination-content">
                      <Pagination
                        page={page}
                        count={metaChiqim?.total_pages ?? 1}
                        onChange={(e, page) => handleChangePage(page)}
                        color="primary"
                      />
                    </div>
                  </TabPanel>
                </Box>
              </TabContext>
            </div>
          </div>
        </div>
        <div className="prihod_block_inner">
          <div className="kirim_right_inner_top">
            {
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
            }
          </div>

          <div className="kirim_right_inner_bottom">
            <div className="kirim_right_inner_bottom_top"></div>
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
                        {t("bildirishnoma.single.nomi")}
                      </TableCell>
                      <TableCell align="center">
                        {t("vosita.vositaturi")}
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
                      cur3.vositalar?.map((item) => (
                        <TableRow key={v4()}>
                          <TableCell align="center">
                            {item.vosita_nomi.nomi}
                          </TableCell>
                          <TableCell align="center">
                            {item.vosita_turi.nomi}
                          </TableCell>
                          <TableCell align="center">
                            {cur3 &&
                            cur3.vositalar[0] &&
                            cur3.vositalar[0].vosita_seryasi
                              ? cur3.vositalar[0].vosita_seryasi
                              : t("input.mavjud")}
                          </TableCell>
                          <TableCell align="center">
                            {item.vosita_miqdori}
                          </TableCell>
                          <TableCell align="center">
                            {cur3.kirim?.unique_raqam
                              ? cur3.kirim.unique_raqam
                              : t("bola.kir")}
                          </TableCell>
                          <TableCell align="center">
                            {cur3.kirim && cur3.kirim.comment}
                          </TableCell>
                          <TableCell align="center">
                            {get(cur3, "kirim.image") ? (
                              <a
                                href={`https://radmin-mpbt.ssv.uz/static${cur3?.kirim?.image}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {t("Rasm yuklab olish")}
                              </a>
                            ) : (
                              t("input.mavjud")
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {t("bildirishnoma.kirim")}
                          </TableCell>
                        </TableRow>
                      ))}
                    {close2 && cur4?.vositalar?.length > 0
                      ? cur4.vositalar?.map((item) => (
                          <TableRow key={v4()}>
                            <TableCell align="center">
                              {item.vosita_nomi.nomi}
                            </TableCell>
                            <TableCell align="center">
                              {item.vosita_turi.nomi}
                            </TableCell>
                            <TableCell align="center">
                              {item.vosita_seryasi}
                            </TableCell>
                            <TableCell align="center">
                              {item.vosita_miqdori}
                            </TableCell>
                            <TableCell align="center">
                              {cur4.chiqim?.unique_raqam
                                ? cur4.chiqim.unique_raqam
                                : t("bola.kir")}
                            </TableCell>
                            <TableCell align="center">
                              {cur4.chiqim && cur4.chiqim.comment}
                            </TableCell>
                            <TableCell align="center">
                              {cur4.chiqim.image ? (
                                <a
                                  href={`https://admin-mpbt.ssv.uz/static${
                                    cur4.chiqim && cur4.chiqim.image
                                  }`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t("Rasm yuklab olish")}
                                </a>
                              ) : (
                                t("input.mavjud")
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {t("bildirishnoma.chiqim")}
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
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

export default PrihodObl;

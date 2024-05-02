import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import {
  Box,
  Button,
  Modal,
  Pagination,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { request } from "../../../../api/request";
import l1 from "../../../../assets/icon/l1.svg";
import Loading from "../../../../components/loading/loading";
import Chiqimrmo from "../rmokirim_chiqim/chiqim/chiqimrmo";
import "./omborhona.scss";
import { get } from "lodash";
import useGet from "hooks/useGet";
import { v4 } from "uuid";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Rmosklad() {
  const [opense, setOpense] = React.useState(false);
  const [opense2, setOpense2] = React.useState(false);
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState("s");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    background: "white",
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloses = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpense(false);
    setOpense2(false);
  };
  const [opens2, setOpens2] = useState(false);
  const [opens1, setOpens1] = useState(false);

  const [detail, setDetail] = useState({ shu_oy_chiqim: [], shu_oy_kirim: [] });
  const { t } = useTranslation();
  const token = window.localStorage.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGet({
    url: `/omborxona/ttb/malumotlar?page=${page}`,
  });
  // const handleChangePage = React.useCallback((page) => {
  //   setPage(page);
  // }, []);

  const [loading, setLoading] = useState(false);
  const handlerDetail = (e) => {
    setLoading(true);
    request
      .get(`/omborxona/vositalar/ttb?vosita=${e}`, config)
      .then((res) => {
        setDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setOpens2(true);
  };

  const excelData = useMemo(() => {
    let result = [];
    let hozirgi_oy_kirim = get(data, "hozirgi_oy_kirim");
    let otgan_oy_qoldiq = get(data, "otgan_oy_qoldiq");
    let shu_oy_mavjud = get(data, "shu_oy_mavjud");
    get(data, "hozirgi_oy_chiqim.data", []).forEach((item, index) => {
      result.push({
        ...item,
        ...hozirgi_oy_kirim.data[index],
        ...otgan_oy_qoldiq.data[index],
        ...shu_oy_mavjud.data[index],
      });
    });
    return result;
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="" style={{ paddingRight: "20px" }}>
      <div className="sklad_top_block">
        <div className="sklad_top_block_inner">
          <h1 className="sklad_title">{t("sidebar.li3")}</h1>
          <TextField
            id="outlined-basic"
            label={t("Vosita qidirish")}
            variant="outlined"
            style={{ minWidth: "250px" }}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="sklad_top"></div>
        </div>
        <div className="sklad_top_block_inner">
          <Link to={"/kirim"}>
            <Button
              variant="contained"
              size="large"
              startIcon={<HistoryIcon />}
            >
              {t("bildirishnoma.kir")}
            </Button>
          </Link>
          <Chiqimrmo />

          <CSVLink
            data={excelData}
            headers={[
              { label: "Vosita nomi", key: "vosita_nomi" },
              { label: "O'tgan oyning qoldig'i", key: "otgan_oy_qoldiq" },
              { label: "Kirim", key: "kirim" },
              { label: "Chiqim", key: "chiqim" },
              { label: "Qoldiq", key: "shu_oy_qoldiq" },
            ]}
            filename="Omborxona"
            separator=";"
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              className={""}
              startIcon={<DescriptionIcon />}
            >
              {t("bola.excel")}
            </Button>
          </CSVLink>
        </div>
      </div>

      <div className="sklad">
        {/* <h2 className="sklad-head">{t("jihoz.j10")}</h2> */}
        <TableContainer style={{ borderRadius: "12px" }} component={Paper}>
          <Table
            style={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <span className="font-700">
                    {t("bildirishnoma.single.soni")}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-700">
                    {t("bildirishnoma.single.nomi")}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-700"> {t("bildirishnoma.qoldig")}</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-700"> {t("bildirishnoma.kirim")}</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-700"> {t("bildirishnoma.chiqim")}</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-700"> {t("bildirishnoma.qoldiq")}</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-700">{t("bildirishnoma.harakat")}</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {excelData &&
                excelData.map((el, index) => {
                  return (
                    <Fragment key={v4()}>
                      <TableRow>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{el.vosita_nomi}</TableCell>
                        <TableCell align="center">
                          {el.otgan_oy_qoldiq}
                        </TableCell>
                        <TableCell align="center">{el.kirim}</TableCell>
                        <TableCell align="center">{el.chiqim}</TableCell>
                        <TableCell align="center">{el.shu_oy_qoldiq}</TableCell>
                        <TableCell align="center">
                          <div onClick={() => handlerDetail(el.vosita_id)}>
                            <img src={l1} alt={el.vosita_nomi} />
                          </div>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div className="table-pagination-content">
          <Pagination
            page={page}
            count={meta?.total_pages ?? 1}
            onChange={(e, page) => handleChangePage(page)}
            color="primary"
          />
        </div> */}
      </div>
      <div className="modal_manitoring_seans">
        <Modal
          keepMounted
          open={opens2}
          onClose={() => setOpens2(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box className="modal-one" sx={{ ...style }}>
            <div
              className="seans_modal"
              style={{ height: "90vh", overflowY: "scroll" }}
            >
              <Tabs
                style={{ marginBottom: "20px", borderBottom: "1px solid" }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label={t("bildirishnoma.kirim")} />
                <Tab label={t("bildirishnoma.chiqim")} />
              </Tabs>

              <h4 className="seans_modal_title">{t("vosita.mal")}</h4>
              {value === 0 && (
                <>
                  {detail.shu_oy_kirim &&
                    detail.shu_oy_kirim.map((el, index) => {
                      return (
                        <div className="seans_modal_inner" key={v4()}>
                          <div className="seans_modal_inner_top">
                            <p className="seans_modal_inner_desc">
                              {index + 1}
                            </p>
                          </div>
                          <div className="seans_modal_inner_bottom">
                            <div className="seans_modal_inner_bottom_left">
                              <p className="">
                                {t("bildirishnoma.single.nomi")}
                              </p>
                              <p className="">{t("vosita.vositaturi")}</p>
                              <p className="">
                                {t("bildirishnoma.single.seriyasi")}
                              </p>
                              <p className="">{t("vosita.miq")}</p>
                              <p className="">{t("vosita.miq")}</p>
                            </div>
                            <div className="seans_modal_inner_bottom_left">
                              <p className="">{el.vosita_nomi.nomi}</p>
                              <p className="">{el.vosita_turi.nomi}</p>
                              <p className="">{el.vosita_seryasi}</p>
                              <p className="">{el.vosita_miqdori}</p>
                              <p className="">{el.created_at}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  <div className="mt-20">{loading && "Yuklanmoqda..."}</div>
                  <div>
                    {!loading && !detail.shu_oy_kirim?.length
                      ? t("Kirimlar mavjud emas")
                      : ""}
                  </div>
                </>
              )}
              {value === 1 && (
                <>
                  {detail?.shu_oy_chiqim &&
                    detail.shu_oy_chiqim.map((el, index) => {
                      return (
                        <div className="seans_modal_inner" key={v4()}>
                          <div className="seans_modal_inner_top">
                            <p className="seans_modal_inner_desc">
                              {index + 1}
                            </p>
                          </div>
                          <div className="seans_modal_inner_bottom">
                            <div className="seans_modal_inner_bottom_left">
                              <p className="">
                                {t("bildirishnoma.single.nomi")}
                              </p>
                              <p className="">{t("vosita.vositaturi")}</p>
                              <p className="">
                                {t("bildirishnoma.single.seriyasi")}
                              </p>
                              <p className="">{t("vosita.miq")}</p>
                              <p className="">{t("Chiqim qilingan sana")}</p>
                            </div>
                            <div className="seans_modal_inner_bottom_left">
                              <p className="">{el.vosita_nomi.nomi}</p>
                              <p className="">{el.vosita_turi.nomi}</p>
                              <p className="">
                                {el.vosita_seryasi
                                  ? el.vosita_seryasi
                                  : t("bola.kir")}
                              </p>
                              <p className="">{el.vosita_miqdori}</p>
                              <p className="">{el.created_at}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  <div className="mt-20">{loading && "Yuklanmoqda..."}</div>
                  <div>
                    {!loading && !detail.shu_oy_chiqim?.length
                      ? t("Chiqimlar mavjud emas")
                      : ""}
                  </div>
                </>
              )}
            </div>
          </Box>
        </Modal>
      </div>
      <div className="modal_manitoring_seans_info">
        <Modal
          keepMounted
          open={opens1}
          onClose={() => setOpens1(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box className="modal-one" sx={{ ...style, width: 500 }}>
            <div className="modal_info_seans">
              <div className="block_one">
                <Button
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => setOpens1(false)}
                >
                  n n j
                </Button>
                <h4 className="seans_modal_title">{t("input.qil")}</h4>
              </div>
              <div className="partiya_number">
                <TextField
                  id="outlined-basic"
                  label={t("vosita.partiys")}
                  variant="outlined"
                />
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={opense} autoHideDuration={6000} onClose={handleCloses}>
          <Alert onClose={handleCloses} severity="error" sx={{ width: "100%" }}>
            Chiqim Qilinmadi!
          </Alert>
        </Snackbar>
        <Snackbar open={opense2} autoHideDuration={6000} onClose={handleCloses}>
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

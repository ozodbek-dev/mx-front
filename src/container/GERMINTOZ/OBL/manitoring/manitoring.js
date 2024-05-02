import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import l1 from "assets/icon/l1.svg";
import l4 from "assets/icon/l4.svg";
import Koriklar from "components/component/seanslar/koriklar";
import dayjs from "dayjs";
import useGet from "hooks/useGet";
import { get, isArray } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import "./manitoring.scss";

const Monitoringobl = () => {
  const handleSeansClose = () => {
    setSeans(false);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardid, setCardid] = useState();
  const [comid, setComid] = useState();
  const [close, setClose] = useState(false);
  const [value, setValue] = useState("0");
  const [bemId, setBemId] = useState(null);
  const [query, setQuery] = useState({});
  console.log(cardid);

  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  const vsb = localStorage.getItem("vsb");

  const handleChanges = (event, newValue) => {
    handleChangePage(1);
    setValue(newValue);
    setCardid(null);
    setComid(null);
  };
  const [seans, setSeans] = useState(false);
  function Seansbemor(e) {
    setBemId(e);
    setSeans(true);
  }
  const { t } = useTranslation();
  const ttbChange = (e) => {
    handleChangePage(1);
    setQuery({ ttb: e.target.value });
    setSearchParams({ ttb: e.target.value });
  };
  const oshpChange = (e) => {
    handleChangePage(1);
    setQuery((prev) => ({ ...prev, targetid: e.target.value }));
    setSearchParams({ ...query, targetid: e.target.value });
  };
  const removeOshp = () => {
    handleChangePage(1);
    setQuery({ ttb: get(query, "ttb") });
    setSearchParams({ ttb: get(query, "ttb") });
  };

  const { data: regions } = useGet({ url: "/hududlar/" });

  const findName =
    regions &&
    Object.keys(regions).find((el) => +regions[el].viloyat_id === +vsb);
  const findRegion =
    findName &&
    Object.keys(regions[findName])
      .filter((item) => item !== "viloyat_id")
      .find((el) => regions[findName][el].tuman_id == get(query, "ttb"));

  const {
    data: { data: kirim = [], meta: kirimMeta = {} },
  } = useGet({
    url: `/omborxona/vssb/vositalar/manitoringi?page=${page}${
      query?.ttb ? `&tuman=${get(query, "ttb")}` : ""
    }&status=kirim`,
    enabled: !!get(query, "ttb"),
  });

  const {
    data: { data: chiqim = [], meta: chiqimMeta = {} },
  } = useGet({
    url: `/omborxona/vssb/vositalar/manitoringi?page=${page}${
      query?.ttb ? `&tuman=${get(query, "ttb")}` : ""
    }&status=chiqim`,
    enabled: !!get(query, "ttb"),
  });

  const {
    data: { data = [], meta = {} },
  } = useGet({
    url: `/omborxona/vssb/vositalar/manitoringi?page=${page}${
      query?.ttb ? `&tuman=${get(query, "ttb")}` : ""
    }${query?.targetid ? `&muassasa=${get(query, "targetid")}` : ""}`,
    enabled: !!get(query, "targetid"),
  });

  useEffect(() => {
    if (searchParams.get("targetid"))
      setQuery((prev) => ({
        ...prev,
        targetid: +searchParams.get("targetid"),
      }));
    if (searchParams.get("ttb"))
      setQuery((prev) => ({ ...prev, ttb: +searchParams.get("ttb") }));
  }, []);

  const monitoringMapper = (data) =>
    data.map((item) => ({
      ...item,
      date: dayjs(
        get(item, "kirim_chiqim.created_at"),
        "DD.MM.YYYY HH:mm"
      ).format("DD-MM-YYYY"),
      time: dayjs(
        get(item, "kirim_chiqim.created_at"),
        "DD.MM.YYYY HH:mm"
      ).format("HH:mm"),
    }));

  return (
    <div className="monitoring">
      <div className="monitoring-header">
        <div>
          <FormControl
            style={{
              width: "385px",
              backgroundColor: "#fff",
              marginTop: "20px",
            }}
            fullWidth
          >
            <InputLabel id="demo-simple-select-label">
              {t("pdf.rmo")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t("bildirishnoma.single.nomiinput")}
              onChange={(e) => ttbChange(e)}
              value={get(query, "ttb") || ""}
            >
              {findName &&
                Object.keys(regions[findName])
                  .filter((item) => item !== "viloyat_id")
                  .map((el, index) => (
                    <MenuItem
                      key={index}
                      value={regions[findName][el].tuman_id}
                    >
                      {el}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
          <FormControl
            style={{
              width: "385px",
              backgroundColor: "#fff",
              marginLeft: "36px",
              marginTop: "20px",
            }}
            fullWidth
          >
            <InputLabel id="demo-simple-select-label">
              {t("pdf.oshp")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t("bildirishnoma.single.nomiinput")}
              // disabled={!get(ttb,"ttb")}
              value={get(query, "targetid") || ""}
              onChange={(e) => oshpChange(e)}
              inputProps={{
                IconComponent: () => (
                  <Button onClick={removeOshp} startIcon={<ClearIcon />} />
                ),
              }}
            >
              {findRegion &&
                Object.keys(regions[findName][findRegion])
                  .filter((item) => item !== "tuman_id")
                  .map((el, index) => (
                    <MenuItem
                      key={index}
                      value={regions[findName][findRegion][el].id}
                    >
                      {el}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </div>
        <CSVLink
          data={monitoringMapper(value === "0" ? kirim : chiqim)}
          headers={[
            { label: "Sanasi", key: "date" },
            { label: "Vaqti", key: "time" },
            { label: "Partiya raqami", key: "kirim_chiqim.partiya_raqam" },
            { label: "Barkod", key: "kirim_chiqim.unique_raqam" },
            { label: "Vosita nomi", key: "vosita_nomi.nomi" },
            { label: "Vosita turi", key: "vosita_turi.nomi" },
            { label: "Vosita seriyasi", key: "vosita_seryasi" },
            { label: "Miqdori", key: "vosita_miqdori" },
            { label: "Yuk xati", key: "kirim_chiqim.comment" },
          ]}
          filename={value === "0" ? "Kirimlar" : "Chiqimlar"}
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
      {!get(query, "targetid") && (
        <>
          <div style={{ display: "flex", marginTop: "28px" }}></div>
          <div className="prihod_block">
            <div className="prihod_block_inner">
              <div className="prihod_block_inner_top">
                <h4 className="prihod_block_inner_title">{t("input.sps")}</h4>
              </div>
              <div className="prihod_block_inner_middle">
                {!kirim.length || !chiqim.length ? (
                  <p>{t("bildirishnoma.region")}</p>
                ) : null}

                {kirim.length || chiqim.length ? (
                  <TabContext value={value}>
                    <Box>
                      <TabList
                        style={{ backgroundColor: "#fff" }}
                        onChange={handleChanges}
                        aria-label="basic tabs example"
                      >
                        <Tab value={"0"} label={t("bildirishnoma.kirim")} />
                        <Tab value={"1"} label={t("bildirishnoma.chiqim")} />
                      </TabList>
                      <TabPanel value="0">
                        <div
                          style={{ height: "600px", overflowY: "scroll" }}
                          className="card_blocks"
                        >
                          {kirim.map((item) => {
                            return (
                              <div className="kirim_card" key={v4()}>
                                <div className="kirim_card_left">
                                  <Button
                                    // variant="contained"
                                    // color="primary"
                                    size="large"
                                    startIcon={<CallReceivedIcon />}
                                  ></Button>
                                  <p>
                                    {t("shifokor.jami")}: {item.vosita_miqdori}
                                  </p>
                                </div>
                                <div className="kirimvositanomi">
                                  <div className="kirimvositanomi__div">
                                    <span>
                                      {/* Vos""it Nomi:{" "} */}
                                      {t("bildirishnoma.single.nomi")}:{""}
                                      {item.vosita_nomi &&
                                        item.vosita_nomi.nomi}
                                    </span>
                                  </div>
                                  <div className="kirimvositanomi__div">
                                    <span>
                                      {t("vosita.vositaturi")}:{""}
                                      {item.vosita_turi &&
                                        item.vosita_turi.nomi}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="kirim_card_right"
                                  style={{ justifyContent: "flex-end" }}
                                >
                                  <div className="kirim_card_right_left">
                                    <p>
                                      {dayjs(
                                        item.kirim_chiqim.created_at,
                                        "DD.MM.YYYY"
                                      ).format("DD.MM.YYYY")}
                                    </p>
                                    <span>
                                      {dayjs(
                                        item.kirim_chiqim.created_at,
                                        "DD.MM.YYYY HH:mm"
                                      ).format("HH:mm")}
                                    </span>
                                  </div>
                                  <div className="kirim_card_right_left">
                                    <Button
                                      onClick={() => {
                                        setComid(item.id);
                                        setClose(true);
                                      }}
                                    >
                                      <img src={l1} alt="..." />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="table-pagination-content">
                          <Pagination
                            page={page}
                            count={kirimMeta?.total_pages ?? 1}
                            onChange={(e, page) => handleChangePage(page)}
                            color="primary"
                          />
                        </div>
                      </TabPanel>
                      <TabPanel value="1">
                        <div
                          style={{ height: "600px", overflowY: "scroll" }}
                          className="card_blocks"
                        >
                          {chiqim.map((item) => {
                            return (
                              <div
                                className="kirim_card chiqim_card"
                                key={v4()}
                              >
                                <div className="kirim_card_left chiqim_card_left">
                                  <Button
                                    size="large"
                                    startIcon={<CallMadeIcon />}
                                  ></Button>
                                  <p>
                                    {t("shifokor.jami")}: {item.vosita_miqdori}
                                  </p>
                                </div>
                                <div className="chiqim_card_center">
                                  <div className="kirim_card_center_top">
                                    <div className="top_left">
                                      <p>{t("bildirishnoma.send")}:</p>
                                      <h5>
                                        {item.kirim_chiqim &&
                                          item.kirim_chiqim
                                            .chiqim_qilingan_tashkilot}
                                      </h5>
                                    </div>
                                    <div className="top_left">
                                      <p>{t("input.barkod")}:</p>
                                      <h5>
                                        {item.kirim_chiqim &&
                                        item.kirim_chiqim.unique_raqam
                                          ? item.kirim_chiqim.unique_raqam
                                          : "Kiritilmagan"}
                                      </h5>
                                    </div>
                                    <div className="top_right">
                                      <div className="kirim_card_right_left">
                                        <p>
                                          {dayjs(
                                            item.kirim_chiqim.created_at,
                                            "DD.MM.YYYY"
                                          ).format("DD.MM.YYYY")}
                                        </p>
                                        <span>
                                          {dayjs(
                                            item.kirim_chiqim.created_at,
                                            "DD.MM.YYYY HH:mm"
                                          ).format("HH:mm")}
                                        </span>
                                      </div>
                                      <div className="kirim_card_right_left">
                                        <Button
                                          onClick={() => {
                                            setCardid(item.id);
                                            setClose(true);
                                          }}
                                        >
                                          <img src={l1} alt="...." />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bottom">
                                    <div>
                                      <span>
                                        {t("bildirishnoma.single.nomi")}:
                                        {item.vosita_nomi &&
                                          item.vosita_nomi.nomi}
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        {t("vosita.vositaturi")}:{" "}
                                        {item.vosita_turi &&
                                          item.vosita_turi.nomi}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="table-pagination-content">
                          <Pagination
                            page={page}
                            count={chiqimMeta?.total_pages ?? 1}
                            onChange={(e, page) => handleChangePage(page)}
                            color="primary"
                          />
                        </div>
                      </TabPanel>
                    </Box>
                  </TabContext>
                ) : null}
              </div>
            </div>
            <div className="prihod_block_inner">
              <div className="kirim_right_inner_top">
                <h4>
                  {t("bildirishnoma.kirim")} {t("bildirishnoma.chiqim")}{" "}
                </h4>
                <Button
                  onClick={() => setClose(false)}
                  variant="contained"
                  startIcon={<CloseIcon />}
                >
                  {t("input.yop")}
                </Button>
              </div>
              {close && (
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
                              {t("bildirishnoma.single.nomi")}
                            </TableCell>
                            <TableCell align="center">Vositani Turi</TableCell>
                            <TableCell align="center">
                              Vositani Seriyasi
                            </TableCell>
                            <TableCell align="center">
                              {t("bildirishnoma.single.miqdori")}
                            </TableCell>
                            <TableCell align="center">
                              {t("input.barkod")}
                            </TableCell>
                            <TableCell align="center">
                              {t("input.yuk")}
                            </TableCell>
                            <TableCell align="center">Rasm Yuklash</TableCell>
                            <TableCell align="center">
                              {t("bildirishnoma.status")}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {value === "0" &&
                            kirim
                              ?.filter((item) => +item.id === +comid)
                              .map((el) => {
                                return (
                                  <TableRow key={v4()}>
                                    <TableCell align="center">
                                      {el.vosita_nomi && el.vosita_nomi.nomi}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.vosita_turi && el.vosita_turi.nomi}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.vosita_seryasi}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.vosita_miqdori}
                                    </TableCell>
                                    <TableCell align="center">
                                      Mavjud Emas
                                    </TableCell>
                                    <TableCell align="center">
                                      Mavjud Emas
                                    </TableCell>
                                    <TableCell align="center">
                                      Mavjud Emas
                                    </TableCell>
                                    <TableCell align="center">
                                      {t("bildirishnoma.kirim")}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          {value === "1" &&
                            chiqim
                              .filter((item) => item.id === cardid)
                              .map((el) => {
                                return (
                                  <TableRow key={v4()}>
                                    <TableCell align="center">
                                      {el.vosita_nomi && el.vosita_nomi.nomi}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.vosita_turi && el.vosita_turi.nomi}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.vosita_seryasi}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.vosita_miqdori}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.kirim_chiqim.unique_raqam}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.kirim_chiqim.comment}
                                    </TableCell>
                                    <TableCell align="center">
                                      {el.kirim_chiqim.image ? (
                                        <a
                                          href={`https://admin-mpbt.ssv.uz/static${el.kirim_chiqim.image}`}
                                          target="_blank"
                                          rel="opener noreferrer"
                                        >
                                          {t("yuk")}
                                        </a>
                                      ) : (
                                        t("Mavjud emas")
                                      )}
                                    </TableCell>
                                    <TableCell align="center">
                                      {t("bildirishnoma.chiqim")}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {get(query, "targetid") && (
        <>
          <TableContainer style={{ marginTop: "24px" }} component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow style={{ backgroundColor: "white" }}>
                  <TableCell>{t("shifokor.number")}</TableCell>
                  <TableCell align="left">{t("input.pfl")}</TableCell>
                  <TableCell align="left">
                    {t("shifokor.alladd.name")} {t("shifokor.alladd.surname")}{" "}
                    {t("shifokor.alladd.otch")}
                  </TableCell>
                  <TableCell align="left">{t("shifokor.birthday")}</TableCell>
                  <TableCell align="center">{t("shifokor.batafsil")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((el) => {
                  return isArray(el)
                    ? el?.map((row, index) => (
                        <TableRow key={v4()}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">{row.JSHSHIR}</TableCell>
                          <TableCell align="left">{`${row.familiya} ${row.ism} ${row.otasining_ismi}`}</TableCell>
                          <TableCell align="left">
                            {row.tugilgan_sana}
                          </TableCell>
                          <TableCell align="right">
                            <div className="button_modal button_modal_1">
                              <Link
                                to={`/vsbsingle/${row.id}`}
                                className="single_info"
                              >
                                <img
                                  className="delete_icon"
                                  src={l1}
                                  alt="batafsil"
                                />
                              </Link>
                              <div className="seans_div">
                                <Button
                                  className="seanslar_btn_muassasa"
                                  onClick={() => Seansbemor(row.id)}
                                >
                                  <img src={l4} alt="..." />
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    : "";
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="table-pagination-content">
            <Pagination
              page={page}
              count={meta?.total_pages ?? 1}
              onChange={(e, page) => handleChangePage(page)}
              color="primary"
            />
          </div>
          <div className="modal_seans">
            <Koriklar id={bemId} open={seans} handleClose={handleSeansClose} />
          </div>
        </>
      )}
    </div>
  );
};

export default Monitoringobl;

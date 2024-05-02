import {
  Box,
  Button,
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
import { GetData, request } from "api/request";
import l1 from "assets/icon/l1.svg";
import qs from "qs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { v4 } from "uuid";

const Erkin = ({ arr, search = "" }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState();
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value, setValue] = useState(0);

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
      padding: "10px",
      width: "80%",
      margin: "30px auto 0 auto",
      borderRadius: "12px",
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

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (value === 0) {
      request
        .get("/bildirishnoma/viloyatga/", config)
        .then((data) => setData4(data.data.data));
    }
    if (value === 1) {
      request
        .get("/bildirishnoma/erkin/VSSBdan/", config)
        .then((data) => setData(data.data.data));

      request
        .get("/bildirishnoma/viloyat/", config)
        .then((data) => setData2(data.data.data));
    }

    GetData(`omborxona/tizimli/xabarnoma/vssb`, token)
      .then((data) => {
        setData5(data);
      })
      .catch((err) => console.log(err));
  }, [value]);
  let statusCount2 = 0;
  arr?.forEach((item) => {
    if (item.status === "Yuborildi") {
      statusCount2++;
    }
  });
  let statusCount = 0;
  data4?.forEach((item) => {
    if (item.status === "Yuborildi") {
      statusCount++;
    }
  });

  const knop = (e) => {
    const formData = new FormData();
    formData.append("id", e.id);
    formData.append("Yuboruvchi", e.new);
    formData.append("status", "O'qildi");
    if (value2 === 0)
      request.put("/bildirishnoma/viloyat/erkin/", formData, config);
    else {
      request.post("/bildirishnoma/viloyatga/", formData, config);
    }
  };
  const { t } = useTranslation();
  const filterArr = (arr = []) => {
    return arr?.filter(
      (item) =>
        item.kimdan.toLowerCase().includes(search.toLowerCase()) ||
        item.kimga.toLowerCase().includes(search.toLowerCase())
    );
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleTabChange = (v) => {
    setValue(v);
    navigate(
      `${location.pathname}?${qs.stringify({
        ...qs.parse(location.search.slice(1)),
        mtab: v,
      })}`
    );
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    navigate(
      `${location.pathname}?${qs.stringify({
        ...qs.parse(location.search.slice(1)),
        value2: newValue,
      })}`
    );
  };
  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
    navigate(
      `${location.pathname}?${qs.stringify({
        ...qs.parse(location.search.slice(1)),
        value3: newValue,
      })}`
    );
  };

  useEffect(() => {
    if (searchParams.get("mtab")) {
      setValue(+searchParams.get("mtab"));
    }
    if (searchParams.get("value2")) {
      setValue2(+searchParams.get("value2"));
    }
    if (searchParams.get("value3")) {
      setValue3(+searchParams.get("value3"));
    }
  }, []);
  return (
    <div className="">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          style={{ backgroundColor: "#fff" }}
          value={value}
          onChange={(e, v) => handleTabChange(v)}
          aria-label="basic tabs example"
        >
          <Tab value={0} label={t("qabxar")} />
          <Tab value={1} label={t("yubxar")} />
          <Tab value={2} label={t("vosita.tizim")} />
        </Tabs>
        {value === 0 && (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              style={{ backgroundColor: "#fff" }}
              value={value2}
              onChange={handleChange2}
              aria-label="basic tabs example"
            >
              <Tab label={t("vosita.erkin")} />
              <span
                style={
                  statusCount2 !== 0
                    ? {
                        fontWeight: "bold",
                        background: "blue",
                        borderRadius: "50%",
                        width: "22px",
                        height: "22px",
                        color: "white",
                        textAlign: "center",
                        paddingTop: "4px",
                        fontSize: "14px",
                      }
                    : null
                }
              >
                {statusCount2 !== 0 && statusCount2}
              </span>

              <Tab label={t("vosita.bola")} />
              {/* <span
                style={{
                  fontWeight: "bold",
                  background: "blue",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "4px",
                  fontSize: "14px",
                }}
              >
                {" "}
                {statusCount}
              </span> */}
            </Tabs>
          </Box>
        )}
        {value === 1 && (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              style={{ backgroundColor: "#fff" }}
              value={value3}
              onChange={handleChange3}
              aria-label="basic tabs example"
            >
              <Tab label={t("vosita.erkin")} />

              <Tab label={t("vosita.bola")} />
            </Tabs>
          </Box>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead className="tablle_head_with_bold_style">
            <TableRow style={{ backgroundColor: "white" }}>
              <TableCell> {t("bildirishnoma.soni")}</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">
                {t("bildirishnoma.single.kimdan")}
              </TableCell>

              <TableCell align="left">
                {value === 2 ? t("input.barkod") : t("bildirishnoma.new.mud")}
              </TableCell>
              {value !== 2 && (
                <TableCell align="left">{t("bildirishnoma.send")}</TableCell>
              )}

              <TableCell align="left">{t("bildirishnoma.sana")}</TableCell>
              <TableCell align="center">{t("bildirishnoma.status")}</TableCell>
              <TableCell align="center">{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {value === 0 && value2 === 0 && arr.length > 0
                ? filterArr(arr)?.map((item, index) => (
                    <TableRow key={v4()}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        {item.id}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        {item.kimdan}
                      </TableCell>
                      <TableCell align="left">{item.muddati}</TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        {item.kimga}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        {item.sana || item.created_at.slice(0, 10)}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="center"
                      >
                        <button
                          className={
                            item.status === "Yuborildi"
                              ? "status_btn"
                              : "status_btn--not"
                          }
                        >
                          {item.status === "Yuborildi"
                            ? t("bildirishnoma.arstatus.yangi")
                            : t("vosita.oqil")}
                        </button>
                      </TableCell>

                      <TableCell align="center">
                        <div className="button_modal button_modal_1">
                          {
                            <Link
                              to={`/Singlermo_viloyat/${item.id}/${item.Yuboruvchi}`}
                              className="single_info"
                              onClick={() => {
                                item.status === "Yuborildi" &&
                                  knop({ id: item.id, new: item.Yuboruvchi });
                              }}
                            >
                              <img
                                className="delete_icon"
                                src={l1}
                                alt="batafsil"
                              />
                            </Link>
                          }
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </>
            {value === 0 &&
              value2 === 2 &&
              filterArr(data4)?.map((el, index) => {
                return (
                  <TableRow key={v4()}>
                    <TableCell align="left">
                      {index + 1}
                      <div className="ariza_bgc"></div>
                    </TableCell>
                    <TableCell align="left">{el.id}</TableCell>
                    <TableCell align="left">{el.kimdan}</TableCell>
                    <TableCell align="left">{el.muddati}</TableCell>
                    <TableCell align="left">{el.kimga}</TableCell>
                    <TableCell align="left">{el.sana}</TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      <button
                        className={
                          el.status === "Yuborildi"
                            ? "status_btn"
                            : "status_btn--not"
                        }
                      >
                        {el.status === "Yuborildi"
                          ? t("bildirishnoma.arstatus.yangi")
                          : t("vosita.oqil")}
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          el.status === "Yuborildi" &&
                          knop({ id: el.id, new: el.kimdan })
                        }
                      >
                        <Link to={`/Comsbol/${el.id}`}>
                          <img src={l1} alt="batafsil" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            {value === 1 &&
              value3 === 0 &&
              filterArr(data)?.map((el, index) => {
                return (
                  <TableRow key={v4()}>
                    <TableCell align="left">
                      {index + 1}
                      <div className="ariza_bgc"></div>
                    </TableCell>
                    <TableCell align="left">{el.id}</TableCell>
                    <TableCell align="left">{el.kimdan}</TableCell>
                    <TableCell align="left">{el.muddati}</TableCell>
                    <TableCell align="left">{el.kimga}</TableCell>
                    <TableCell align="left">{el.sana}</TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      <button
                        className={
                          el.status === "Yuborildi"
                            ? "status_btn"
                            : "status_btn--not"
                        }
                      >
                        {el.status === "Yuborildi"
                          ? t("vosita.yubor")
                          : t("vosita.oqil")}
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/Comvsb/${el.id}`}>
                        <img src={l1} alt="batafsil" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}

            {value === 1 &&
              value3 === 1 &&
              filterArr(data2)?.map((el, index) => {
                return (
                  <TableRow key={v4()}>
                    <TableCell align="left">
                      {index + 1}
                      <div className="ariza_bgc"></div>
                    </TableCell>
                    <TableCell align="left">{el.id}</TableCell>
                    <TableCell align="left">{el.kimdan}</TableCell>
                    <TableCell align="left">{el.muddati}</TableCell>
                    <TableCell align="left">{el.kimga}</TableCell>
                    <TableCell align="left">{el.sana}</TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      <button
                        className={
                          el.status === "Yuborildi"
                            ? "status_btn"
                            : "status_btn--not"
                        }
                      >
                        {el.status === "Yuborildi"
                          ? t("vosita.yubor")
                          : t("vosita.oqil")}
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/Combol/${el.id}`}>
                        <img src={l1} alt="batafsil" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            {value === 2 &&
              data5
                ?.filter((item) =>
                  String(item.kirim_chiqim.unique_raqam)
                    .toLowerCase()
                    .includes(search)
                )
                ?.map((el, index) => {
                  return (
                    <TableRow key={v4()}>
                      <TableCell align="left">
                        {index + 1}
                        <div className="ariza_bgc"></div>
                      </TableCell>
                      <TableCell align="left">{el.id}</TableCell>
                      <TableCell align="left">Uzmedimpeks</TableCell>
                      <TableCell align="left">
                        {el.kirim_chiqim.unique_raqam}
                      </TableCell>
                      <TableCell align="left">
                        {el.created_at.split("T")[0]}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="center"
                      >
                        <button
                          className={
                            el.kirim_chiqim.qabul_qilish_status ===
                            "qabul_qilindi"
                              ? "status_btn"
                              : "status_btn--not2"
                          }
                        >
                          {el.kirim_chiqim.qabul_qilish_status ===
                          "qabul_qilindi"
                            ? t("bildirishnoma.arstatus.qabul")
                            : t("bildirishnoma.arstatus.qabulnot")}
                        </button>
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/inner-combol/${el.id}`}>
                          <img src={l1} alt="batafsil" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Erkin;

import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {forwardRef, useEffect, useState} from "react";
import "./singletable.scss";
import {Link, useParams} from "react-router-dom";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {useTranslation} from "react-i18next";
import {request} from "../../../../api/request";
import MuiAlert from "@mui/material/Alert";

const Rolarizasinglebssv = () => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  //  const [pass, setPass] = useState();
  const [noti, setNoti] = useState(false);
  const [notificationn, setNotificationn] = useState({
    state: "",
    text: "",
  });

  const handleClick = () => {
    setNoti(true);
  };

  const handlenoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNoti(false);
  };

  const [tit, setTit] = useState("");
  function change(e) {}
  const [newjihoz, setNewJihoz] = useState({
    isFetched: false,
    data: {},
    error: null,
  });

  const [checkblock, setCheckblock] = useState([]);

  function Send() {
    const formmdata = new FormData();
    formmdata.append("arizalar", checkblock);
    // for (var key in checkblock) {
    //   formmdata.append(key, checkblock[key]);
    //   setLoeder(true);
    // }

    request.post(`ariza/vssb/mohgayuborish/`, formmdata, config);
    console
      .log(formmdata, "formdata")
      .then((res) => {
        setNotificationn({
          state: "success",
          text: `Ariza yuborildi`,
        });
        setLoeder(false);
        setNewJihoz({
          isFetched: true,
          data: res.data,
          error: false,
        });
        console.log(res.data);
        handleClick(true);
      })
      .catch(function (err) {
        setNotificationn({
          state: "error",
          text: `Ariza yuborilmadi`,
        });
        setLoeder(false);
        handleClick(true);
        setNewJihoz({
          isFetched: false,
          data: [],
          error: err,
        });
        //  handleClick(true);
      });
    //  setInput({});
    //  handleClose();
    //  setEdi(false);
    setLoeder(true);
  }

  function addColumn(e) {
    if (checkblock && checkblock.length > 0) {
      let ss = checkblock.filter((elem) => elem == e);
      if (ss && ss.length > 0) {
        setCheckblock(checkblock.filter((item) => item != e));
      } else {
        setCheckblock([...checkblock, `${e}`]);
      }
    } else {
      setCheckblock([...checkblock, `${e}`]);
    }
  }

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
  const [age, setAge] = useState("");
  const [pass, setPass] = useState();
  const [num, setNum] = useState({
    from: 0,
    to: 0,
  });
  const [numarr, setNumarr] = useState([]);

  function numAdd() {
    setNumarr([...numarr, num]);
  }
  const File = (e) => {
    // setNames(true);
    setPass(e.target.files);
  };
  console.log("pass", pass);

  function numDel(e) {
    let delarr = [];
    delarr.push(...numarr);
    delarr.splice(e, 1);
    setNumarr(delarr);
  }
  console.log(numarr);

  const [person, setPerson] = useState([]);
  const [shifokorlar, setShifokorlar] = useState([]);
  const [delebemor, setDeleBemor] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [loader, setLoeder] = useState(true);
  const { t } = useTranslation();

  const [tab, setTab] = useState(false);

  const params = useParams();
  useEffect(() => {
    request
      .get("/ariza/moh/", config)
      .then((data) => {
        console.log(data);
        setPerson(data.data.data.find((el) => +el.id === +params.id));
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  console.log(params, "params99");
  console.log(person, "person99");
  // console.log(data["birlashtirilgan arizalar"],'person11');
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Link Link to={"/arizalar_ssv"}>
          <Button variant="contained">{t("bildirishnoma.single.ortga")}</Button>
        </Link>
      </div>
      <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.status")}
        </h4>
        {person?.status === "O'qildi" ? (
          <div className="status_info" style={{ background: "green" }}>
            <p className="status_info_title" style={{ color: "white" }}>
              {/* {t("bildirishnoma.single.statusinf")} */}
              {person?.status}
            </p>
          </div>
        ) : (
          <div className="status_info">
            <p className="status_info_title">
              {/* {t("bildirishnoma.single.statusinf")} */}
              {person?.status}
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
              <p className="info_single">
                {person?.date && person.date.slice(0, 10)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {person.ariza ? (
        <div
          className="rol_ariza_bottom_div_inner"
          style={{ marginTop: "20px" }}
        >
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.vosita")}
          </h4>
          <div className="single_table_all_block">
            <p className="single_table_all_title">
              {t("bildirishnoma.single.vositainf")} A
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
                          <TableCell>{t("vosita.i")} ID</TableCell>
                          <TableCell align="left">
                            {t("vosita.vositaturi")}
                          </TableCell>
                          <TableCell align="left">
                            {t("bildirishnoma.single.nomi")}
                          </TableCell>
                          <TableCell align="left">
                            {t("bildirishnoma.single.seriyasi")}
                          </TableCell>

                          <TableCell align="left">
                            {t("bildirishnoma.single.miqdori")}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {person?.ariza?.map(
                          (item, index) =>
                            item.vositalar &&
                            Object.keys(item.vositalar)?.map((it, index) => (
                              <TableRow>
                                <TableCell align="left">{it}</TableCell>
                                <TableCell align="left">
                                  {item.vositalar && item?.vositalar[it]}
                                </TableCell>
                              </TableRow>
                            ))
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
                        {person.ariza.map(
                          (item, index) =>
                            item.yosh_toifa &&
                            Object.keys(item.yosh_toifa).map((it, index) => (
                              <TableRow>
                                <TableCell align="left">{it}</TableCell>
                                <TableCell align="left">
                                  {item.yosh_toifa && item?.yosh_toifa[it]}
                                </TableCell>
                              </TableRow>
                            ))
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
                        {person.ariza.map(
                          (item, index) =>
                            item.oy_toifa &&
                            Object.keys(item.oy_toifa).map((it, index) => (
                              <TableRow>
                                <TableCell align="left">{it}</TableCell>
                                <TableCell align="left">
                                  {item.oy_toifa && item?.oy_toifa[it]}
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="single_table_document" style={{ marginTop: "20px" }}>
        <div className="t9">
          <div className="rol_ariza_bottom_div_inner">
            <div className="rol_ariza_bottom_div_inner_block">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.qoshimcha")}
              </h4>
              <div className="document_left_title_block">
                {/* <TextareaAutosize
                  className="document_left_title"
                  onChange={(e) => setTit(e.target.value)}
                >
                  {person?.qoshimcha}
                </TextareaAutosize> */}
                <p>{person?.qoshimcha}</p>
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
              <div className="rol_ariza_bottom_div_t6">
                <a
                  href={`https://${person?.fayl}`}
                  className="download_document_t9"
                >
                  <Button variant="contained" startIcon={<CloudDownloadIcon />}>
                    {t("input.yuklab")}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Button variant="contained" onClick={() => Send()}>
        {t("input.otp")}
      </Button> */}
    </div>
  );
};

export default Rolarizasinglebssv;

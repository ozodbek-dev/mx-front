import {
    Button,
    Fade,
    InputAdornment,
    Modal,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "./ariza.scss";
import {Link, useParams} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {useTranslation} from "react-i18next";
import l1 from "../../../assets/icon/l1.svg";
import l3 from "../../../assets/icon/l3.svg";
import {forwardRef, useEffect, useState} from "react";
import {request} from "../../../api/request";
import MuiAlert from "@mui/material/Alert";

export default function Arizassv() {
  const { t } = useTranslation();
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [pass, setPass] = useState();
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

  const token = window.localStorage.token;
  const muassasa_id = window.localStorage.muassasaId;
  const formData = new FormData();
  formData.append("token", token);
  const [loader, setLoeder] = useState(true);
  const [ariza, setAriza] = useState([]);
  const [sar, setSar] = useState([]);
  const [arr, setArr] = useState(true);
  const params = useParams();
  const [person, setPerson] = useState([]);
  

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
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = (e) => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [cl, setCl] = useState("sarflov");

  function Sarflovlar(e) {
    setAriza(sar.data.data.filter((item) => item.ariza_turi == e));
    setCl(e);
  }
  function change(e) {
    if (e.target.value.length > 1) {
      setAriza(
        ariza.filter((el) => el.sana.split(" ")[0].includes(e.target.value))
      );
    } else {
      setAriza(sar.data.data);
    }
  }
  const Data = ariza.filter((el) => el.ariza_turi === cl);

  const [newarr, setNewarr] = useState([]);
  const [newarr1, setNewarr1] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [active, setActive] = useState("");
  const [erkins, setErkins] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  const [erkins1, setErkins1] = useState({
    isFetched: false,
    data: {},
    error: null,
  });

  const [col, setCol] = useState(false);
  const [col1, setCol1] = useState(false);


  useEffect(() => {
    request
      .get(`/ariza/rmo/birlashtirish/`, config)
      .then(function (res) {
        setErkins1({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setNewarr(res.data);
        console.log(res.data);
        console.log();
      })
      .catch(function (err) {
        setErkins1({
          isFetched: false,
          data: [],
          error: err,
        });

        setLoeder(true);
      });
  }, [loader]);
  console.log("nee",newarr1);
  console.log("nee1",erkins1.data["birlashtirilgan arizalar"]);


  useEffect(() => {
    request
      .get(`/ariza/moh/`, config)
      .then(function (res) {
        setErkins({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setNewarr(res.data);
        console.log(res.data);
        console.log();
      })
      .catch(function (err) {
        setErkins({
          isFetched: false,
          data: [],
          error: err,
        });

        setLoeder(true);
      });
  }, [loader]);
  const [tab, setTab] = useState(false);
  const [checkboxs, setCheckboxs] = useState(false);
  const [checkblock, setCheckblock] = useState({});

  function addColumn(e, id) {
    let arizalar = []
    if (checkblock && checkblock?.bildirishnoma) {
      if (checkblock.bildirishnoma == id) {
        let ss = checkblock.arizalar.filter((elem) => elem == e);
        if (ss && ss.length > 0) {
          arizalar.push(...checkblock.arizalar.filter((item) => item != e))
          if ( arizalar.length > 0) {
          setCheckblock({ ...checkblock, arizalar: arizalar });
          }else{
            setCheckblock({bildirishnoma:null})
          }
        } else {
          arizalar.push(...checkblock.arizalar);
          arizalar.push(e)
          setCheckblock({...checkblock,arizalar:arizalar});
        }
      }else{
        setNotificationn({
          state: "error",
          text: `Ariza yuborilmadi azam`,
        });
      }
    } else {
      arizalar.push(e)
      setCheckblock({bildirishnoma:id, arizalar:arizalar});
    }
    console.log("b", id);
  }
  console.log("checkblock", checkblock);

  const [newjihoz, setNewJihoz] = useState({
    isFetched: false,
    data: {},
    error: null,
  });

  const [bilid, setBilid] = useState(null);
  function Send() {
    const formmdata = new FormData();
    // for (var key in checkblock) {
      // formmdata.append(key, checkblock[key]);
      // setLoeder(true);
    // }
    formmdata.append('bildirishnoma',checkblock.bildirishnoma)
    formmdata.append("arizalar",JSON.stringify(checkblock.arizalar));
    console.log(formmdata)
    request
      .post(`ariza/rmo/birlashtirish/`, formmdata, config)
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


  return (
    <dvi className="ariza">
      <div className="ariza_top">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 className="ariza_top_title">
            {t("bildirishnoma.allariza")}: {newarr?.arizalar?.length}
          </h4>
          <TextField
            className="search-ariza"
            onChange={change}
            placeholder={t("bildirishnoma.plac")}
            style={{ marginLeft: "40px" }}
            id="standard-basic"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment style={{ position: "absolute", right: "18px" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="create_ariza_btn">
         <Button
             
              variant="contained"
              startIcon={<AddIcon />}
            >
              {t("input.ar")}
            </Button>
        </div>
      </div>
      <div className="ariza_bottom">
        <div className="ariza_bottom_top">
          <Button
            onClick={() => setTab(!tab)}
            style={
              tab === false
                ? { color: "#1464C0", borderBottom: "2px solid #1464C0" }
                : { color: "black" }
            }
          >
            {t("input.qabul")}
          </Button>

          <Button
            onClick={() => setTab(!tab)}
            style={
              tab === true
                ? { color: "#1464C0", borderBottom: "2px solid #1464C0" }
                : { color: "black" }
            }
          >
            {t("vosita.bir")}
          </Button>
        </div>
        <div className="ariza_bottom_bottom">
          {tab == false ? (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "white" }}>
                    <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      ID
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      {t("bildirishnoma.single.muas")}
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      {t("bildirishnoma.sana")}
                    </TableCell>
                    <TableCell align="center" style={{
                        fontWeight: "bold",
                      }} >{t("bildirishnoma.bil1")} ID</TableCell>
                    <TableCell align="center" style={{
                        fontWeight: "bold",
                      }} >{t("bildirishnoma.single.status")}</TableCell>
                    <TableCell align="center" style={{
                        fontWeight: "bold",
                      }}>{t("bildirishnoma.harakat")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newarr.arizalar &&
                    newarr.arizalar.map((item, index) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "60px",
                                cursor: "pointer",
                              }}
                            >
                              <p>{index + 1}</p>
                              {checkboxs === true ? (
                                <div className="check_inp_block">
                                  <input
                                    className="check_box_inp_inner"
                                    type="checkbox"
                                    name=""
                                    checked={checkblock?.arizalar?.some(
                                      (el) => el == item.id
                                    )}
                                    onClick={(e) =>
                                      addColumn(item.id, item.bildirishnoma_id)
                                    }
                                  />
                                </div>
                              ) : null}
                              <div className="ariza_bgc"></div>
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                              align="center"
                            >
                              {item.id}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                              align="center"
                            >
                              {item.kimdan}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                              align="center"
                            >
                              {item.vaqti.slice(0, 10)}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                              align="center"
                            >
                              {item.bildirishnoma_id}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                              align="center"
                            >
                              {item.status}
                            </TableCell>

                            <TableCell align="center">
                              <div className="button_modal button_modal_1">
                                <Link
                                  Link
                                  to={`/rolariza/${item.id}`}
                                  className="single_info"
                                >
                                  <img
                                    className="delete_icon"
                                    src={l1}
                                    alt="batafsil"
                                  />
                                </Link>
                                <Button>
                                  <img className="delete_icon" src={l3} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "white" }}>
                    <TableCell style={{
                        fontWeight: "bold",
                      }}>{t("bildirishnoma.single.soni")}</TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      ID
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      {t("bildirishnoma.bil1")} ID
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      {t("bildirishnoma.sana")}
                    </TableCell>
                    <TableCell align="center" style={{
                        fontWeight: "bold",
                      }}>{t("bildirishnoma.status")}</TableCell>
                    <TableCell align="center" style={{
                        fontWeight: "bold",
                      }}>{t("bildirishnoma.harakat")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {erkins1?.data?.birlashtirilgan_arizalar &&
                    erkins1?.data?.birlashtirilgan_arizalar.map(
                      (item, index) => {
                        return (
                          <>
                            <TableRow>
                              <TableCell align="left">
                                {index + 1}
                                <div className="ariza_bgc"></div>
                              </TableCell>
                              <TableCell
                                style={{
                                  // fontWeight: "bold",
                                }}
                                align="center"
                              >
                                {item.id}
                              </TableCell>
                              <TableCell
                                style={{
                                  // fontWeight: "bold",
                                }}
                                align="center"
                              >
                                {item.bildirishnoma_id}
                              </TableCell>
                              <TableCell
                                style={{
                                  // fontWeight: "bold",
                                }}
                                align="center"
                              >
                                {item.sana}
                              </TableCell>
                              <TableCell
                                style={{
                                  // fontWeight: "bold",
                                }}
                                align="center"
                              >
                                Ariza status
                              </TableCell>

                              <TableCell align="center">
                                <div className="button_modal button_modal_1">
                                  <Link
                                    Link
                                    to={`/rolarizas/${item.id}`}
                                    className="single_info"
                                  >
                                    <img
                                      className="delete_icon"
                                      src={l1}
                                      alt="batafsil"
                                    />
                                  </Link>
                                  <Button>
                                    <img className="delete_icon" src={l3} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      }
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>

      <div className="modal_one_99">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal_one}
          open={open2}
          onClose={handleClose2}
          closeAfterTransition
          BackdropProps={{
            timeout: 400,
          }}
          style={{
            marginTop: "200px",
            width: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Fade in={open2}>
            <div style={classes.paper}>
              <div className="zayavka_block">
                <Button
                  style={{
                    color: "black",
                    textAlign: "right",
                    margin: "0 0 auto auto",
                    display: "flex",
                  }}
                  startIcon={<CloseIcon />}
                  onClick={() => handleClose2()}
                ></Button>
                <h4 className="zayavka_title">{t("modalariza.arizaturi")}</h4>
                <div className="delete_btn_group">
                  <Link to={"/sarflov"} className="jayavka_btn">
                    Sarflov vositalar
                  </Link>
                  <Link to={"/apelatsion"} className="jayavka_btn">
                    Jihozlar va ehtiyot qismlar
                  </Link>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <Snackbar
        Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={noti}
        autoHideDuration={6000}
        onClose={handlenoti}
      >
        <Alert
          Alert
          onClose={handlenoti}
          severity={notificationn.state}
          sx={{
            width: "100%",
          }}
        >
          {notificationn.text}
        </Alert>
      </Snackbar>
    </dvi>
  );
}

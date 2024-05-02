import {Button, Modal, TextareaAutosize, TextField,} from "@mui/material";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {request} from "../../../../../api/request";

const Mohariza = () => {
  const [age, setAge] = useState("");
  const [pass, setPass] = useState();
  const [tar, setTar] = useState();
  const [mavzu, setMavzu] = useState();
  const [num, setNum] = useState({
    from: 0,
    to: 0,
  });
  const [num2, setNum2] = useState({
    from: 0,
    to: 0,
  });
  const [numarr, setNumarr] = useState([]);
  const [numarr2, setNumarr2] = useState([]);

  function numAdd() {
    setNumarr([...numarr, num]);
  }
  function numAdd2() {
    setNumarr2([...numarr2, num2]);
  }
  const File = (e) => {
    // setNames(true);
    setPass(e.target.files[0]);
  };
  console.log("pass", pass);

  function numDel(e) {
    let delarr = [];
    delarr.push(...numarr);
    delarr.splice(e, 1);
    setNumarr(delarr);
  }
  function numDel2(e) {
    let delarr = [];
    delarr.push(...numarr2);
    delarr.splice(e, 1);
    setNumarr2(delarr);
  }
  function addColumn(e) {
    if (check && check.length > 0) {
      let ss = check.filter((elem) => elem == e);
      if (ss && ss.length > 0) {
        setCheck(check.filter((item) => item != e));
      } else {
        setCheck([...check, `${e}`]);
      }
    } else {
      setCheck([...check, `${e}`]);
    }
  }
  console.log(numarr);
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [sar, setSar] = useState({
    isFetched: false,
    data: [],
    error: false,
  });
  const [loader, setLoeder] = useState(true);
  useEffect(() => {
    request
      .get(`/hududlar/`, config)
      .then(function (res) {
        setSar({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setLoeder(false);
      })
      .catch(function (err) {
        setSar({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [loader]);

  const [input, setInput] = useState([]);

  const [check, setCheck] = useState([]);

  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      setInput({
        ...input,
        [e.target.name]: String(e.target.checked),
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [opens, setOpens] = useState(false);
  const [ariza, setAriza] = useState({
    isFetched: false,
    data: [],
    error: false,
  });
  const [sendt, setSendt] = useState({
    isFetched: false,
    data: [],
    error: false,
  });
  useEffect(() => {
    request
      .get(`/user/viloyat/tumanlar/`, config)
      .then(function (res) {
        setAriza({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setLoeder(false);
      })
      .catch(function (err) {
        setAriza({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [loader]);

  const [noti, setNoti] = useState(false);
  const [notificationn, setNotificationn] = useState({
    state: "",
    text: "",
  });
  const handleClick = () => {
    setNoti(true);
  };

  const [open, setOpen] = useState(false);
  const handlenoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNoti(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const { t } = useTranslation();
  function Heets(e) {
    e.preventDefault();
    const fordata = new FormData();
    fordata.append("fayl", pass);
    for (let [key, value] of Object.entries(input)) {
      fordata.append(key, value);
    }
    fordata.append("kimga", JSON.stringify([+check]));
    const numarrsend2 = [];
    numarr.map((item) => {
      numarrsend2.push(`${Number(item.from)}-${Number(item.to)}`);
    });
    // fordata.append('yosh_toifa', JSON.stringify(numarrsend2))
    const numarrsend1 = [];
    numarr2.map((item) => {
      numarrsend1.push(`${Number(item.from)}-${Number(item.to)}`);
    });
    // fordata.append('oy_toifa', JSON.stringify(numarrsend1))
    fordata.append("qoshimcha", tar);
    fordata.append("mavzu", mavzu);

    request
      .post(`/ariza/moh/yaratish/`, fordata, config)
      .then(function (res) {
        alert();
        console.log(fordata, "fordata");
        console.log(res.data, "res data");
        setNotificationn({
          state: "success",
          text: `Xabarnoma yuborildi`,
        });

        setLoeder(false);
        handleClick(true);
      })
      .catch(function (err) {
        console.log(err, "qwe1");
        alert("Yuborilmadi!");
        setNotificationn({
          state: "error",
          text: `Xatolik yuz berdi tekshirib boshidan yuboring`,
        });
        err.response.status === 406 ? handleOpen1() : handleClick(true);
      });
    handleClose();
    setLoeder(true);
  }

  console.log(numarr.from, "from");
  console.log(num.to, "to");
  const { type } = useParams();

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
      padding: "50px",
      width: "100%",
      margin: "30px auto 0 auto",
      backgroundColor: "#EFF2F5",
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

  const [opens1, setOpens1] = useState(false);
  const handleOpen1 = () => setOpens1(true);
  const handleClose1 = () => setOpens1(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 500,
    bgcolor: "background.paper",
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [tuman, setTuman] = useState({
    isFetched: false,
    data: [],
    error: false,
  });
  useEffect(() => {
    request
      .get(`/user/viloyat/muassasalar/`, config)
      .then(function (res) {
        setTuman({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setLoeder(false);
      })
      .catch(function (err) {
        setTuman({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [loader]);
  const [state, setState] = useState({
    checkedA: false,
  });

  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Link to={"/notification"}>
          <Button variant="contained">{t("bildirishnoma.new.ortga")}</Button>
        </Link>
        <h3 className="rol_ariza_top_title">
          {
            // t("bildirishnoma.new.yaratish")
          }
          {t("input.ar")}
        </h3>
      </div>
      <div className="rol_ariza_bottom">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className="rol_ariza_bottom_top"
        >
          <div
            style={{
              width: "100%",
            }}
          >
            <h4 className="rol_ariza_bottom_title">
              {t("bildirishnoma.new.kimdankimga")}
            </h4>
            <div className="rol_ariza_bottom_bigbox">
              <div
                style={{
                  width: "100%",
                }}
                className="rol_ariza_bottom_block"
              >
                <p className="rol_ariza_bottom_block_desc">
                  {t("bildirishnoma.new.kimdan")}
                </p>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label={t("bildirishnoma.sog")}
                    disabled
                    variant="outlined"
                  />
                </Box>
              </div>
              <div className="rol_ariza_bottom_block"></div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
            }}
          >
            <h4 className="rol_ariza_bottom_title">
              {t("bildirishnoma.new.kimdankimga")}
            </h4>
            <div className="rol_ariza_bottom_bigbox">
              <div
                style={{
                  width: "100%",
                }}
                className="rol_ariza_bottom_block"
              >
                <p className="rol_ariza_bottom_block_desc">
                  {t("bildirishnoma.new.kimga")}
                </p>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="UzMedImpeks"
                    disabled
                    variant="outlined"
                  />
                </Box>
              </div>
              <div className="rol_ariza_bottom_block"></div>
            </div>
          </div>
        </div>
        <div className="rol_ariza_flex">
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {/* {t("bildirishnoma.new.boshqa")} */}
                  {t("input.ta")}
                </h4>
                <div className="rol_ariza_bottom_div_t7">
                  <div className="rol_ariza_bottom_div_inner_block_select">
                    <p className="rol_ariza_bottom_block_desc">
                      {/* {t("bildirishnoma.new.turi")} */}
                      {/* Arizani mavzusi */}
                      Mavzu
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <TextField
                        type="text"
                        id="outlined-basic"
                        placeholder={t("input.z")}
                        variant="outlined"
                        onChange={(e) => setMavzu(e.target.value)}
                      />
                    </Box>
                  </div>
                  {/* <div className="rol_ariza_bottom_div_inner_block_select">
                    <p className="rol_ariza_bottom_block_desc">
                      {t("bildirishnoma.new.vazifasi")}
                    </p>
                    <TextField
                      type="date"
                      id="outlined-basic"
                      variant="outlined"
                      onChange={(e) => onChange(e)}
                    />
                  </div> */}
                </div>
              </div>
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.inf")}
                </h4>
                <div className="rol_ariza_textarea">
                  <TextareaAutosize
                    aria-label="empty textarea"
                    onChange={(e) => setTar(e.target.value)}
                    placeholder={t("bildirishnoma.new.infP")}
                  />
                </div>
              </div>
            </div>
            <Button variant="contained" onClick={(e) => Heets(e)}>
              {t("input.otp")}
            </Button>
          </div>
          <div className="rol_ariza_bottom_div">
            {/* <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.bolalar")}
                </h4>
                <p className="yil_oy">{t("bola.yosh")}</p>
                <div className="num_block_ariza">
                  <div className="rol_ariza_textarea">
                    <p className="rol_num_ariza">
                      {t("bildirishnoma.new.dan")}
                    </p>
                    <div className="rol_ariza_number_left">
                      {num.from === 0 ? (
                        <button
                          disabled
                          onClick={() => setNum({ ...num, from: num.from - 1 })}
                          className="num_btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => setNum({ ...num, from: num.from - 1 })}
                          className="num_btn"
                        >
                          -
                        </button>
                      )}
                      <p className="num_title">{num.from}</p>
                      <button
                        onClick={() => setNum({ ...num, from: num.from + 1 })}
                        className="num_btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="rol_ariza_textarea">
                    <p className="rol_num_ariza">
                      {t("bildirishnoma.new.gacha")}
                    </p>
                    <div className="rol_ariza_number_left">
                      {num.to === 0 ? (
                        <button
                          disabled
                          onClick={() => setNum({ ...num, to: num.to - 1 })}
                          className="num_btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => setNum({ ...num, to: num.to - 1 })}
                          className="num_btn"
                        >
                          -
                        </button>
                      )}
                      <p className="num_title">{num.to}</p>
                      <button
                        onClick={() => setNum({ ...num, to: num.to + 1 })}
                        className="num_btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={numAdd}
                    variant="contained"
                    startIcon={<AddIcon />}
                  ></Button>
                </div>
                {console.log(numarr, "mumarr")}
                <div className="age_num_block">
                  {numarr.map((item, index) => (
                    <div className="age_num_block_inner">
                      <p>{item.from}</p>
                      <p>-</p>
                      <p>{item.to}</p>
                      <p>-</p>
                      <p>{t("bola.yosh")}</p>
                      <button onClick={(e) => numDel(index)}>x</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rol_ariza_bottom_div_inner_block">
                <p className="yil_oy">Oy</p>
                <div className="num_block_ariza">
                  <div className="rol_ariza_textarea">
                    <p className="rol_num_ariza">
                      {t("bildirishnoma.new.dan")}
                    </p>
                    <div className="rol_ariza_number_left">
                      {num2.from === 0 ? (
                        <button
                          disabled
                          onClick={() =>
                            setNum2({ ...num2, from: num2.from - 1 })
                          }
                          className="num_btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setNum2({ ...num2, from: num2.from - 1 })
                          }
                          className="num_btn"
                        >
                          -
                        </button>
                      )}
                      <p className="num_title">{num2.from}</p>
                      <button
                        onClick={() =>
                          setNum2({ ...num2, from: num2.from + 1 })
                        }
                        className="num_btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="rol_ariza_textarea">
                    <p className="rol_num_ariza">
                      {t("bildirishnoma.new.gacha")}
                    </p>
                    <div className="rol_ariza_number_left">
                      {num2.to === 0 ? (
                        <button
                          disabled
                          onClick={() => setNum2({ ...num2, to: num2.to - 1 })}
                          className="num_btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => setNum2({ ...num2, to: num2.to - 1 })}
                          className="num_btn"
                        >
                          -
                        </button>
                      )}
                      <p className="num_title">{num2.to}</p>
                      <button
                        onClick={() => setNum2({ ...num2, to: num2.to + 1 })}
                        className="num_btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={numAdd2}
                    variant="contained"
                    startIcon={<AddIcon />}
                  ></Button>
                </div>
                <div className="age_num_block">
                  {numarr2.map((item, index) => (
                    <div className="age_num_block_inner">
                      <p>{item.from}</p>
                      <p>-</p>
                      <p>{item.to}</p>
                      <p>-</p>
                      <p>Oy</p>
                      <button onClick={(e) => numDel2(index)}>x</button>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
            <div className="rol_ariza_bottom_div_inner">
              <div className="sarflov_top_blocks">
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.new.fail")}
                </h4>

                {pass ? (
                  <Button
                    className="delets_icons_file"
                    startIcon={<DeleteForeverIcon />}
                    onClick={() => setPass()}
                    variant="contained"
                    type="button"
                  >
                    {t("bildirishnoma.new.del")}
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <input
                onChange={(e) => File(e)}
                type="file"
                id="files"
                className="file_add_input"
              />
              <label className="download_label" htmlFor="files">
                <div className="files_block_title">
                  <p className="files_add_title">
                    {pass
                      ? t("bildirishnoma.new.failinf1")
                      : t("bildirishnoma.new.failinf")}
                  </p>
                  <span className="files_add_span">
                    {pass ? "" : t("bildirishnoma.new.biriktir")}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={opens1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h5 className="err_text">Xatolik yuz berdi</h5>
            <p className="err_title">
              Bolalar yoshi va toifasini tanlashda xatolik yuz berdi iltimos
              quyidagi formula bo'yicha kiriting
            </p>
            <div className="yosh_primer">
              <div className="age_num_block_inner">
                <p>{1}</p>
                <p>-</p>
                <p>{2}</p>
                <p>-</p>
                <p>{t("vosita.oy")}</p>
              </div>
              <div className="age_num_block_inner">
                <p>{3}</p>
                <p>-</p>
                <p>{5}</p>
                <p>-</p>
                <p>{t("vosita.oy")}</p>
              </div>
              <div className="age_num_block_inner">
                <p>{6}</p>
                <p>-</p>
                <p>{10}</p>
                <p>-</p>
                <p>{t("vosita.oy")}</p>
              </div>
              <div className="age_num_block_inner">
                <p>{11}</p>
                <p>-</p>
                <p>{15}</p>
                <p>-</p>
                <p>{t("vosita.oy")}</p>
              </div>
            </div>
            <div className="yosh_primer">
              <div className="age_num_block_inner">
                <p>{1}</p>
                <p>-</p>
                <p>{2}</p>
                <p>-</p>
                <p>{t("bola.yosh")}</p>
              </div>
              <div className="age_num_block_inner">
                <p>{3}</p>
                <p>-</p>
                <p>{5}</p>
                <p>-</p>
                <p>{t("bola.yosh")}</p>
              </div>
              <div className="age_num_block_inner">
                <p>{6}</p>
                <p>-</p>
                <p>{10}</p>
                <p>-</p>
                <p>{t("bola.yosh")}</p>
              </div>
              <div className="age_num_block_inner">
                <p>{11}</p>
                <p>-</p>
                <p>{15}</p>
                <p>-</p>
                <p>{t("bola.yosh")}</p>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Mohariza;

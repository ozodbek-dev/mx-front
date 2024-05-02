import {Button, Snackbar, TextareaAutosize, TextField,} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import {forwardRef, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import pdfDoc from "../../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../../assets/icon/scripka.svg";
import {request} from "../../../../../../api/request";
import MuiAlert from "@mui/material/Alert";

const Mohcreaterkin = () => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [noti, setNoti] = useState(false);
  const [notificationn, setNotificationn] = useState({
    state: "",
    text: "",
  });
  const [visable, setVisable] = useState(false);
  const [state, setState] = useState([]);
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
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
  const formData = new FormData();
  formData.append("token", token);
  const muassasaId = localStorage.getItem("id");
  console.log("muassasaId", muassasaId);

  const [loader, setLoeder] = useState(true);
  // const [ariza, setAriza] = useState([])
  // useEffect(() => {
  //   request
  //     .post(`/omborxona/arizalar/`, formData)
  //     .then(function (res) {
  //       setAriza({
  //         isFetched: true,
  //         data: res.data,
  //         error: false,
  //       });
  //       // setPerson(res.data.bemorlar);
  //       // setShifokorlar(res.data.shifokorlar);
  //       setLoeder(false);
  //     })
  //     .catch(function (err) {
  //       setAriza({
  //         isFetched: false,
  //         data: [],
  //         error: err,
  //       });
  //     });

  // }, [loader]);

  const [sarf, setSarf] = useState([
    {
      kimdan: window.localStorage.getItem("name")?.split("").join(""),
      ariza_turi: "",
      muassasa: Number(muassasaId),
      ariza_turi: "sarflov",
      kimga: "",
      qoshimcha_matn: "",
    },
  ]);

  console.log(sarf);

  const [sarflovarr, setSarflovarr] = useState([
    {
      mahsulot_nomi: "",
      mahsulot_olchov_birligi: "",
      miqdori: "",
      mahsulot_turi: "",
    },
  ]);

  const params = useParams();
  const [input, setInput] = useState({
    muassasa: params.id,
  });
  console.log("params.id", params.id);

  //  const onAriza = (e) => {
  //    let arr = [];
  //    arr.push(e.target.value);
  //    if (e.target.type === "checkbox") {
  //      setSarf({
  //        ...sarf,
  //        [e.target.name]: String(e.target.checked),
  //      });
  //    } else {
  //      setSarf({
  //        ...sarf,
  //        [e.target.name]: e.target.value,
  //      });
  //    }
  //  };

  function onAriza(name, index, value) {
    let data = [];
    data.push(...sarf);
    data[index][name] = value;
    setSarf(data);
  }

  function addsort() {
    setState([
      ...state,
      {
        id: Math.floor(Math.random() * 1000),
        prev: count,
        next: count2,
      },
    ]);
  }
  function Delete(e) {
    const Data = state.filter((el) => +el.id !== +e.target.id);
    setState(Data);
  }

  const [down, setDown] = useState([]);

  function addObj() {
    setSarflovarr([
      ...sarflovarr,
      {
        mahsulot_nomi: "",
        mahsulot_olchov_birligi: "",
        miqdori: "",
        mahsulot_turi: "",
      },
    ]);
  }
  function addFile(value) {
    setDown([
      ...down,
      {
        filename: value,
      },
    ]);
  }

  function onChange(name, index, value) {
    let data = [];
    data.push(...sarflovarr);
    data[index][name] = value;
    //  arr.map(item => {
    //      if (item.category === value ) {
    //        data[index]['mahsulot_olchov_birligi'] = item.size;
    //    }
    // })
    setSarflovarr(data);
  }

  function delObj(index) {
    let sss = [];
    sss.push(...sarflovarr);
    sss.splice(index, 1);
    setSarflovarr(sss);
  }
  function delFile(index) {
    let sss = [];
    sss.push(...down);
    sss.splice(index, 1);
    setDown(sss);
  }

  const [newjihoz, setNewJihoz] = useState({
    isFetched: false,
    data: {},
    error: null,
  });

  // const headers = {
  //   headers: {
  //     Authorization: "Bearer " + token
  //   },
  // };
  // console.log('headers',headers);
  console.log(token);
  function Send(e) {
    e.preventDefault();
    let a = {
      //  token:JSON.stringify(token),
      kimdan: window.localStorage.getItem("name")?.split("").join(""),
      ariza: sarf,
      data: sarflovarr,
      files: down,
    };
    const formmdata = new FormData();
    for (var key in a) {
      formmdata.append(key, a[key]);
      setLoeder(true);
    }
    request
      .post(`bildirishnoma/respublika/`, a)

      .then(function (res) {
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

  console.log(sarflovarr, "sarflovarr");
  console.log(sarf, "sarf");
  const [age, setAge] = useState("");
  // const dias = arr.filter(item =>item.category.includes(turi))
  console.log(down);

  const allArr = [...sarf, ...sarflovarr, ...down];
  console.log("allArr", allArr);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="sarflov">
      <div className="sarflov_inner">
        <Link to={"/mohbil"}>
          <Button startIcon={<ArrowBackIcon />} variant="contained">
            {t("bildirishnoma.single.ortga")}
          </Button>
        </Link>
      </div>

      <form onSubmit={Send}>
        {sarf.map((item, index) => (
          <div className="sarflov_block" key={index}>
            <h4 className="sarflov_block_title">
              {t("bildirishnoma.new.kimdankimga")}
            </h4>
            <div className="sarflov_block_inner">
              <div className="sarflov_block_inner_div">
                <h5 className="sarflov_block_inner_div_title">
                  {t("bildirishnoma.single.kimdan")} (Yuboruvchining ism
                  sharifi)
                </h5>
                {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select1">Kimdan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select1"
                    // value={item.kimdan}
                    value={item.kimdan}
                    name='kimdan'
                  label="Age"
                  onChange = {
                    (e) => onAriza(e.target.name, index, e.target.value)
                  }
                    // label={t("bildirishnoma.single.nomiinput")}


                >
                  <MenuItem value="H.G. Ganiyev">{
                    window.localStorage.getItem('name').split('')
                  }</MenuItem>
                </Select>
              </FormControl> */}
                <TextField
                  id="outlined-basic"
                  disabled
                  name="kimdan"
                  value={item.kimdan}
                  onChange={(e) =>
                    onAriza(e.target.name, index, e.target.value)
                  }
                  variant="outlined"
                />
              </div>
              {/* <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">{t("bildirishnoma.single.muas")}</h5>
              <TextField
                id="outlined-basic"
                label="Boyovut tuman ko’p tarmoqli markaziy poliklinikasi"
                variant="outlined"
                value={item.muassasa_id}
                onChange={(e) => onAriza(e.target.name, index, e.target.value)}

              />
            </div> */}
              <div className="sarflov_block_inner_div">
                <h5 className="sarflov_block_inner_div_title">
                  {t("bildirishnoma.sog")} ({t("bildirishnoma.send")})
                </h5>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="kimga"
                  required
                  value={item.kimga}
                  onChange={(e) =>
                    onAriza(e.target.name, index, e.target.value)
                  }
                />
              </div>
              <div className="sarflov_block_inner_div">
                <h5 className="sarflov_block_inner_div_title">
                  {t("bildirishnoma.tuman")}
                </h5>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="kimga"
                  required
                  value={item.kimga}
                  onChange={(e) =>
                    onAriza(e.target.name, index, e.target.value)
                  }
                />
              </div>
              <div className="sarflov_block_inner_div">
                <h5 className="sarflov_block_inner_div_title">
                  {t("bildirishnoma.single.vositainf")}
                </h5>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="kimga"
                  required
                  value={item.kimga}
                  onChange={(e) =>
                    onAriza(e.target.name, index, e.target.value)
                  }
                />
              </div>
              {/* <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">Qo’chimcha matn</h5>
              <TextField
                id="outlined-basic"
                label="Qo’chimcha matn"
                variant="outlined"
              />
            </div> */}
            </div>
          </div>
        ))}
        <div>
          <div className="sarflov_block">
            <h4
              className="sarflov_block_title"
              style={{ marginBottom: "16px" }}
            >
              {t("bildirishnoma.new.boshqa")}
            </h4>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                style={{ width: "35%", marginTop: "23px" }}
                id="outlined-basic"
                variant="outlined"
                label={t("bildirishnoma.turi")}
                required
                // value={item.kimga}
                // onChange={(e) => onAriza(e.target.name, index, e.target.value)}
              />
              <TextField
                className="befor-date"
                style={{ width: "35%" }}
                id="outlined-basic"
                variant="outlined"
                required
                type="date"
                // value={item.kimga}
                // onChange={(e) => onAriza(e.target.name, index, e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="sarflov_comment">
          <div className="sarflov_block_comment">
            <h4 className="sarflov_block_title">{t("Qo’shimcha ma’lumot")}</h4>
            {sarf.map((item, index) => (
              <div className="sarflov_block_inner_div1">
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="..."
                  name="qoshimcha_matn"
                  value={item.qoshimcha_matn}
                  onChange={(e) =>
                    onAriza(e.target.name, index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div className="sarflov_block_comment">
            <div className="sarflov_block_comment_inner">
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")}
              </h4>
              <input
                onChange={(e) => addFile(e.target.value)}
                type="file"
                id="files"
                className="input_download"
              />
              <label htmlFor="files" className="all_download">
                <img className="scrip_file" src={scrip} alt="" />
                {t("vosita.qosh")}
              </label>
            </div>
            <div className="sarflov_block_inner_div">
              {down.map((item, index) =>
                down.length > 0 ? (
                  <div key={index} className="sarflov_block_download_file">
                    <label className="input_tyle_download">
                      <img src={pdfDoc} alt="" className="label_img" />
                      {item.filename}
                      <div className="close_file">
                        <Button
                          onClick={(e) => delFile(index)}
                          startIcon={<CloseIcon />}
                        ></Button>
                      </div>
                    </label>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
        <footer className="site-footer">
          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                borderRadius: "12px",
                backgrounColor: "#1464C0",
                width: "448px",
              }}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SendIcon />}
            >
              {t("input.otp")}
            </Button>
          </div>
        </footer>
      </form>
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
    </div>
  );
};
export default Mohcreaterkin;

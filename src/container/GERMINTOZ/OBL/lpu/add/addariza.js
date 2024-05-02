import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextareaAutosize,
    TextField,
} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {forwardRef, useContext, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import pdfDoc from "../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../assets/icon/scripka.svg";
// import { request } from '../../../api/request';
import MuiAlert from "@mui/material/Alert";
import {request} from "../../../../../api/request";
import {Contextvalue} from "../../../../../context/context";
import {useTranslation} from "react-i18next";

const Addariza = () => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [noti, setNoti] = useState(false);
  const [notificationn, setNotificationn] = useState({
    state: "",
    text: "",
  });
  const { bil } = useContext(Contextvalue);
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
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
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
      kimdan: window.localStorage.getItem("name").split("").join(""),
      ariza_turi: "",
      muassasa: Number(muassasaId),
      ariza_turi: "sarflov",
      kimga: "",
      qoshimcha_matn: "",
    },
  ]);

  console.log(sarf);
  const { t } = useTranslation();

  const [sarflovarr, setSarflovarr] = useState([
    {
      mahsulot_nomi: "",
      mahsulot_olchov_birligi: "",
      miqdori: "",
      mahsulot_turi: "",
    },
  ]);
  const [matn, setMatn] = useState();
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

  const [turi, setTuri] = useState("");
  const [name, setName] = useState("");
  const [ediname, setEdiname] = useState("");

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
  const [binar, setBinar] = useState();
  function addFile(e) {
    setDown([
      ...down,
      {
        filename: e.target.value,
      },
    ]);
    setBinar(e.target.files[0]);
  }

  function onChange(name, index, value) {
    let data = [];
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

  const [vos, setVos] = useState();
  const [tur, setTur] = useState();
  const [miq, setMiq] = useState();

  function Send(e) {
    e.preventDefault();
    let a = {
      //  token:JSON.stringify(token),
      ariza: sarf,
      data: sarflovarr,
      files: down,
    };
    const formData = new FormData();
    const formmdata = new FormData();
    const formdata = new FormData();
    formmdata.append("qoshimcha", matn);
    formmdata.append("bildirishnoma", bil.bildirishnoma);
    formmdata.append("file", binar);

    request
      .post(`/ariza/lpu/`, formmdata, config)

      .then(function (res) {
        setNotificationn({
          state: "success",
          text: `Ariza yuborildi`,
        });
        setLoeder(false);
        console.log(res.data);
        formData.append("vosita_turi", tur);
        formData.append("vosita_nomi", vos);
        formData.append("vosita_seriyasi", "");
        formData.append("vosita_miqdori", miq);
        formData.append("ariza", res.data.ariza);
        formdata.append("ariza", res.data.ariza);
        formdata.append("status", "Yuborilmadi");
        request.post("/ariza/lpu/vosita/", formData, config);
        request.post("/ariza/lpu/changestatus/", formdata, config);
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

  const Status = () => {
    const formData = new FormData();
    const formmdata = new FormData();
    const formdata = new FormData();
    formmdata.append("qoshimcha", matn);
    formmdata.append("bildirishnoma", bil.bildirishnoma);
    formmdata.append("file", binar);

    request
      .post(`/ariza/lpu/`, formmdata, config)

      .then(function (res) {
        setNotificationn({
          state: "success",
          text: `Ariza saqlandi`,
        });
        setLoeder(false);
        console.log(res.data);
        formData.append("vosita_turi", tur);
        formData.append("vosita_nomi", vos);
        formData.append("vosita_seriyasi", "");
        formData.append("vosita_miqdori", miq);
        formData.append("ariza", res.data.ariza);
        formdata.append("ariza", res.data.ariza);
        formdata.append("status", "Yuborilmadi");
        request.post("/ariza/lpu/vosita/", formData, config);
        request.post("/ariza/lpu/changestatus/", formdata, config);
        handleClick(true);
      })
      .catch(function (err) {
        setNotificationn({
          state: "error",
          text: `Ariza saqlanmadi`,
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
  };
  const [age, setAge] = useState("");
  // const dias = arr.filter(item =>item.category.includes(turi))

  const allArr = [...sarf, ...sarflovarr, ...down];
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="sarflov">
      <div className="sarflov_inner">
        <Link to={"/arizalpu"}>
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
                  {t("bildirishnoma.single.kimdan")}
                  {t("bildirishnoma.direktorism")}
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
                  label={bil && bil.kimdan}
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
              {/* <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">{t("bildirishnoma.single.muas")}</h5>
              <TextField
                id="outlined-basic"
                label="{t("bildirishnoma.single.muas")}"
                variant="outlined"
                name='kimga'
                required
                value={item.kimga}
                onChange={(e) => onAriza(e.target.name, index, e.target.value)}
              />
            </div> */}
              <div className="sarflov_block_inner_div">
                <h5 className="sarflov_block_inner_div_title">
                  {t("bildirishnoma.send")}
                </h5>
                <TextField
                  id="outlined-basic"
                  label="Tuman Tibbiyot Birlashmasi"
                  variant="outlined"
                  name="kimga"
                  required
                  // value={item.kimga}
                  disabled
                  // onChange={(e) => onAriza(e.target.name, index, e.target.value)}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="sarflov_block" style={{ width: "49%" }}>
            <h4
              className="sarflov_block_title"
              style={{ marginBottom: "16px" }}
            >
              {t("bola.ball1")}
            </h4>
            <TableContainer component={Paper}>
              <Table
                style={{ minWidth: 100 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>{t("input.toif")}</TableCell>
                    <TableCell>{t("bildirishnoma.single.bolalar")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bil &&
                    Object.keys(bil.bolalar).map((el) => {
                      return (
                        <TableRow>
                          <TableCell>{el}</TableCell>
                          <TableCell>
                            {bil.bolalar && bil.bolalar[el]}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="sarflov_block" style={{ width: "50%" }}>
            <h4 className="sarflov_block_title">{t("input.beril")}</h4>
            {sarflovarr.map((item, index) => (
              <div className="sarflov_block_inner_two">
                <h4 className="num_title">{index + 1}</h4>
                <div className="sarflov_block_inner_div_two">
                  <h5 className="sarflov_block_inner_div_title">
                    {t("bildirishnoma.single.nomi")}
                  </h5>
                  <FormControl fullWidth>
                    <InputLabel id={`demo-simple-select-label${index}`}>
                      {t("bildirishnoma.single.nomi")}
                    </InputLabel>
                    <Select
                      onChange={(e) => setVos(e.target.value)}
                      labelId={`demo-simple-select-label${index}`}
                      id={`demo-simple-select${index}`}
                      label="Nomi"
                      required
                    >
                      <MenuItem value={"Filtr"}>Filtr</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="sarflov_block_inner_div_two">
                  <h5
                    className="sarflov_block_inner_div_title"
                    style={{ width: "134px" }}
                  >
                    {t("vosita.vositaturi")}
                  </h5>
                  <TextField
                    onChange={(e) => setTur(e.target.value)}
                    style={{
                      width: "160px",
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    label={t("vosita.vositaturi")}
                    required
                  />
                </div>
                <div className="sarflov_block_inner_div_two">
                  <h5 className="sarflov_block_inner_div_title">
                    {t("bildirishnoma.single.miqdori")}
                  </h5>
                  <TextField
                    onChange={(e) => setMiq(e.target.value)}
                    style={{
                      width: "125px",
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    label={t("bildirishnoma.single.miqdori")}
                    name="miqdori"
                    type={"number"}
                    required
                  />
                </div>
                {/* <div className="sarflov_block_inner_div_two">
                <h5 className="sarflov_block_inner_div_title">
                  Diametri ({t("vosita.vositaturi")})
                </h5>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t("vosita.vositaturi")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id={`diametr${index}`}
                    // value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    {arr.map((el, index) => {
                      if (el.category === turi)
                        return (
                          <MenuItem key={index} value={`${el.size}`}>
                            {el.size}
                          </MenuItem>
                        );
                    })}
                  </Select>
                </FormControl>
              </div> */}
                <div className="close_arr_btn">
                  <Button
                    onClick={(e) => delObj(index)}
                    startIcon={<CloseIcon />}
                  ></Button>
                </div>
              </div>
            ))}
            <div className="add_btn">
              <Button onClick={() => addObj()} startIcon={<AddIcon />}>
                {t("vosita.qosh")}
              </Button>
            </div>
          </div>
        </div>

        <div className="sarflov_comment">
          <div className="sarflov_block_comment">
            <h4 className="sarflov_block_title">{t("Qo’shimcha ma’lumot")}</h4>
            <div className="sarflov_block_inner_div1">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="..."
                name="qoshimcha_matn"
                onChange={(e) => setMatn(e.target.value)}
              />
            </div>
          </div>
          <div className="sarflov_block_comment">
            <div className="sarflov_block_comment_inner">
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")}
              </h4>
              <input
                onChange={addFile}
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
            <Link
              onClick={Status}
              className="sarflov-link"
              to={`/saveariza/${params.id}`}
            >
              {t("vosita.saq")}
            </Link>
            <Button
              style={{ borderRadius: "12px", backgrounColor: "#1464C0" }}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              {t("modalariza.arizayub")}
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

export default Addariza;

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import {Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Snackbar, TextField,} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {forwardRef, useEffect, useState} from "react";
import {CSVLink} from "react-csv";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {request} from "../../../../api/request";
import more from "../../../../assets/icon/more.svg";
import pnflIcon from "../../../../assets/img/pnfl.png";
import Koriklar from "../../../../components/component/seanslar/koriklar";
import Loading from "../../../../components/loading/loading";

const Vsbsingle = () => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const { t } = useTranslation();
  const tokens = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${tokens}` },
  };
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
      // backgroundColor: "white",
      // border: "2px solid #000",
      // boxShadow: theme.shadows[5],
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

  const [bemorIdpro, setBemorIdPro] = useState([]);
  const [person, setPerson] = useState([]);
  const [shifokorlar, setShifokorlar] = useState([]);
  const formData = new FormData();
  const [loader, setLoeder] = useState(true);

  const token = window.localStorage.token;
  formData.append("token", token);
  const params = useParams();

  const [sea, setSea] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  const [seans, setSeans] = useState(false);

  function Seansbemor() {
    setSeans(true);
  }
  const handleSeansClose = () => {
    setSeans(false);
  };

  useEffect(() => {
    request
      .get(`/muassasa/bola/${params.id}`, config)
      .then(function (res) {
        setBemorIdPro({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setPerson(res.data);
        console.log(res.data, "dafafas");
        // setShifokorlar(res.data.shifokorlar);
        setLoeder(false);
      })
      .catch(function (err) {
        setBemorIdPro({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [params.id]);

  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };
  const [izohs, setIzohs] = useState("");
  const navigate = useNavigate();
  function Deletes(id) {
    setIzohs("");
    request
      .delete(`/muassasa/bola/${params.id}/${izohs}`, config)
      .then(function (res) {
        console.log(res.data);
        setLoeder(false);

        setNotificationn({
          state: "success",
          text: `Bemor o'chirildi`,
        });
        handleClick(true);
        navigate("/muassasa");
      })
      .catch(function (err) {
        console.log(err);
        setLoeder(false);
        setNotificationn({
          state: "success",
          text: `Bemor o'chirilmadi`,
        });
      });
    setLoeder(true);
    handleClose2();
  }

  const [input, setInput] = useState({
    kasalliklar: "",
    tuman: "",
    bemor_passporti: "",
    qoshimcha_malumot: "",
    qoshimcha_tel_raqami: "",
    rasxodniki: 0,
    nogironligi: "",
    RW: "false",
    SPID: "false",
    HBsAg: "false",
    Anti_HCV: "false",
  });

  const onDializa = (e) => {
    setDiainput({
      ...diainput,
      [e.target.name]: e.target.value,
    });
  };

  function Dializa(e) {
    const formmdata = new FormData();
    for (let [key, val] of Object.entries(diainput)) {
      formmdata.append(key, val);
    }
    formmdata.append("token", token);
    request
      .post(`/bemor/create/diagnoz/`, formmdata)
      .then(function (res) {
        setInput({
          ...input,
          diagnoz: res.data.id,
        });
      })
      .then(() => setLoeder(false))
      .catch(function (err) {});
    handleClose1();
  }

  const [diainput, setDiainput] = useState([]);
  const [arr, setArr] = useState([]);
  const [open1, setOpen1] = useState(false);

  const pnflChange = (e) => {
    let arr = [];
    arr.push(e.target.value);
    setArr(arr.join("").split("").length);
    const body = new FormData();
    body.append("JSHSHIR", e.target.value);
    body.append("token", token);
    request.post("/identifikatsiya/", body).then((data) =>
      setInput({
        JSHSHIR: data.data.JSHSHIR,
        ismi: data.data.ism,
        familiyasi: data.data.familiya,
        otasini_ismi: data.data.otasini_ismi,
        tugilgan_sanasi: data.data.tugilgan_sana,
        passport_raqami: data.data.pasport_raqami,
        passport_seriyasi: data.data.pasport_seriya,
        kasalliklar: " ",
        tuman: " ",
        RW: "false",
        SPID: "false",
        HBsAg: "false",
        Anti_HCV: "false",
        passport_qayerdan_kim_tomonidan_berilgan: " ",
        yashash_manzili: " ",
        bemor_passporti: " ",
        qoshimcha_malumot: " ",
        qoshimcha_tel_raqami: " ",
        ijtimoiy_maqom: " ",
        manzil: " ",
        nogironligi: "",
        rasxodniki: 0,
        jinsi: data.data.jinsi === "male" ? "Erkak" : "Ayol",
      })
    );
  };

  function Heets() {
    const fordata = new FormData();
    fordata.append("token", token);
    fordata.append("qoshimcha_malumot", file);
    fordata.append("bemor_passporti", pass);

    for (let [key, value] of Object.entries(input)) {
      fordata.append(key, value);
    }
    request
      .put(`/create/bemor/`, fordata)
      .then(function (res) {
        setNotificationn({
          state: "success",
          text: `Bemor o'zgardi`,
        });

        console.log(res.data);
        setLoeder(false);
        handleClick(true);
      })
      .catch(function (err) {
        setNotificationn({
          state: "error",
          text: `Bemor o'zgarmadi`,
        });

        handleClick(true);
      });
    setInput({});
    handleClose();
    setEdi(false);
    setLoeder(true);
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [edi, setEdi] = useState(false);
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
  const [pass, setPass] = useState();
  const [file, setFile] = useState();

  if (loader) return <Loading />;
  return (
    <div className="singlebemor">
      <div className="singlebemor_top">
        <div className="singlebemor_top_left">
          <Button
            onClick={() => window.history.back()}
            startIcon={<ArrowBackIcon />}
            variant="contained"
          >
            {t("bildirishnoma.single.ortga")}
          </Button>

          <Button
            style={{ marginLeft: "12px" }}
            onClick={() => Seansbemor(person.bemor_id)}
            startIcon={<AccessTimeIcon />}
            variant="contained"
          >
            {t("Ko'riklar")}
          </Button>
        </div>
        <div className="singlebemor_top_right">
            <CSVLink
              data={[person]}
              headers={[
                { label: "ID", key: "id" },
                { label: "Familiyasi", key: "familiya" },
                { label: "Ismi", key: "ism" },
                { label: "Otasining ismi", key: "otasi.ism" },
                { label: "Otasining familiyasi", key: "otasi.familiya" },
                { label: "Onasining ismi", key: "onasi.ism" },
                { label: "Onasining familiya", key: "onasi.familiya" },
                { label: "JSHSHIR", key: "JSHSHIR" },
                { label: "Tug'ilgan sana", key: "tugilgan_sana" },
                { label: "Qon guruhi", key: "qon_guruhi" },
                { label: "Telefon raqami", key: "tel_raqami" },
                { label: "Qo'shimcha telefon raqami", key: "qoshimcha_raqam" },
                { label: "Jinsi", key: "jinsi" },
                { label: "Yashash manzili", key: "manzil_mahalla" },
                {
                  label: "Pasport seriya va raqami",
                  key: "passport_seriya_va_raqami",
                },
                { label: "Qayerdan va kim tomonidan berilgan", key: "" },
                { label: "Shifokor ismi", key: "biriktirilgan_shifokor.ismi" },
                {
                  label: "Shifokor familiyasi",
                  key: "biriktirilgan_shifokor.familiyasi",
                },
                {
                  label: "Shifokor otasining ismi",
                  key: "biriktirilgan_shifokor.otasini_ismi",
                },
                {
                  label: "Tibbiy muassasaning nomi",
                  key: "biriktirilgan_muassasa.nomi",
                },
                {
                  label: "Ro'yxatga olingan sanasi",
                  key: "royxatga_olingan_sana",
                },
              ]}
              separator=";"
              filename="Bola ma'lumotlari"
              className="excel_download"
            >
          <Button startIcon={<DescriptionIcon />} color="success"  variant="contained">
              {t("bola.excel")}
          </Button>
            </CSVLink>
        </div>
      </div>
      <div className="singlebemor_block">
        <div className="singlebemor_block_left">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.sh")} </h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.surname")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{person.familiya}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.name")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{person.ism}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.otch")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.pfl")}</h5>
              <h5 className="singlebemor_block_info_desc">{person.JSHSHIR}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.birthday")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person.tugilgan_sana}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.guruh")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.qon_guruhi == 1
                  ? "AB(IV)Rh+"
                  : person.qon_guruhi == 2
                  ? "AB(IV)Rh-"
                  : person.qon_guruhi == 3
                  ? "A(II)Rh+"
                  : person.qon_guruhi == 4
                  ? "A(II)Rh-"
                  : person.qon_guruhi == 5
                  ? "B(III)Rh+"
                  : person.qon_guruhi == 6
                  ? "B(III)Rh-"
                  : person.qon_guruhi == 7
                  ? "O(I)Rh+"
                  : person.qon_guruhi == 8
                  ? "O(I)Rh-"
                  : t("bola.kir")}
                {/* {
                  person.qon_guruhi
                } */}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">
              {t("sbola.contact")}
            </h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.tel")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person.tel_raqami}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.qtel")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.qoshimcha_raqam}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.male")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{person.jinsi}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("sbola.manzil")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person.manzil_uyi ? person.manzil_uyi : t("bola.kir")}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.g1")}</h4>

            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.g2")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {`${person.passport_seriya_va_raqami}`}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.who")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.qachon_kim_tomonidan_berilgan
                  ? person.qachon_kim_tomonidan_berilgan
                  : t("bola.kir")}
              </h5>
            </div>
          </div>
        </div>
        <div className="singlebemor_block_right">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.b1")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">ID</h5>
              <h5 className="singlebemor_block_info_desc">{person.id}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.shifo")}</h5>
              <h5 className="singlebemor_block_info_desc">{`${person.biriktirilgan_shifokor.ismi} ${person.biriktirilgan_shifokor.familiyasi} ${person.biriktirilgan_shifokor.otasini_ismi}`}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.ms")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.biriktirilgan_muassasa.nomi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.rxt")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.royxatga_olingan_sana}
              </h5>
            </div>
          </div>
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.onot")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.ot1")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.otasi.ism} {person.otasi.familiya}{" "}
                {person.otasi.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.on1")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.onasi.ism} {person.onasi.familiya}{" "}
                {person.onasi.otasining_ismi}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <Koriklar handleClose={() => setSeans(false)} open={seans} />

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
              <div className="delete_g">
                <h4>bemorni o'chirish sababi</h4>
                <div className="izoh_text">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="nogironlik">Sababi</InputLabel>
                    <Select
                      labelId="123"
                      id="demo-simple-select3"
                      onChange={(e) => setIzohs(e.target.value)}
                      name="izoh"
                      value={input.bemor_kasallik_turi}
                    >
                      <MenuItem MenuItem value={"Vafot etdi"}>
                        Vafot etdi
                      </MenuItem>
                      <MenuItem value={t("input.trans")}>
                        {t("input.trans")}
                      </MenuItem>
                      <MenuItem value={"Muassasa almashtirildi"}>
                        Muassasa almashtirildi
                      </MenuItem>
                      <MenuItem value={"Sog'aydi"}>Sog'aydi</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="delete_btn_group">
                  {izohs?.length > 3 ? (
                    <Button
                      style={{
                        marginBottom: "14px",
                      }}
                      className="red_btn"
                      variant="contained"
                      onClick={Deletes}
                    >
                      Bemorni o'chirish
                    </Button>
                  ) : (
                    <Button
                      className="red_btn"
                      variant="contained"
                      onClick={Deletes}
                      disabled
                    >
                      Bemorni o'chirish
                    </Button>
                  )}

                  <Button
                    className="no_delete_person"
                    variant="contained"
                    color="success"
                    onClick={handleClose2}
                  >
                    {t("bildirishnoma.single.bekor")}
                  </Button>
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
      <div className="modal_scrool">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropProps={{
            timeout: 400,
          }}
        >
          <Fade in={open}>
            <div style={classes.paper}>
              <form className="form_control_scrool" action="">
                <h1>Bemor qo'shish</h1>
                <div className="input_blocks">
                  <div className="select_div">
                    <TextField
                      id="outlined-basic"
                      label={t("input.pfl")}
                      onChange={pnflChange}
                      name="JSHSHIR"
                      variant="outlined"
                      inputProps={{ maxLength: 14 }}
                      type="number"
                      defaultValue={input.JSHSHIR}
                      required
                      error={arr > 14 && true}
                    />
                    <div className="jshshir_inner">
                      <img src={more} />
                      <div className="jshshir_inner_item">
                        <img className="pnfl_icon" src={pnflIcon} alt="icon" />
                      </div>
                    </div>
                  </div>
                  <div className="select_div">
                    <TextField
                      className={input.ismi && "input-sel"}
                      id="outlined-basic"
                      label={t("shifokor.alladd.name")}
                      onChange={(e) => onChange(e)}
                      name="ismi"
                      variant="outlined"
                      value={input.ismi}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="input_blocks">
                  <div className="select_div">
                    <TextField
                      className={input.ismi && "input-sel"}
                      id="outlined-basic"
                      label={t("shifokor.alladd.surname")}
                      variant="outlined"
                      onChange={onChange}
                      name="familiyasi"
                      value={input.familiyasi}
                      required
                      disabled
                    />
                  </div>
                  <div className="select_div">
                    <TextField
                      className={input.ismi && "input-sel"}
                      id="outlined-basic"
                      label={t("shifokor.alladd.otch")}
                      variant="outlined"
                      onChange={onChange}
                      name="otasini_ismi"
                      value={input.otasini_ismi}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="input_blocks">
                  <div className="select_div">
                    {t("shifokor.birthday")}
                    <TextField
                      className="filed"
                      id="outlined-basic"
                      variant="outlined"
                      type="date"
                      onChange={onChange}
                      name="tugilgan_sanasi"
                      value={input.tugilgan_sanasi}
                      required
                      disabled
                    />
                  </div>
                  <div className="pasport_block">
                    <div className="select_div">
                      <TextField
                        className={input.ismi && "input-sel"}
                        id="outlined-basic"
                        label="Passport seriyesi"
                        variant="outlined"
                        inputProps={{ maxLength: 2 }}
                        onChange={onChange}
                        name="passport_seriyasi"
                        value={input.passport_seriyasi}
                        required
                        disabled
                      />
                    </div>
                    <div className="select_div">
                      <TextField
                        className={input.ismi && "input-sel"}
                        id="outlined-basic"
                        label="Passport raqam"
                        variant="outlined"
                        inputProps={{ maxLength: 7 }}
                        onChange={onChange}
                        name="passport_raqami"
                        value={input.passport_raqami}
                        required
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="inpub_blocks_jinsi">
                  <div className="select_div_jinsi">
                    <FormControl className={classes.formControl}>
                      <InputLabel InputLabel id="qon-guruh" value={input.jinsi}>
                        {input.jinsi ? input.jinsi : t("shifokor.alladd.male")}
                      </InputLabel>
                      <Select
                        labelId="qon-guruh"
                        id="demo-simple-select2"
                        // value={age}
                        onChange={onChange}
                        name={"jinsi"}
                      >
                        <MenuItem value="Erkak">Erkak</MenuItem>
                        <MenuItem value="Ayol">Ayol</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="select_div">
                    <TextField
                      id="outlined-basic"
                      label={t("input.m")}
                      variant="outlined"
                      onChange={onChange}
                      name="manzil"
                      value={input.manzil}
                      required
                    />
                  </div>
                </div>

                <div className="input_blocks">
                  <div className="select_div">
                    <TextField
                      id="outlined-basic"
                      label="Qayerdan va kim tomonidan berilgan"
                      variant="outlined"
                      onChange={onChange}
                      name="passport_qayerdan_kim_tomonidan_berilgan"
                      value={input.passport_qayerdan_kim_tomonidan_berilgan}
                      required
                    />
                  </div>
                  <div className="select_div">
                    <TextField
                      id="outlined-basic"
                      label="Ro'yxatdan o'tgan manzil"
                      variant="outlined"
                      onChange={onChange}
                      name="royxatga_olingan_sana"
                      value={input.royxatga_olingan_sana}
                      required
                    />
                  </div>
                </div>
                <div className="input_blocks"></div>
                <div className="input_blocks">
                  <div className="select_div">
                    <TextField
                      id="outlined-basic"
                      label="Yashash manzili"
                      variant="outlined"
                      onChange={onChange}
                      name="yashash_manzili"
                      value={input.yashash_manzili}
                      required
                    />
                  </div>
                  <div className="select_div">
                    <TextField
                      id="outlined-basic"
                      label={t("shifokor.tel")}
                      variant="outlined"
                      onChange={onChange}
                      name="tel_raqami"
                      value={input.tel_raqami}
                      required
                    />
                  </div>
                </div>
                <div className="input_blocks">
                  <div className="select_div">
                    <TextField
                      id="outlined-basic"
                      label="Qoshimcha telefon raqami"
                      variant="outlined"
                      onChange={onChange}
                      name="qoshimcha_tel_raqami"
                      value={input.qoshimcha_tel_raqami}
                    />
                  </div>
                  <div className="select_div select_div_100">
                    <FormControl className={classes.formControl}>
                      <InputLabel id="shifokorid">
                        {t("sidebar.li4")} (FIO)
                      </InputLabel>
                      <Select
                        labelId="shifokorid"
                        id="demo-simple-select5"
                        onChange={onChange}
                        name="shifokor"
                        value={input.shifokor}
                      >
                        {shifokorlar &&
                          shifokorlar.map((item, index) => (
                            <MenuItem
                              id={item.shifokor_id}
                              MenuItem
                              value={item.shifokor_id}
                            >
                              {`${item.ismi} ${item.familiyasi}`}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="input_blocks">
                  <div className="select_div">
                    {t("bola.rxt")}
                    <TextField
                      className="filed"
                      id="outlined-basic"
                      variant="outlined"
                      type="date"
                      onChange={onChange}
                      name="royxatga_olingan_sana"
                      required
                      value={input.royxatga_olingan_sana}
                    />
                  </div>
                  <div className="select_div">
                    <TextField
                      id="outlined-basic"
                      label="Ijtimoiy maqom"
                      variant="outlined"
                      onChange={onChange}
                      name="ijtimoiy_maqom"
                      value={input.ijtimoiy_maqom}
                    />
                  </div>
                </div>
                <div className="select">
                  <div className="select_div">
                    <FormControl className={classes.formControl}>
                      <InputLabel id="nogironlik">Nogironlik guruhi</InputLabel>
                      <Select
                        labelId="nogironlik"
                        id="demo-simple-select1"
                        // value={age}
                        onChange={onChange}
                        name="nogironligi"
                        value={input.nogironligi}
                        required
                      >
                        <MenuItem value={1}>1-guruh</MenuItem>
                        <MenuItem value={2}>2-guruh</MenuItem>
                        <MenuItem value={3}>3-guruh</MenuItem>
                        <MenuItem value={4}>Nogiron emas</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="select_div">
                    <FormControl className={classes.formControl}>
                      <InputLabel id="qon-guruh">{t("bola.guruh")}</InputLabel>
                      <Select
                        labelId="qon-guruh"
                        id="demo-simple-select2"
                        value={input.qon_guruhi}
                        onChange={onChange}
                        name="qon_guruhi"
                      >
                        <MenuItem value={1}>AB(IV)Rh+</MenuItem>
                        <MenuItem value={2}>AB(IV)Rh-</MenuItem>
                        <MenuItem value={3}>A(II)Rh+</MenuItem>
                        <MenuItem value={4}>A(II)Rh-</MenuItem>
                        <MenuItem value={5}>B(III)Rh+</MenuItem>
                        <MenuItem value={6}>B(III)Rh-</MenuItem>
                        <MenuItem value={7}>O(I)Rh+</MenuItem>
                        <MenuItem value={8}>O(I)Rh-</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="input_blocks">
                  <div className="select_div-11">
                    <FormControl className={classes.formControl}>
                      <InputLabel id="Status">
                        {t("bildirishnoma.status")}
                      </InputLabel>
                      <Select
                        labelId="Status"
                        id="demo-simple-select3"
                        onChange={onChange}
                        name="status"
                        value={input.status}
                        required
                      >
                        <MenuItem MenuItem value={"Nazorat ostida"}>
                          Nazorat ostida
                        </MenuItem>
                        <MenuItem value={"Vafot etgan"}>Vafot etgan</MenuItem>
                        <MenuItem value={"Dializda"}>Dializda</MenuItem>
                        <MenuItem value={t("input.trans")}>
                          {t("input.trans")}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="select_div-11">
                    <FormControl className={classes.formControl}>
                      <InputLabel id="nogironlik">Bemor turi</InputLabel>
                      <Select
                        labelId="123"
                        id="demo-simple-select3"
                        onChange={onChange}
                        name="bemor_kasallik_turi"
                        value={input.bemor_kasallik_turi}
                      >
                        <MenuItem MenuItem value={"Otkir buyurak zararlanishi"}>
                          Otkir buyurak zararlanishi
                        </MenuItem>
                        <MenuItem value={"Surunkali buyurak kasallanishi"}>
                          Surunkali buyurak kasallanishi
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="input_blocks">
                  <div className="select_div-11">
                    <div
                      labelId="diag"
                      id="demo-simple-select4"
                      onChange={onChange}
                      name="diagnoz"
                      required
                      onClick={handleOpen1}
                      value={input.diagnoz}
                      style={{
                        padding: "17px",
                        border: "2px solid rgb(201 201 201)",
                        cursor: "pointer",
                      }}
                      className="dializa_div_99"
                    >
                      {diainput.asorati && diainput.asosiy
                        ? "Diagnoz to'ldirildi"
                        : " Diagnoz"}
                    </div>

                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open1}
                      onClose={handleClose1}
                      closeAfterTransition
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open1}>
                        <div style={classes.paper}>
                          <div
                            className="nazad"
                            onClick={handleClose1}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {t("bildirishnoma.single.ortga")}
                          </div>
                          <div className="dializ_input">
                            <TextField
                              id="outlined-basic"
                              label="Asosiy"
                              variant="outlined"
                              onChange={(e) => onDializa(e)}
                              name="asosiy"
                              required
                              value={input.asosiy}
                            />
                          </div>
                          <div className="dializ_input">
                            <TextField
                              id="outlined-basic"
                              label="raqobat"
                              variant="outlined"
                              onChange={(e) => onDializa(e)}
                              name="raqobat"
                              value={input.raqobat}
                            />
                          </div>
                          <div className="dializ_input">
                            <TextField
                              id="outlined-basic"
                              label="fon"
                              variant="outlined"
                              onChange={(e) => onDializa(e)}
                              name="fon"
                              value={input.fon}
                            />
                          </div>
                          <div className="dializ_input">
                            <TextField
                              id="outlined-basic"
                              label="bogliq"
                              variant="outlined"
                              onChange={(e) => onDializa(e)}
                              name="bogliq"
                              value={input.bogliq}
                            />
                          </div>
                          <div className="dializ_input">
                            <TextField
                              id="outlined-basic"
                              label="asorati"
                              variant="outlined"
                              onChange={(e) => onDializa(e)}
                              name="asorati"
                              value={input.asorati}
                              required
                            />
                          </div>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            onClick={Dializa}
                          >
                            Qo'shish
                          </Button>
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                  <div className="kasalliklar">
                    Dializa boshlanishi
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="date"
                      onChange={onChange}
                      name="dializ_boshlangan_sana"
                      value={input.dializ_boshlangan_sana}
                      required
                    />
                  </div>
                </div>
                <label class="custom-file-upload">
                  <input
                    className="upload-file visually-hidden"
                    type="file"
                    onChange={(e) => File(e)}
                  />
                  Bemor passporti Yuklash
                </label>
                <label
                  class="custom-file-upload"
                  style={{
                    width: "176px",
                  }}
                >
                  <input
                    className="upload-file visually-hidden"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {t("Qo’shimcha ma’lumot")}
                </label>
                <p>{pass && pass.name}</p>
                <div className="checkbox_blocks">
                  <div className="checkbox_type">
                    <TextField
                      id="outlined-basic"
                      label="RW"
                      variant="outlined"
                      type="checkbox"
                      onChange={(event) => onChange(event)}
                      name="RW"
                      value={input.RW}
                    />
                    <p className="checkClass">RW</p>
                  </div>
                  <div className="checkbox_type">
                    <TextField
                      id="outlined-basic"
                      label="SPID"
                      variant="outlined"
                      onChange={(event) => onChange(event)}
                      name="SPID"
                      type="checkbox"
                      value={input.SPID}
                    />
                    <p className="checkClass">SPID</p>
                  </div>
                  <div className="checkbox_type">
                    <TextField
                      id="outlined-basic"
                      label="HBsAg"
                      variant="outlined"
                      type="checkbox"
                      onChange={(event) => onChange(event)}
                      name="HBsAg"
                      value={input.HBsAg}
                    />
                    <p className="checkClass">HBsAg</p>
                  </div>
                  <div className="checkbox_type">
                    <TextField
                      id="outlined-basic"
                      label="ANTI_HCV"
                      variant="outlined"
                      onChange={(event) => onChange(event)}
                      name="Anti_HCV"
                      type="checkbox"
                      value={input.Anti_HCV}
                    />
                    <p className="checkClass">ANTI_HCV</p>
                  </div>
                </div>
                <div className="kasalliklar1">
                  <TextField
                    id="outlined-basic"
                    label="Dializa boshlanishi"
                    variant="outlined"
                    type="text"
                    onChange={onChange}
                    name="kasalliklar"
                    value={input.kasalliklar}
                    required
                  />
                </div>
                <div className="button_block1">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    onClick={Heets}
                  >
                    {edi ? `Bemor o'zgartirish` : `Bemor qo'shish`}
                  </Button>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Vsbsingle;

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { request } from "../../../../../api/request";
import pdfDoc from "../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../assets/icon/scripka.svg";
import "./chiqim.scss";
import l3 from "assets/icon/l3.svg";
import { toast } from "react-toastify";
import { get } from "lodash";

function Chiqimmodal({ setOpens, setOpens2 }) {
  const initialState = {
    partiya_raqam: "",
    ttb: {},
    vssb: {},
    comment: "",
    vositalar: "",
    miq: "",
  };

  const initialoutgoingsState = {
    nom: {},
    tur: {},
    vosita_miqdori: "",
    vosita_seryasi: "",
  };

  const [formObject, setFormObject] = useState(initialState);
  const [formObjectOutgoings, setFormObjectOutgoings] = useState(
    initialoutgoingsState
  );
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [tuman, setTuman] = useState([]);
  const [vos, setVos] = useState();
  console.log("🚀 ~ Chiqimmodal ~ vos:", vos);
  const [popone, setPopone] = useState(false);
  const [poptwo, setPoptwo] = useState(false);
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState();
  const [eventsubmit, setEventsubmit] = useState(false);
  const [outgoingsList, setOutgoingsList] = useState([]);
  const [outgoings, setOutgoings] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resetAll = () => {
    setFormObject(initialState);
    setFormObjectOutgoings(initialoutgoingsState);
    setFiles([]);
    setOutgoingsList([]);
    setOutgoings([]);
  };
  const handleClose = () => {
    setOpen(true);

    setPopone(false);
  };
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function uploadFile(e, setFiles) {
    setFiles((prev) => [
      ...prev,
      { file: e.target.files[0], filname: e.target.value },
    ]);
  }
  const getInputValue = (e) => {
    setFormObject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const getInputValuesOfOutgoings = (e) => {
    setFormObjectOutgoings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  function delFile(index, setFiles) {
    setFiles([]);
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderColor: 4,
  };

  function byurt(e) {
    e.preventDefault();
    setEventsubmit(true);
    if (!Object.entries(formObjectOutgoings).every(([, value]) => value)) {
      toast.error(t("Ma'lumotlarni to'liq kiriting"));
      return;
    } else {
      setOutgoingsList((prev) => [...prev, formObjectOutgoings]);
      setPoptwo(false);
      setFormObjectOutgoings(initialoutgoingsState);
    }
  }
  const countune = (e) => {
    e.preventDefault();
    if (formObject.vssb.id) {
      setOpen(false);
      setPopone(true);
    } else {
      toast.warning("Iltimos Viloyatni Tanlang!");
    }
  };
  useEffect(() => {
    request
      .get("/user/respublika/viloyatlar/", config)
      .then((data) => setData(data.data.muassasalar));
    request
      .get("/ariza/vositalar/", config)
      .then((data) => setVos(data.data.data));
    request
      .get("/user/respublika/tumanlar/", config)
      .then((data) => setTuman(data.data.muassasalar));
  }, []);
  useEffect(() => {
    setOutgoings(
      outgoingsList.map((el) => {
        return {
          ...el,
          nomi: el.nom.nomi || "",
          turi: el.tur.nomi || "",
          vosita_nomi: +el.nom.id,
          vosita_turi: +el.tur.id,
          vosita_miqdori: +el.vosita_miqdori,
          vosita_seryasi: el.vosita_seryasi,
        };
      })
    );
  }, [outgoingsList, outgoingsList.length]);
  const Save = () => {
    // eslint-disable-next-line no-mixed-operators
    if (formObject.ttb?.id || (formObject.vssb?.id && outgoings.length > 0)) {
      const formData = new FormData();
      formData.append("partiya_raqam", +formObject.partiya_raqam);
      files[0] && formData.append("file", files[0].file);
      formData.append(
        "image",
        get(images, "files[0]") ? get(images, "files[0]") : null
      );
      formData.append("comment", formObject.comment);
      formData.append("vositalar", JSON.stringify(outgoings));
      if (formObject.vssb?.id && !formObject.ttb?.id) {
        formData.append("vssb_id", +formObject.vssb?.id);
        request
          .post(
            "/omborxona/kirim/qilish/UzMedImpeks/dan/VSSB/ga",
            formData,
            config
          )
          .then(() => {
            toast.success("Chiqim qilindi");
            resetAll();
          })
          .catch((err) => {
            toast.error(`Chiqim qilinmadi! Ma'lumot kiritishda xatolik mavjud`);
          });
        setPopone(false);
      }
      if (formObject.ttb?.id) {
        setTimeout(() => {
          formData.append("ttb_id", +formObject.ttb?.id);
          request
            .post(
              "/omborxona/kirim/qilish/UzMedImpeks/dan/TTB/ga",
              formData,
              config
            )
            .then((res) => {
              setOpens2(true);
              setPopone(false);
              toast.success("Chiqim qilindi");
              setFormObject(initialState);
              setOutgoings([]);
              setOutgoingsList([]);
            })
            .catch((err) => {
              toast.error(`Chiqim qilinmadi! Ma'lumot yuklashda xatolik bor`);
            });
        }, 1500);
      }
    } else {
      toast.error("Vosita Qo'shilmagan!");
    }
  };

  const removeTools = (e) => {
    setOutgoings(outgoings.filter((el, index) => index !== e));
    setOutgoingsList(outgoingsList.filter((el, index) => index !== e));
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        style={{ marginRight: "20px", backgroundColor: "#F69641" }}
        startIcon={<ArrowOutwardIcon />}
        variant="contained"
      >
        {t("input.chiq")}
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={() => {
          setOpen(false);
          resetAll();
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-one" sx={{ ...style, width: 500 }}>
          <div>
            <Button
              style={{
                marginBottom: "14px",
                marginLeft: "-25px",
              }}
              variant="text"
              onClick={() => {
                setOpen(false);
                resetAll();
              }}
            >
              <SvgIcon component={ArrowBackIcon} inheritViewBox />
            </Button>
            <h2 className="kirm-head">{t("bildirishnoma.chiqim")}</h2>
          </div>
          <form onSubmit={countune}>
            <TextField
              style={{
                width: "437px",
                marginBottom: "20px",
              }}
              id="outlined-basic"
              name="partiya_raqam"
              value={formObject.partiya_raqam}
              onChange={getInputValue}
              label={t("vosita.partiys")}
              variant="outlined"
              required
              type={"number"}
            />
            <FormControl
              fullWidth
              style={{
                marginBottom: "20px",
              }}
            >
              <InputLabel id="demo-simple-select-label">
                {t("bildirishnoma.vlssv")} *
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formObject.vssb}
                name="vssb"
                onChange={getInputValue}
                required
                label={t("bildirishnoma.vlssv")}
              >
                {data.map((el, index) => {
                  return (
                    <MenuItem key={index} value={el}>
                      {el?.nomi}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              style={{
                marginBottom: "20px",
              }}
            >
              <InputLabel id="demo-simple-select-label">
                {t("pdf.rmo")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={getInputValue}
                name={"ttb"}
                value={formObject.ttb}
                label="Nomi"
                disabled={
                  !formObject.vssb?.id ||
                  !tuman.filter((el) => el.viloyat_id == formObject.vssb?.id)
                    .length
                }
              >
                {tuman
                  .filter((el) => el.viloyat_id == formObject.vssb?.id)
                  .map((el) => {
                    return <MenuItem value={el}>{el.nomi}</MenuItem>;
                  })}
              </Select>
            </FormControl>

            <TextField
              style={{
                width: "437px",
                marginBottom: "20px",
              }}
              id="outlined-basic"
              name="comment"
              value={formObject.comment}
              onChange={getInputValue}
              label={t("input.yuk")}
              variant="outlined"
              required
            />
            <div>
              <h4 className="sarflov_block_title">{t("Rasm biriktirish")} *</h4>
              {!get(images, "value") ? (
                <label className={"input_tyle_download fix-file"} id="f1">
                  {/* fix-btn */}
                  <input
                    onChange={(e) => setImages(e.target)}
                    value={get(images, "value")}
                    className="visually-hidden"
                    id="f1"
                    type="file"
                    accept="image/*"
                  />
                  <img
                    style={{
                      display: "block",
                      margin: "0 auto",
                      marginBottom: "14px",
                    }}
                    src={scrip}
                    alt="..."
                  />
                  {
                    t("Rasmni bu yerga tashlang yoki biriktiring")
                    // : t("vosita.qosh")
                  }
                </label>
              ) : null}
            </div>
            {get(images, "value") ? (
              <div className="sarflov_block_inner_div">
                <div className="sarflov_block_download_file">
                  <div
                    className="input_tyle_download"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div>
                      <img src={pdfDoc} alt="" className="label_img" />
                      <span className="file-name"> {get(images, "value")}</span>
                    </div>
                    <div className=" ">
                      <Button onClick={() => setImages(null)}>
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <Button
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
              type="submit"
              variant="contained"
            >
              {t("vosita.davom")}
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={popone}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-one" sx={{ ...style, width: 500 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Button
                style={{
                  marginBottom: "14px",
                  marginLeft: "-25px",
                }}
                variant="text"
                onClick={handleClose}
              >
                <SvgIcon component={ArrowBackIcon} inheritViewBox />
              </Button>
              <h2 className="kirm-head">{t("bildirishnoma.chiqim")}</h2>
            </div>
            <Button
              style={{
                marginBottom: "14px",
                marginLeft: "-25px",
              }}
              variant="text"
              onClick={() => setPopone(false)}
            >
              <SvgIcon component={ClearIcon} inheritViewBox />
            </Button>
          </div>
          <p className="chiqim-page">
            {t("bola.tan")} {t("bildirishnoma.vlssv")}: {formObject.vssb?.nomi}{" "}
          </p>
          {!!formObject.ttb?.nomi && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="chiqim-page"
            >
              {t("bola.tan")} {t("pdf.rmo")} : {formObject.ttb.nomi}{" "}
            </div>
          )}

          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginBottom: "28px",
            }}
          >
            <Tabs
              style={{ backgroundColor: "#fff" }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t("bildirishnoma.single.vosi")} />
              <Tab label={t("input.fayl")} />
            </Tabs>
          </Box>
          {value === 0 && (
            <div
              style={{ overflowY: "scroll", height: "400px" }}
              className={"site-list--create"}
            >
              {!!outgoings.length &&
                outgoings.map((el, index) => {
                  return (
                    <ul
                      style={{
                        marginBottom: "16px",
                        listStyle: "none",
                        border: "1px solid var(--greys-variants-200, #E1E1E1)",
                        borderRadius: "12px",
                        padding: "20px",
                      }}
                    >
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "1rem",
                          marginBottom: "12px",
                        }}
                      >
                        <span>#{index + 1}</span>
                        <button onClick={() => removeTools(index)}>
                          <img src={l3} alt="delete" />
                        </button>
                      </li>
                      <li className="site-list__item">
                        <span className="border-list">Nomi</span>
                        <span className="border-list">{el?.nomi}</span>
                      </li>
                      <li className="site-list__item">
                        <span className="border-list">Turi</span>
                        <span className="border-list">{el.turi}</span>
                      </li>
                      <li className="site-list__item">
                        <span className="border-list">Vosita Seriyasi</span>
                        <span className="border-list">{el.vosita_seryasi}</span>
                      </li>
                      <li className="site-list__item">
                        <span className="border-list">
                          {t("bildirishnoma.single.miqdori")}
                        </span>
                        <span className="border-list">{el.vosita_miqdori}</span>
                      </li>
                    </ul>
                  );
                })}
            </div>
          )}
          {value === 1 && (
            <section className={value === 0 && "visually-hidden"}>
              <div
                style={
                  files[0] && {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }
                }
              >
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.new.fail")}
                </h4>
                <label
                  className={
                    files[0] ? "fix-btn" : "input_tyle_download fix-file"
                  }
                  id="f1"
                >
                  <input
                    onChange={(e) =>
                      files.length < 1 && uploadFile(e, setFiles)
                    }
                    className="visually-hidden"
                    id="f1"
                    disabled={files.length > 0}
                    type="file"
                  />
                  <img
                    className={files[0] && "visually-hidden"}
                    style={{
                      display: "block",
                      margin: "0 auto",
                      marginBottom: "14px",
                    }}
                    alt="..."
                    src={scrip}
                  />
                  {!files[0]
                    ? t("bildirishnoma.new.failinf")
                    : t("vosita.qosh")}
                </label>
              </div>
              {files[0] ? (
                <div className="sarflov_block_inner_div">
                  {files.map((item, index) =>
                    files.length > 0 ? (
                      <div key={index} className="sarflov_block_download_file">
                        <label className="input_tyle_download">
                          <img src={pdfDoc} alt="" className="label_img" />
                          {item.filname}
                          <div className="close_file">
                            <Button
                              onClick={(e) => delFile(index, setFiles)}
                              startIcon={<CloseIcon />}
                            ></Button>
                          </div>
                        </label>
                      </div>
                    ) : null
                  )}
                </div>
              ) : null}
            </section>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "36px",
              borderTop: "1px solid #E7EBF2",
            }}
          >
            {value === 0 ? (
              <Button
                onClick={() => setPoptwo(true)}
                startIcon={<AddIcon />}
                style={{
                  border: "none",
                }}
                variant="outlined"
              >
                {t("vosita.vositaqosh")}
              </Button>
            ) : null}
          </div>
          <Button
            onClick={Save}
            style={{
              width: "100%",
              marginTop: "20px",
              borderRadius: "12px",
            }}
            variant="contained"
          >
            {t("input.chiq")}
          </Button>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={poptwo}
        onClose={() => setPoptwo(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Button
            style={{
              marginBottom: "14px",
              marginLeft: "-25px",
            }}
            variant="text"
            onClick={() => setPoptwo(false)}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </Button>
          <h2 className="kirm-head">{t("vosita.vositaqosh")}</h2>
          <form onSubmit={byurt}>
            <FormControl fullWidth>
              <InputLabel
                style={{ backgroundColor: "#fff" }}
                id="demo-simple-select-label"
              >
                {t("vosita.vositaturi")} *
              </InputLabel>
              <Select
                style={{ marginBottom: "20px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Nomi"
                name="tur"
                value={formObjectOutgoings.tur}
                error={eventsubmit && !formObjectOutgoings.tur.id}
                onChange={getInputValuesOfOutgoings}
              >
                {vos &&
                  vos.map((el) => {
                    return <MenuItem value={el}>{el.nomi}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                style={{ backgroundColor: "#fff" }}
                id="demo-simple-select-label"
              >
                {t("bildirishnoma.single.nomi")} *
              </InputLabel>
              <Select
                style={{ marginBottom: "20px" }}
                labelId="demo-simple-select-label"
                name={"nom"}
                value={formObjectOutgoings.nom}
                onChange={getInputValuesOfOutgoings}
                id="demo-simple-select"
                error={eventsubmit && !formObjectOutgoings.nom.id}
                label={t("bildirishnoma.single.nomiinput")}
              >
                {formObjectOutgoings.tur?.vosita_nomlari &&
                  formObjectOutgoings.tur.vosita_nomlari?.map((el) => {
                    return <MenuItem value={el}>{el.nomi}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            <TextField
              style={{
                width: "437px",
                marginBottom: "20px",
              }}
              onChange={getInputValuesOfOutgoings}
              id="outlined-basic"
              label="Vosita Seriyasi *"
              name={"vosita_seryasi"}
              value={formObjectOutgoings.vosita_seryasi}
              error={eventsubmit && !formObjectOutgoings.vosita_seryasi}
              variant="outlined"
            />
            <TextField
              style={{
                width: "437px",
                marginBottom: "20px",
              }}
              name={"vosita_miqdori"}
              value={formObjectOutgoings.vosita_miqdori}
              onChange={getInputValuesOfOutgoings}
              id="outlined-basic"
              label={t("bildirishnoma.single.miqdori") + "*"}
              variant="outlined"
              error={eventsubmit && !formObjectOutgoings.vosita_miqdori}
              type={"number"}
            />
            <Button
              style={{
                display: "block",
              }}
              type="submit"
              variant="contained"
            >
              {t("bildirishnoma.jonat")}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
export default Chiqimmodal;

import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import pdfDoc from "assets/icon/pdf_doc.svg";
import scrip from "assets/icon/scripka.svg";
import useGet from "hooks/useGet";
import { get } from "lodash";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { request } from "../../../../api/request";
import "./ariza.scss";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Rolarizaobl = () => {
  let todayDate = moment().add(1, "days").format().split("T")[0];
  const [age, setAge] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [date, setDate] = useState(todayDate);
  const [file, setFile] = useState(null);
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
    if (num.from >= 0 && num.to > 0) {
      if (
        numarr.every((item) => item.from !== num.from || item.to !== num.to)
      ) {
        if (num.from > num.to || num.from === num.to) {
          toast.error("Bunday yosh toifasi kiritib bo'lmaydi.");
        } else {
          setNumarr([...numarr, num]);
        }
      } else {
        toast.error("Bu yosh toifasi mavjud.");
      }
    } else {
      toast.error("Yosh toifasini tanlang.");
    }
  }
  function numAdd2() {
    if (num2.from >= 0 && num2.to > 0) {
      if (
        numarr2.every((item) => item.from !== num2.from || item.to !== num2.to)
      ) {
        if (num2.from > num2.to || num2.from === num2.to) {
          toast.error("Bunday oy toifasi kiritib bo'lmaydi.");
        } else {
          setNumarr2([...numarr2, num2]);
        }
      } else {
        toast.error("Bu oy toifasi mavjud.");
      }
    } else {
      toast.error("Oy toifasini tanlang.");
    }
  }
  const File = (e) => {
    setFile(e);
  };

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
  function handleChangeMedicalPoints(selectedMedicalPoint) {
    const isThereSelectMedicalPoints = selectedMedicalPoints.find(
      (item) => item.id === selectedMedicalPoint.id
    );
    if (isThereSelectMedicalPoints) {
      const removedSelectedMedicalPoints = selectedMedicalPoints.filter(
        (item) => item.id !== selectedMedicalPoint.id
      );
      setSelectedMedicalPoints(removedSelectedMedicalPoints);
    } else {
      setSelectedMedicalPoints((prev) => [...prev, selectedMedicalPoint]);
    }
  }

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [input, setInput] = useState([]);
  const [selectedMedicalPoints, setSelectedMedicalPoints] = useState([]);

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

  const navigate = useNavigate();

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const { t } = useTranslation();
  function Heets(e) {
    e.preventDefault();
    const fordata = new FormData();
    if (!selectedMedicalPoints[0]) {
      return toast.error("Yuboriluvchi muassasa tanlanmadi!");
    }
    if (!file?.files[0]) {
      return toast.error("Fayl yuklanmadi!");
    }

    fordata.append("fayl", file && file.files[0]);
    for (let [key, value] of Object.entries(input)) {
      fordata.append(key, value);
    }
    fordata.append(
      "kimga",
      JSON.stringify(selectedMedicalPoints.map((item) => item.id))
    );
    const numarrsend2 = [];
    numarr.map((item) => {
      numarrsend2.push(`${Number(item.from)}-${Number(item.to)}`);
    });
    fordata.append("yosh_toifa", JSON.stringify(numarrsend2));
    const numarrsend1 = [];
    numarr2.map((item) => {
      numarrsend1.push(`${Number(item.from)}-${Number(item.to)}`);
    });
    fordata.append("oy_toifa", JSON.stringify(numarrsend1));
    fordata.append("qoshimcha", additionalText);
    fordata.append("muddati", date);
    request
      .post(`/bildirishnoma/viloyat/`, fordata, config)
      .then(function (res) {
        toast.success("Yuborildi");
        navigate("/notification?page=1&tab=2&s-tab=2");
      })
      .catch(function (err) {
        if (err?.response?.data?.message) {
          toast.error(err.response.data.message);
          return;
        }
        toast.error("Yuborilmadi!");
      });
  }

  const { type } = useParams();

  const [opens1, setOpens1] = useState(false);
  const handleClose1 = () => setOpens1(false);

  const { data: ariza } = useGet({ url: "/user/viloyat/tumanlar/" });
  const { data: tuman } = useGet({ url: "/user/viloyat/muassasalar/" });

  if (todayDate > date) {
    toast.error("Belgilangan Muddatdan Ortga Surib Bo'llmaydi!");
    setDate(todayDate);
  }
  const fileInput = useRef(null);

  const handleSelectAll = (data = []) => {
    if (selectedMedicalPoints.length !== data.length) {
      setSelectedMedicalPoints(data);
    } else {
      setSelectedMedicalPoints([]);
    }
  };

  const boxStyle = {
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
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Link to={"/notification"}>
          <Button variant="contained">{t("bildirishnoma.new.ortga")}</Button>
        </Link>
        <h3 className="rol_ariza_top_title">
          {t("bildirishnoma.new.yaratish")}
        </h3>
      </div>
      <div className="rol_ariza_bottom">
        <div className="rol_ariza_bottom_top">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.new.kimdankimga")}
          </h4>
          <div className="rol_ariza_bottom_bigbox">
            <div className="rol_ariza_bottom_block">
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
                  label={t("pdf.vs")}
                  disabled
                  variant="outlined"
                />
              </Box>
            </div>
            <div className="rol_ariza_bottom_block"></div>

            {type === "tuman" ? (
              <div className="rol_ariza_bottom_block">
                <p className="rol_ariza_bottom_block_desc">
                  {t("bildirishnoma.new.kimga")}{" "}
                  <span className="text-red">*</span>
                </p>

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  value={selectedMedicalPoints}
                  options={get(ariza, "muassasalar", [])}
                  onChange={(_, value) => setSelectedMedicalPoints(value)}
                  getOptionLabel={(option) => option.nomi}
                  renderOption={(props, option, { index, selected }) => (
                    <React.Fragment key={v4()}>
                      {index === 0 && (
                        <li
                          style={{ marginLeft: "15px" }}
                          onClick={() =>
                            handleSelectAll(get(ariza, "muassasalar", []))
                          }
                        >
                          <Checkbox
                            checked={
                              selectedMedicalPoints.length ===
                              get(ariza, "muassasalar").length
                            }
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                          />
                          {t("Hammasi")}
                        </li>
                      )}
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          value={option.id}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.nomi}
                      </li>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("pdf.rmo")}
                      placeholder="Qo'shish"
                    />
                  )}
                />
              </div>
            ) : (
              <div className="rol_ariza_bottom_block">
                <p className="rol_ariza_bottom_block_desc">
                  {t("bildirishnoma.new.kimga")}{" "}
                  <span className="text-red">*</span>
                </p>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  value={selectedMedicalPoints}
                  options={get(tuman, "muassasalar", [])}
                  onChange={(_, value) => {
                    setSelectedMedicalPoints(value);
                  }}
                  getOptionLabel={(option) => option.nomi}
                  renderOption={(props, option, { index, selected }) => (
                    <div key={v4()}>
                      {index === 0 && (
                        <li
                          style={{ marginLeft: "15px" }}
                          onClick={() =>
                            handleSelectAll(get(tuman, "muassasalar", []))
                          }
                        >
                          <Checkbox
                            checked={
                              selectedMedicalPoints.length ===
                              get(tuman, "muassasalar").length
                            }
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                          />
                          {t("Hammasi")}
                        </li>
                      )}
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          value={option.id}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.nomi}
                      </li>
                    </div>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("pdf.oshp")}
                      placeholder="Qo'shish"
                    />
                  )}
                />
              </div>
            )}
          </div>
        </div>
        <div className="rol_ariza_flex">
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.boshqa")}
                </h4>
                <div className="rol_ariza_bottom_div_t7">
                  <div className="rol_ariza_bottom_div_inner_block_select">
                    <p className="rol_ariza_bottom_block_desc">
                      {t("bildirishnoma.new.turi")}
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" disabled>
                          {t("vosita.bola")}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Age"
                          onChange={handleChange}
                          defaultValue="Bolalar va ehtiyojlar bo’ yicha so'rov"
                          disabled
                        >
                          <MenuItem MenuItem value={10}>
                            Bolalar va ehtiyojlar bo’ yicha so'rov
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select">
                    <p className="rol_ariza_bottom_block_desc">
                      {t("bildirishnoma.new.vazifasi")}
                    </p>
                    <TextField
                      type="date"
                      id="outlined-basic"
                      variant="outlined"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
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
                    onChange={(e) => setAdditionalText(e.target.value)}
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
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.bolalar")}
                </h4>
                <p className="yil_oy">{t("bola.yosh")}</p>
                <div
                  className="num_block_ariza"
                  style={{ display: "flex!important", alignItems: "center" }}
                >
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
                  <div
                    className="rol_ariza_textarea"
                    style={{ border: "none!important" }}
                  >
                    <Button
                      onClick={numAdd}
                      className="addButton"
                      variant="contained"
                      startIcon={<AddIcon />}
                    ></Button>
                  </div>
                </div>
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
                <p className="yil_oy">{t("vosita.oy")}</p>
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
                  <div className="rol_ariza_textarea">
                    <Button
                      onClick={numAdd2}
                      variant="contained"
                      className="addButton"
                      startIcon={<AddIcon />}
                    ></Button>
                  </div>
                </div>
                <div className="age_num_block">
                  {numarr2.map((item, index) => (
                    <div className="age_num_block_inner">
                      <p>{item.from}</p>
                      <p>-</p>
                      <p>{item.to}</p>
                      <p>-</p>
                      <p>{t("vosita.oy")}</p>
                      <button onClick={(e) => numDel2(index)}>x</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <div className="sarflov_block">
                <div id="parent">
                  <div
                    className="sarflov_block_comment_inner"
                    style={{
                      margin: "0!important",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4 className="sarflov_block_title">
                      {t("bildirishnoma.new.fail")}*
                    </h4>
                    <input
                      ref={fileInput}
                      onChange={(e) => File(e.target)}
                      type="file"
                      disabled={file}
                      id="files"
                      className="input_download"
                    />
                    {!file ? (
                      <label htmlFor="files" className="all_download">
                        <img className="scrip_file" src={scrip} alt="" />
                        {t("vosita.qosh")}
                      </label>
                    ) : (
                      <label
                        htmlFor="files"
                        className="all_download"
                        variant="contained"
                        size="small"
                        onClick={() => {
                          fileInput.current.value = "";
                          setFile(null);
                        }}
                      >
                        <img className="scrip_file" src={scrip} alt="" />
                        {t("input.Ozgarish")}
                      </label>
                    )}
                  </div>
                  {file ? (
                    <div className="sarflov_block_inner_div" id="child">
                      <div className="sarflov_block_download_file">
                        <label className="input_tyle_download">
                          <img src={pdfDoc} alt="" className="label_img" />
                          {get(file, "value")}
                          <div className="close_file">
                            <Button
                              onClick={() => {
                                setFile(null);
                                fileInput.current.value = "";
                              }}
                              startIcon={<CloseIcon />}
                            ></Button>
                          </div>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
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
          <Box sx={boxStyle}>
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

export default Rolarizaobl;

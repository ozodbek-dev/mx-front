import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../../../api/request";
import "./ariza.scss";
import { v4 } from "uuid";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Rolariza = () => {
  const { t } = useTranslation();
  const [age, setAge] = useState("");
  const [person, setPerson] = useState({});
  const [pass, setPass] = useState();
  const params = useParams();
  const [num, setNum] = useState({
    from: 0,
    to: 0,
  });
  const [num2, setNum2] = useState({
    from: 0,
    to: 0,
  });
  const [numarr, setNumarr] = useState([]);
  const navigate = useNavigate();
  const [numarr2, setNumarr2] = useState([]);
  const [date, setDate] = useState();

  function numAdd() {
    if (num.from >= 0 && num.to > 0) {
      if (
        numarr.every((item) => item.from !== num.from || item.to !== num.to)
      ) {
        if (num.from > num.to) {
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
        if (num2.from > num2.to) {
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
    if (e.target.files[0]) {
      setPass(e.target.files[0]);
    }
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

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [loader, setLoeder] = useState(true);
  useEffect(() => {
    request
      .get(`/hududlar/`, config)
      .then(function (res) {
        setLoeder(false);
      })
      .catch(function (err) {});
  }, [loader]);
  const [selectedMedicalPoints, setSelectedMedicalPoints] = useState([]);
  const [tar, setTar] = useState();
  const [ariza, setAriza] = useState({
    isFetched: false,
    data: [],
    error: false,
  });

  useEffect(() => {
    request
      .get(`/user/rmo/muassasalar/`, config)
      .then(function (res) {
        setAriza({
          isFetched: true,
          data: get(res, "data.muassasalar", []),
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

  useEffect(() => {
    request
      .get("/bildirishnoma/tumanga/", config)
      .then((data) =>
        setPerson(data.data.data.find((el) => +el.id === +params.id))
      );
  }, []);

  const [opens1, setOpens1] = useState(false);
  const handleOpen1 = () => setOpens1(true);
  const handleClose1 = () => setOpens1(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  function Heets(e) {
    e.preventDefault();
    if (!selectedMedicalPoints[0]) {
      alert("Yuboriluvchi Muassasa Tanlanmadi!");
      return;
    }

    const numarrsend1 = numarr2.map((item) => `${item.from}-${item.to}`);
    const numarrsend2 = numarr.map((item) => `${item.from}-${item.to}`);

    // console.log(JSON.parse(person.yosh_toifa), JSON.parse(person.oy_toifa));

    // if (
    //   !numarrsend1.length &&
    //   !JSON.parse(person.yosh_toifa).length &&
    //   !numarrsend2.length &&
    //   !JSON.parse(person.oy_toifa).length
    // ) {
    //   toast.error(t("Yosh toifa va oy toifani tanlash majburiy"));
    //   return;
    // }

    const fordata = new FormData();
    if (pass) fordata.append("fayl", pass);
    fordata.append(
      "kimga",
      JSON.stringify(selectedMedicalPoints.map((item) => item.id))
    );

    params.id === "null" &&
      numarrsend2.length &&
      fordata.append("yosh_toifa", JSON.stringify(numarrsend2));
    params.id === "null" &&
      numarrsend1.length &&
      fordata.append("oy_toifa", JSON.stringify(numarrsend1));
    params.id !== "null" && fordata.append("yosh_toifa", person.yosh_toifa);
    params.id !== "null" && fordata.append("oy_toifa", person.oy_toifa);
    if (tar) fordata.append("qoshimcha", tar);
    if (date) fordata.append("muddati", date);
    request
      .post(`/bildirishnoma/tuman/`, fordata, config)
      .then(function (res) {
        alert("Yuborildi!");
        navigate(-1);
        setLoeder(false);
      })
      .catch(function (err) {
        err.response.status === 406 ? handleOpen1() : handleClose1();
      });
    setLoeder(true);
  }

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
  const handleSelectAll = () => {
    // If no options are selected, select all options.
    // Otherwise, deselect all options.
    if (selectedMedicalPoints.length !== get(ariza, "data").length) {
      setSelectedMedicalPoints(get(ariza, "data"));
    } else {
      setSelectedMedicalPoints([]);
    }
  };
  const fileInput = useRef(null);

  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Button onClick={() => navigate(-1)} variant="contained">
          <span className="text-capitalize">
            {t("bildirishnoma.single.ortga")}
          </span>
        </Button>
        <h3 className="rol_ariza_top_title">
          {t("bildirishnoma.new.yaratish")}
        </h3>
      </div>
      <div className="rol_ariza_bottom">
        <div className="rol_ariza_bottom_top">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.new.kimdankimga")}
          </h4>
          <div className="grid grid-cols-2 gap-20">
            <div className="">
              <p className="rol_ariza_bottom_block_desc">
                {t("bildirishnoma.new.kimdan")}
              </p>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label={t("pdf.rmo")}
                  disabled
                  variant="outlined"
                />
              </Box>
            </div>
            <div className="">
              <p className="rol_ariza_bottom_block_desc">
                {t("bildirishnoma.new.kimga")}{" "}
                <span className="text-red">*</span>
              </p>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                value={selectedMedicalPoints}
                options={get(ariza, "data")}
                onChange={(_, value) => setSelectedMedicalPoints(value)}
                // disableCloseOnSelect
                getOptionLabel={(option) => option.nomi}
                renderOption={(
                  props,
                  option,
                  { index, selected },
                  ownerState
                ) => {
                  return (
                    <>
                      {index === 0 && (
                        <li
                          style={{ marginLeft: "15px" }}
                          onClick={handleSelectAll}
                        >
                          <Checkbox
                            checked={
                              selectedMedicalPoints.length ===
                              get(ariza, "data").length
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
                    </>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("pdf.oshp")}
                    placeholder="Qo'shish"
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="rol_ariza_flex">
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.boshqa")}
                </h4>
                <div className="grid grid-cols-2 gap-20">
                  <div className="">
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
                            {" "}
                            Bolalar va ehtiyojlar bo’ yicha so'rov
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div className="">
                    <p className="rol_ariza_bottom_block_desc">
                      {t("bildirishnoma.new.vazifasi")}
                    </p>
                    <DatePicker
                      className="w-full"
                      format="DD/MM/YYYY"
                      minDate={dayjs()}
                      onChange={(e) => setDate(dayjs(e).format("YYYY-MM-DD"))}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <div className="flex">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.new.inf")}{" "}
                  </h4>
                  <span className="text-red">*</span>
                </div>
                <div className="rol_ariza_textarea">
                  <TextareaAutosize
                    style={{ resize: "none" }}
                    onChange={(e) => setTar(e.target.value)}
                    aria-label="empty textarea"
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
            {params.id !== "null" && (
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <div className="rol_ariza_bottom_div_inner">
                    <h4 className="rol_ariza_bottom_title">
                      {t("modalariza.toif")}
                    </h4>
                    <ul className="site-list">
                      {JSON.parse(get(person, "oy_toifa", "[]"))?.length > 0
                        ? JSON.parse(get(person, "oy_toifa", "[]")).map(
                            (el) => {
                              return (
                                <li className="site-list__items" key={v4()}>
                                  {el} {t("vosita.oy")}
                                </li>
                              );
                            }
                          )
                        : t("Kitirilmagan")}
                    </ul>
                  </div>

                  <div className="rol_ariza_bottom_div_inner">
                    <h4 className="rol_ariza_bottom_title">
                      {t("input.toif")}
                    </h4>
                    <ul className="site-list">
                      {JSON.parse(get(person, "yosh_toifa", "[]"))?.length > 0
                        ? JSON.parse(get(person, "yosh_toifa", "[]")).map(
                            (el) => {
                              return (
                                <li className="site-list__items" key={v4()}>
                                  {el} {t("bola.yosh")}
                                </li>
                              );
                            }
                          )
                        : t("Kitirilmagan")}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {params.id === "null" && (
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <div className="flex">
                    <h4 className="rol_ariza_bottom_title">
                      {t("bildirishnoma.new.bolalar")}
                    </h4>
                    <span className="text-red">*</span>
                  </div>
                  <p className="yil_oy">
                    {t("bola.yosh")}
                    <span className="text-red">*</span>
                  </p>
                  <div className="num_block_ariza">
                    <div className="rol_ariza_textarea">
                      <p className="rol_num_ariza">
                        {t("bildirishnoma.new.dan")}{" "}
                      </p>
                      <div className="rol_ariza_number_left">
                        {num.from === 0 ? (
                          <button
                            disabled
                            onClick={() =>
                              setNum({ ...num, from: num.from - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setNum({ ...num, from: num.from - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        )}
                        <p className="num_title">{num.from} </p>
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
                      className="num_block_ariza--btn"
                      onClick={numAdd}
                      variant="contained"
                      startIcon={<AddIcon />}
                    ></Button>
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
                  <p className="yil_oy">
                    {t("vosita.oy")} <span className="text-red">*</span>
                  </p>
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
                            onClick={() =>
                              setNum2({ ...num2, to: num2.to - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setNum2({ ...num2, to: num2.to - 1 })
                            }
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
                      className="num_block_ariza--btn"
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
                        <p>{t("vosita.oy")}</p>
                        <button onClick={(e) => numDel2(index)}>x</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="rol_ariza_bottom_div_inner">
              <div className="sarflov_top_blocks">
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.new.fail")}
                </h4>

                {pass ? (
                  <Button
                    className="delets_icons_file"
                    startIcon={<DeleteForeverIcon />}
                    onClick={() => {
                      fileInput.current.value = null;
                      setPass(null);
                    }}
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
                ref={fileInput}
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

export default Rolariza;

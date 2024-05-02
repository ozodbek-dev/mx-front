import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Box } from "@mui/system";
import useGet from "hooks/useGet";
import { forwardRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { request } from "../../../../api/request";
import "./ariza.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Erkin = () => {
  const [pass, setPass] = useState();
  const navigate = useNavigate();

  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      setPass(e.target.files[0]);
    }
  };

  const { t } = useTranslation();
  const [input, setInput] = useState({});

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
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const token = window.localStorage.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
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
  const [selectedMedicalPoints, setSelectedMedicalPoints] = useState([]);

  function Heets(e) {
    e.preventDefault();
    if (!selectedMedicalPoints[0])
      return alert("Yuboriluvhci Muassasa Tanlanmadi!");
    if (!selectedMedicalPoints[0])
      return alert("Yuboriluvhci Muassasa Tanlanmadi!");
    if (!pass) return alert("Fayl yuklash majburiy!");
    const fordata = new FormData();
    if (pass) fordata.append("fayl", pass);
    if (!input["muddati"]) {
      toast.error(t("Vazifani topshirish muddati majburiy"));
      return;
    }
    for (let [key, value] of Object.entries(input)) {
      if (input[key]) fordata.append(key, value);
      else {
        fordata.append(key, "");
      }
    }
    fordata.append("text", "text");
    fordata.append(
      "kimga",
      selectedMedicalPoints.map((item) => item.id)
    );
    request
      .post(`/bildirishnoma/erkin/`, fordata, config)
      .then(function (res) {
        setNotificationn({
          state: "success",
          text: `Xabarnoma yuborildi`,
        });
        setTimeout(() => {
          navigate(-1);
        }, 1500);

        handleClick(true);
      })
      .catch(function (err) {
        setNotificationn({
          state: "error",
          text: `Xatolik yuz berdi tekshirib boshidan yuboring`,
        });
        handleClick(true);
      });
  }

  const {
    data: { muassasalar: points = [] },
  } = useGet({
    url: `/user/rmo/muassasalar/`,
  });

  const handleSelectAll = () => {
    // If no options are selected, select all options.
    // Otherwise, deselect all options.
    if (selectedMedicalPoints.length !== points?.length) {
      setSelectedMedicalPoints(points);
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
            <div className="rol_ariza_bottom_block">
              <p className="rol_ariza_bottom_block_desc">
                {t("bildirishnoma.new.kimdan")}
              </p>
              <TextField
                id="outlined-basic"
                label={t("pdf.rmo")}
                disabled
                fullWidth={true}
                variant="outlined"
              />
            </div>
            <div className="rol_ariza_bottom_block">
              <div className="">
                <div className="rol_ariza_bottom_block">
                  <p className="rol_ariza_bottom_block_desc">
                    {t("bildirishnoma.new.kimga")}
                    <span className="text-red">*</span>
                  </p>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    value={selectedMedicalPoints}
                    options={points}
                    onChange={(_, value) => setSelectedMedicalPoints(value)}
                    disableCloseOnSelect
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
                                  points?.length
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
                        required
                        label={t("pdf.oshp")}
                        placeholder="Qo'shish"
                      />
                    )}
                  />
                </div>
              </div>
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
                <div className="grid  grid-cols-2 gap-10">
                  <div className="">
                    <p className="rol_ariza_bottom_block_desc">
                      {t("bildirishnoma.new.turi")}
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue="Erkin xabar"
                          disabled
                        >
                          <MenuItem value={"Erkin xabar"}>
                            {t("vosita.erkin")}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div className="">
                    <p className="rol_ariza_bottom_block_desc">
                      {t("bildirishnoma.new.vazifasi")}
                      <span className="text-red">*</span>
                    </p>
                    <DatePicker
                      className="w-full"
                      format="DD/MM/YYYY"
                      minDate={dayjs()}
                      onChange={(e) =>
                        onChange({
                          target: {
                            value: dayjs(e).format("YYYY-MM-DD"),
                            name: "muddati",
                          },
                        })
                      }
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
                </div>
                <div className="rol_ariza_textarea">
                  <TextareaAutosize
                    required
                    style={{ maxWidth: "100%" }}
                    aria-label="empty textarea"
                    placeholder={t("bildirishnoma.new.infP")}
                    onChange={onChange}
                    name="qoshimcha"
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
              <div className="sarflov_top_blocks">
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.new.fail")}
                  <span className="text-red"> *</span>
                </h4>

                {pass ? (
                  <Button
                    className="delets_icons_file"
                    startIcon={<DeleteForeverIcon />}
                    onClick={() => {
                      fileInput.current.value = null;
                      setPass();
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
                onChange={(e) => handleChangeFile(e)}
                type="file"
                ref={fileInput}
                id="files"
                className="file_add_input"
                name="fayl"
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

export default Erkin;

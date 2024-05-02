import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import pdfDoc from "assets/icon/pdf_doc.svg";
import scrip from "assets/icon/scripka.svg";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./ariza.scss";
import { v4 } from "uuid";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const Erkinobl = () => {
  let todayDate = moment().add(1, "days").format().split("T")[0];
  const navigate = useNavigate();
  const [data, setData] = useState({
    whom: [],
    district: {},
    text: "",
    date: todayDate,
    addition: "",
    file: null,
  });

  const [selectedMedicalPoints, setSelectedMedicalPoints] = useState([]);

  const { t } = useTranslation();
  const { type } = useParams();

  const {
    data: { muassasalar: districts = [] },
  } = useGet({
    url: `/user/viloyat/tumanlar/`,
  });
  const {
    data: { muassasalar: points = [] },
  } = useGet({
    url: `/user/viloyat/muassasalar/${
      get(data, "district.id", null)
        ? `?tuman_id=${get(data, "district.id", null)}`
        : ""
    }`,
  });

  const [file, setFile] = useState(null);
  const File = (e) => {
    setData({ ...data, file: e.files[0] });
    setFile(e);
  };

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const { mutate } = usePost();

  const onSuccess = (query = "") => {
    toast.success("Bildirishnoma yuborildi");
    navigate(`/notification?${query}`);
    return;
  };
  const onError = () => {
    toast.error("Bildirishnomani yuborib bo'lmad,");
  };

  const handleSubmit = () => {
    if (!selectedMedicalPoints.length) {
      toast.warning("Yuboriluvchi Muassasa Tanlanmadi!");
      return;
    }
    if (!get(data, "file")) {
      toast.error("Fayl yuklanmagan");
      return;
    }
    const formdata = new FormData();
    formdata.append(
      "kimga",
      selectedMedicalPoints.map((item) => item.id)
    );
    formdata.append("fayl", get(data, "file"));
    formdata.append("qoshimcha", get(data, "addition"));
    formdata.append("muddati", get(data, "date"));
    formdata.append("text", get(data, "text"));
    if (type === "oilaviy") {
      mutate({
        url: "/bildirishnoma/erkin/VSSBdanLPUga/",
        data: formdata,
        onSuccess: () => onSuccess("page=1&r-tab=2&tab=1"),
        onError,
      });
    } else {
      mutate({
        url: "/bildirishnoma/erkin/VSSBdanTTBga/",
        data: formdata,
        onSuccess: () => onSuccess("page=1&r-tab=2&tab=1"),
        onError,
      });
    }
  };
  if (todayDate > data.date) {
    toast.error("Belgilangan Muddatdan Ortga Surib Bo'llmaydi!");
    setData({
      whom: data.whom,
      district: data.district,
      text: data.text,
      date: todayDate,
      addition: data.addition,
      file: data.file,
    });
  }

  const fileRef = useRef();
  const fileInput = useRef(null);

  const handleSelectAll = (data = []) => {
    if (selectedMedicalPoints.length !== data.length) {
      setSelectedMedicalPoints(data);
    } else {
      setSelectedMedicalPoints([]);
    }
  };
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Button variant="contained" onClick={() => navigate(-1)}>
          {t("bildirishnoma.new.ortga")}
        </Button>
        <h3 className="rol_ariza_top_title">
          {t("bildirishnoma.new.yaratish")}
        </h3>
      </div>
      <div className="grid">
        <div className="rol_ariza_bottom_top">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.new.kimdankimga")}
          </h4>
          <div className="grid grid-cols-3 gap-10">
            <div className="rol_ariza_bottom_block">
              <p className="rol_ariza_bottom_block_desc">
                {t("bildirishnoma.new.kimdan")}
              </p>
              <TextField
                className="w-full"
                id="outlined-basic"
                onChange={(e) => handleChange("text", e.target.value)}
                label="Ism sharif"
                variant="outlined"
              />
            </div>
            <div className="rol_ariza_bottom_block">
              <p className="rol_ariza_bottom_block_desc">{t("pdf.rmo")} *</p>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                value={selectedMedicalPoints}
                options={districts}
                onChange={(_, value) => {
                  setSelectedMedicalPoints(value);
                }}
                getOptionLabel={(option) => option.nomi}
                renderOption={(props, option, { index, selected }) => (
                  <div key={v4()}>
                    {index === 0 && (
                      <li
                        style={{ marginLeft: "15px" }}
                        onClick={() => handleSelectAll(districts)}
                      >
                        <Checkbox
                          checked={
                            selectedMedicalPoints.length === districts.length
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
                    label={t("pdf.rmo")}
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
                <div className="rol_ariza_bottom_div_t7">
                  <div className="rol_ariza_bottom_div_inner_block_select">
                    <p className="rol_ariza_bottom_block_desc">
                      {t("bildirishnoma.new.turi")}
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField variant="outlined" value={"Erkin xabar"} />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select">
                    <p className="rol_ariza_bottom_block_desc">
                      {t("bildirishnoma.new.vazifasi")}
                    </p>
                    <TextField
                      type="date"
                      onChange={(e) => handleChange("date", e.target.value)}
                      id="outlined-basic"
                      variant="outlined"
                      name="muddati"
                      value={data.date}
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
                    style={{ maxWidth: "100%" }}
                    onChange={(e) => handleChange("addition", e.target.value)}
                    placeholder={t("bildirishnoma.new.infP")}
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleSubmit} variant="contained">
              {t("input.otp")}
            </Button>
          </div>
          <div className="rol_ariza_bottom_div">
            {/* <div className="rol_ariza_bottom_div_inner">
              <div className="sarflov_top_blocks">
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.new.fail")} *
                </h4>

                {get(data, "file") ? (
                  <Button
                    className="delets_icons_file"
                    startIcon={<DeleteForeverIcon />}
                    onClick={() => {
                      handleChange("file", null);
                      fileRef.current.value = null;
                    }}
                    style={{ zIndex: 0 }}
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
                onChange={(e) => handleChange("file", e.target.files[0])}
                type="file"
                id="files"
                ref={fileRef}
                className="file_add_input"
                name="fayl"
              />
              <label className="download_label" htmlFor="">
                <div className="files_block_title">
                  <p className="files_add_title">
                    {get(data, "file")
                      ? t("bildirishnoma.new.failinf1")
                      : t("bildirishnoma.new.failinf")}
                  </p>
                  <span className="files_add_span">
                    {get(data, "file") ? "" : ""}
                  </span>
                </div>
              </label>
            </div> */}
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
    </div>
  );
};

export default Erkinobl;

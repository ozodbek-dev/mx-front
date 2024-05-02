import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  Autocomplete,
  Button,
  Checkbox,
  Snackbar,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Switch from "@mui/material/Switch";
import pdfDoc from "assets/icon/pdf_doc.svg";
import scrip from "assets/icon/scripka.svg";
import Loading from "components/loading/loading";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import moment from "moment";
import { forwardRef, Fragment, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./uzerkin.scss";

const label = { inputProps: { "aria-label": "Switch demo" } };
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Uzerkin = () => {
  const navigation = useNavigate();
  let todayDate = moment().add(1, "days").format().split("T")[0];
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
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

  const [down, setDown] = useState([]);
  const [pass, setPass] = useState();
  function addFile(e) {
    setDown([
      ...down,
      {
        filename: e.target.value,
      },
    ]);
    setPass(e.target.files[0]);
  }
  const files = useRef({});
  function delFile(index) {
    if (files.current) {
      files.current.value = "";
    }
    let sss = [];
    // sss.push(...down);
    // sss.splice(index, 1);
    // setDown(sss);
    setDown([]);
  }
  const initialState = { regions: [], districts: [], points: [] };
  const [time, setTime] = useState(todayDate);
  const [additionalText, setAdditionalText] = useState();
  const [data, setData] = useState(initialState);
  const [checked, setChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const {
    data: { muassasalar: regions = [] },
  } = useGet({ url: "/user/respublika/viloyatlar/" });
  const {
    data: { muassasalar: districts = [] },
  } = useGet({
    url: `/user/respublika/tumanlar/${
      data.regions.length ? `?viloyat_id=${get(data, "regions[0].id")}` : ""
    }`,
    enabled: data.regions.length,
  });
  const {
    data: { muassasalar: points = [] },
  } = useGet({
    url: `/user/respublika/muassasalar/${
      data.districts.length ? `?tuman_id=${get(data, "districts[0].id")}` : ""
    }`,
    enabled: data.districts.length,
  });

  const { mutate } = usePost();
  const onSuccess = () => {
    toast.success("Bildirishnoma yuborildi!");
    setIsLoading(false);
    navigation(-1);
  };
  const onError = () => {
    toast.error("Bildirishnoma yuborilmadi!");
    handleClick(true);
  };
  function Send(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", "");
    formData.append("muddati", time);
    formData.append("qoshimcha", additionalText);
    pass && formData.append("fayl", pass);
    if (data.regions.length) {
      setIsLoading(true);
      formData.delete("kimga");
      formData.append(
        "kimga",
        data.regions.map((region) => region.id)
      );
      mutate({
        url: `/bildirishnoma/erkin/UzMedImpeksdanVSSBga/`,
        data: formData,
        onSuccess: () => onSuccess(e),
        onError,
      });
    }
    if (data.districts.length) {
      formData.delete("kimga");
      formData.append(
        "kimga",
        data.districts.map((district) => district.id)
      );
      mutate({
        url: `/bildirishnoma/erkin/UzMedImpeksdanTTBga/`,
        data: formData,
        onSuccess,
        onError,
      });
    }
    if (data.points.length) {
      formData.delete("kimga");
      formData.append(
        "kimga",
        data.points.map((point) => point.id)
      );
      mutate({
        url: `/bildirishnoma/erkin/UzMedImpeksdanLPUga/`,
        data: formData,
        onSuccess,
        onError,
      });
    }
    if (checked) {
      formData.delete("kimga");
      mutate({
        url: `/bildirishnoma/erkin/UzMedImpeksdanMOHga/`,
        data: formData,
        onSuccess,
        onError,
      });
    } else if (!checked && !data.regions.length) {
      toast.error("Hududni Tanlang!");
    }
  }
  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };
  const toggleCheckAllItems = (e, items) => {
    if (e.target?.name) {
      if (data[e.target.name]?.length !== items?.length) {
        setData({ ...data, [e.target.name]: items });
      } else {
        setData({ ...data, [e.target.name]: [] });
      }
      return;
    }

    if (e.target?.parentNode.localName === "li") {
      const name =
        e.target?.parentNode?.childNodes[0]?.children[0]?.name || e.target.name;
      if (data[name]?.length !== items?.length) {
        setData({ ...data, [name]: items });
      } else {
        setData({ ...data, [name]: [] });
      }
    }
  };

  if (todayDate > time) {
    setTime(todayDate);
    toast.error("Topshirish Muddatini Ortga Surib Bo'lmaydi!");
  }
  const { t } = useTranslation();

  if (isLoading) return <Loading />;
  return (
    <div className="sarflov">
      <div className="sarflov_inner">
        <Button
          className="site-btn"
          onClick={() => window.history.back()}
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          {t("bildirishnoma.single.ortga")}
        </Button>
      </div>

      <form onSubmit={Send} className="uzerkin">
        <div className="sarflov_block">
          <h4 className="sarflov_block_title">
            {t("bildirishnoma.new.kimdankimga")} *
          </h4>
          <div className="sarflov_block_inner" style={{ display: "flex" }}>
            <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">
                {t("pdf.ssv")} ({t("bildirishnoma.send")})
              </h5>

              <TextField
                id="outlined-basic"
                variant="outlined"
                disabled
                value={t("bildirishnoma.sog")}
              />
              <Switch {...label} checked={checked} onChange={switchHandler} />
            </div>
            <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.vlssv")} ({t("bildirishnoma.send")})
              </h5>

              <Autocomplete
                multiple
                disableCloseOnSelect
                options={[...regions]}
                value={data.regions}
                onChange={(_, value) => setData({ ...data, regions: value })}
                getOptionLabel={(option) => option.nomi}
                noOptionsText={t("input.mavjud")}
                renderOption={(props, option, { selected, index }) => {
                  return (
                    <>
                      {index === 0 && (
                        <li
                          style={{ marginLeft: "15px" }}
                          onClick={(e) => toggleCheckAllItems(e, regions)}
                        >
                          <Checkbox
                            checked={data.regions?.length === regions?.length}
                            icon={icon}
                            name="regions"
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                          />
                          <span>{t("Barchasi")}</span>
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
                        <span>{option.nomi}</span>
                      </li>
                    </>
                  );
                }}
                renderInput={({ InputProps, ...params }) => {
                  if (InputProps?.startAdornment?.length > 2) {
                    return (
                      <TextField
                        InputProps={{
                          ...InputProps,
                          startAdornment: InputProps.startAdornment.slice(0, 2),
                        }}
                        {...params}
                        label={t("pdf.ssv")}
                        placeholder="Qo'shish"
                      />
                    );
                  }
                  return (
                    <TextField
                      {...params}
                      InputProps={InputProps}
                      label={t("pdf.ssv")}
                      placeholder="Qo'shish"
                    />
                  );
                }}
              />
            </div>
            <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.tuman")}
              </h5>
              <Autocomplete
                multiple
                disabled={data.regions.length > 1 || !data.regions.length}
                options={districts}
                disableCloseOnSelect
                value={data.districts}
                onChange={(_, value) => setData({ ...data, districts: value })}
                getOptionLabel={(option) => option.nomi}
                noOptionsText={"Mavjud Emas"}
                renderOption={(props, option, { selected, index }) => {
                  return (
                    <Fragment key={index}>
                      {index === 0 && (
                        <li
                          style={{ marginLeft: "15px" }}
                          onClick={(e) => toggleCheckAllItems(e, districts)}
                        >
                          <Checkbox
                            checked={
                              data.districts?.length === districts?.length
                            }
                            icon={icon}
                            name="districts"
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                          />
                          <span>{t("Barchasi")}</span>
                        </li>
                      )}
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          value={option.id}
                          checked={selected}
                        />
                        <span>{option.nomi}</span>
                      </li>
                    </Fragment>
                  );
                }}
                renderInput={({ InputProps, ...params }) => {
                  if (InputProps?.startAdornment?.length > 2) {
                    return (
                      <TextField
                        InputProps={{
                          ...InputProps,
                          startAdornment: InputProps.startAdornment.slice(0, 2),
                        }}
                        {...params}
                        label={t("pdf.rmo")}
                        placeholder="Qo'shish"
                      />
                    );
                  }
                  return (
                    <TextField
                      {...params}
                      InputProps={InputProps}
                      label={t("pdf.rmo")}
                      placeholder="Qo'shish"
                    />
                  );
                }}
              />
            </div>
            <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.single.vositainf")}
              </h5>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                disableCloseOnSelect
                disabled={data.districts.length > 1 || !data.districts.length}
                options={points}
                value={data.points}
                onChange={(_, value) => setData({ ...data, points: value })}
                noOptionsText={"Mavjud Emas"}
                getOptionLabel={(option) => option.nomi}
                renderOption={(props, option, { selected, index }) => {
                  return (
                    <Fragment key={index}>
                      {" "}
                      {index === 0 && (
                        <li
                          style={{ marginLeft: "15px" }}
                          onClick={(e) => toggleCheckAllItems(e, points)}
                        >
                          <Checkbox
                            checked={data.points.length === points.length}
                            icon={icon}
                            name="points"
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                          />
                          <span>{t("Barchasi")}</span>
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
                        <span>{option.nomi}</span>
                      </li>
                    </Fragment>
                  );
                }}
                renderInput={({ InputProps, ...params }) => {
                  if (InputProps?.startAdornment?.length > 2) {
                    return (
                      <TextField
                        InputProps={{
                          ...InputProps,
                          startAdornment: InputProps.startAdornment.slice(0, 2),
                        }}
                        {...params}
                        label={t("pdf.oshp")}
                        placeholder="Qo'shish"
                      />
                    );
                  }
                  return (
                    <TextField
                      {...params}
                      InputProps={InputProps}
                      label={t("pdf.oshp")}
                      placeholder="Qo'shish"
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <div
            className="sarflov_block"
            style={{ paddingBottom: "24px", paddingTop: "24px" }}
          >
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
                label={t("vosita.erkin")}
                disabled
              />
              <TextField
                className="befor-date"
                data-content={t("bildirishnoma.new.mud")}
                onChange={(e) => setTime(e.target.value)}
                style={{ width: "35%" }}
                id="outlined-basic"
                variant="outlined"
                type="date"
                value={time}
                required
              />
            </div>
          </div>
        </div>

        <div className="sarflov_comment">
          <div className="sarflov_block_comment">
            <h4 className="sarflov_block_title">
              {t("bildirishnoma.single.qoshimcha")}
            </h4>
            <div className="sarflov_block_inner_div">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                value={additionalText}
                placeholder={t("Qo’shimcha ma’lumot")}
                name="qoshimcha_matn"
                onChange={(e) => setAdditionalText(e.target.value)}
              />
            </div>
          </div>
          <div className="sarflov_block_comment">
            <div className="sarflov_block_comment_inner">
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")}
              </h4>
              {down?.length === 0 && (
                <>
                  <input
                    onChange={addFile}
                    type="file"
                    ref={files}
                    id="files"
                    className="input_download"
                  />
                  <label htmlFor="files" className="all_download">
                    <img className="scrip_file" src={scrip} alt="" />
                    {t("vosita.qosh")}
                  </label>
                </>
              )}
            </div>

            <div className="sarflov_block_inner_div">
              {down.length > 0 ? (
                <div className="sarflov_block_download_file">
                  <label className="input_tyle_download">
                    <img src={pdfDoc} alt="" className="label_img" />
                    {down[0].filename}
                    <div className="close_file">
                      <Button
                        onClick={(e) => delFile()}
                        startIcon={<CloseIcon />}
                      ></Button>
                    </div>
                  </label>
                </div>
              ) : null}
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
export default Uzerkin;

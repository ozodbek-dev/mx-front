import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Fade,
  IconButton,
  InputLabel,
  Modal,
  Snackbar,
  Stack,
} from "@mui/material";
import classes from "./classes";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { get } from "lodash";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { request } from "../../../api/request";

import Loading from "../../../components/loading/loading";
import Error from "../../../Error/Error";
import "./shifokor.scss";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import useGet from "hooks/useGet";
import DoctorsTable from "./components/doctors.table";
import { Close } from "@mui/icons-material";
import useDebounce from "hooks/useDebounce";

const Shifokor = () => {
  const { t } = useTranslation();
  const token = window.localStorage.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [noti, setNoti] = React.useState(false);
  const [notificationn, setNotificationn] = React.useState({
    state: "",
    text: "",
  });

  const [searchValue, setSearchValue] = useState("");
  const search = useDebounce(searchValue, 1500);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: doctors,
    isLoading: isLoadingDoctors,
    refetch,
  } = useGet({
    url: `/muassasa/shifokor/?page=${page}&search=${search}`,
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

  const formData = new FormData();
  formData.append("token", token);

  const [input, setInput] = useState({
    qoshimcha_fayl: "",
    tugilgan_sana: "",
  });

  const pnflChange = (e) => {
    if (e.length == 14) {
      const body = new FormData();
      body.append("JSHSHIR", e);
      body.append("token", token);
      setIsLoading(true);
      request
        .get(`https://admin-mpbt.ssv.uz/api/v1/muassasa/shifokor/${e}/`, config)
        .then((data) =>
          setInput({
            JSHSHIR: data.data.data.JSHSHIR,
            ism: data.data.data.ism,
            familiya: data.data.data.familiya,
            otasining_ismi: data.data.data.otasini_ismi,
            tugilgan_sana: data.data.data.tugilgan_sana,
            pasport_raqami: data.data.data.pasport_raqami,
            passport_seriya: data.data.data.pasport_seriya,
            lavozimi: data.data.data.lavozimi,
            tel_raqami: data.data.data.telefon_raqami,
            tashkiloti: data.data.data.tashkiloti,
            jinsi: data.data.data.jinsi,
            qoshimcha_fayl: "",
          })
        )
        .catch((error) => {
          toast.error(get(error, "response.data"));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    setInput((prev) => ({
      ...prev,
      JSHSHIR: e,
    }));
  };
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

  const [loader, setLoeder] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [ides, setides] = useState(null);

  const handleOpen2 = (e) => {
    setides(e);
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [del, setDel] = React.useState(false);

  const deleteClose = () => {
    setDel(false);
  };
  const [bemorIdpro, setBemorIdPro] = useState([]);

  function Deletes() {
    const body = new FormData();
    body.append("id", ides);
    request
      .post(`/muassasa/delete/shifokor/`, body, config)
      .then(function (res) {
        setNotificationn({
          state: "success",
          text: `Shifokor o'chirildi`,
        });
        console.log(res.data);
        setLoeder(true);
        handleClick(true);
      })
      .catch(function (err) {
        console.log(err);
      });
    setLoeder(false);
    deleteClose();
  }
  function Create(e) {
    const formmdata = new FormData();
    for (let [key, value] of Object.entries(input)) {
      formmdata.append(key, value);
    }
    request
      .post(`/muassasa/shifokor/`, formmdata, config)
      .then(function (res) {
        setNotificationn({
          state: "success",
          text: `Shifokor qo'shildi`,
        });
        setInput({ ...input, diagnoz: res.data.id });
        refetch();
        setLoeder(false);
        handleClick(true);
        handleClose2();
      })
      .then(() => setLoeder(false))
      .catch(function (err) {
        if (get(err, "response.data.field", "")) {
          toast.error("Iltimos Barcha Maydonalrini To'ldiring!");
        }
        toast.error("Shifokor Qo'shilmadi!");

        setLoeder(false);
      });
  }

  if (bemorIdpro.error) return <Error />;
  if (loader || isLoadingDoctors) return <Loading />;

  return (
    <>
      <div
        className="shifokor"
        style={{ paddingRight: "20px", paddingLeft: "20px" }}
      >
        <div className="poliklinika_top">
          <div className="poliklinika_top_left">
            <h2 className="all_doctor">
              {t("shifokor.allshifokor")}: {doctors.meta?.total}
            </h2>
            <div className="search_input">
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <TextField
                  className="w-full"
                  id="standard-basic"
                  onChange={(e) => setSearchValue(e.target.value)}
                  label={t("shifokor.placholder")}
                  variant="outlined"
                  value={searchValue}
                  style={{ background: "white" }}
                />
                {!!searchValue && (
                  <IconButton onClick={() => setSearchValue("")}>
                    {" "}
                    <Close />
                  </IconButton>
                )}
              </Stack>
            </div>
          </div>
          <Button
            variant="contained"
            onClick={handleOpen2}
            style={{ marginTop: "15px" }}
            startIcon={<AddIcon />}
          >
            {t("shifokor.add")}
          </Button>
        </div>
        {doctors?.data && (
          <DoctorsTable
            doctors={doctors}
            currentPage={page}
            setCurrentPage={setPage}
          />
        )}

        <div className="modal_scrool">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open2}
            onClose={handleClose2}
            closeAfterTransition
          >
            <Fade in={open2}>
              <div style={classes.paper}>
                {isLoading ? (
                  <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <h1 style={{ marginTop: "5rem" }}>{t("loading")}</h1>
                    <Loading />
                  </Stack>
                ) : (
                  <>
                    <div style={{ textAlign: "end" }}>
                      <Button onClick={() => setOpen2(false)}>
                        {t("input.yop")}
                      </Button>
                    </div>
                    <div
                      className="modal_scrool_y"
                      style={{ paddingTop: "20px" }}
                    >
                      <Box
                        component="form"
                        className="grid grid-cols-2 gap-20"
                        autoComplete="off"
                      >
                        <div className="add_shifokor_12">
                          <InputLabel>{t("input.pfl")}</InputLabel>
                          <TextField
                            className="w-full"
                            onChange={(e) => pnflChange(e.target.value)}
                            name="JSHSHIR"
                            id="jshshir"
                            variant="outlined"
                            value={input.JSHSHIR}
                            type={"number"}
                            inputProps={{ min: 0 }}
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>{t("shifokor.alladd.name")}</InputLabel>

                          <TextField
                            className="w-full"
                            // onChange={onChange}
                            disabled={!!input.ism}
                            id="ism"
                            name="ism"
                            variant="outlined"
                            value={input.ism}
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>
                            {t("shifokor.alladd.surname")}
                          </InputLabel>
                          <TextField
                            className="w-full"
                            // onChange={onChange}
                            name="familiya"
                            id="familiya"
                            variant="outlined"
                            disabled={!!input.familiya}
                            value={input.familiya}
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>{t("shifokor.alladd.otch")}</InputLabel>

                          <TextField
                            className="w-full"
                            id="otasi"
                            // onChange={onChange}
                            name="otasining_ismi"
                            variant="outlined"
                            disabled={!!input.otasining_ismi}
                            value={input.otasining_ismi}
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>{t("shifokor.alladd.male")}</InputLabel>

                          <TextField
                            className="w-full"
                            id="jinsi"
                            // onChange={onChange}
                            disabled={!!input.jinsi}
                            name="jinsi"
                            variant="outlined"
                            value={
                              input.jinsi
                                ? input.jinsi === "male"
                                  ? "Erkak"
                                  : "Ayol"
                                : ""
                            }
                          />
                        </div>
                        <div className="">
                          <InputLabel>{t("shifokor.birthday")}</InputLabel>
                          <div className="w-full">
                            <DatePicker
                              className="w-full"
                              format="DD/MM/YYYY"
                              value={
                                input.tugilgan_sana
                                  ? dayjs(input.tugilgan_sana)
                                  : dayjs(new Date())
                              }
                              disabled={!!input.tugilgan_sana}
                              // onChange={e =>
                              // 	onChange({
                              // 		target: {
                              // 			value: dayjs(e).format("YYYY-MM-DD"),
                              // 			name: "tugilgan_sana",
                              // 		},
                              // 	})
                              // }
                            />
                          </div>
                        </div>
                        {input?.lavozimi ? (
                          <div className="add_shifokor_12">
                            <InputLabel>{t("shifokor.lavozim")}</InputLabel>
                            <TextField
                              className="w-full"
                              id="lavozimi"
                              // onChange={onChange}
                              disabled={!!input.lavozimi}
                              name="lavozimi"
                              variant="outlined"
                              value={input.lavozimi}
                            />
                          </div>
                        ) : (
                          <div className="add_shifokor_12">
                            <InputLabel>{t("shifokor.lavozim")}</InputLabel>
                            <TextField
                              className="w-full"
                              id="lavozimi"
                              type="string"
                              onChange={onChange}
                              name="lavozimi"
                              variant="outlined"
                            />
                          </div>
                        )}
                        <div className="add_shifokor_12">
                          <InputLabel>{t("shifokor.tel")}</InputLabel>

                          <TextField
                            className="w-full"
                            id="tel-raqam"
                            onChange={onChange}
                            type="number"
                            name="tel_raqami"
                            variant="outlined"
                            value={input.tel_raqami}
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>
                            {t("shifokor.alladd.tashkilot")}
                          </InputLabel>

                          <TextField
                            className="w-full"
                            id="tashkilot"
                            onChange={onChange}
                            type="text"
                            name="tashkiloti"
                            variant="outlined"
                            value={input.tashkiloti}
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>{t("shifokor.alladd.staj")}</InputLabel>
                          <TextField
                            className="w-full"
                            id="staj"
                            type="number"
                            onChange={onChange}
                            name="ish_staji"
                            variant="outlined"
                            inputProps={{ min: 0 }}
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>
                            {t("shifokor.alladd.malaka1")}
                          </InputLabel>

                          <TextField
                            className="w-full"
                            id="malaka"
                            onChange={onChange}
                            name="oxirgi_malaka_oshirgan_vaqti_va_joyi"
                            variant="outlined"
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>
                            {t("shifokor.alladd.malaka2")}
                          </InputLabel>

                          <TextField
                            className="w-full"
                            id="oshirish-vaqti"
                            onChange={onChange}
                            name="qayta_malaka_oshirish_vaqti"
                            variant="outlined"
                          />
                        </div>
                        <div className="add_shifokor_12">
                          <InputLabel>{t("shifokor.professia")}</InputLabel>
                          <TextField
                            className="w-full"
                            id="toifa"
                            onChange={onChange}
                            name="mutaxassislik_toifasi"
                            variant="outlined"
                          />
                        </div>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={Create}
                        style={{ marginTop: "15px" }}
                      >
                        {t("shifokor.tasdiq")}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Fade>
          </Modal>
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
          <div className="modal_one_99">
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal_one}
              open={del}
              onClose={deleteClose}
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
              <Fade in={del}>
                <div style={classes.paper}>
                  <div className="delete_btn_group">
                    <Button
                      className="red_btn"
                      variant="contained"
                      onClick={Deletes}
                    >
                      Shifokor o'chirish
                    </Button>
                    <Button
                      className="no_delete_person"
                      variant="contained"
                      color="success"
                      onClick={deleteClose}
                    >
                      {t("bildirishnoma.single.bekor")}
                    </Button>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shifokor;

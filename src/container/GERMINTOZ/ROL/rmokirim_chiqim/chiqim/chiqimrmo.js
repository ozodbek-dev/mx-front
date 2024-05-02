import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tab,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";
// import "./chiqim.scss";
import { Close, CloudUpload, KeyboardBackspace } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";
import "../style.scss";
import usePost from "hooks/usePost";
import { toast } from "react-toastify";

function Chiqimrmo() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: { muassasalar: institutions = [] },
  } = useGet({ url: "/user/respublika/muassasalar/", initialState: [] });
  const {
    data: { data: preparats },
  } = useGet({
    url: "/ariza/vositalar/",
  });

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    outline: 0,
  };

  const [data, setData] = useState({
    partiya_raqam: null,
    image: null,
    file: null,
    ttb_id: null,
    lpu_id: null,
    vositalar: [],
  });

  const [step, setStep] = useState(1);
  const [tab, setTab] = useState("1");
  const handleSubmitFirstStep = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const { mutate } = usePost();
  const handleSubmitSecondStep = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("partiya_raqam", data.partiya_raqam);
    if (data.file) formData.append("file", data.file);
    formData.append("image", data.image);
    formData.append("lpu_id", data.lpu_id);
    formData.append("ttb_id", localStorage.getItem("tid"));
    const vositalar = data.vositalar.map((item) => ({
      vosita_nomi: parseInt(get(item, "vosita_nomi.id")),
      vosita_turi: parseInt(get(item, "vosita_turi.id")),
      vosita_miqdori: parseInt(get(item, "vosita_miqdori")),
      vosita_seryasi: get(item, "vosita_seryasi"),
    }));
    formData.append("vositalar", JSON.stringify(vositalar));
    mutate({
      url: `/omborxona/kirim/qilish/TTB/dan/LPU/ga`,
      data: formData,
      onSuccess: () => {
        toast.success(t("Chiqim qilindi"));
        const timeOut = setTimeout(() => {
          window.location.reload();
          clearTimeout(timeOut);
        }, 1000);
      },
      onError: (error) => {
        toast.error(error.response.data?.error);
      },
    });
  };

  const handleChangeFirstStep = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    if (e.target.files[0])
      setData({ ...data, [e.target.name]: e.target.files[0] });
  };
  const handleDecreaseStep = () => setStep((prev) => prev - 1);

  function addFields() {
    setData({
      ...data,
      vositalar: [
        ...data.vositalar,
        {
          id: data.vositalar.length + 1,
          vosita_turi: "",
          vosita_nomi: "",
          vosita_miqdori: "",
          vosita_seryasi: "",
        },
      ],
    });
  }

  function removeMedicinesAndVitamins(index) {
    const previusMedicinesAndVitamins = [...data.vositalar];
    previusMedicinesAndVitamins.splice(index, 1);
    setData({ ...data, vositalar: previusMedicinesAndVitamins });
  }

  const handleChangeMedicines = (e, index) => {
    const previusMedicinesAndVitamins = [...data.vositalar];
    previusMedicinesAndVitamins[index][e.target.name] = e.target.value;
    setData({ ...data, vositalar: previusMedicinesAndVitamins });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const selectedLpu = institutions.find(
    (item) => item.id === data.lpu_id
  )?.nomi;
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="warning">
        {t("Chiqim qilish")}
      </Button>
      <Modal
        open={isOpen}
        onClose={step === 1 ? handleClose : handleDecreaseStep}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {step === 1 && (
            <button className="modal__close-icon" onClick={handleClose}>
              <Close />
            </button>
          )}
          {step === 2 && (
            <Button onClick={handleDecreaseStep}>
              <KeyboardBackspace />
            </Button>
          )}
          <h2>{t("Chiqim")}</h2>
          {step === 1 && (
            <form onSubmit={handleSubmitFirstStep}>
              <div className="grid gap-y-12">
                <div className="form-control">
                  <TextField
                    className="w-full"
                    id="batchNumber"
                    label={t("Partiya raqami")}
                    variant="outlined"
                    value={data.partiya_raqam}
                    required
                    name="partiya_raqam"
                    onChange={handleChangeFirstStep}
                    type="number"
                  />
                </div>
                <div className="form-control">
                  <FormControl fullWidth>
                    <InputLabel id="instutions">{t("OSHP")}*</InputLabel>
                    <Select
                      labelId="instutions"
                      id="instutions"
                      value={data.lpu_id}
                      label={`${t("OSHP")}*`}
                      required
                      name="lpu_id"
                      onChange={handleChangeFirstStep}
                    >
                      {institutions.map((institution) => (
                        <MenuItem value={get(institution, "id")} key={v4()}>
                          {get(institution, "nomi")}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="form-control">
                  <TextField
                    className="w-full"
                    id="comment"
                    label={t("Izoh")}
                    name="comment"
                    variant="outlined"
                    value={data.comment}
                    required
                    onChange={handleChangeFirstStep}
                  />
                </div>
                <div className="form-control">
                  <div className="flex justify-between">
                    <h2 className="">{t("Rasm biriktirish")} *</h2>
                  </div>
                  <div
                    className="h-150 flex items-center justify-center mb-10"
                    style={{
                      backgroundColor: data.image
                        ? "rgb(205 208 205)"
                        : "rgb(184 216 243)",
                    }}
                  >
                    <Button
                      component="label"
                      variant="contained"
                      color={data.image ? "success" : "info"}
                      startIcon={<CloudUpload />}
                    >
                      {data.image
                        ? t("Rasmni o'zgartirish")
                        : t("Rasm yuklash")}
                      <VisuallyHiddenInput
                        type="file"
                        name="image"
                        onChange={handleFileUpload}
                        required={!data.image}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="contained" type="submit" className="w-full">
                {t("Davom etish")}
              </Button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleSubmitSecondStep}>
              <div className="grid gap-y-12">
                <div
                  className="flex gap-5 p-10 items-center"
                  style={{ border: "1px solid black", borderRadius: "8px" }}
                >
                  <div style={{ whiteSpace: "nowrap" }}>
                    {t("Tanlangan")} {t("OSHP")}:
                  </div>
                  <div>{selectedLpu}</div>
                </div>
                <div>
                  <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={(_, v) => setTab(v)}
                        aria-label="lab API tabs example"
                      >
                        <Tab label={t("Vositalar")} value="1" />
                        <Tab label={t("Fayllar *")} value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" className="!p-0">
                      {data.vositalar.length ? (
                        <div style={{ maxHeight: 400, overflowY: "auto" }}>
                          {data.vositalar.map((item, index) => (
                            <div key={item.id} className="tools  mt-15">
                              <h4 className="tools__title">{index + 1}</h4>
                              <div className="tools__fields grid-cols-4">
                                <div>
                                  <FormControl fullWidth>
                                    <InputLabel
                                      id={`demo-simple-select-label${index}`}
                                    >
                                      {t("vosita.vositaturi")} *
                                    </InputLabel>
                                    <Select
                                      onChange={(e) =>
                                        handleChangeMedicines(e, index)
                                      }
                                      value={data.vositalar[index].vosita_turi}
                                      labelId={`demo-simple-select-label${index}`}
                                      id={`demo-simple-select${index}`}
                                      name={`vosita_turi`}
                                      label={t("vosita.vositaturi")}
                                    >
                                      {preparats.map((el, index) => {
                                        return (
                                          <MenuItem key={index} value={el}>
                                            {el.nomi}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div>
                                  <FormControl fullWidth>
                                    <InputLabel
                                      id={`demo-simple-select-label${index}`}
                                    >
                                      {t("bildirishnoma.single.nomi")} *
                                    </InputLabel>
                                    <Select
                                      onChange={(e) =>
                                        handleChangeMedicines(e, index)
                                      }
                                      value={data.vositalar[index].vosita_nomi}
                                      labelId={`demo-simple-select-label${index}`}
                                      id={`demo-simple-select${index}`}
                                      name="vosita_nomi"
                                      label={t("bildirishnoma.single.nomi")}
                                    >
                                      {get(
                                        data.vositalar[index]["vosita_turi"],
                                        "vosita_nomlari",
                                        []
                                      ) &&
                                        get(
                                          data.vositalar[index]["vosita_turi"],
                                          "vosita_nomlari",
                                          []
                                        ).map((el, index) => {
                                          return (
                                            <MenuItem key={index} value={el}>
                                              {el.nomi}
                                            </MenuItem>
                                          );
                                        })}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div>
                                  <TextField
                                    onChange={(e) =>
                                      handleChangeMedicines(e, index)
                                    }
                                    value={data.vositalar[index].vosita_miqdori}
                                    style={{
                                      width: "100%",
                                    }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label={`${t(
                                      "bildirishnoma.single.miqdori"
                                    )}*`}
                                    name="vosita_miqdori"
                                    type={"number"}
                                  />
                                </div>
                                <div>
                                  <TextField
                                    onChange={(e) =>
                                      handleChangeMedicines(e, index)
                                    }
                                    style={{
                                      width: "100%",
                                    }}
                                    id="outlined-basic"
                                    value={data.vositalar[index].vosita_seryasi}
                                    variant="outlined"
                                    label={`${t("Seriyasi")}*`}
                                    name="vosita_seryasi"
                                    type={"text"}
                                  />
                                </div>
                              </div>
                              <div className="tools__remove-btn">
                                <CloseIcon
                                  onClick={(e) =>
                                    removeMedicinesAndVitamins(index)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-100 flex items-center justify-center">
                          {t("Vositalar mavjud emas")}
                        </div>
                      )}

                      <Button
                        variant="contained"
                        type="button"
                        className="w-full mx-auto"
                        color="inherit"
                        onClick={addFields}
                      >
                        {t("Vosita qo'shish")}
                      </Button>
                    </TabPanel>
                    <TabPanel value="2" className="!p-0">
                      <div className="form-control">
                        <div
                          className="h-150 flex items-center justify-center mb-10"
                          style={{
                            backgroundColor: data.image
                              ? "rgb(205 208 205)"
                              : "rgb(184 216 243)",
                          }}
                        >
                          <Button
                            component="label"
                            variant="contained"
                            color={data.file ? "success" : "info"}
                            startIcon={<CloudUpload />}
                          >
                            {data.file
                              ? t("Faylni o'zgartirish")
                              : t("Fayl yuklash")}
                            <VisuallyHiddenInput
                              type="file"
                              name="file"
                              onChange={handleFileUpload}
                              required={!data.file}
                            />
                          </Button>
                        </div>
                      </div>
                    </TabPanel>
                  </TabContext>
                </div>
              </div>
              <div className="mt-20">
                <Button variant="contained" type="submit" className="w-full">
                  {t("Chiqim qilish")}
                </Button>
              </div>
            </form>
          )}
        </Box>
      </Modal>
      {/* <Modal open={isOpenMedicine} onClose={handleCloseMedicineModal}>
        <Box sx={{ ...style }}>
          <button
            className="modal__close-icon"
            onClick={handleCloseMedicineModal}
          >
            <Close />
          </button>
          <h2>{t("Vosita qo'shish")}</h2>
          <form>
            <div className="grid gap-10"></div>
          </form>
        </Box>
      </Modal> */}
    </div>
  );
}
export default Chiqimrmo;

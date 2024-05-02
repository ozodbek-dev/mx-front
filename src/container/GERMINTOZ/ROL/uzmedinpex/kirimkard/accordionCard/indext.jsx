import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Box,
  Button,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { TabContext, TabPanel } from "@mui/lab";
import pdfDoc from "../../../../../../assets/icon/pdf_doc.svg";
import { toast } from "react-toastify";
import { request } from "api/request";
import Loading from "components/loading/loading";
import moment from "moment";
import useGet from "hooks/useGet";
import useDebounce from "hooks/useDebounce";

export default function ControlledAccordions({ items, orderId }) {
  const initialState = {
    partiya_seryasi: "",
    xalqaro_patentlangan_nomi: "",
    ishlab_chiqarilgan_sana: "",
    maxsulot_saqlash_muddati: "",
    vositaning_shakli: "",
    partiya_dozasi: "",
    yetkazib_berilgan_qadoq_soni: "",
    bir_qadoqada_vositalar_soni: "",
  };
  const { t } = useTranslation();
  const [data, setData] = useState(initialState);
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState(1);
  const [filesList, setFilesList] = useState([]);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [search, setSearch] = useState(null);
  const debounceVal = useDebounce(search, 1000);
  const { data: toolNameData } = useGet({
    url: `/omborxona/voista/search?search=${debounceVal}`,
  });
  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getValuOfInput = (e) => {
    e?.value
      ? setData({ ...data, xalqaro_patentlangan_nomi: e?.value })
      : setData({ ...data, [e.target.name]: e.target.value });
  };

  function File(e) {
    setFilesList((prev) => [
      ...prev,
      {
        filename: e.target.value,
        file: e.target.files[0],
      },
    ]);
  }

  function delFile(index) {
    setFilesList([]);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("buyurtma_vosita_id", expanded);
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    request
      .post("/omborxona/buyurtma/vositalari/partiya/yaratish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        toast.success("Kirim qilindi!");
        setData(initialState);
      })
      .catch((data) => {
        toast.error(`Kirim qilinmadi! ${data?.response?.data?.error} `);
      });
  };
  useEffect(() => {
    if (!Object.entries(data).every(([key, value]) => value)) {
      return setDisabledSubmit(true);
    }
    setDisabledSubmit(false);
  }, [data]);

  useEffect(() => {
    if (!expanded || orderId) {
      setFilesList([]);
      setTab(1);
      setData(initialState);
    }
  }, [expanded, orderId]);
  if (
    data.ishlab_chiqarilgan_sana >= data.maxsulot_saqlash_muddati &&
    data.maxsulot_saqlash_muddati
  ) {
    setData({
      ...data,
      maxsulot_saqlash_muddati: moment(data.ishlab_chiqarilgan_sana)
        .add("day", 1)
        .format("YYYY-MM-DD"),
    });
    toast.error(
      "Ishlab Chiqarilgan Sana Muddati o'tadigan sanadan katta bo'la olmaydi!"
    );
  }
  if (items?.length === 0) return <Loading />;
  return (
    <Box>
      {items.map((item, index) => {
        return (
          <Box key={item.id} style={{ marginTop: 10 }}>
            <Accordion
              expanded={expanded === item.id}
              onChange={handleChange(item.id ? item.id : "")}
            >
              <AccordionSummary
                expandIcon={expanded === item.id ? <CloseIcon /> : <AddIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Stack
                  spacing={2}
                  direction="row"
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography flex={0.2}>&nbsp; {index + 1}</Typography>
                  <Typography flex={1}>
                    <b>{t("bildirishnoma.single.nomi")}:</b> &nbsp;{" "}
                    {item.vosita_nomi.nomi}
                  </Typography>

                  <Typography flex="1">
                    <b>{t("vosita.vositaturi")}:</b> &nbsp;
                    {item.vosita_turi.nomi}
                  </Typography>
                  <Typography flex="1">
                    <b>{t("bildirishnoma.single.miqdori")}:</b> &nbsp;
                    {item.vosita_miqdori}
                  </Typography>

                  <Typography
                    sx={{ color: "text.secondary", marginRight: "1rem" }}
                  ></Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                >
                  <Box style={{ width: "40%", minWidth: "250px" }}>
                    <div className="singlebemor_block_info">
                      <div className="singlebemor_block_info_inner">
                        <h5 className="singlebemor_block_info_desc">
                          {t("vosita.vositaturi")}
                        </h5>
                        <h5 className="singlebemor_block_info_desc">
                          {item.vosita_nomi.nomi}
                        </h5>
                      </div>
                      <div className="singlebemor_block_info_inner">
                        <h5 className="singlebemor_block_info_desc">
                          {t("bildirishnoma.single.nomi")}
                        </h5>
                        <h5 className="singlebemor_block_info_desc">
                          {item.vosita_turi.nomi}
                        </h5>
                      </div>
                      <div className="singlebemor_block_info_inner">
                        <h5 className="singlebemor_block_info_desc">
                          {t("sbola.olchov")}
                        </h5>
                        <h5 className="singlebemor_block_info_desc">
                          {item.olchov_birligi}
                        </h5>
                      </div>
                      <div className="singlebemor_block_info_inner">
                        <h5 className="singlebemor_block_info_desc">
                          {t("bildirishnoma.single.miqdori")}
                        </h5>
                        <h5 className="singlebemor_block_info_desc">
                          {item.vosita_miqdori}
                        </h5>
                      </div>
                      <div className="singlebemor_block_info_inner">
                        <h5 className="singlebemor_block_info_desc">
                          {t("vosita.b1")}
                        </h5>
                        <h5 className="singlebemor_block_info_desc">
                          {item.olchov_birligi_narxi}
                        </h5>
                      </div>
                      <div className="singlebemor_block_info_inner">
                        <h5 className="singlebemor_block_info_desc">
                          {t("vosita.b2")}
                        </h5>
                        <h5 className="singlebemor_block_info_desc">
                          {item.omborxona_nomi}
                        </h5>
                      </div>
                    </div>
                  </Box>
                  <Box style={{ width: "60%", minWidth: "300px" }}>
                    <TabContext value={tab}>
                      <form method="post" onSubmit={handleSubmit}>
                        <Box
                          sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            marginBottom: "28px",
                          }}
                        >
                          <Tabs
                            style={{ backgroundColor: "#fff" }}
                            value={tab}
                            onChange={handleTab}
                            aria-label="basic tabs example"
                          >
                            <Tab label={t("vosita.i")} value={1} />
                            <Tab label={t("input.fayl")} value={2} />
                          </Tabs>

                          <TabPanel value={1}>
                            <section
                              style={{
                                display: "grid",
                                gridTemplateColumns:
                                  "repeat(auto-fill, minmax(200px,1fr))",
                                gap: "1rem",
                              }}
                            >
                              <FormGroup>
                                <InputLabel>{t("jihoz.ser")}</InputLabel>
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder={t("jihoz.ser")}
                                  value={data.partiya_seryasi}
                                  name="partiya_seryasi"
                                  onChange={getValuOfInput}
                                  required
                                />
                              </FormGroup>
                              <div>
                                <InputLabel>{t("sidebar.xalq")}</InputLabel>
                                <Autocomplete
                                  loading
                                  style={{
                                    marginBottom: "18px",
                                  }}
                                  id="free-solo-demo"
                                  freeSolo
                                  options={toolNameData}
                                  getOptionLabel={(data) => data.nomi}
                                  onChange={(_, value) =>
                                    getValuOfInput({ value: value?.nomi })
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      onChange={(e) =>
                                        setSearch(e.target.value)
                                      }
                                    />
                                  )}
                                />
                              </div>
                              <FormGroup>
                                <InputLabel>{t("jihoz.sana")}</InputLabel>
                                <TextField
                                  value={data.ishlab_chiqarilgan_sana}
                                  className="card-date--1"
                                  id="outlined-basic"
                                  variant="outlined"
                                  type="date"
                                  format="DD.MM.YYYY"
                                  onChange={getValuOfInput}
                                  name="ishlab_chiqarilgan_sana"
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <InputLabel>{t("jihoz.mud")}</InputLabel>
                                <TextField
                                  className="card-date--2"
                                  value={data.maxsulot_saqlash_muddati}
                                  id="outlined-basic"
                                  variant="outlined"
                                  name="maxsulot_saqlash_muddati"
                                  type="date"
                                  format="DD.MM.YYYY"
                                  onChange={getValuOfInput}
                                  required
                                />
                              </FormGroup>

                              <FormGroup fullWidth>
                                <InputLabel>{t("sidebar.form")}</InputLabel>
                                <Select
                                  id="demo-simple-select"
                                  name="vositaning_shakli"
                                  value={data.vositaning_shakli}
                                  onChange={getValuOfInput}
                                  required
                                >
                                  {/* <MenuItem value="Test">Test</MenuItem> */}
                                  <div
                                    className="text-bold pl-6 "
                                    style={{ color: "#000" }}
                                  >
                                    <strong
                                      className="text-black text-[25px]"
                                      style={{ color: "#000" }}
                                    >
                                      {t("Qattiq")}
                                    </strong>
                                  </div>
                                  <MenuItem value={"Tabletkalar"}>
                                    {t("Tabletkalar")}
                                  </MenuItem>
                                  <MenuItem value={"Kukunlar"}>
                                    {t("Kukunlar")}
                                  </MenuItem>
                                  <MenuItem value={"Kapsulalar"}>
                                    {t("Kapsulalar")}
                                  </MenuItem>
                                  <MenuItem value={"Draje"}>
                                    {t("Draje")}
                                  </MenuItem>
                                  <MenuItem value={"Granulalar"}>
                                    {t("Granulalar")}
                                  </MenuItem>
                                  <MenuItem value={"Karamel"}>
                                    {t("Karamel")}
                                  </MenuItem>
                                  <MenuItem value={"Dorivor qalam"}>
                                    {t("Dorivor qalam")}
                                  </MenuItem>
                                  <MenuItem value={"Glossetlar"}>
                                    {t("Glossetlar")}
                                  </MenuItem>
                                  <div
                                    className="text-bold pl-6 "
                                    style={{ color: "#000" }}
                                  >
                                    <strong
                                      className="text-black text-[25px]"
                                      style={{ color: "#000" }}
                                    >
                                      {t("Yumshoq")}
                                    </strong>
                                  </div>
                                  <MenuItem value={"Malhamlar"}>
                                    {t("Malhamlar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Kremlar"}>
                                    {t("Kremlar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Pastalar"}>
                                    {t("Pastalar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Gellar"}>
                                    {t("Gellar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"TTS"}>{t("TTS")}</MenuItem>{" "}
                                  <MenuItem value={"Suppozitoriylar"}>
                                    {t("Suppozitoriylar")}
                                  </MenuItem>
                                  <div
                                    className="text-bold pl-6 "
                                    style={{ color: "#000" }}
                                  >
                                    <strong
                                      className="text-black text-[25px]"
                                      style={{ color: "#000" }}
                                    >
                                      {t("Suyuq")}
                                    </strong>
                                  </div>
                                  <MenuItem value={"Rastvorlar"}>
                                    {t("Rastvorlar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Damlamalar"}>
                                    {t("Damlamalar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Suspenziyalar"}>
                                    {t("Suspenziyalar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Tomchilar"}>
                                    {t("Tomchilar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Siroplar"}>
                                    {t("Siroplar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Suppozitoriylar"}>
                                    {t("Suppozitoriylar")}
                                  </MenuItem>{" "}
                                  <MenuItem value={"Miksturlar"}>
                                    {t("Miksturlar")}
                                  </MenuItem>
                                  <div
                                    className="text-bold pl-6 "
                                    style={{ color: "#000" }}
                                  >
                                    <strong
                                      className="text-black text-[25px]"
                                      style={{ color: "#000" }}
                                    >
                                      {t("Gazsimon")}
                                    </strong>
                                  </div>
                                  <MenuItem value={"Aerozollar"}>
                                    {t("Aerozollar")}
                                  </MenuItem>
                                </Select>
                              </FormGroup>

                              <FormGroup fullWidth>
                                <InputLabel>{t("sidebar.doza")}</InputLabel>
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  value={data.partiya_dozasi}
                                  type="number"
                                  name="partiya_dozasi"
                                  placeholder={t("sidebar.doza")}
                                  onChange={getValuOfInput}
                                  required
                                />
                              </FormGroup>
                              <FormGroup fullWidth>
                                <InputLabel>{t("sidebar.qadoq")}</InputLabel>
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder={t("sidebar.qadoq")}
                                  onChange={getValuOfInput}
                                  type="number"
                                  name="yetkazib_berilgan_qadoq_soni"
                                  value={data.yetkazib_berilgan_qadoq_soni}
                                  required
                                />
                              </FormGroup>
                              <FormGroup fullWidth>
                                <InputLabel>{t("sidebar.soni")}</InputLabel>
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder={t("sidebar.soni")}
                                  onChange={getValuOfInput}
                                  type="number"
                                  name="bir_qadoqada_vositalar_soni"
                                  value={data.bir_qadoqada_vositalar_soni}
                                  required
                                />
                              </FormGroup>
                            </section>
                          </TabPanel>
                          <TabPanel value={2}>
                            {" "}
                            <section>
                              <div
                                style={
                                  filesList[0] && {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }
                                }
                              >
                                <h4 className="sarflov_block_title">
                                  {t("bildirishnoma.new.fail")}
                                </h4>
                                <input
                                  onChange={File}
                                  className="visually-hidden"
                                  id="f1"
                                  type="file"
                                />
                                {!filesList[0] && (
                                  <label
                                    className={
                                      filesList[0]
                                        ? "fix-btn"
                                        : "input_tyle_download fix-file"
                                    }
                                    htmlFor="f1"
                                  >
                                    {!filesList[0]
                                      ? t("bildirishnoma.new.failinf")
                                      : t("vosita.qosh")}
                                  </label>
                                )}
                              </div>
                              {filesList[0] ? (
                                <div className="sarflov_block_inner_div">
                                  {
                                    <div className="sarflov_block_download_file">
                                      <label className="input_tyle_download">
                                        <img
                                          src={pdfDoc}
                                          alt=""
                                          className="label_img"
                                        />
                                        {filesList[0].filename}
                                        <div className="close_file">
                                          <Button
                                            onClick={(e) => delFile(index)}
                                            startIcon={<CloseIcon />}
                                          ></Button>
                                        </div>
                                      </label>
                                    </div>
                                  }
                                </div>
                              ) : null}
                            </section>
                          </TabPanel>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              style={{
                                width: "40%",
                                marginBottom: "20px",
                                borderRadius: "12px",
                                minWidth: "200px",
                                maxWidth: "100%",
                              }}
                              startIcon={<AddIcon />}
                              disabled={disabledSubmit}
                              variant="contained"
                              type="submit"
                            >
                              {t("vosita.vositaqosh")}
                            </Button>
                          </Box>
                        </Box>
                      </form>
                    </TabContext>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
}

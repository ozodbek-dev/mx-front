import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
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
import useDebounce from "hooks/useDebounce";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import pdfDoc from "../../../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../../../assets/icon/scripka.svg";
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
};
function Singlemodal({
  setOpentool,
  edittool,
  opentool,
  setEdittol,
  handleChange,
  fields,
  setFiletool,
  filetool,
  data,
}) {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState(null);
  const debounceVal = useDebounce(search, 1000);
  const { t } = useTranslation();
  const { data: toolNameData } = useGet({
    url: `/omborxona/voista/search?search=${debounceVal}`,
  });
  function File(e) {
    setFiletool([
      ...filetool,
      {
        filevalue: e.target.value,
        typefile: e.target.files[0],
      },
    ]);
  }
  function delFile(index) {
    let arr = [];
    arr.push(...filetool);
    arr.splice(index, 1);
    setFiletool(arr);
  }
  const Subvos = () => {
    if (
      fields.olchov_birligi &&
      fields.vosita_miqdori &&
      fields.vosita_turi &&
      fields.vosita_nomi &&
      fields.omborxona_nomi &&
      fields.olchov_birligi_narxi &&
      filetool.length > 0
    ) {
      setOpentool(true);
      setEdittol(false);
      if (edittool) setEdittol(false);
    } else {
      if (+filetool?.length === 0) toast.warning("Iltimos faylni yuklang!");
      toast.warning("Iltimos Barcha Maydonlarni To'ldiring!");
    }
  };

  return (
    <>
      <Button
        style={{ fontSize: "11px" }}
        onClick={() => setEdittol(true)}
        startIcon={<AddIcon />}
        variant="contained"
        disabled={!get(fields, "shartnoma_raqami") || opentool}
      >
        {t("vosita.vositaqosh")}
      </Button>
      <Modal
        keepMounted
        open={edittool}
        onClose={() => setEdittol(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-one" sx={{ ...style, width: 500 }}>
          <Button
            style={{
              marginBottom: "14px",
              marginLeft: "-25px",
            }}
            variant="text"
            onClick={() => setEdittol(false)}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </Button>
          <h2 className="kirm-head">{t("vosita.vositaqosh")}</h2>
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
              onChange={(e, newValue) => setValue(newValue)}
              aria-label="basic tabs example"
            >
              <Tab label={t("input.m1")} />
              <Tab label={t("input.fayl")} />
            </Tabs>
          </Box>
          <section className={value === 1 && "visually-hidden"}>
            <FormControl fullWidth>
              <InputLabel
                style={{ backgroundColor: "#fff" }}
                id="demo-simple-select-label"
              >
                {t("vosita.vositaturi")} *
              </InputLabel>
              <Select
                style={{ marginBottom: "23px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => handleChange(e)}
                value={fields?.vosita_turi ? fields?.vosita_turi : null}
                name="vosita_turi"
                required
              >
                {data?.map((el) => {
                  return <MenuItem value={el.id}>{el.nomi}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <Autocomplete
              loading
              style={{ marginBottom: "18px" }}
              id="free-solo-demo"
              freeSolo
              options={toolNameData}
              getOptionLabel={(data) => data.nomi}
              onChange={(_, value) => handleChange(value?.id)}
              name="vosita_nomi"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("bildirishnoma.single.nomi") + "*"}
                  onChange={(e) => setSearch(e.target.value)}
                />
              )}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                style={{
                  width: "100%",
                  marginBottom: "46px",
                }}
                id="outlined-basic"
                label={t("sbola.olchov")}
                variant="outlined"
                value={fields?.olchov_birligi}
                onChange={(e) => handleChange(e)}
                required
                name="olchov_birligi"
              />
              <TextField
                style={{
                  width: "100%",
                  marginBottom: "46px",
                  marginLeft: "20px",
                }}
                id="outlined-basic"
                variant="outlined"
                label={t("bildirishnoma.single.miqdori")}
                type="number"
                value={fields?.vosita_miqdori}
                onChange={(e) => handleChange(e)}
                name="vosita_miqdori"
                required
              />
            </div>
            <TextField
              style={{
                width: "100%",
                marginBottom: "46px",
              }}
              id="outlined-basic"
              variant="outlined"
              label={t("vosita.b1")}
              type="number"
              value={fields?.olchov_birligi_narxi}
              onChange={(e) => handleChange(e)}
              required
              name="olchov_birligi_narxi"
            />
            <TextField
              style={{
                width: "100%",
                marginBottom: "46px",
              }}
              id="outlined-basic"
              variant="outlined"
              label={t("vosita.b2")}
              value={fields?.omborxona_nomi}
              onChange={(e) => handleChange(e)}
              name="omborxona_nomi"
              required
            />
          </section>
          <section className={value === 0 && "visually-hidden"}>
            <div
              style={
                get(filetool, "[0]")
                  ? {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }
                  : null
              }
            >
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")} *
              </h4>
              <label
                htmlFor="inputfiles"
                className={
                  get(filetool, "[0]")
                    ? "fix-btn"
                    : "input_tyle_download fix-file"
                }
              >
                <input
                  onChange={get(filetool, "length") < 1 && File}
                  className="visually-hidden"
                  disabled={get(filetool, "length") > 0}
                  id="inputfiles"
                  type="file"
                />
                <img
                  className={get(filetool, "[0]") && "visually-hidden"}
                  style={{
                    display: "block",
                    margin: "0 auto",
                    marginBottom: "14px",
                  }}
                  src={scrip}
                  alt="..."
                />
                {!get(filetool, "[0]")
                  ? t("bildirishnoma.new.failinf")
                  : t("vosita.qosh")}
              </label>
            </div>
            {get(filetool, "[0]") && (
              <div className="sarflov_block_inner_div">
                {filetool.map((item, index) =>
                  filetool.length > 0 ? (
                    <div
                      style={{ width: "100%", height: "100px" }}
                      key={index}
                      // className="sarflov_block_downlo"
                    >
                      <div className="flex ml-20">
                        <label className="input_tyle_download flex">
                          <img src={pdfDoc} alt="" className="label_img" />
                          <p
                            style={{
                              width: "300px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.filevalue}
                          </p>
                        </label>
                        <div className="">
                          <Button
                            onClick={(e) => delFile(index)}
                            startIcon={<CloseIcon />}
                          ></Button>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </section>
          <Button
            onClick={Subvos}
            type="button"
            style={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "#1464C0",
              borderRadius: "12px",
            }}
            startIcon={<AddIcon />}
            variant="contained"
          >
            {opentool && edittool
              ? t("input.Ozgarish")
              : t("vosita.vositaqosh")}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default Singlemodal;

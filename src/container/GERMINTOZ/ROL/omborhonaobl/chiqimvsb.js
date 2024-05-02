import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ClearIcon from "@mui/icons-material/Clear";
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
import DeleteIcon from "assets/icon/l3.svg";
import scrip from "assets/icon/scripka.svg";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import "./omborhona.scss";

function Chiqimvsb() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const [firstStepModal, setFirstStepModal] = useState(false);
  const [secondStepModal, setSecondStepModal] = useState(false);

  const [institution, setInstitution] = useState(null);
  const [district, setDistrict] = useState(null);

  const [data, setData] = useState([]);

  const [batchNumber, setBatchNumber] = useState(null);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const [preparatType, setPreparatType] = useState("");
  const [preparatName, setPreparatName] = useState("");
  const [preparatSeria, setPreparatSeria] = useState("");
  const [preparatCount, setPreparatCount] = useState("");
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setOpen(true);
    setFirstStepModal(false);
  };

  function uploadFile(e) {
    if (e.target.files[0]) setFile(e.target.files[0]);
  }
  function uploadImage(e) {
    if (e.target.files[0]) setImage(e.target.files[0]);
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
  };

  function handleAddPreparats(e) {
    e.preventDefault();
    setData([
      ...data,
      {
        nomi: preparatName && preparatName.nomi,
        turi: preparatType && preparatType.nomi,
        vosita_miqdori: Number(preparatCount),
        vosita_seryasi: preparatSeria,
        vosita_nomi: preparatName && preparatName.id,
        vosita_turi: preparatType && preparatType.id,
      },
    ]);
    setSecondStepModal(false);
    setPreparatType({});
    setPreparatName({});
    setPreparatSeria("");
    setPreparatCount("");
  }
  const handleRemovePreparats = (index) => {
    const preparatsCopy = [...data];
    preparatsCopy.splice(index, 1);
    setData(preparatsCopy);
  };

  const firstStepSubmission = (e) => {
    e.preventDefault();
    setOpen(false);
    setFirstStepModal(true);
  };

  const {
    data: { muassasalar: districts = [] },
  } = useGet({ url: `/user/viloyat/tumanlar/` });
  const { data: institutions = [] } = useGet({
    url: `/user/viloyat/muassasalar/?filter[tuman_id]=${district?.id}`,
    enabled: !!district?.id,
    filter: (data) => {
      return data.muassasalar.filter(
        (institution) => institution.tuman_id === parseInt(district?.id)
      );
    },
  });
  const {
    data: { data: preparats = [] },
  } = useGet({ url: `/ariza/vositalar/` });
  const hapNames =
    preparats?.find((el) => el.id === preparatType.id)?.vosita_nomlari ?? [];

  const { mutate } = usePost();
  const Save = () => {
    const formData = new FormData();
    formData.append("partiya_raqam", batchNumber);
    formData.append("comment", comment);
    formData.append("vssb_id", localStorage.getItem("vsb"));
    formData.append("vositalar", JSON.stringify(data));
    image && formData.append("image", image);
    file && formData.append("file", file);
    const successReload = () => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    };
    if (institution?.id && district?.id) {
      formData.append("lpu_id", institution.id);
      mutate({
        url: "/omborxona/kirim/qilish/VSSB/dan/LPU/ga",
        data: formData,
        onSuccess: () => {
          toast.success(t("Lpu ga chiqim qilindi"));
          successReload();
        },
        onError: (error) => {
          if (get(error, "response.data.data")) {
            toast.error(get(error, "response.data.message"));
            return;
          }
          toast.error("Lpu ga chiqim qilib bo'lmadi!");
        },
      });
    } else {
      formData.append("ttb_id", district.id);
      mutate({
        url: "/omborxona/kirim/qilish/VSSB/dan/TTB/ga",
        data: formData,
        onSuccess: () => {
          toast.success(t("TTB ga chiqim qilindi"));
          successReload();
        },
        onError: (error) => {
          if (get(error, "response.data.data")) {
            toast.error(get(error, "response.data.message"));
            return;
          }
          toast.error("TTb ga chiqim qilib bo'lmadi!");
        },
      });
    }
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
        style={{
          overflow: "scroll",
        }}
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="h-[100vh] overflow-auto" sx={{ ...style, width: 500 }}>
          <div>
            <Button
              style={{
                marginBottom: "14px",
                marginLeft: "-25px",
                marginTop: "30px",
              }}
              variant="text"
              onClick={() => setOpen(false)}
            >
              <SvgIcon component={ArrowBackIcon} inheritViewBox />
            </Button>
            <h2 className="kirm-head">{t("bildirishnoma.chiqim")}</h2>
          </div>
          <form onSubmit={firstStepSubmission}>
            <TextField
              style={{
                width: "437px",
                marginBottom: "20px",
              }}
              id="outlined-basic"
              onChange={(e) => setBatchNumber(e.target.value)}
              label={t("vosita.partiys")}
              variant="outlined"
              required
              type={"number"}
            />

            <FormControl style={{ marginBottom: "18px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("pdf.rmo")}*
              </InputLabel>
              <Select
                required={!institution}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setDistrict(e.target.value)}
                label={`${t("pdf.rmo")}*`}
              >
                {districts.map((el) => {
                  return <MenuItem value={el}>{el.nomi}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl style={{ marginBottom: "18px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("pdf.oshp")}
              </InputLabel>
              <Select
                required={!district}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("pdf.oshp")}
                onChange={(e) => setInstitution(e.target.value)}
              >
                {institutions.map((el) => {
                  return (
                    <MenuItem value={el} key={v4()}>
                      {el.nomi}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              style={{
                width: "437px",
                marginBottom: "20px",
              }}
              required
              id="outlined-basic"
              onChange={(e) => setComment(e.target.value)}
              label={t("input.yuk")}
              variant="outlined"
            />
            <section>
              <div>
                <h4 className="sarflov_block_title">
                  {t("Rasm biriktirish")} *
                </h4>
                <label className={"input_tyle_download fix-file"} id="image">
                  <input
                    onChange={uploadImage}
                    className="visually-hidden"
                    id="image"
                    type="file"
                    accept="image/*"
                    required={!image}
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
                  {!image
                    ? t("Rasmni bu yerga tashlang yoki biriktiring")
                    : t("Rasm yuklandi. O'zgartirish uchun shu yerni bosing")}
                </label>
              </div>
            </section>

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
      <Modal keepMounted open={firstStepModal} onClose={handleClose}>
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
              onClick={() => setFirstStepModal(false)}
            >
              <SvgIcon component={ClearIcon} inheritViewBox />
            </Button>
          </div>
          <p className="chiqim-page">
            {t("bola.tan")} {t("input.lpu")}:{" "}
            {institution?.nomi ? institution?.nomi : t("Kiritilmagan")}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="chiqim-page"
          >
            {t("bola.tan")} {t("pdf.rmo")} :{" "}
            {district?.nomi ? district?.nomi : t("Kiritilmagan")}{" "}
          </div>
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
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label={t("bildirishnoma.single.vosi")} />
              <Tab label={t("input.fayl")} />
            </Tabs>
          </Box>
          {tab === 0 && (
            <div
              style={{
                listStyle: "none",
                maxHeight: "400px",
                overflowY: "auto",
              }}
              className={"site-list--create"}
            >
              {data &&
                data.map((el, index) => {
                  return (
                    <div>
                      <div className="flex justify-between pb-5 items-center">
                        <div>#{index + 1}</div>
                        <button>
                          <img
                            onClick={() => handleRemovePreparats(index)}
                            src={DeleteIcon}
                            alt="delete icon"
                          />
                        </button>
                      </div>
                      <div className="site-list__item">
                        <div className="border-list">
                          {t("bildirishnoma.single.nomiinput")}:
                        </div>
                        <div className="border-list">{el.nomi}</div>
                      </div>
                      <div className="site-list__item">
                        <div className="border-list">{t("input.turi")}:</div>
                        <div className="border-list">{el.turi}</div>
                      </div>

                      <div className="site-list__item">
                        <div className="border-list">
                          {t("bildirishnoma.single.seriyasi")}:
                        </div>{" "}
                        <div className="border-list">{el.vosita_seryasi}</div>
                      </div>
                      <div className="site-list__item">
                        <div className="border-list">
                          {t("bildirishnoma.single.miqdori")}:
                        </div>{" "}
                        <div className="border-list">{el.vosita_miqdori}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {tab === 1 && (
            <section>
              <div>
                <h4 className="sarflov_block_title">{t("Fayl biriktirish")}</h4>
                <label className={"input_tyle_download fix-file"} id="file">
                  <input
                    onChange={uploadFile}
                    className="visually-hidden"
                    id="file"
                    type="file"
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
                  {!image
                    ? t("Faylni bu yerga tashlang yoki biriktiring")
                    : t("Faylni yuklandi. O'zgartirish uchun shu yerni bosing")}
                </label>
              </div>
            </section>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "36px",
              borderTop: "1px solid #E7EBF2",
            }}
          >
            {tab === 0 && (
              <Button
                onClick={() => setSecondStepModal(true)}
                startIcon={<AddIcon />}
                style={{
                  border: "none",
                }}
                variant="outlined"
              >
                {t("vosita.vositaqosh")}
              </Button>
            )}
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
        open={secondStepModal}
        onClose={() => setSecondStepModal(false)}
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
            onClick={() => setSecondStepModal(false)}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </Button>
          <h2 className="kirm-head">{t("vosita.vositaqosh")}</h2>
          <form onSubmit={handleAddPreparats}>
            <FormControl style={{ marginBottom: "20px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("vosita.vositaturi")}*
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={`${t("vosita.vositaturi")}*`}
                value={preparatType}
                onChange={(e) => setPreparatType(e.target.value)}
                required
              >
                {preparats.map((el) => (
                  <MenuItem value={el} key={v4()}>
                    {el.nomi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ marginBottom: "20px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("bildirishnoma.single.nomi")}*
              </InputLabel>
              <Select
                disabled={hapNames.length === 0}
                labelId="demo-simple-select-label"
                value={preparatName}
                onChange={(e) => setPreparatName(e.target.value)}
                id="demo-simple-select"
                label={`${t("bildirishnoma.single.nomi")}*`}
                required
              >
                {hapNames.map((el) => {
                  return (
                    <MenuItem value={el} key={v4()}>
                      {el.nomi}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              style={{
                width: "437px",
                marginBottom: "20px",
              }}
              value={preparatSeria}
              onChange={(e) => setPreparatSeria(e.target.value)}
              id="outlined-basic"
              label={t("bildirishnoma.single.seriyasi")}
              variant="outlined"
              required
            />
            <TextField
              style={{
                width: "437px",
                marginBottom: "20px",
              }}
              value={preparatCount}
              onChange={(e) => setPreparatCount(e.target.value)}
              id="outlined-basic"
              label={t("bildirishnoma.single.miqdori")}
              variant="outlined"
              required
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
export default Chiqimvsb;

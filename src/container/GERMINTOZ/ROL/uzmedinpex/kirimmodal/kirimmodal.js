import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SvgIcon,
  TextField,
} from "@mui/material";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { request } from "../../../../../api/request";
import ControlledAccordions from "../kirimkard/accordionCard/indext";

const KirimModal = ({ setOpens, setOpen2, setRefetch }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [popone, setPopone] = useState(false);
  const [data, setData] = useState([]);
  const [numb, setNumb] = useState();
  const navigate = useNavigate();
  const { data: Data } = useGet({
    url: "/omborxona/buyurtma/yaratish",
  });
  console.log("🚀 ~ file: kirimmodal.js:29 ~ KirimModal ~ DA:", numb);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "80%",
    overflowY: "hidden",
    minWidth: "500px",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  function byurt(e) {
    e.preventDefault();
    const token = window.localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setOpen(false);
    request
      .get(
        `/omborxona/buyurtma/vositalari/partiya/yaratish?shartnoma=${numb}`,
        config
      )
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 404") {
          alert("Ushbu Shartnoma Mavjud emas!");
          navigate(0);
        }
        throw err;
      });
    setPopone(true);
    setNumb("");
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        style={{ marginRight: "20px", borderRadius: "12px" }}
        startIcon={<CallReceivedIcon />}
        variant="contained"
      >
        {t("input.qil")}
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          className="modal-one"
          sx={{ ...style, height: "auto", width: 500 }}
        >
          <Button
            style={{
              marginBottom: "14px",
              marginLeft: "-25px",
            }}
            variant="text"
            onClick={() => setOpen(false)}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </Button>
          <h4 className="prihod_block_inner_title">{t("input.qil")}</h4>
          <form onSubmit={byurt}>
            <FormControl fullWidth>
              <InputLabel
                style={{ backgroundColor: "#fff" }}
                id="demo-simple-select-label"
              >
                {t("Buyurtma Raqami")}
              </InputLabel>
              <Select
                style={{ marginBottom: "48px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={numb}
                label="Age"
                onChange={(e) => setNumb(e.target.value)}
              >
                {get(Data, "data")?.map((el) => {
                  return (
                    <MenuItem
                      key={el?.id}
                      value={get(el, "buyurtma.shartnoma_raqami")}
                    >
                      {get(el, "buyurtma.shartnoma_raqami")}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Button
              type="submit"
              style={{
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#1464C0",
              }}
              variant={"contained"}
            >
              {t("bildirishnoma.jonat")}
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={popone}
        onClose={() => {
          setPopone(false);
          setRefetch((prev) => !prev);
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-one" sx={{ ...style, position: "relative" }}>
          <Box
            position={"fixed"}
            style={{
              display: "flex",
              alignItems: "center",
              top: 0,
              left: 0,
              background: "white",
              zIndex: 999,
              width: "100%",
              height: "50px",
              padding: "0 1rem",
            }}
          >
            <Button
              style={{
                marginBottom: "14px",
                marginLeft: "-25px",
                display: "flex",
                alignItems: "center",
              }}
              variant="text"
            ></Button>
            <h2 className="kirm-head">
              <IconButton onClick={() => setPopone(false)} color="info">
                <SvgIcon component={ArrowBackIcon} inheritViewBox />
              </IconButton>{" "}
              {t("vosita.vositaqosh")}
            </h2>
          </Box>
          <Box
            style={{
              overflowY: "auto",
              height: "calc(100% - 50px)",
              marginTop: "50px",
            }}
          >
            {data.length > 0 ? (
              <ControlledAccordions items={data} orderId={numb} />
            ) : (
              <p>{t("input.mavjud")}</p>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default KirimModal;

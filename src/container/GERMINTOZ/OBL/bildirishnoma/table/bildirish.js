import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Fade,
  InputAdornment,
  Modal,
  Tab,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./bildirish.scss";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import useDebounce from "hooks/useDebounce";
import useTab from "hooks/useTab";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import usePost from "../../../../../hooks/usePost";
import ReceivedAccordingNeedsOfChildren from "./components/ReceivedAccordingNeedsOfChildren";
import ReceivedFree from "./components/ReceivedFree";
import SendedAccordingNeedsOfChildren from "./components/SendedAccordingNeedsOfChildren";
import SendedFree from "./components/SendedFree";
import SystematicNotification from "./components/SystematicNotification";

export default function Tablebildirishobl() {
  const [searchInput, setSearchInput] = useState("");
  const debounceVal = useDebounce(searchInput, 1000);
  const [notificationCount, setNotificationCount] = useState(0);

  const { t } = useTranslation();

  const classes = {
    table: {
      minWidth: 700,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: "white",
      padding: "10px",
      width: "80%",
      margin: "30px auto 0 auto",
      borderRadius: "12px",
    },
    formControl: {
      margin: "1px",
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: "5px",
    },
    button: {
      padding: "8px",
      borderRadius: "12px",
    },
  };
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = (e) => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open3, setOpen3] = useState(false);
  const handleOpen3 = (e) => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const [open4, setOpen4] = useState(false);
  const handleOpen4 = (e) => {
    setOpen4(true);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };

  const { handleTabChange, tab } = useTab({ customParams: { page: 1 } });
  const { handleTabChange: handleRecievedTabChange, tab: recievedTab } = useTab(
    { tabKey: "r-tab", customParams: { page: 1 } }
  );
  const { handleTabChange: handleSendedTabChange, tab: sendedTab } = useTab({
    tabKey: "s-tab",
    customParams: { page: 1 },
  });

  const { mutate } = usePost();

  const handleStatusChange = (e) => {
    console.log(e);
    const formData = new FormData();
    formData.append("id", e.id);
    formData.append("Yuboruvchi", e.kimdan);
    formData.append("status", "O'qildi");
    if (tab === "1")
      mutate({
        url: "/bildirishnoma/viloyat/erkin/",
        method: "put",
        data: formData,
      });
    else {
      mutate({
        url: "/bildirishnoma/viloyatga/",
        method: "put",
        data: formData,
      });
    }
  };
  const navigate = useNavigate();
  return (
    <dvi className="ariza">
      <div className="ariza_top">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 className="ariza_top_title">
            {t("input.bso")}:{notificationCount}
          </h4>
          <TextField
            className="search-ariza"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t("bildirishnoma.plac")}
            style={{ marginLeft: "40px" }}
            id="standard-basic"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment style={{ position: "absolute", right: "18px" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="create_ariza_btn">
          <Button
            onClick={() => handleOpen2()}
            variant="contained"
            startIcon={<AddIcon />}
          >
            {t("bildirishnoma.add")}
          </Button>
        </div>
      </div>
      <div className="ariza_bottom">
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(e, v) => handleTabChange(v)}
              aria-label="lab API tabs example"
            >
              {/* <Tab value={"1"} label={t("qabxar")} />
              <Tab value={"2"} label={t("yubxar")} /> */}
              <Tab value={"1"} label={t("vosita.erkin")} />
              <Tab value={"2"} label={t("vosita.bola")} />
              <Tab value={"3"} label={t("vosita.tizim")} />
            </TabList>
          </Box>
          <TabPanel value={"1"} className="!p-0">
            <TabContext value={recievedTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={(e, v) => handleRecievedTabChange(v)}
                  aria-label="lab API tabs example"
                >
                  <Tab value={"1"} label={t("qabxar")} />
                  <Tab value={"2"} label={t("yubxar")} />
                </TabList>
              </Box>
              <TabPanel value={"1"} className="!p-0">
                <ReceivedFree
                  search={debounceVal}
                  setNotificationCount={setNotificationCount}
                  handleStatusChange={handleStatusChange}
                />
              </TabPanel>
              <TabPanel value={"2"} className="!p-0">
                <SendedFree
                  search={debounceVal}
                  setNotificationCount={setNotificationCount}
                />
              </TabPanel>
            </TabContext>
          </TabPanel>
          <TabPanel value={"2"} className="!p-0">
            <TabContext value={sendedTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={(e, v) => handleSendedTabChange(v)}>
                  <Tab value={"1"} label={t("qabxar")} />
                  <Tab value={"2"} label={t("yubxar")} />
                </TabList>
              </Box>
              <TabPanel value={"1"} className="!p-0">
                <ReceivedAccordingNeedsOfChildren
                  search={debounceVal}
                  setNotificationCount={setNotificationCount}
                  handleStatusChange={handleStatusChange}
                />
              </TabPanel>
              <TabPanel value={"2"} className="!p-0">
                <SendedAccordingNeedsOfChildren
                  search={debounceVal}
                  setNotificationCount={setNotificationCount}
                />
              </TabPanel>
            </TabContext>
          </TabPanel>
          <TabPanel value={"3"} className="!p-0">
            <SystematicNotification
              search={debounceVal}
              setNotificationCount={setNotificationCount}
            />
          </TabPanel>
        </TabContext>
        {/* <Erkin arr={newarr} search={searchInput} /> */}
      </div>
      <div className="modal_one_99">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal_one}
          open={open2}
          onClose={handleClose2}
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
          <Fade in={open2}>
            <div style={classes.paper}>
              <div className="zayavka_block">
                <Button
                  style={{
                    color: "black",
                    textAlign: "right",
                    margin: "0 0 auto auto",
                    display: "flex",
                  }}
                  startIcon={<CloseIcon />}
                  onClick={() => handleClose2()}
                ></Button>
                <h4 className="zayavka_title">{t("modalariza.arizaturi")}</h4>
                <div className="delete_btn_group">
                  <Button
                    onClick={() => navigate("/rmoariza_viloyat/tuman")}
                    className="jayavka_btn"
                  >
                    {t("vosita.bola")}
                  </Button>
                  <Button
                    onClick={() => navigate("/rmoerkin_viloyat/tuman")}
                    className="jayavka_btn"
                  >
                    {t("vosita.erkin")}
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="modal_one_99">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal_one}
          open={open3}
          onClose={handleClose3}
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
          <Fade in={open3}>
            <div style={classes.paper}>
              <div className="zayavka_block">
                <Button
                  style={{
                    color: "black",
                    textAlign: "right",
                    margin: "0 0 auto auto",
                    display: "flex",
                  }}
                  startIcon={<CloseIcon />}
                  onClick={() => handleClose3()}
                ></Button>
                <h4 className="zayavka_title">{t("modalariza.arizaturi")}</h4>
                <div className="delete_btn_group">
                  <Link to={"/rmoariza_viloyat/tuman"} className="jayavka_btn">
                    {t("bildirishnoma.tuman")}
                  </Link>
                  {/* <Link
                    Link
                    to={"/rmoariza_viloyat/oilaviy"}
                    className="jayavka_btn"
                  >
                    {t("bildirishnoma.single.vositainf")}
                  </Link> */}
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="modal_one_99">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal_one}
          open={open4}
          onClose={handleClose4}
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
          <Fade in={open4}>
            <div style={classes.paper}>
              <div className="zayavka_block">
                <Button
                  style={{
                    color: "black",
                    textAlign: "right",
                    margin: "0 0 auto auto",
                    display: "flex",
                  }}
                  startIcon={<CloseIcon />}
                  onClick={() => handleClose4()}
                ></Button>
                <h4 className="zayavka_title">{t("modalariza.arizaturi")}</h4>
                <div className="delete_btn_group">
                  <Link
                    Link
                    to={"/rmoerkin_viloyat/tuman"}
                    className="jayavka_btn"
                  >
                    {t("bildirishnoma.tuman")}
                  </Link>
                  <Link
                    Link
                    to={"/rmoerkin_viloyat/oilaviy"}
                    className="jayavka_btn"
                  >
                    {t("bildirishnoma.single.vositainf")}
                  </Link>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </dvi>
  );
}

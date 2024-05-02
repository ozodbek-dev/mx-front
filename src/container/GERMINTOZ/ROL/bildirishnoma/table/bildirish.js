import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Fade,
  InputAdornment,
  Modal,
  Tab,
  TextField,
} from "@mui/material";
import useDebounce from "hooks/useDebounce";
import useTab from "hooks/useTab";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./bildirish.scss";
import ReceivedAccordingNeedsOfChildren from "./components/ReceivedAccordingNeedsOfChildren";
import ReceivedFree from "./components/ReceivedFree";
import SendedAccordingNeedsOfChildren from "./components/SendedAccordingNeedsOfChildren";
import SendedFree from "./components/SendedFree";
import SystematicNotification from "./components/SystematicNotification";
import { Close } from "@mui/icons-material";
export default function Tablebildirish() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const debounceVal = useDebounce(searchValue, 1000);
  const [search, setSearch] = useState("");
  const { handleTabChange, tab, tabs } = useTab();

  const handleChangePage = useCallback(
    (page) => {
      handleTabChange(page, "page");
    },
    [handleTabChange]
  );

  const customTabChange = useCallback(
    (v, tabKey) => {
      handleTabChange(v, tabKey, { page: 1 });
    },
    [handleTabChange]
  );

  useMemo(() => {
    handleTabChange(1, "page");
  }, [debounceVal]);

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

  return (
    <div className="ariza">
      <div className="ariza_top">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 className="ariza_top_title">
            {t("Jami bildirishnomalar soni")}: {notificationCount}
          </h4>
          <TextField
            className="search-ariza"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("Bildirishnoma Qidirish")}
            style={{ marginLeft: "40px" }}
            id="standard-basic"
            variant="outlined"
            value={searchValue}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="end"
                  style={{ position: "absolute", right: "18px", cursor: "pointer" }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                searchValue && (
                  <InputAdornment
                    position="end"
                    style={{ position: "absolute", right: "-30px", cursor: "pointer" }}
                    onClick={() => {
                      setSearchValue(""); // Ma'lumotni tozalash
                    }}
                  >
                    <Close />
                  </InputAdornment>
                )
              ),
            }}
            inputProps={{
              style: {
                width: "200px",
              },
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
              onChange={(e, v) => customTabChange(v)}
              aria-label="lab API tabs example"
            >
              <Tab value={"1"} label={t("vosita.erkin")} />
              <Tab value={"2"} label={t("vosita.bola")} />
              <Tab value={"3"} label={t("vosita.tizim")} />
            </TabList>
          </Box>
          <TabPanel value={"1"} className="!p-0">
            <TabContext value={tabs("r-tab")}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={(e, v) => customTabChange(v, "r-tab")}
                  aria-label="lab API tabs example"
                >
                  <Tab value={"1"} label={t("qabxar")} />
                  <Tab value={"2"} label={t("yubxar")} />
                </TabList>
              </Box>
              <TabPanel value={"1"} className="!p-0">
                <ReceivedFree
                  page={Number(tabs("page"))}
                  handleChangePage={handleChangePage}
                  search={debounceVal}
                  setNotificationCount={setNotificationCount}
                />
              </TabPanel>
              <TabPanel value={"2"} className="!p-0">
                <SendedFree
                  page={Number(tabs("page"))}
                  handleChangePage={handleChangePage}
                  search={debounceVal}
                  setNotificationCount={setNotificationCount}
                />
              </TabPanel>
            </TabContext>
          </TabPanel>
          <TabPanel value={"2"} className="!p-0">
            <TabContext value={tabs("s-tab")}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={(e, v) => customTabChange(v, "s-tab")}>
                  <Tab value={"1"} label={t("qabxar")} />
                  <Tab value={"2"} label={t("yubxar")} />
                </TabList>
              </Box>
              <TabPanel value={"1"} className="!p-0">
                <ReceivedAccordingNeedsOfChildren
                  search={debounceVal}
                  page={Number(tabs("page"))}
                  handleChangePage={handleChangePage}
                  setNotificationCount={setNotificationCount}
                />
              </TabPanel>
              <TabPanel value={"2"} className="!p-0">
                <SendedAccordingNeedsOfChildren
                  search={debounceVal}
                  page={Number(tabs("page"))}
                  handleChangePage={handleChangePage}
                  setNotificationCount={setNotificationCount}
                />
              </TabPanel>
            </TabContext>
          </TabPanel>
          <TabPanel value={"3"} className="!p-0">
            <SystematicNotification
              page={Number(tabs("page"))}
              handleChangePage={handleChangePage}
              search={debounceVal}
              setNotificationCount={setNotificationCount}
            />
          </TabPanel>
        </TabContext>
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
                  <Link to={"/rmoariza/null"} className="jayavka_btn">
                    {t("vosita.bola")}
                  </Link>
                  <Link to={"/rmoerkin/null/erkin"} className="jayavka_btn">
                    {t("vosita.erkin")}
                  </Link>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

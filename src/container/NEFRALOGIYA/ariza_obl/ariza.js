import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Fade,
  InputAdornment,
  Modal,
  Snackbar,
  Tab,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useDebounce from "hooks/useDebounce";
import useTab from "hooks/useTab";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { request } from "../../../api/request";
import "./ariza.scss";
import CombinedApplications from "./components/CombinedApplications";
import ReceivedApplications from "./components/ReceivedApplications";
import SendedApplications from "./components/SendedApplications";

export default function Arizaobls() {
  const { t } = useTranslation();
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [noti, setNoti] = useState(false);
  const [notificationn, setNotificationn] = useState({
    state: "",
    text: "",
  });
  const [applicationCount, setApplicationCount] = useState(0);
  const token = window.localStorage.token;

  const [searchValue, setSearchValue] = useState("");
  const debounceVal = useDebounce(searchValue, 1000);

  const handleClick = () => {
    setNoti(true);
  };

  const handlenoti = (event, reason) => {
    if (reason !== "clickaway") {
      setNoti(false);
    }
  };

  const classes = {
    paper: {
      backgroundColor: "white",
      padding: "10px",
      width: "80%",
      margin: "30px auto 0 auto",
      borderRadius: "12px",
    },
  };
  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [isCombinedApplication, setIsCombinedApplication] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);

  function addColumn(e) {
    if (selectedApplications && selectedApplications.length > 0) {
      let ss = selectedApplications.filter((elem) => elem === e);
      if (ss && ss.length > 0) {
        setSelectedApplications(
          selectedApplications.filter((item) => item !== e)
        );
      } else {
        setSelectedApplications([...selectedApplications, e]);
      }
    } else {
      setSelectedApplications([...selectedApplications, e]);
    }
  }

  function Send() {
    const formmdata = new FormData();
    formmdata.append("arizalar", selectedApplications);
    request
      .post(`ariza/vssb/birlashtirish/`, formmdata, config)
      .then((res) => {
        setNotificationn({
          state: "success",
          text: `Ariza birlashdi`,
        });
        setIsCombinedApplication(!isCombinedApplication);
        handleClick(true);
      })
      .catch(function (err) {
        setNotificationn({
          state: "error",
          text: `Ariza birlashmadi`,
        });
        alert(err.response.data.error);
        handleClick(true);
      });
  }

  const { tab, handleTabChange } = useTab({ customParams: { page: 1 } });

  return (
    <div className="ariza">
      <div className="ariza_top">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 className="ariza_top_title">
            {t("bildirishnoma.allariza")}: {applicationCount}
          </h4>
          <TextField
            className="search-ariza"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("bildirishnoma.plac")}
            style={{ marginLeft: "40px" }}
            id="standard-basic"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="end"
                  style={{ position: "absolute", right: "18px" }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {tab === "1" && (
          <div className="create_ariza_btn">
            {isCombinedApplication ? (
              <>
                <Button
                  style={{ marginRight: "15px" }}
                  onClick={() =>
                    setIsCombinedApplication(!isCombinedApplication)
                  }
                  variant="contained"
                  color="error"
                  startIcon={<CloseIcon />}
                >
                  {t("bildirishnoma.single.bekor")}
                </Button>
                <Button
                  onClick={() => Send()}
                  variant="contained"
                  startIcon={<CheckIcon />}
                >
                  {t("vosita.birlash")}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsCombinedApplication(!isCombinedApplication)}
                variant="contained"
                startIcon={<AddIcon />}
              >
                {t("vosita.birlash")}
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="ariza_bottom">
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(_, tab) => handleTabChange(tab)}
              aria-label="lab API tabs example"
            >
              <Tab label={t("input.qabul")} value="1" />
              <Tab label={t("vosita.bir")} value="2" />
              <Tab label={t("input.yubor")} value="3" />
            </TabList>
          </Box>
          <TabPanel className="!p-0" value="1">
            <ReceivedApplications
              selectApplication={addColumn}
              setApplicationCount={setApplicationCount}
              isCombinedApplication={isCombinedApplication}
              search={debounceVal}
              selectedApplications={selectedApplications}
            />
          </TabPanel>
          <TabPanel className="!p-0" value="2">
            <CombinedApplications
              setApplicationCount={setApplicationCount}
              search={debounceVal}
            />
          </TabPanel>
          <TabPanel className="!p-0" value="3">
            <SendedApplications
              setApplicationCount={setApplicationCount}
              search={debounceVal}
            />
          </TabPanel>
        </TabContext>

        <div className="modal_one_99">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
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
                    <Link to={"/sarflov"} className="jayavka_btn">
                      Sarflov vositalar
                    </Link>
                    <Link to={"/apelatsion"} className="jayavka_btn">
                      Jihozlar va ehtiyot qismlar
                    </Link>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
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
    </div>
  );
}

import * as React from "react";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Modal, Pagination, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import usePost from "hooks/usePost";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BolalarMonitoringi from "../tabsOshb3/bolalarMonitoringi/bolalarMonitoringi";
import Tab1 from "../tabsOshb3/kirimChiqim/tab1";
import MuassasaHaqidaMalumot from "../tabsOshb3/muassasaHaqidaMalumot/muassasaHaqidaMalumot";
import { useTranslation } from "react-i18next";
import User from "../users/User";
import MuiAlert from "@mui/material/Alert";
import excel from "./../../../../../assets/icon/excel.svg";
import { CSVLink } from "react-csv";
import useGet from "hooks/useGet";
import { toast } from "react-toastify";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [value, setValue] = useState(0);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const params = useParams();
  const { mutate, isSuccess } = usePost();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`${location.pathname}?tab=${newValue}`);
  };
  useEffect(() => {
    if (searchParams.get("tab")) setValue(+searchParams.get("tab"));
  }, []);
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("muassasa_id", params.id);
    formData.append("username", name);
    formData.append("password", password);
    mutate({
      url: "/user/register/ShifokorUser",
      data: formData,
      onSuccess: (data) => {
        if (isSuccess) {
          setOpen(false);
          setOpens(true);
          setName("");
          setPassword("");
          window.location.reload();
        }
      },
      onError: (error) => {
        if (error) {
          if (error) {
            toast.error(
              t(error.response.data?.message) ||
                t("Ma'lumotlarni to'liq kiriting")
            );
          } else {
            toast.error(error.message +  "123" || t("Ma'lumotlarni to'liq kiriting"));
          }
        }
      },
    });
  };

  const [page, setPage] = useState(1);
  const handleChangePage = React.useCallback((page) => {
    setPage(page);
  }, []);
  useEffect(() => {
    setPage(1);
  }, [searchValue]);
  const {
    data: { data = [], meta },
  } = useGet({
    url: `/tuman/bolalar/?page=${page}&search=${searchValue}`,
  });
  const filterChilderenData = React.useMemo(() => {
    return data.filter(
      (item) => +item.biriktirilgan_muassasa_id === +params.id
    );
  }, [data, params]);
  return (
    <div className="">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <>
            <div className="top">
              <div className="header">
                <Link to="/monitoring/oshp">
                  <button className="back_v">
                    <i>
                      <ArrowBackIcon />
                    </i>
                    {t("bildirishnoma.single.ortga")}
                  </button>
                </Link>
                {value === 0 && <h4>{t("bildirishnoma.single.vositainf")}</h4>}
                {value === 1 && (
                  <h4>
                    {t("input.lpu")} {t("input.monitor")}
                  </h4>
                )}
                {value === 2 && <h4>{t("bildirishnoma.single.vositainf")}</h4>}
                {value === 3 && <h4>{t("vosita.foy")}</h4>}
                {value === 0 && (
                  <div className="input_v">
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 260,
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={t("bildirishnoma.doriq")}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                      />
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </div>
                )}
              </div>

              <div className="button">
                <Button
                  onClick={() => setOpen(true)}
                  startIcon={<AddIcon />}
                  variant="contained"
                >
                  {t("vosita.yarat")}
                </Button>
                {value === 1 && (
                  <CSVLink
                    data={filterChilderenData.map((item) => ({
                      ...item,
                      fullName: `${item.familiya} ${item.ism} ${item.otasining_ismi}`,
                      biriktirilgan_shifokor: {
                        ...item.biriktirilgan_shifokor,
                        fullName: `${item.biriktirilgan_shifokor.familiyasi} ${item.biriktirilgan_shifokor.ismi} `,
                      },
                    }))}
                    headers={[
                      { label: "JSHSHIR", key: "JSHSHIR" },
                      { label: "F.I.O	", key: "fullName" },
                      { label: "Tug’ilgan sana	", key: "tugilgan_sana" },
                      { label: "Yosh", key: "yosh" },
                      {
                        label: "Shifokor",
                        key: "biriktirilgan_shifokor.fullName",
                      },
                      {
                        label: "Tibbiy muassasaning nomi",
                        key: "biriktirilgan_muassasa.nomi",
                      },
                    ]}
                    separator=";"
                    filename="Bolalar monitoringi"
                  >
                    <button className="excel">
                      <img className="delete_icon" src={excel} alt="batafsil" />
                      {t("bola.excel")}
                    </button>
                  </CSVLink>
                )}
              </div>
            </div>
          </>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={t("bildirishnoma.kir")} value={0} {...a11yProps(0)} />
            <Tab label={t("Bolalar monitoringi")} value={1} {...a11yProps(1)} />
            <Tab label={t("input.malum")} value={2} {...a11yProps(2)} />
            <Tab label={t("vosita.foy")} value={3} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Tab1 searchValue={searchValue} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BolalarMonitoringi data={filterChilderenData} />
          <div className="table-pagination-content">
            <Pagination
              page={page}
              count={meta?.total_pages ?? 1}
              onChange={(e, page) => handleChangePage(page)}
              color="primary"
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MuassasaHaqidaMalumot />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <User />
        </TabPanel>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box style={{ padding: "44px" }} sx={{ ...style, width: 500 }}>
          <Button
            onClick={() => setOpen(false)}
            style={{ marginBottom: "12px" }}
            startIcon={<ArrowBackIcon />}
          ></Button>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginBottom: "15px" }}
              id="outlined-basic"
              label={t("vosita.nomi")}
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", marginBottom: "15px" }}
              id="outlined-basic"
              label={t("vosita.parol")}
              variant="outlined"
              required
            />
            <Button startIcon={<AddIcon />} variant="contained" type="submit">
              {t("vosita.yarat")}
            </Button>
          </form>
        </Box>
      </Modal>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={opens}
          autoHideDuration={6000}
          onClose={() => setOpens(false)}
        >
          <Alert
            onClose={() => setOpens(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Foydalanuvchi Yaratilindi!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

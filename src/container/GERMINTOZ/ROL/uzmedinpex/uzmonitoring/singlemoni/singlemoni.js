import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Popover,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import {useRef, useState} from "react";
// import './manitoring.scss'
import DescriptionIcon from "@mui/icons-material/Description";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import {Link} from "react-router-dom";
import l1 from "../../../../../../assets/icon/l1.svg";
import l4 from "../../../../../../assets/icon/l4.svg";
import {Box} from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import {useTranslation} from "react-i18next";

const Singlemoni = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    background: "white",
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleSeansClose = () => {
    setSeans(false);
  };
  const [opens2, setOpens2] = useState(false);
  const [opens1, setOpens1] = useState(false);

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
      border: "2px solid #000",
      // boxShadow: theme.shadows[5],
      padding: "50px",
      width: "80%",
      margin: "30px auto 0 auto",
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
  const danref = useRef(0);
  const garef = useRef(0);
  const [open2, setOpen2] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [ides, setides] = useState(null);
  const handleOpen2 = (e) => {
    setides(e);
    setOpen2(true);
  };
  const handleOpen1 = (e) => {
    setides(e);
    setOpen1(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [seans, setSeans] = useState(false);
  function Seansbemor(e) {
    setSeans(true);
    const formsdata = new FormData();
  }
  const { t } = useTranslation();
  return (
    <div className="monitoring">
      <div className="monitoring_top">
        <div className="monitoring_top_inner">
          <h4 className="monitoring_top_inner_title">{t("vosita.title")} 2</h4>
          <TextField
            id="outlined-basic"
            label={t("vosita.plac")}
            variant="outlined"
          />
        </div>
        <div className="monitoring_top_inner">
          <Button
            variant="contained"
            // color="primary"
            size="large"
            className={classes.button}
            startIcon={<DescriptionIcon />}
          >
            {t("bola.excel")}
          </Button>
        </div>
      </div>
      <div className="monitoring_search">
        <FormControl className={classes.formControl}>
          <InputLabel InputLabel id="qon-guruh" required>
            {t("vosita.muas")}
          </InputLabel>
          <Select
            labelId="qon-guruh"
            id="demo-simple-select2"
            // value={age}
            name={"jinsi"}
            required
          >
            <MenuItem value="Erkak">Oilaviy Shifokorlik Punktlar 2</MenuItem>
            <MenuItem value="Ayol">Oilaviy Shifokorlik Punktlar 3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="manitoring_table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow style={{ backgroundColor: "white" }}>
                <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                <TableCell align="left">
                  {t("input.pfl")} / Tug’ilganlik haqida guvohnoma raqami
                </TableCell>
                <TableCell align="left">
                  Ismi Familiyasi Otasining Ismi
                </TableCell>
                <TableCell align="left">{t("shifokor.birthday")}</TableCell>
                <TableCell align="left">
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div className="age_children">
                        <Button
                          variant="contained"
                          {...bindTrigger(popupState)}
                        >
                          Yoshi
                        </Button>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <Typography sx={{ p: 2 }}>
                            <div className="sort_block">
                              <div className="sort_block_inner">
                                <p className="age_title">Dan</p>
                                <TextField
                                  inputRef={danref}
                                  id="outlined-basic"
                                  // label="0"
                                  variant="outlined"
                                  placeholder="0"
                                />
                              </div>
                              <div className="sort_block_inner">
                                <p className="age_title">Gacha</p>
                                <TextField
                                  inputRef={garef}
                                  id="outlined-basic"
                                  // label="0"
                                  variant="outlined"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                            <div className="sorf_block_btn">
                              <Button
                                style={{ marginRight: "10px" }}
                                //   onClick={() => setPerson(shifokorlar)}
                                variant="contained"
                              >
                                Barchasi
                              </Button>
                              <Button variant="contained">
                                {t("shifokor.tasdiq")}
                              </Button>
                            </div>
                          </Typography>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                </TableCell>
                <TableCell align="left">{t("sidebar.li4")}</TableCell>
                <TableCell align="left">Tibbiy muassasaning nomi</TableCell>
                <TableCell align="center">
                  {t("bildirishnoma.harakat")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">1</TableCell>
                <TableCell align="left">123321123321</TableCell>
                <TableCell align="left">
                  rustamov ulugbek nodirbek ogli
                </TableCell>
                <TableCell align="left">01.11.1995</TableCell>
                <TableCell align="left">27</TableCell>
                <TableCell align="left">Rustamov ulugbek</TableCell>
                <TableCell align="left">
                  toshkent shaxar Eurosoft IT conpany
                </TableCell>

                <TableCell align="right">
                  <div className="button_modal button_modal_1">
                    <Link Link to={``} className="single_info">
                      <img className="delete_icon" src={l1} alt="batafsil" />
                    </Link>

                    <div className="seans_div">
                      <Button
                        className="seanslar_btn_muassasa"
                        onClick={() => setOpens2(true)}
                      >
                        <img src={l4} />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="modal_manitoring_seans">
        <Modal
          keepMounted
          open={opens2}
          onClose={() => setOpens2(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box className="modal-one" sx={{ ...style }}>
            <div className="seans_modal">
              <h4 className="seans_modal_title">{t("input.bk")}</h4>
              <div className="seans_modal_inner">
                <div className="seans_modal_inner_top">
                  <p className="seans_modal_inner_desc">#05 ko'rik</p>
                  <button
                    onClick={() => setOpens1(true)}
                    className="single_info"
                  >
                    <img className="delete_icon" src={l1} alt="batafsil" />
                  </button>
                </div>
                <div className="seans_modal_inner_bottom">
                  <div className="seans_modal_inner_bottom_left">
                    <p className="">shifokor</p>
                    <p className="">Ko’rikdan o’tilgan sana</p>
                  </div>
                  <div className="seans_modal_inner_bottom_left">
                    <p className="">shifokor</p>
                    <p className="">Ko’rikdan o’tilgan sana</p>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="modal_manitoring_seans_info">
        <Modal
          keepMounted
          open={opens1}
          onClose={() => setOpens1(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box className="modal-one" sx={{ ...style }}>
            <div className="modal_info_seans">
              <div className="block_one">
                <Button
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => setOpens1(false)}
                ></Button>
                <h4 className="seans_modal_title">#05 ko’rik</h4>
              </div>
              <div className="block_two">
                <h4 className="seans_modal_title">Ko’rik haqida ma’lumot</h4>
                <div className="seans_modal_inner_bottom">
                  <div className="seans_modal_inner_bottom_left">
                    <p className="">shifokor</p>
                    <p className="">Ko’rikdan o’tilgan sana</p>
                    <p className="">Ko’rikdan o’tilgan sana</p>
                  </div>
                  <div className="seans_modal_inner_bottom_left">
                    <p className="">shifokor</p>
                    <p className="">Ko’rikdan o’tilgan sana</p>
                    <p className="">Ko’rikdan o’tilgan sana</p>
                  </div>
                </div>
              </div>
              <div className="block_there">
                <h4 className="seans_modal_title">
                  Berilgan dori va vitaminlar
                </h4>
                <div className="table_scrool">
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow style={{ backgroundColor: "white" }}>
                          <TableCell>
                            {t("bildirishnoma.single.soni")}
                          </TableCell>
                          <TableCell align="left">Dori nomi</TableCell>
                          <TableCell align="left">{t("input.ser")}</TableCell>
                          <TableCell align="left">
                            {t("bildirishnoma.single.miqdori")}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="left">01</TableCell>
                          <TableCell align="left">Antigelment a</TableCell>
                          <TableCell align="left">xxxxxxx</TableCell>
                          <TableCell align="left">1</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div className="seans_modal_there_bottom">
                  <div>
                    <Button startIcon={<AddIcon />}>Dori qo’shish</Button>
                  </div>
                  <div>
                    <Button startIcon={<AddIcon />}>Vitamin qo’shish</Button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
export default Singlemoni;

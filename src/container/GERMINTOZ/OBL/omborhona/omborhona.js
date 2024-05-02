import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React, {Fragment, useRef, useState} from "react";
import {Link} from "react-router-dom";
import './omborhona.scss'
import l1 from "../../../../assets/icon/l1.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useTranslation} from "react-i18next";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });




export default function Rmosklad() {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    background: 'white',
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleSeansClose = () => {
    setSeans(false);
  };
  const [opens2, setOpens2] = useState(false);
  const [opens1, setOpens1] = useState(false);

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
    button2:{
        backgroundColor: '#F69641',
    }
  };

  return (
    <div className="" style={{ paddingRight: "20px" }}>
      <div className="sklad_top_block">
        <div className="sklad_top_block_inner">
          <h1 className="sklad_title">{t("sidebar.li3")}</h1>
          <TextField
            id="outlined-basic"
            label={t("bildirishnoma.doriq")}
            variant="outlined"
          />
          <div className="sklad_top"></div>
        </div>
        <div className="sklad_top_block_inner">
          <Link to={"/kirim"}>
            <Button
              variant="contained"
              // color="primary"
              size="large"
              className={classes.button}
              startIcon={<HistoryIcon />}
            >
              {t("bildirishnoma.single.ortga")}lar
            </Button>
          </Link>

          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<NorthIcon />}
          >
            {t("input.chiq")}
          </Button>
          <Button
            variant="contained"
            // color="primary"
            size="large"
            className={classes.button}
            startIcon={<SouthIcon />}
            onClick={() => setOpens1(true)}
          >
            {t("input.qil")}
          </Button>
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

      <div className="sklad">
        <h2 className="sklad-head">{t("jihoz.j10")}</h2>
        <TableContainer style={{ borderRadius: "12px" }} component={Paper}>
          <Table
            style={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">{t("bildirishnoma.single.soni")}</TableCell>
                <TableCell align="center">{t("sbola.hudud")}</TableCell>
                <TableCell align="center">Filtr</TableCell>
                <TableCell align="center">Magistral</TableCell>
                <TableCell align="center">Konsentrat</TableCell>
                <TableCell align="center">Igna Arterial</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Fragment key={1}>
                <TableRow>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">qwe</TableCell>
                  <TableCell align="center">qwe</TableCell>
                  <TableCell align="center">qwe</TableCell>
                  <TableCell align="center">qwe</TableCell>

                  <TableCell align="center">
                    <Link to="#" onClick={() => setOpens2(true)}>
                      <img src={l1} />
                    </Link>
                  </TableCell>
                </TableRow>
              </Fragment>
              {/* <TableRow>
                <TableCell></TableCell>
                <TableCell>{t("shifokor.jami")}</TableCell>
                <TableCell align="center">qwe</TableCell>
                <TableCell align="center">qwe</TableCell>
                <TableCell align="center">qwe</TableCell>
                <TableCell align="center">qwe</TableCell>
              </TableRow> */}
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
              <h4 className="seans_modal_title">Dori malumoti</h4>
              <div className="seans_modal_inner">
                <div className="seans_modal_inner_top">
                  <p className="seans_modal_inner_desc">Dori B</p>
                  {/* <button className="single_info">
                    <img className="delete_icon" src={l1} alt="batafsil" />
                  </button> */}
                </div>
                <div className="seans_modal_inner_bottom">
                  <div className="seans_modal_inner_bottom_left">
                    <p className="">{t("input.ser")}</p>
                    <p className="">Kirim o’tilgan sana</p>
                    <p className="">{t("bildirishnoma.qoldiq")}</p>
                  </div>
                  <div className="seans_modal_inner_bottom_left">
                    <p className="">AB123456</p>
                    <p className="">1</p>
                    <p className="">1</p>
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
          <Box className="modal-one" sx={{ ...style, width:500 }}>
            <div className="modal_info_seans">
              <div className="block_one">
                <Button
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => setOpens1(false)}
                ></Button>
                <h4 className="seans_modal_title">{t("input.qil")}</h4>
              </div>
              <div className="partiya_number">
                <TextField
                  id="outlined-basic"
                  label="{t("vosita.partiys")}"
                  variant="outlined"
                />
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

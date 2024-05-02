import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from 'react-router-dom';
import {Fragment} from 'react';

import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import l1 from "../../../../../assets/icon/l1.svg";

const Mohvos = () =>{
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
        button2: {
          backgroundColor: "#F69641",
        },
      };
       const { t } = useTranslation();
    return (
        <div className="prihod">
        <div className="prihod_top">
          <div className="prihod_top_inner">
            <Link to="/">
              <Button startIcon={<ArrowBackIcon />} variant="contained">
              {t("bildirishnoma.single.ortga")}
              </Button>
            </Link>
            <h4 className="monitoring_top_inner_title">
                {t("sidebar.monitor")} 
            </h4>
          </div>
        </div>
        <div style={{display:"flex",marginTop:"28px"}}>
            <FormControl style={{width:"385px",backgroundColor:"#fff"}} fullWidth>
                <InputLabel id="demo-simple-select-label">{t("bildirishnoma.vlssv")}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select" 
                    label={t("bildirishnoma.single.nomiinput")}
                    required
                >
                    <MenuItem  value={"Viloyat sog'liqni saqlash boshqarmasi"}>
                        Viloyat sog'liqni saqlash boshqarmasi
                        </MenuItem>
                </Select>
                </FormControl>
                <FormControl style={{width:"385px",backgroundColor:"#fff",marginLeft:"36px"}} fullWidth>
                <InputLabel id="demo-simple-select-label">{t("pdf.rmo")}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={t("bildirishnoma.single.nomiinput")}
                    required
                >
                    <MenuItem  value={"Viloyat sog'liqni saqlash boshqarmasi"}>
                        {t("bildirishnoma.tuman")}
                        </MenuItem>
                </Select>
                </FormControl>
                <FormControl style={{width:"385px",backgroundColor:"#fff",marginLeft:"36px"}} fullWidth>
                <InputLabel id="demo-simple-select-label">{t("pdf.oshp")}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={t("bildirishnoma.single.nomiinput")}
                    required
                >
                    <MenuItem  value={"Viloyat sog'liqni saqlash boshqarmasi"}>
                        {t("bildirishnoma.single.vositainf")}
                    </MenuItem>
                </Select>
                </FormControl>
                
        </div>
        <div className="prihod_block">
          <div className="prihod_block_inner">
            <div className="prihod_block_inner_top">
              <h4 className="prihod_block_inner_title">{t("input.sps")}</h4>
              <TextField type="date" id="outlined-basic" variant="outlined" />
            </div>
            <div className="prihod_block_inner_middle">
              <div className="buttons_group">
                <button>Hammasi</button>
                <button>{t("bildirishnoma.kirim")}</button>
                <button>{t("bildirishnoma.chiqim")}</button>
              </div>

              <div className="card_blocks">
              <div className="kirim_card">
                    <div className="kirim_card_left">
                    <Button
                        // variant="contained"
                        // color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<CallReceivedIcon />}
                    ></Button>
                    <p>{t("shifokor.jami")}: 18</p>
                    </div>
                    <div className="kirim_card_center">
                    <div>
                        <span>Dori: 4</span>
                    </div>
                    <div>
                        <span>Vitamin: 4</span>
                    </div>
                    </div>
                    <div className="kirim_card_right">
                    <div className="kirim_card_right_left">
                        <p>2023-01-04</p>
                        <span>13:15</span>
                    </div>
                    <div className="kirim_card_right_left">
                        <Link to={`/mohvossin`}>
                        <img src={l1} />
                        </Link>
                    </div>
                    </div>
                </div>
                <div className="kirim_card chiqim_card">
        <div div className="kirim_card_left chiqim_card_left">
          <Button
            // variant="contained"
            // color="primary"
            size="large"
            className={classes.button}
            startIcon={<CallMadeIcon />}
          ></Button>
          <p>{t("shifokor.jami")}: 20</p>
        </div>
        <div className="chiqim_card_center">
          <div className="kirim_card_center_top">
            <div className="top_left">
              <p>{t("bildirishnoma.send")}:</p>
              <h5>3 ta muassasaga</h5>
            </div>
            <div className="top_right">
              <div className="kirim_card_right_left">
                <p>2023-01-04</p>
                <span>13:15</span>
              </div>
              <div className="kirim_card_right_left">
                <Link to={`/mohvossin`}>
                  <img src={l1} />
                </Link>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div>
              <span>Dori: 4</span>
            </div>
            <div>
              <span>Vitamin: 4</span>
            </div>
          </div>
        </div>
      </div>
              </div>
            </div>
          </div>
          <div className="prihod_block_inner">
            <div className="kirim_right_inner_top">
              <h4>{t("input.kr")}</h4>
              <Button variant="contained" startIcon={<CloseIcon />}>
                {t("input.yop")}
              </Button>
            </div>
            <div className="kirim_right_inner_bottom">
              <div className="kirim_right_inner_bottom_top">
                <button>{t("input.v1")}</button>
                <button>{t("input.d1")}</button>
                <button>{t("input.fayl")}</button>
              </div>
              <div className="kirim_right_inner_bottom_bottom">
                <TableContainer
                  style={{ borderRadius: "12px" }}
                  component={Paper}
                >
                  <Table
                    style={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Dori nomi</TableCell>
                        <TableCell align="center">
                          {t("input.ser")}
                        </TableCell>
                        <TableCell align="center">{t("bildirishnoma.single.miqdori")}</TableCell>
                        <TableCell align="center">Omborxonada</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Fragment key={1}>
                        <TableRow>
                          <TableCell align="center">Dori A</TableCell>
                          <TableCell align="center">xxxxxxx</TableCell>
                          <TableCell align="center">1</TableCell>
                          <TableCell align="center">+ 1 &#10132; 1</TableCell>
                        </TableRow> 
                      </Fragment>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Mohvos;
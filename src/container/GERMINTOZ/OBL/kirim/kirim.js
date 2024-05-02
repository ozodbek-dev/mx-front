import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import DescriptionIcon from "@mui/icons-material/Description";
import './kirim.scss'
import {useTranslation} from 'react-i18next';
import Kirimcard from '../../../../components/component/RMO/kirimcard/kirimcard';
import Chiqimcard from '../../../../components/component/RMO/chiqim/chiqim';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from 'react-router-dom';
import {Fragment} from 'react';

const Prihod = () => {
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
            <Link to="/rmosklad">
              <Button startIcon={<ArrowBackIcon />} variant="contained">
              {t("bildirishnoma.single.ortga")}
              </Button>
            </Link>
            <h4 className="monitoring_top_inner_title">
              {t("input.a1")}
            </h4>
          </div>
          <div className="excel_bl">
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
                <Kirimcard classes={classes} />
                <Kirimcard classes={classes} />
                <Chiqimcard classes={classes} />
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
    );
}
 
export default Prihod;
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useTranslation} from "react-i18next";
import l1 from "../../../../../assets/icon/l1.svg";
import "./uzsklad.scss";

function Uzsklad() {

  const {t} = useTranslation();
    
  return (
    <>
      <div style={{
        marginTop:"34px",
        marginRight:"20px",
        marginLeft:"20px"
      }}  >
        <Link to={"/"}>
              <Button style={{marginTop:"24px",marginBottom:"24px",backgroundColor:"#DDEBFB",borderRadius:"12px",color:"#1464C0"}} startIcon={<ArrowBackIcon />} variant="contained">
              {t("bildirishnoma.single.ortga")}
              </Button>
          </Link>
        {/* {mid && 
        <Modalsklad />
        } */}
        <TableContainer component={Paper}>
          <Table
            className="modal-m1"
            style={{ minWidth: 650, padding:'20px',borderRadius:"12px" }} 
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
              <TableCell align="left">  
                  {t("bildirishnoma.single.soni")}
                </TableCell>
                <TableCell>
                  Dori nomi
                </TableCell>
                <TableCell align="left">
                    {t("bildirishnoma.kirim")}
                </TableCell>
                <TableCell align="left"> 
                    {t("bildirishnoma.chiqim")}
                </TableCell>
                <TableCell align="left">
                    {t("bildirishnoma.qoldiq")}
                </TableCell>
                <TableCell align="left">
                    {t("shifokor.kont")}
                </TableCell>
                <TableCell align="left">
                    {t("bildirishnoma.harakat")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
              <TableCell align="left">
                    1
                </TableCell>
                <TableCell>
                    Laoreet orci
                </TableCell>
                <TableCell align="left">
                    1
                </TableCell>
                <TableCell align="left"> 
                    1
                </TableCell>
                <TableCell align="left">
                    1
                </TableCell>
                <TableCell align="left">
                    1
                </TableCell>
                <TableCell align="left">
                    <img src={l1}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default Uzsklad;
import {
    Button,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import l1 from "../../../../../assets/icon/l1.svg";
import {useTranslation} from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from "@mui/icons-material/Description";
import {useState} from "react";
// import { CSVLink } from "react-csv";
// import Uzbilmodal from "./uzbilmodal/uzbilmodal";
import {Link} from "react-router-dom";

const Uzariza = () =>{
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const {t} = useTranslation()
    return(
        <div style={{marginTop:"28px",padding:"20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"24px"}}>
            <div style={{display:"flex",alignItems:"center"}}>
                <h2>{t("sidebar.li6")}</h2>
                <TextField
                    className='search-ariza' 
                    //   onChange={ change} 
                    placeholder={t("input.qidir")}
                    style={{marginLeft:"40px"}}
                    id="standard-basic"
                    variant="outlined"
                    InputProps={{
                        startAdornment: ( 
                        <InputAdornment style={{position:"absolute",right:"18px"}} >
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    />
            </div>
        <div className="green_block">
          <Button
          style={{backgroundColor:"#18CF6C",marginLeft:"20px"}}
            variant="contained"
            // color="primary"
            size="large"
            startIcon={<DescriptionIcon />}
          >
              {t("bola.excel")}
            {/* <CSVLink  className="excel_download"> */}
            {/* </CSVLink> */}
          </Button>
        </div>
        </div>
        
        <TableContainer className="table-not" component={Paper}>
                <Table   aria-label="customized table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "white" }}>
                            <TableCell>
                                {t("bildirishnoma.single.soni")}
                            </TableCell> 
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                {t("bildirishnoma.direktorism")}
                            </TableCell>
                            <TableCell>
                                {t("bildirishnoma.single.kimdan")}
                            </TableCell>
                            <TableCell>
                                {t("bildirishnoma.sana")}
                            </TableCell>
                            <TableCell>
                                {t("bildirishnoma.status")}
                            </TableCell>
                            <TableCell>
                                {t("bildirishnoma.harakat")}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                1
                            </TableCell> 
                            <TableCell>
                                1231412
                            </TableCell> 
                            <TableCell>
                                U.R.Akmalovich
                            </TableCell> 
                            <TableCell>
                                {t("sog")}
                            </TableCell> 
                            <TableCell>
                                04.01.2023
                            </TableCell> 
                            <TableCell
                            style={{
                            fontWeight: "bold",
                            }}
                        >
                            <button className={"status_btn"}>Yangi</button>
                        </TableCell>
                            <TableCell>
                                <Link to={"/uzarizasin"}>
                                    <img src={l1} />
                                </Link>
                            </TableCell> 
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                2
                            </TableCell> 
                            <TableCell>
                                1231412
                            </TableCell> 
                            <TableCell>
                                U.R.Akmalovich
                            </TableCell> 
                            <TableCell>
                                {t("sog")}
                            </TableCell> 
                            <TableCell>
                                04.01.2023
                            </TableCell> 
                            <TableCell
                            style={{
                            fontWeight: "bold",
                            }}
                        >
                            <button className={"status_btn"}>Yangi</button>
                        </TableCell>
                            <TableCell>
                                <Link to={"/uzarizasin"}>
                                    <img src={l1} />
                                </Link>
                            </TableCell> 
                        </TableRow>
                    </TableBody>
                    </Table>
        </TableContainer>
    </div>
    )
}
export default Uzariza;
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Box,
    Button,
    Modal,
    Paper,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {request} from "../../../../../api/request";
import {Link} from "react-router-dom";
import l1 from "../../../../../assets/icon/l1.svg";
import {Contextvalue} from "../../../../../context/context";

const Arizamodal = () =>{
    const [open, setOpen] = useState(false);
    const [bola,setBola] = useState([]);
    const {setBil} = useContext(Contextvalue)
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };
    const token = window.localStorage.token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      }; 
      useEffect(() =>{
        request
        .get("/bildirishnoma/muassasa/",config)
        .then(data => setBola(data.data.data))
    },[])
    const Click = (e) => {
        const formData = new FormData();
        formData.append("bildirishnoma",e.target.id)
        request
        .post("/ariza/lpu/bildirishnomatoariza/",formData,config)
        .then(data => setBil(data.data))
    }
    return(
        <>
            {/* <Link to={"/addariza"}> */}
            <Button
            
             onClick={() => setOpen(true)}
              variant="contained"
              startIcon={<AddIcon />}
            >
                {t("input.ar")}
            </Button>
            <Modal
            keepMounted
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
            <Box className="modal-one"   sx={{ ...style, width: 500 }} >
            <Button
                style={{
                marginBottom: "14px",
                marginLeft: "-25px",
                }}
                variant="text"
                onClick={() => setOpen(false)}
            >
                <SvgIcon component={ArrowBackIcon} inheritViewBox />
            </Button>
                <TableContainer component={Paper} style={{overflowY:"scroll"}} >
                    <Table  aria-label="customized table">
                            <TableHead>
                                      <TableRow>
                                                <TableCell>
                                                        {t("bildirishnoma.single.soni")}
                                                </TableCell>
                                                <TableCell>
                                                        ID
                                                </TableCell>
                                                <TableCell>
                                                        {t("bildirishnoma.send")}
                                                </TableCell>
                                                <TableCell>
                                                        {t("bildirishnoma.sana")}
                                                </TableCell>
                                                <TableCell>
                                                        {t("bildirishnoma.oz")}
                                                </TableCell>
                                               
                                        </TableRow>                              
                            </TableHead>
                            <TableBody>
                                {
                                    bola.map((el,index) => {
                                        return(
                                            <>
                                                <TableRow   >
                                                        <TableCell>
                                                            {index+1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {el.id} 
                                                        </TableCell>
                                                        <TableCell>
                                                            {el.kimga}
                                                        </TableCell>
                                                        <TableCell>
                                                            {el.sana}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link onClick={Click}   to = {
                                                                `/addariza/${el.id}`
                                                            }
                                                            className = "single_info" >
                                                                <img style={{width:"40%"}} id ={el.id} className="delete_icon" src={l1} alt="batafsil" />
                                                            </Link>
                                                        </TableCell>
                                                </TableRow>                              
                                            </>
                                        )
                                    })
                                }
                            </TableBody>
                    </Table>
                </TableContainer>
            </Box>
          </Modal>
        </>
    )
}
export default Arizamodal;
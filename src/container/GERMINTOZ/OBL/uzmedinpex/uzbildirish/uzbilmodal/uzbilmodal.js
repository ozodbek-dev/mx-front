import AddIcon from "@mui/icons-material/Add";
import {Box, Button, Modal, SvgIcon} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useState} from "react";
import {Link} from "react-router-dom";

const Uzbilmodal =  () =>{

    const [open,setOpen] = useState(false);
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
    const uzb = localStorage.getItem("uzb")
    return(
        <>
             <Button onClick={() => setOpen(true)} startIcon={<AddIcon/>} variant="contained">{t("bildirishnoma.add")}</Button>
             <Modal
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                >
                    <Box  className="modal-one"  sx={{ ...style, width: 590, }}>
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
                        <h2 className="card-block__head" >{t("input.bildir")}</h2>
                            <Link to={uzb?"/uzerkin":"/mohcreaterkin"}>
                                <Button style={{backgroundColor:"#DDEBFB",color:"#1464C0"}} variant="contained">
                                    {t("vosita.erkin")}
                                </Button>
                            </Link>
                            <Link to={uzb?"/uzsinglebil":"/mohcreatbol"}>
                                <Button style={{width:"353px",marginLeft:"32px"}}  variant="contained">
                                    {t("vosita.bola")}
                                </Button>
                            </Link>
                    </Box>
                </Modal>
        </>
    )
}
export default Uzbilmodal;
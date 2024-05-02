import {Box, Button, Modal, SvgIcon, TextField} from "@mui/material";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import {useState} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from '@mui/icons-material/Clear';

const KirimModal = () =>{
const [open,setOpen] = useState(false);
const [popone, setPopone] = useState(false);
const handleClose = () => {
    setOpen(true);
    setPopone(false);
  };
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

  function byurt(e) {
    e.preventDefault()
    setOpen(false);
    setPopone(true);
  }
    return(
        <>
        <Button onClick={() => setOpen(true)} style={{marginRight:"20px"}} startIcon={<CallReceivedIcon />} variant="contained">
                {t("input.qil")}
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
          <h4 className="prihod_block_inner_title">{t("input.qil")}</h4>
          <form onSubmit={byurt}>
          <TextField
            style={{
              width: "437px",
              marginBottom: "20px",
            }}
            id="outlined-basic"
            label={t("input.nomer")}
            variant="outlined"
            type="number"
            required
          />
          <Button type="submit" style={{width:"100%",borderRadius:"12px",backgroundColor:"#1464C0"}} variant={"contained"}>{t("bildirishnoma.jonat")}</Button>
          </form>
        </Box>
        </Modal>
        <Modal
        keepMounted
        open={popone}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-one"  sx={{ ...style, width: 500, }}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <Button
              style={{
                marginBottom: "14px",
                marginLeft: "-25px",
              }}
              variant="text"
              onClick={handleClose}
            >
              <SvgIcon component={ArrowBackIcon} inheritViewBox />
              </Button>
              <h2 className="kirm-head">Buyurtma bo'yicha vositalarni tanlang</h2>
            </div>
              <Button
              style={{
                marginBottom: "14px",
                marginLeft: "-25px",
              }}
              variant="text"
              onClick={() => setPopone(false)}
            >
              <SvgIcon component={ClearIcon} inheritViewBox />
              </Button>
          </div>
            <ul className={"site-list site-list--create"}>
              {/* {
                 create.map((el,index) => {

                  return(
                    <div className="site-list__div">
                    <li>#{index+1}</li>
                    <li style={{marginTop:"10px",marginBottom:"14px"}}>
                      <button style={{border:"none",backgroundColor:"transparent"}} onClick={del}>
                            <img  src={l3} id={el.id}/>
                          </button>
                          <button style={{border:"none",backgroundColor:"transparent"}} onClick={edit}>
                              <img src={l2} id={el.id}/>
                          </button>
                    </li>
                    <li className="site-list__item">N
                     Nomi: {el.nomi}
                    </li>
                    <li className="site-list__item">
                     {t("input.turi")}:  {
                        el.turi === "Igna"&&
                        "Igna Arterial"
                      }
                      {
                        el.turi === "Igna2" &&
                        "Igna Venoz"
                      }
                        {!el.turi.includes("Igna") && el.turi}
                    </li>
                    <li className="site-list__item">
                      O'lchov Birligi:  {el.olchov_birligi}
                    </li>
                    <li className="site-list__item">
                      Miqdori: {el.miqdori}
                    </li>
                    
                    </div>
                  )
                })
              } */}
            </ul>
          <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-around"
          }}>
                {/* <Button 
                // onClick={() => setPoptwo(true)}
                startIcon={<AddIcon />}
                style={{
                    border:"none",
                }}
                variant="outlined">Dori qo’shish</Button>
                  <Button 
                startIcon={<AddIcon />}
                style={{
                    border:"none",
                }}
                variant="outlined">Vitamin qo’shish</Button> */}
            </div> 
         <Button
        //  onClick={Save}
         style={{
          width:"100%",
          marginTop:"20px"
         }}
          variant="contained">
              {t("bildirishnoma.kirim")}
         </Button>
        </Box> 
    </Modal> 
        </>
    )
}
export default KirimModal;
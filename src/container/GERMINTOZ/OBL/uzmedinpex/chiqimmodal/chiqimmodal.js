import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SvgIcon, TextField} from "@mui/material";
import {useState} from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from "@mui/icons-material/Add";
import "./chiqim.scss";
import {Link} from "react-router-dom";

function Chiqimmodal(){
    const [open,setOpen] = useState(false);
    const [popone, setPopone] = useState(false);
    const [poptwo, setPoptwo] = useState(false);
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
      const countune = e =>{
        e.preventDefault();
        setOpen(false);
        setPopone(true)
      }
    return(
        <>
        <Button onClick={() => setOpen(true)} style={{marginRight:"20px",backgroundColor:"#F69641"}} startIcon={<ArrowOutwardIcon />} variant="contained">
                {t("input.chiq")}
              </Button>
                <Modal
                    keepMounted
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                        <Box className="modal-one"  sx={{ ...style, width: 500, }}>
                        <div>
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
                            <h2 className="kirm-head">{t("bildirishnoma.chiqim")}</h2>
                        </div>
                        <form onSubmit={countune}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("bildirishnoma.vlssv")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={current && current.turi}
                            label={t("bildirishnoma.single.nomiinput")}
                            required
                            >
                            <MenuItem value={"Viloyat sog'liqni saqlash boshqarmasi"}>Viloyat sog'liqni saqlash boshqarmasi</MenuItem>
                        </Select>
                        </FormControl>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("pdf.rmo")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={current && current.turi}
                            label={t("bildirishnoma.single.nomiinput")}
                            required
                            >
                            <MenuItem value={t("bildirishnoma.tuman")}>{t("bildirishnoma.tuman")}</MenuItem>
                        </Select>
                        </FormControl>
                            <Button
                            style={{
                                width:"100%",
                                borderRadius:"12px"
                            }}
                            type="submit"
                            variant="contained"
                            >
                                {t("vosita.davom")}
                            </Button>
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
              <h2 className="kirm-head">{t("bildirishnoma.chiqim")}</h2>
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
              <p className="chiqim-page">{t("bola.tan")} {t("bildirishnoma.vlssv")}: Toshkent </p> 
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} className="chiqim-page">{t("bola.tan")} TTB soni: 3  <Link className="chiqim-link" to={"/uzchiqim"}>{t("pdf.kor")}</Link>  </div> 
              
            {/* <ul className={"site-list site-list--create"}>
              {
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
              }
            </ul> */}
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
            <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-around",
            marginTop:"36px",
            borderTop: "1px solid #E7EBF2",
          }}>
                <Button 
                onClick={() => setPoptwo(true)}
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
                variant="outlined">Vitamin qo’shish</Button>
            </div> 
         <Button
        //  onClick={Save}
         style={{
          width:"100%",
          marginTop:"20px",
          borderRadius:"12px"
         }}
          variant="contained">
              {t("input.chiq")}
         </Button>
         </Box>
         </Modal>
         <Modal
        keepMounted
        open={poptwo}
        onClose={() => setPoptwo(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Button
            style={{
              marginBottom: "14px",
              marginLeft: "-25px",
            }}
            variant="text"
            onClick={() => setPoptwo(false)}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </Button>
          <h2 className="kirm-head">Dori qo’shilishi</h2>
          <form action="#" >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Dori nomi</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("bildirishnoma.single.nomiinput")}
                required
              >
                
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t("input.ser")}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("bildirishnoma.single.nomiinput")}
                required
              >
                {/* {arr.map((el, index) => {
                  if (el.category === turi)
                    return (
                      <MenuItem key={index} value={`${el.name}`}>
                        {el.name}
                      </MenuItem>
                    );
                })} */}
              </Select>
            </FormControl>
            <TextField
            style={{
              width: "437px",
              marginBottom: "20px",
            }}
            id="outlined-basic"
            label="{t("bildirishnoma.single.soni")}"
            variant="outlined"
            required
            type={"number"}
            // inputRef={miqRef}
          />
            <Button
              style={{
                display: "block",
              }}
              type="submit"
              variant="contained"
            >
              {t("bildirishnoma.jonat")}
            </Button>
          </form>
        </Box>
      </Modal>
        </>
    )
}
export default Chiqimmodal;
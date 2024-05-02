import {Button, FormControl, InputLabel, MenuItem, Modal, Select, SvgIcon, TextField} from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import {Fragment, useContext, useRef, useState} from "react";
import {Box} from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from '@mui/icons-material/Clear';
import l2 from "../../assets/icon/l2.svg";
import l3 from "../../assets/icon/l3.svg";
import {useTranslation} from "react-i18next";
import "./modal.scss";
import {Contextvalue} from "../../context/context";
import {request} from "../../api/request";

function Modalsklad() {
  const { t } = useTranslation();
  const { setParval,id } =
    useContext(Contextvalue);
  const [open, setOpen] = useState(false);
  const [popone, setPopone] = useState(false);
  const [poptwo, setPoptwo] = useState(false);
  const [popthree,setPopthree] = useState(false)
  const [name, setName] = useState("");
  const [edituri,setEdituri] = useState("")
  const [ediname,setEdiname] = useState("")
  const [current,setCurrent] = useState()
  const [editid,setEditid]= useState()
  const [turi, setTuri] = useState("");
  const [create,setCreate] = useState([])
  const parRef = useRef();
  const miqRef = useRef()
  const edmiq = useRef()
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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

   const arr = [
    {
      category: "Filtr",
      name: "Юқори оқимли Диализаторлар 1,4-1,6м2 High Flux Series Hollow Fiber Dialyzers F15",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Юқори оқимли Диализаторлар 1,7-1,8м2 High Flux Series Hollow Fiber Dialyzers F18",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Юқори оқимли Диализаторлар 1,9-2,2м2  High Flux Series Hollow Fiber Dialyzers F19",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,0-1,2м2 Low Flux Series Hollow Fiber Dialyzers F12",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,3-1,4м2 Low Flux Series Hollow Fiber Dialyzers F14",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,5-1,6м2 Low Flux Series Hollow Fiber Dialyzers F15",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,8-1,9м2 Low Flux Series Hollow Fiber Dialyzers F18",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 2,0-2,2м2 Low Flux Series Hollow Fiber Dialyzers F20",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 0,6-0,8м2 Hemoflow F4HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,0-1,2 м² Hemoflow F5HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,3-1,4 м²  Hemoflow F6HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,5-1,6 м² Hemoflow F7HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,8-1,9 м² Hemoflow F8HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 2,0-2,2 м²  Hemoflow F10HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 0,2-0,5м2 FX-PAED",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Болалар диализатори",
      size: "dona",
    },
    {
      category: "Magistral",
      name: "Унверсал магистрал (кат)",
      size: "dona",
    },
    {
      category: "Magistral",
      name: "Қон ўтказувчи магистрал AV-Set FMS PAED-R",
      size: "dona",
    },
    {
      category: "Igna",
      name: "Артериал фистулали ниналар 16G ",
      size: "dona",
    },
    {
      category: "Igna",
      name: "Артериал фистулали игнала FistulaNeedle Art17G",
      size: "dona",
    },
    {
      category: "Igna2",
      name: "Венозли  фистулали ниналар 16G",
      size: "dona",
    },
    {
      category: "Igna2",
      name: "Венозли  фистулали игнала FistulaNeedle Art17G",
      size: "dona",
    },
    {
      category: "Katetr",
      name: "  Икки тирқишли катетер. ZDD 11F20",
      size: "dona",
    },
    {
      category: "Katetr",
      name: "Икки тирқишли катетер. ZDD 12F20",
      size: "dona",
    },
    {
      category: "Katetr",
      name: " Икки тирқишли катетер.ZDD 8 F15",
      size: "dona",
    },
    {
      category: "Katetr",
      name: "Икки тирқишли катетер. ZDD 6,5 F12",
      size: "dona",
    },
    {
      category: "Tuz",
      name: "Таблеткали туз",
      size: "qop",
    },
    {
      category: "Konsentrat",
      name: "Кислотали концентрат",
      size: "quti",
    },
    {
      category: "Konsentrat",
      name: "Бикорбанат концентрат",
      size: "quti",
    },
    {
      category: "Dezinfiktant",
      name: "Лимон кислатаси 50%",
      size: "kanistr",
    },
    {
      category: "Dezinfiktant",
      name: "Цитростерил",
      size: "kanistr",
    },
  ];
  
const data = arr.filter(el => el.category.includes(turi))
  
  function submitpar(e) {
    e.preventDefault();
    setParval(parRef.current.value);
    setOpen(false);
    setPopone(true);
  }
  function submitmah(e) {
    e.preventDefault();
    formData.append("partiya_id",id);
    formData.append("nomi", name);
    formData.append("olchov_birligi", data[0].size);
    formData.append("turi", turi);
    formData.append("miqdori", miqRef.current.value);
    request.post("/omborxona/mahsulot/create/", formData).then((data) => setCreate(data.data.data.partiya))
    setPoptwo(false);
    setPopone(true);
  }
  function del (e) {
      formData.append("mahsulot_id",e.target.id)
      request
      .post("/omborxona/mahsulot/delete/",formData)
      const data = create.filter(el => +el.id !== +e.target.id)
      setCreate(data)
  }

 function edit(e){
  setPopthree(true)
  let current = create.find(el => el.id == e.target.id)
  setCurrent(current)
  setEditid(e.target.id)
 } 
function editSub(e){
  e.preventDefault()
  formData.append("mahsulot_id",editid);
  formData.append("nomi",ediname);
  formData.append("turi",edituri);
  formData.append("miqdori",edmiq.current.value);
  formData.append("olchov_birligi", data[0].size);
  request
  .post('/omborxona/mahsulot/update/',formData)
  .then(data => console.log(data,"edite"))
  let current = create.find(el => el.id == editid)
  let currentIndex = create.findIndex(el => el.id == editid)
  let obj = {
    id:Math.floor(Math.random())*100,
    nomi:ediname,
    turi:edituri,
    miqdori:edmiq.current.value,
    olchov_birligi:data[0].size
  }
  current = {...obj}
  create[currentIndex] = {...current}
  setCreate(create)
  setPopthree(false)
}

const token = localStorage.getItem("token")
const formData = new FormData()
formData.append("token",token)
 function Save (){
  formData.append("partiya_id",id)
    request
    .post("/omborxona/add/", formData)
    .then((data) => console.log(data, "save"));
    window.location.reload();
    setPopone(false);
 }

 
     console.log(current);
  return ( 
    <> 
      <Button
        style={{
          display:"flex",
          marginTop:"20px",
          marginBottom: "19px",
          marginLeft:"auto",
          borderRadius:"12px",
          backgroundColor:"#1464C0"
        }}
        onClick={handleOpen}
        variant={"contained"}
        startIcon={<AddIcon />}
      >
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
          <h2 className="kirm-head">{t("input.qil")}</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <form action="#" method="post" onSubmit={submitpar}>
              <TextField
                style={{
                  width: "398px",
                  marginBottom: "20px",
                }}
                id="outlined-basic"
                label={t("vosita.partiys")}
                variant="outlined"
                required
                type={"number"}
                inputRef={parRef}
              />
              <Button
                style={{
                  display: "block",
                  borderRadius:"12px",
                  width:"100%",
                }}
                type="submit"
                variant="contained"
              >
                {t("bildirishnoma.jonat")}
              </Button>
            </form>
          </div>
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
              <h2 className="kirm-head">{t("input.qil")}</h2>
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
                     {t("bildirishnoma.single.nomiinput")}: {el.nomi}
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
                      {t("sbola.olchov")}:  {el.olchov_birligi}
                    </li>
                    <li className="site-list__item">
                    {t("bildirishnoma.single.miqdori")}: {el.miqdori}
                    </li>
                    
                    </div>
                  )
                })
              }
            </ul>
          <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-around"
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
         onClick={Save}
         style={{
          width:"100%",
          marginTop:"20px"
         }}
          variant="contained">
              {t("bildirishnoma.kirim")}
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
          <form action="#" onSubmit={submitmah}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Dori nomi</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={turi}
                label={t("bildirishnoma.single.nomiinput")}
                required
                onChange={(e) => setTuri(e.target.value)}
              >
                <MenuItem value={"Filtr"}>Filtr</MenuItem>
                <MenuItem value={"Magistral"}>Magistral</MenuItem>
                <MenuItem value={"Igna"}>Igna Arterial</MenuItem>
                <MenuItem value={"Igna2"}>Igna Venoz</MenuItem>
                <MenuItem value={"Katetr"}>Kateter</MenuItem>
                <MenuItem value={"Tuz"}>Tuz</MenuItem>
                <MenuItem value={"Konsentrat"}>Konsentrat</MenuItem>
                <MenuItem value={"Dezinfiktant"}>Dezinfiktant</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t("input.ser")}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                label={t("bildirishnoma.single.nomiinput")}
                required
                onChange={handleChange}
              >
                {arr.map((el, index) => {
                  if (el.category === turi)
                    return (
                      <MenuItem key={index} value={`${el.name}`}>
                        {el.name}
                      </MenuItem>
                    );
                })}
              </Select>
            </FormControl>
            <TextField
            style={{
              width: "437px",
              marginBottom: "20px",
            }}
            id="outlined-basic"
            label={t("bildirishnoma.single.soni")}
            variant="outlined"
            required
            type={"number"}
            inputRef={miqRef}
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

      <Modal
        keepMounted
        open={popthree}
        onClose={() => setPopthree(false)}
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
            onClick={() => setPopthree(false)}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </Button>
          <form action="#" onSubmit={editSub}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t("input.turi")}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={current && current.turi}
                label={t("bildirishnoma.single.nomiinput")}
                required
                onChange={(e) => setEdituri(e.target.value)}
              >
                <MenuItem value={"Filtr"}>Filtr</MenuItem>
                <MenuItem value={"Magistral"}>Magistral</MenuItem>
                <MenuItem value={"Igna"}>Igna Arterial</MenuItem>
                <MenuItem value={"Igna2"}>Igna Venoz</MenuItem>
                <MenuItem value={"Katetr"}>Kateter</MenuItem>
                <MenuItem value={"Tuz"}>Tuz</MenuItem>
                <MenuItem value={"Konsentrat"}>Konsentrat</MenuItem>
                <MenuItem value={"Dezinfiktant"}>Dezinfiktant</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t("bildirishnoma.single.nomiinput")}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={current && current.nomi}
                label={t("bildirishnoma.single.nomiinput")}
                required
                onChange={(e) => setEdiname(e.target.value)}
              >
                {arr.map((el, index) => {
                  if (el.category === edituri)
                    return (
                      <MenuItem key={index} value={`${el.name}`}>
                        {el.name}
                      </MenuItem>
                    );
                })}
              </Select>
            </FormControl>
            <TextField
            style={{
              width: "437px",
              marginBottom: "20px",
            }}
            id="outlined-basic"
            label={t("bildirishnoma.single.miqdori")}
            variant="outlined"
            required
            type={"number"}
            // value={current && current.miqdori}
            inputRef={edmiq}
          />
            <Button
              style={{
                display: "block",
              }}
              type="submit"
              variant="contained"
            >
              O'zgartirish
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
export default Modalsklad
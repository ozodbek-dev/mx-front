import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SvgIcon, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {request} from "../../../../api/request";

function Mmodal (){
  const { t } = useTranslation();
    const tuzRef = useRef()
    const dezRef = useRef()
    const kanRef = useRef()
    const [open, setOpen] = useState(false);
    const [tuz,setTuz] = useState();
    const [dez,setDez] = useState();
    const [kan,setKan] = useState();
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    
      
    const arr = [
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
    ]  
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
    
    const Salo = arr.filter(el => el.category.includes(tuz) && el.size)  
    const Dezo = arr.filter(el => el.category.includes(dez) && el.size)  
    const Kano = arr.filter(el => el.category.includes(kan) && el.size)  
    const token = localStorage.getItem("token")  
    const formData = new FormData()
    formData.append("token",token)
    function Submit (e){
        e.preventDefault()
       for(let [key,val] of Object.entries({
           tuz_nomi:tuz ? tuz:"",
           tuz_miqdori:tuzRef.current.value?tuzRef.current.value:0,
           tuz_olchov_birligi:Salo[0] ? Salo[0].size:"",
           dezinfiktant_nomi:dez?dez:"",
           dezinfiktant_miqdori:dezRef.current.value?dezRef.current.value:0,
           dezinfiktant_olchov_birligi:Dezo[0] ? Dezo[0].size:"",
           konsentrat_nomi:kan?kan:"",
           konsentrat_miqdori:kanRef.current.value?kanRef.current.value:0,
           konsentrat_olchov_birligi:Kano[0] ? Kano[0].size:"",
       })){
           formData.append(key,val)
       }        
        request
        .post("/omborxona/sarflov/",formData)
        .then(data => console.log(data))
        window.location.reload() 
    }
    return(
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
      >
        {t("input.chiq")}
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box  sx={{ ...style,width: 500 }}>
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
              <form onSubmit={Submit} style={{
                display:"flex",
                flexDirection:"column"
              }}>
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tuz Turi</InputLabel>
              <Select
                className="grow"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tuz}
                label="Tuz Turi"
                onChange={(e) => setTuz(e.target.value)}
              >
                {
                    //eslint-disable-next-line
                    arr.map(el => {
                        if (el.category === "Tuz")
                        return(<MenuItem value={el.name}>{el.name}</MenuItem>)
                    })
                }
                </Select>
                </FormControl>
                <TextField
                style={{
                    marginBottom:"24px"
                }}
                className="grow"
                id="outlined-basic"
                label="Tuz miqdori"
                variant="outlined"
                type={"number"}
                inputRef={tuzRef}
                />

                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Dezinfiktant Turi</InputLabel>
              <Select
                className="grow"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dez}
                label="Dezinfiktant Turi"
                onChange={(e) => setDez(e.target.value)}
              >
                {
                    //eslint-disable-next-line
                    arr?.map(el =>{
                        if (el.category === "Dezinfiktant")
                        return(<MenuItem value={el.name}>{el.name}</MenuItem>)
                    })
                }    
                </Select>
                </FormControl>
                <TextField
                style={{
                    marginBottom:"14px"
                }}
                className="grow"
                id="outlined-basic"
                label="Dezinfiktant miqdori"
                variant="outlined"
                type={"number"}
                inputRef={dezRef}
                    />
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Konsentrat Turi</InputLabel>
              <Select
                className="grow"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kan}
                label="Konsentrat Turi"
                onChange={(e) => setKan(e.target.value)}
              >
                {
                    //eslint-disable-next-line
                    arr?.map(el =>{ 
                        if (el.category === "Konsentrat")
                        return(<MenuItem value={el.name}>{el.name}</MenuItem>)
                    })
                }    
                </Select>
                </FormControl>
                <TextField
                className="grow"
                id="outlined-basic"
                label="Konsentrat miqdori"
                variant="outlined"
                type={"number"}
                inputRef={kanRef}
                    />
                   
                    <Button type="submit" style={{marginTop:"16px"}} variant="contained">
                        {t("bildirishnoma.chiqim")}
                    </Button>
              </form>
            </Box>
      </Modal>
        </>
    )
}
export default Mmodal;
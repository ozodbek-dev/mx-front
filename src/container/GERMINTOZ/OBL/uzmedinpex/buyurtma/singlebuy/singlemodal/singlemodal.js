import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SvgIcon,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pdfDoc from "../../../../../../../assets/icon/pdf_doc.svg";
import CloseIcon from "@mui/icons-material/Close";
import scrip from "../../../../../../../assets/icon/scripka.svg";
import {useState} from "react";

function Singlemodal(){
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
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
      const [arr, setArr] = useState([]);
    function File(e) {
        setArr([
          ...arr,
          {
            filename: e.target.value,
          },
        ]);
      }
      function delFile(index) {
        let sss = [];
        sss.push(...arr);
        sss.splice(index, 1);
        setArr(sss);
    }
    console.log(arr,"arr");
      const Subvos = (e) =>{
        e.preventDefault();
        setOpen(false)
      }
    return(
        <>
        <Button onClick={() => setOpen(true)} startIcon={<AddIcon/>} variant="contained">{t("vosita.vositaqosh")}</Button>
        <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
                >
             <Box  className="modal-one"  sx={{ ...style, width: 500, }}>
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
                    <h2 className="kirm-head">{t("vosita.vositaqosh")}</h2>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider',marginBottom:"28px" }}>
                        <Tabs style={{backgroundColor:"#fff"}} value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={t("input.m1")}  />
                        <Tab label={t("input.fayl")}  />
                        </Tabs>
                    </Box>
                    <form  method="post" onSubmit={Subvos} >
                        <section className={value === 1 && "visually-hidden"}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{t("vosita.vositaturi")}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                required
                            >   
                                    <MenuItem value={"a1"}>a1</MenuItem>
                            </Select>
                            </FormControl>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{t("bildirishnoma.single.nomi")}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                required
                            >   
                                    <MenuItem value={"a1"}>a1</MenuItem>
                            </Select>
                            </FormControl>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Seriyasi</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                required
                            >   
                                    <MenuItem value={"c213"}>c213</MenuItem>
                            </Select>
                            </FormControl>
                            <div style={{display:"flex",alignItems:"center",}}>
                            <TextField
                                className="card-date--1"
                                style={{
                                width: "100%",
                                marginBottom: "46px",
                                }}
                                id="outlined-basic"
                                variant="outlined"
                                type="date"
                                required
                            />
                            <TextField
                                className="card-date--2"
                                style={{
                                width: "100%",
                                marginBottom: "46px",
                                marginLeft:"20px"
                                }}
                                id="outlined-basic"
                                variant="outlined"
                                type="date"
                                required
                            />
                            </div>
                            <div style={{display:"flex",alignItems:"center",}}>
                            <TextField
                                style={{
                                width: "100%",
                                marginBottom: "46px",
                                }}
                                id="outlined-basic"
                                label={t("sbola.olchov")}
                                variant="outlined"
                                required
                            />
                            <TextField
                                style={{
                                width: "100%",
                                marginBottom: "46px",
                                marginLeft:"20px"
                                }}
                                id="outlined-basic"
                                variant="outlined"
                                label={t("bildirishnoma.single.miqdori")}
                                type="number"
                                required
                            />
                            </div>
                            <TextField
                                style={{
                                width: "100%",
                                marginBottom: "46px",
                                }}
                                id="outlined-basic"
                                variant="outlined"
                                label={t("vosita.b1")}
                                type="number"
                                required
                            />
                            <TextField
                                style={{
                                width: "100%",
                                marginBottom: "46px",
                                }}
                                id="outlined-basic"
                                variant="outlined"
                                label={t("vosita.b2")}
                                required
                            />
                        </section>
                        <section className={value === 0 && "visually-hidden"} >
                                <div style={arr[0] && {display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                <h4 className="sarflov_block_title">{t("bildirishnoma.new.fail")}</h4>
                                <label className={arr[0]?"fix-btn":"input_tyle_download fix-file"} id="f1">
                                <input onChange={File} className="visually-hidden" id="f1" type="file"/>
                                <img className={arr[0] && "visually-hidden"} style={{display:"block",margin:"0 auto",marginBottom:"14px"}} src={scrip} />
                                    {
                                      !arr[0] ? t("bildirishnoma.new.failinf"):t("vosita.qosh")
                                    }
                                </label>
                                </div>
                                {
                                    arr[0] &&
                                <div className="sarflov_block_inner_div">
                                {arr.map((item, index) => (
                                    arr.length  > 0 ? 
                                    <div key={index} className="sarflov_block_download_file">
                                    <label className="input_tyle_download">
                                        <img src={pdfDoc} alt="" className="label_img" />
                                        {item.filename}
                                        <div className="close_file">
                                        <Button
                                        onClick={(e) => delFile(index)}
                                        startIcon={<CloseIcon/>}></Button>
                                        </div>
                                    </label>
                                    </div> : null
                                ))}
                                </div>
                                }
                        </section>
                    <Button style={{width:"100%",marginTop:"20px",backgroundColor:"#1464C0",borderRadius:"12px"}} startIcon={<AddIcon/>} variant="contained" type="submit">{t("vosita.vositaqosh")}</Button>
                    </form>
                </Box>
        </Modal>
        </>
    )
}
export default Singlemodal;
import {
    Button,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {useTranslation} from "react-i18next";
import {request} from "../../../../../api/request";
import SendIcon from '@mui/icons-material/Send';
import "./saveariza.scss";
import {Contextvalue} from "../../../../../context/context";

const Saveariza = () => {
  
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
    };
    const [age, setAge] = useState("");
    const [pass, setPass] = useState();
    const [num, setNum] = useState({
      from: 0,
      to: 0,
    });
    const [numarr, setNumarr] = useState([]);
  
    function numAdd() {
      setNumarr([...numarr, num]);
    }
    const File = (e) => {
      // setNames(true);
      setPass(e.target.files);
    };
    console.log('pass',pass)
  
    function numDel(e) {
      let delarr = [];
      delarr.push(...numarr);
      delarr.splice(e, 1);
      setNumarr(delarr);
    }
    console.log(numarr);
  
     const [person, setPerson] = useState([])
     const [shifokorlar, setShifokorlar] = useState([])
     const [delebemor, setDeleBemor] = useState({
       isFetched: false,
       data: {},
       error: null,
     })
  const token = window.localStorage.token
     const config = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     };
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const [loader, setLoeder] = useState(true);
   const { t } = useTranslation();
  
   const params = useParams();
  
    const {
      id
    } = useParams()
    const [value, setValue] = useState(0);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };
  const {bil} = useContext(Contextvalue)
  console.log(bil,"bil");
     useEffect(() => {
       request
       .get(`/ariza/lpu/${params.id}/`, config)
         .then(function (res) {
           setDeleBemor({
             isFetched: true,
             data: res.data,
             error: false,
           });
           console.log(res.data);
           console.log('res',res)
            setPerson(
              res.data.ariza
            );
            setLoeder(false);
           setShifokorlar(res.data)
         })
         .catch(function (err) {
           setDeleBemor({
             isFetched: false,
             data: [],
             error: err,
           });
         });
     }, [params.id]);
     const Status = () =>{
      const formdata = new FormData();
      formdata.append("ariza",person.id)
      formdata.append("status","Javob berilmadi")
      request
      .post("/ariza/lpu/changestatus/",formdata,config)
     }
     console.log(person, '123');
  
    return (
      <div className="rol_ariza">
  
        {/* <div className="rol_ariza_top">
          <Link  to = {
            "/arizalar"
          } >
            <Button variant="contained">{t("bildirishnoma.single.ortga")}</Button>
          </Link>
        </div> */}
        <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.status")}
           
          </h4>
            { 
           <div className="status_info" >
              <p className="status_info_title page-status" >
                  Yuborilmadi
            </p>
          </div> 
            }
        </div>
        <div className="rol_ariza_bottom">
          <div className="rol_ariza_bottom_top">
            <h4 className="rol_ariza_bottom_title">
              {t("bildirishnoma.single.iddata")}
            </h4>
            <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.id")}</p>
                <p className="info_single">{params.id}</p>
              </div>
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.data")}</p>
                <p className="info_single">{new Date(person.vaqti).getFullYear()}-{new Date(person.vaqti).getMonth()+1}-{new Date(person.vaqti).getDate()}</p>
              </div>
            </div>
          </div>
          <div className="rol_ariza_flex">
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.kimdan")}
                  </h4>
                  <div className="rol_ariza_bottom_div_t6">
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{t("bildirishnoma.single.kimdan")}</p>
                    </div>
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{person?.kimdan}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.kimga")}
                    
                  </h4>
                  <div className="rol_ariza_bottom_div_t6">
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{t("bildirishnoma.single.kimga")}</p>
                      <p>{t("bildirishnoma.single.inf")}</p>
                    </div>
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{person?.kimga}</p>
                      <p>{person?.qoshimcha}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rol_ariza_bottom_div_inner">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.vosita")}
          </h4>
          <div className="single_table_all_block">
            <p className="single_table_all_title">
             
            </p>
            <div className="single_table_all_block_inner">
            <Tabs style={{marginBottom:"20px",borderBottom:"1px solid"}} value={value} onChange={handleChanges} aria-label="basic tabs example">
                    <Tab label={t("bildirishnoma.single.vosi")}  />
                    <Tab label={t("bildirishnoma.single.bolalar")}/>
              </Tabs>
              <div className="single_table_all_block_bottom">
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.nomi")}
                        </TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.seriyasi")}
                        </TableCell>
  
                        <TableCell align="left">
                          {t("bildirishnoma.single.miqdori")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {
                      value === 0 &&
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">01</TableCell>
                        <TableCell align="left">Dori A</TableCell>
                        <TableCell align="left">AB123456789</TableCell>
                        <TableCell align="left">15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">01</TableCell>
                        <TableCell align="left">Dori A</TableCell>
                        <TableCell align="left">AB123456789</TableCell>
                        <TableCell align="left">15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">01</TableCell>
                        <TableCell align="left">Dori A</TableCell>
                        <TableCell align="left">AB123456789</TableCell>
                        <TableCell align="left">15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">01</TableCell>
                        <TableCell align="left">Dori A</TableCell>
                        <TableCell align="left">AB123456789</TableCell>
                        <TableCell align="left">15</TableCell>
                      </TableRow>
                    </TableBody>
                    }
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="single_table_document">
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.qoshimcha")}
                </h4>
                <div className="document_left_title_block">
                  <p className="document_left_title">
                   {person?.qoshimcha}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.fayl")}
                </h4>
                <div className="rol_ariza_bottom_div_t6">
                  <a href={`https://${person.fayl}`} className="download_document_t9">
                    <Button variant="contained" startIcon={<CloudDownloadIcon />}>
                      {t("input.yuklab")} 
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Button variant="contained">{t("bildirishnoma.single.qayta")}</Button>
        <Button variant="contained" style={{margin:'10px'}}>{t("bildirishnoma.single.korildi")}</Button> */}
         <footer className="site-footer">
            <div style={{textAlign:"center"}}>
            <Button
            onClick={Status}
            style={{width:"448px",borderRadius:"12px",backgrounColor:"#1464C0"}} 
            startIcon={<SendIcon/>}
            variant="contained" color="primary" size="large">
            {t("modalariza.arizayub")}
          </Button>
            </div>
          </footer>
      </div>
    );
  };
   
  export default Saveariza;
  
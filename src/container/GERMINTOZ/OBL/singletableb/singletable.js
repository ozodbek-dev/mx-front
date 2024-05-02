import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {useEffect, useState} from "react";
import "./singletable.scss";
import {Link, useParams} from "react-router-dom";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {useTranslation} from "react-i18next";
import {request} from "../../../../api/request";

const Rolarizasingleb = () => {

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


  
const [tab, setTab] = useState(false)
    

     const params = useParams();
     useEffect(() =>{
      request
      .get("/ariza/rmo/birlashtirish/", config)
      .then(data => setPerson(data.data.birlashtirilgan_arizalar.find(el => +el.id === +params.id)))
      
      
  },[params.id])
  

     
  console.log(person,'person99');
  // console.log(data["birlashtirilgan arizalar"],'person11');
  return (
   <div className="rol_ariza">

      <div className="rol_ariza_top">
        <Link  to = {
          "/arizalar"
        } >
          <Button variant="contained">{t("bildirishnoma.single.ortga")}</Button>
        </Link>
      </div>
      <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.status")}
         
        </h4>
          { 
        person?.status === "O'qildi" ? <div className="status_info" style={{background:"green"}}>
            <p className="status_info_title" style={{color:"white"}}>
            {/* {t("bildirishnoma.single.statusinf")} */}
             {
            person?.status
          }
          </p>
        </div> : <div className="status_info">
            <p className="status_info_title">
            {/* {t("bildirishnoma.single.statusinf")} */}
             {
            person?.status
          }
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
              <p className="info_single">{person?.id}</p>
            </div>
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.data")}</p>
              <p className="info_single">{person?.sana && person.sana}</p>
            </div>
          </div>
        </div>
        {/* <div className="rol_ariza_flex">
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.kimdan")}
                </h4>
                <div className="rol_ariza_bottom_div_t6">
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.direktor")}</p>
                    <p>{person?.kimdan}</p>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.muas")}</p>
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
                    <p>{person?.kimga}</p>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.inf")}</p>
                    <p>{person?.qoshimcha}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="rol_ariza_bottom_div_inner" style={{marginTop:'20px'}}>
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.vosita")}
        </h4>
        <div className="single_table_all_block">
          <p className="single_table_all_title">
            {t("bildirishnoma.single.vositainf")} A
          </p>
          <div className="single_table_all_block_inner">
            <div className="single_table_all_block_top">
              <button onClick={() => setTab(!tab)} style={tab === false ? {color:'#1464C0', borderBottom:'2px solid #1464C0'} :{color: 'black'}}>{t("bildirishnoma.single.vosi")}</button>
              <button onClick={() => setTab(!tab)} style={tab === true ? {color:'#1464C0', borderBottom:'2px solid #1464C0'} :{color: 'black'}}>{t("bildirishnoma.single.bolalar")}</button>
            </div>
            <div className="single_table_all_block_bottom">
              {
                tab === false ? 
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "white" }}>
                      <TableCell>{t("vosita.i")} ID</TableCell>
                      <TableCell align="left">
                      {t("vosita.vositaturi")}
                      </TableCell>
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
                  <TableBody>
                   {
                    person.vositalar &&  person.vositalar.length > 0 ? person?.vositalar && person?.vositalar.map((item,index) => (
                      <TableRow>
                      <TableCell align="left">{item.id}</TableCell>
                      <TableCell align="left">{item.vosita_turi}</TableCell>
                      <TableCell align="left">{item.vosita_nomi}</TableCell>
                      <TableCell align="left">{item.seriyasi}</TableCell>
                      <TableCell align="left">{item.miqdori}</TableCell>
                    </TableRow>
                   )) : null
                   }
                  </TableBody>
                </Table>
              </TableContainer> : 
               <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "white" }}>
                      <TableCell>{t("input.toif")}</TableCell>
                      <TableCell align="left">
                        {t("bildirishnoma.single.bolalar")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      person?.yosh_toifa && Object.keys(person?.yosh_toifa).map((item,index) => (
                      <TableRow>
                      <TableCell align="left">{item}</TableCell>
                      <TableCell align="left">{person.yosh_toifa && person?.yosh_toifa[item]}</TableCell>
                    </TableRow>
                      ))
                    }
                  </TableBody>
                    <TableHead style={{marginTop:'20px'}}>
                    <TableRow style={{ backgroundColor: "white" }}>
                      <TableCell>{t("modalariza.toif")}</TableCell>
                      <TableCell align="left">
                        {t("bildirishnoma.single.bolalar")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                   <TableBody>
                    {
                      person?.oy_toifa && Object.keys(person?.oy_toifa).map((item,index) => (
                      <TableRow>
                      <TableCell align="left">{item}</TableCell>
                      <TableCell align="left">{person.oy_toifa && person?.oy_toifa[item]}</TableCell>
                    </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer> 
              
              }
              
             
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
                <a a href = {
                  `https://admin-mpbt.ssv.uz/static/${person?.file}`
                }
                className = "download_document_t9" >
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
    </div>
  );
};

export default Rolarizasingleb;

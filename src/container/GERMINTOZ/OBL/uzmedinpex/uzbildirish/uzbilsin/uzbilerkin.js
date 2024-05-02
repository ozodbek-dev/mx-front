import {Button,} from "@mui/material";
import {useState} from "react";
// import "../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import Loading from "../../components/loading/loading.js";

function Uzbilerkin() {
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
    
    
    
      
      console.log(numarr);
    
       const [person, setPerson] = useState({
        isFetched: false,
        data: [],
        error: null
      })
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
     const { t } = useTranslation();
    
     const params = useParams();
     

  // if (!person.isFetched) return <Loading/>
    return(
        <>
             <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Link to={"/uzbildirish"}>
          <Button startIcon={<ArrowBackIcon />} style={{borderRadius: "12px",backgroundColor:"#DDEBFB",padding:"8px"}} variant="text">{t("bildirishnoma.single.ortga")}</Button>
        </Link>
      </div>
      {/* <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.status")}
         
        </h4>
          { 
        current.status === "O'qildi" && <div className="status_info" style={{background:"green"}}>
            <p className="status_info_title" style={{color:"white"}}>
            {current.status}
          </p>
        </div> 
          }
      </div> */}
      <div className="rol_ariza_bottom">
        <div style={{display:"flex",alignItems:"center"}}>
      <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.turi")}
                </h4>
                  <div className="div-1">
                  {t("vosita.bola")}
                  </div>
              </div>
            </div>
          </div>
          
          <div style={{marginLeft:"20px"}} className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.vazifasi")}
                </h4>
                  <div className="div-1--1">
                          {person.muddati}
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rol_ariza_bottom_top">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.iddata")}
          </h4>
          <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.id")}</p>
              <p className="info_single">{person.id}</p>
            </div>
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.data")}</p>
              <p className="info_single">{person.sana}</p>
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
                    <p>{t("bildirishnoma.single.direktor")}</p>
                    <p>{person.kimdan}</p>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.muas")}</p>
                    {/* <p>{current.kimdan}</p> */}
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
                    <p>{person.kimga}</p>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.inf")}</p>
                    <p>{person.qoshimcha}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
        
      </div>
      {/* <div className="rol_ariza_bottom_div_inner">
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.vosita")}
        </h4>
        <div className="single_table_all_block">
          <p className="single_table_all_title">
            {t("bildirishnoma.single.vositainf")} A
          </p>
          <div className="single_table_all_block_inner">
            <div className="single_table_all_block_top">
              <button>{t("bildirishnoma.single.vosi")}</button>
              <button>{t("bildirishnoma.single.bolalar")}</button>
            </div>
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
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div> */}
      
      <div className="single_table_document">
        <div className="t9">
        <div className="rol_ariza_bottom_div_inner">
            <h4 className="rol_ariza_bottom_title">
                    {t("input.toif")}
            </h4>
            <ul className="site-list">
                <li className="site-list__items">
                    1-3 {t("vosita.oy")}
                </li>
                <li className="site-list__items">
                    1-3 {t("vosita.oy")}
                </li>
                <li className="site-list__items">
                    1-3 {t("vosita.oy")}
                </li>
            </ul>
        </div>
          <div className="rol_ariza_bottom_div_inner">
            <div className="rol_ariza_bottom_div_inner_block">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.qoshimcha")}
              </h4>
              <div className="document_left_title_block">
                <p className="document_left_title">
                 {person.text}
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
                <a style={{border:"none"}} className="div-1" href={`https://admin-mpbt.ssv.uz/static/${person.fayl}`} download >
                  {person.fayl}
                </a> 
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
        </>
    )
}
export default Uzbilerkin;
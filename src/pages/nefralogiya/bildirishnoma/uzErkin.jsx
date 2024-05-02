import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {request} from "../../../api/request.js";

function Moherkin() {
    
    
      const [data,setData] = useState({
        loading:false,
        error:false,
        data:[]
    })
      
       
    const token = window.localStorage.token
       const config = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       };
       useEffect(() =>{
        request
        .get("bildirishnoma/erkin/MOHga/",config)
        .then(data => setData({loading:true,error:false,data:data.data.data.find(el => +el.id === +params.id && el.qabul_qiluvchi === params.name)}))
    },[])
     
     const { t } = useTranslation();
     const params = useParams();
      console.log(data);
    return(
        <>
             <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Link to={"/?tab=2"}>
          <Button startIcon={<ArrowBackIcon />} style={{borderRadius: "12px",backgroundColor:"#DDEBFB",padding:"8px"}} variant="text">{t("bildirishnoma.single.ortga")}</Button>
        </Link>
      </div>
     
      <div className="rol_ariza_bottom">
        <div style={{display:"flex",alignItems:"center"}}>
      <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.turi")}
                </h4>
                  <div className="div-1">
                          {t("vosita.erkin")}
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
                          {data.data && data.data.muddati}
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
              <p className="info_single">{data.data && data.data.id}</p>
            </div>
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.data")}</p>
              <p className="info_single">{data.data && data.data.sana}</p>
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
                    {/* <p>{t("bildirishnoma.single.muas")}</p> */}
                    <p>{data.data && data.data.kimdan}</p>
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
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    {/* <p>{t("bildirishnoma.single.inf")}</p> */}
                    <p>{data.data && data.data.kimga}</p>
                  </div>
                </div>
              </div>
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
                  {!data.data.qoshimcha || data.data.qoshimcha === "undefined" ? t("input.mavjud"): data.data.qoshimcha }
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
               {data.data.fayl ? <a style={{border:"none"}} className="div-1" target={"_blank"} rel="noreferrer" href={`https://admin-mpbt.ssv.uz/static/${data.data.fayl && data.data.fayl.fayl}`} download >
                  {data.data.fayl && data.data.fayl.fayl}
                </a> : t("input.mavjud")}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
        </>
    )
}
export default Moherkin;
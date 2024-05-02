import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {request} from "../../../api/request.js";

function Mohbilbola() {

  const params = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    isFetched: false,
    data: [],
    error: null
  })
  const token = window.localStorage.token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  useEffect(() => {
    request
      .get("/bildirishnoma/respublikaga/", config)
      .then(data => setPerson(data.data.data.find(el => +el.id === +params.id))).catch(() => {})
  }, [params.id])
  const { t } = useTranslation();
  return (
    <>
      <div className="rol_ariza">
        <div className="rol_ariza_top">
            <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} style={{ borderRadius: "12px", backgroundColor: "#DDEBFB", padding: "8px" }} variant="text">{t("bildirishnoma.single.ortga")}</Button>
        </div>
        
        <div className="rol_ariza_bottom">
          <div style={{ display: "flex", alignItems: "center" }}>
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

            <div style={{ marginLeft: "20px" }} className="rol_ariza_bottom_div">
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
                    </div>
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      {/* <p>{t("bildirishnoma.single.muas")}</p> */}
                      <p>{person.kimdan}</p>

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
                      <p>{person.kimga}</p>
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
              <h4 className="rol_ariza_bottom_title">
                {t("input.toif")}
              </h4>
              <ul className="site-list">
               {
                person.yosh_toifa && JSON.parse(person.yosh_toifa )?
                <li className="site-list__items">
                  {t("input.yosh1")}: {person.yosh_toifa && JSON.parse(person.yosh_toifa ).map((el,index) => <span key={index} style={{marginRight:"12px"}}>{el}</span>)}
                </li>:t("input.mavjud")}
              </ul>
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <h4 className="rol_ariza_bottom_title">
                {t("modalariza.toif")}
              </h4>
              <ul className="site-list">
               {person.oy_toifa && JSON.parse(person.oy_toifa).length > 0 ? 
               <li className="site-list__items">
                  {t("modalariza.toifoy")}: {person.oy_toifa && JSON.parse(person.oy_toifa).map((el,index) => <span key={index} style={{marginRight:"12px"}}>{el}</span>)}
                </li>:t("input.mavjud")}
              </ul>
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.qoshimcha")}
                </h4>
                <div className="document_left_title_block">
                  {person.qoshimcha ?<p className="document_left_title">
                    {person.qoshimcha}
                  </p>:t("input.mavjud")}
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
                  {person.fayl ?<a style={{ border: "none" }} className="div-1" target={"_blank"} rel="noreferrer" href={`https://admin-mpbt.ssv.uz/static/${person.fayl && person.fayl.fayl}`} download >
                    {person.fayl && person.fayl.fayl}
                  </a>:t("input.mavjud")}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
export default Mohbilbola;
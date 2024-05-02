import {Button, TextareaAutosize, TextField,} from "@mui/material";
import {useEffect, useState} from "react";
import "./ariza.scss";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {request} from "../../../../../api/request";


const ErkinKirish = () => {
  const { t } = useTranslation();
   const token = window.localStorage.token;
   const config = {
     headers: {
       Authorization: `Bearer ${token}`
     }
   };
    const [loader, setLoeder] = useState(true);
const [ariza, setAriza] = useState({
   isFetched: false,
     data: [],
     error: false,
});
  useEffect(() => {
    request
      .get(`/user/rmo/muassasalar/`, config)
      .then(function (res) {
        setAriza({
           isFetched: true,
             data: res.data,
             error: false,
        });
        setLoeder(false);
      })
      .catch(function (err) {
        setAriza({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [loader]);
const params = useParams();
  const [person,setPerson] = useState([])

   useEffect(() => {
     request
       .get(`/bildirishnoma/erkin/`, config)
       .then(function (res) {
         setAriza({
           isFetched: true,
           data: res.data,
           error: false,
         });
         console.log(res.data.data,'qw1')

         setPerson(
           res.data.data.filter((item) => +item.id === +params.id)[0]
         );
         setLoeder(false);
       })
       .catch(function (err) {
         setAriza({
           isFetched: false,
           data: [],
           error: err,
         });
       });
   }, [params.id, loader]);
   console.log('person',person);
 
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Link to={"/bildirishnoma"}>
          <Button variant="contained">{t("bildirishnoma.new.ortga")}</Button>
        </Link>
        <h3 className="rol_ariza_top_title">
          {t("bildirishnoma.new.yaratish")}
        </h3>
      </div>
      <div className="rol_ariza_bottom">
        <div className="rol_ariza_bottom_top">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.new.kimdankimga")}
          </h4>
          <div className="rol_ariza_bottom_bigbox">
            <div className="rol_ariza_bottom_block">
              <p className="rol_ariza_bottom_block_desc">
                {t("bildirishnoma.new.kimdan")}
              </p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={person?.kimdan}
                default
              />
            </div>
            <div className="rol_ariza_bottom_block">
              <p className="rol_ariza_bottom_block_desc">
                {t("bildirishnoma.new.kimga")}
              </p>
              <div className="muassasa_block">{person?.kimga}</div>
            </div>
          </div>
        </div>
        <div className="rol_ariza_flex">
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.boshqa")}
                </h4>
                <div className="rol_ariza_bottom_div_t7">
                  <div className="rol_ariza_bottom_div_inner_block_select">
                    <p className="rol_ariza_bottom_block_desc">
                      {/* {t("bildirishnoma.new.turi")} */}
                      {t("bildirishnoma.sana")}
                    </p>
                    <p>{person.sana}</p>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select">
                    <p className="rol_ariza_bottom_block_desc">
                      {/* {t("bildirishnoma.new.turi")} */}
                      Muddati
                    </p>
                    <p>{person.muddati}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.inf")}
                </h4>
                <div className="rol_ariza_textarea">
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder={person.text}
                    name="text"
                  />
                </div>
              </div>
            </div>
            <Button variant="contained">{t("input.otp")}</Button>
          </div>
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="sarflov_top_blocks">
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.new.fail")}
                </h4>

                {/* <Button
                  className="delets_icons_file"
                  startIcon={<DeleteForeverIcon />}
                  variant="contained"
                  type="button"
                >
                  {t("bildirishnoma.new.del")}
                </Button> */}
              </div>
              <input
                onChange={(e) => File(e)}
                type="file"
                id="files"
                className="file_add_input"
                name="fayl"
                
              />
              <label className="download_label" htmlFor="files">
                <div className="files_block_title">
                  <p className="files_add_title">
                    {t("bildirishnoma.new.failinf1")}
                  </p>
                  <span className="files_add_span">fayl</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErkinKirish;

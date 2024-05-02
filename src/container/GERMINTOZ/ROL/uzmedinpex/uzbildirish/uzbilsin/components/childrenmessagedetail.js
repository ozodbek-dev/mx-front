import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudDownload from "@mui/icons-material/CloudDownload";

function Childrenmessagedetail({ person, id, name }) {
  const { t } = useTranslation();
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Button
          onClick={() => window.history.back()}
          className="site-btn"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          {t("bildirishnoma.single.ortga")}
        </Button>
      </div>
      <div className="rol_ariza_bottom">
        <div className="single_table_document">
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.turi")}
                </h4>
                <div className="div-1">
                  {name ? t("vosita.erkin") : t("vosita.bola")}
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
                <div className="div-1--1">{person?.muddati}</div>
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
              <p className="info_single">{id}</p>
            </div>
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.data")}</p>
              <p className="info_single">{person?.sana}</p>
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
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{person?.kimga}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single_table_document">
        {!name ? (
          <div style={{ width: "48%" }} className="rol_ariza_bottom_div_inner">
            <h4 className="rol_ariza_bottom_title">{t("input.yosh1")}</h4>
            <ul className="site-list">
              {!person ||
              JSON.parse(person?.yosh_toifa) === "undefined" ||
              !JSON.parse(person?.yosh_toifa)?.length ? (
                t("input.mavjud")
              ) : (
                <>
                  {person &&
                    JSON.parse(person?.yosh_toifa)?.map((el, index) => (
                      <li className="site-list__items" key={index}>
                        {el}
                      </li>
                    ))}
                </>
              )}
            </ul>
            <h4 className="rol_ariza_bottom_title">{t("input.oy1")}</h4>
            <ul className="site-list">
              {!person ||
              JSON.parse(person?.oy_toifa) === "undefined" ||
              !JSON.parse(person?.oy_toifa)?.length ? (
                t("input.mavjud")
              ) : (
                <>
                  {person &&
                    JSON.parse(person?.oy_toifa)?.map((el, index) => (
                      <li className="site-list__items" key={index}>
                        {el}
                      </li>
                    ))}
                </>
              )}
            </ul>
          </div>
        ) : null}
        <div className="t9">
          <div className="rol_ariza_bottom_div_inner">
            <div className="rol_ariza_bottom_div_inner_block">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.fayl")}
              </h4>
              {person?.fayl && person?.fayl?.fayl ? (
                <div className="rol_ariza_bottom_div_t6">
                  <a
                    style={{ border: "none", backgroundColor: "#1464C0", color: "#fff", borderRadius: "16px", paddingLeft: "5px", paddingRight: "15px", }}
                    className="items-center gap-8 flex "
                    href={`https://admin-mpbt.ssv.uz/static/${person?.fayl?.fayl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                     <CloudDownload/>
                    <p>
                      {t("input.yuklab")}
                    </p>

                  </a>
                  
                </div>
              ) : (
                <p>{t("input.mavjud")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "48%" }} className="t9">
        <div className="rol_ariza_bottom_div_inner">
          <div className="rol_ariza_bottom_div_inner_block">
            <h4 className="rol_ariza_bottom_title">
              {t("bildirishnoma.single.qoshimcha")}
            </h4>
            <div className="document_left_title_block">
              <p className="document_left_title">
                {!person || !person?.qoshimcha
                  ? t("Kiritilmagan")
                  : person?.qoshimcha}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Childrenmessagedetail;

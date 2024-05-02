import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button } from "@mui/material";
import useGet from "hooks/useGet.js";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import "container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";

function Singleobl() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();
  const {
    data: { data = {} },
  } = useGet({
    url: `/bildirishnoma/viloyat/erkin/?filter[id]=${params.id}`,
  });
  const notification = data[0] ?? {};
  return (
    <>
      <div className="rol_ariza">
        <div className="rol_ariza_top">
          <Button
            onClick={() => navigate(-1)}
            style={{
              borderRadius: "12px",
              backgroundColor: "#DDEBFB",
              padding: "8px",
            }}
            variant="text"
          >
            {t("bildirishnoma.single.ortga")}
          </Button>
        </div>
        <div className="rol_ariza_bottom">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.turi")}
                  </h4>
                  <div className="div-1">{t("vosita.erkin")}</div>
                </div>
              </div>
            </div>

            <div
              style={{ marginLeft: "20px" }}
              className="rol_ariza_bottom_div"
            >
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.new.vazifasi")}
                  </h4>
                  <div className="div-1--1">
                    {notification && notification?.muddati}
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
                <p className="info_single">{params?.id}</p>
              </div>
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.data")}</p>
                <p className="info_single">
                  {notification && notification?.sana}
                </p>
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
                      <p>{notification && t(notification?.kimdan)}</p>
                      {/* <p>{t("bildirishnoma.single.muas")}</p> */}
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
                    </div>
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{notification && notification?.kimga}</p>
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
                    {notification.qoshimcha === "undefined"
                      ? t("Kiritilmagan")
                      : notification?.qoshimcha
                      ? notification?.qoshimcha
                      : t("Kiritilmagan")}
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
                {notification.fayl?.fayl ? (
                  <div className="rol_ariza_bottom_div_t6">
                    <a
                      style={{
                        border: "none",
                        backgroundColor: "#1464C0",
                        color: "#fff",
                        borderRadius: "8px",
                        paddingLeft: "5px",
                        paddingRight: "15px",
                      }}
                      className="items-center gap-8 flex "
                      target={"_blank"}
                      href={`https://admin-mpbt.ssv.uz/static/${
                        notification.fayl?.fayl && notification?.fayl?.fayl
                      }`}
                      download
                      rel="noreferrer"
                    >
                      {/* {notification?.notification?.fayl && notification.fayl.fayl} */}
                      <CloudDownloadIcon />
                      <p className="m-0 py-10">{t("input.yuklab")}</p>
                    </a>
                  </div>
                ) : (
                  t("Fayl mavjud emas")
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Singleobl;

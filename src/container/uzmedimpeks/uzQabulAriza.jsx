import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../api/request.js";
import Loading from "../../components/loading/loading.js";
import Error from "../../Error/Error.js";
import CloudDownload from "@mui/icons-material/CloudDownload";
function UzQabulAriza() {
  const [data, setData] = useState({
    loading: false,
    error: false,
    data: [],
  });
  const params = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { t } = useTranslation();
  useEffect(() => {
    request
      .get("/ariza/uzmedimpeks/", config)
      .then((data) =>
        setData({
          loading: true,
          data: data.data.data.find((el) => +el.id === +params.id),
          error: false,
        })
      )
      .catch((err) => {
        setData({
          error: true,
          loading: false,
          data: [],
        });
        throw err;
      });
  }, []);
  if (data.error) return <Error />;
  if (!data.loading) return <Loading />;
  return (
    <>
      <div className="rol_ariza">
        <div className="rol_ariza_top">
          <Button
            className="site-btn"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            style={{
              borderRadius: "12px",
              backgroundColor: "#DDEBFB",
              padding: "8px",
            }}
            variant="contained"
          >
            {t("bildirishnoma.single.ortga")}
          </Button>
        </div>
        <div className="rol_ariza_bottom">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="rol_ariza_bottom_div">
              <div
                style={{ width: "99%" }}
                className="rol_ariza_bottom_div_inner"
              >
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">{t("input.ta")}</h4>
                  <div className="div-1">{data.data && data.data.mavzu}</div>
                </div>
              </div>
            </div>
            <div style={{ width: "48%" }} className="rol_ariza_bottom_top">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.iddata")}
              </h4>
              <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
                <div className="rol_ariza_bottom_block1">
                  <p className="info_single">{t("bildirishnoma.single.id")}</p>
                  <p className="info_single">{data.data && data.data.id}</p>
                </div>
                <div className="rol_ariza_bottom_block1">
                  <p className="info_single">
                    {t("bildirishnoma.single.data")}
                  </p>
                  <p className="info_single">
                    {data.data && new Date(data.data.date).getFullYear()}-
                    {data.data && new Date(data.data.date).getMonth() + 1}-
                    {data.data && new Date(data.data.date).getDate()}
                  </p>
                </div>
              </div>
            </div>
            {/* <div style={{marginLeft:"20px"}} className="rol_ariza_bottom_div">
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
        </div> */}
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
                  <p>{t("bildirishnoma.single.kimdan")}</p>
                  
                </div>
                <div className="rol_ariza_bottom_div_inner_block_select_inner1">
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
                  <p>{data.data && data.data.kimga}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
                    {data.data && data.data.qoshimcha != "undefined"
                      ? data.data.qoshimcha
                      : t("input.mavjud")}
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
                {data.data && data.data.file ? (
                  <div className="rol_ariza_bottom_div_t6">
                    <a
                      style={{
                        border: "none",
                        backgroundColor: "#1464C0",
                        color: "#fff",
                        borderRadius: "16px",
                        paddingLeft: "5px",
                        paddingRight: "15px",
                      }}
                      className="items-center gap-8 flex "
                      href={`https://admin-mpbt.ssv.uz/static/${data.data.file}`}
                      download
                    >
                      <CloudDownload />
                      <p>{t("input.yuklab")}</p>
                    </a>
                  </div>
                ) : (
                  <p>{t("input.mavjud")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UzQabulAriza;

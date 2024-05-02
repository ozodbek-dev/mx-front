import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import CloudDownload from "@mui/icons-material/CloudDownload";
function Applicationsdetail({ data }) {
  const { t } = useTranslation();
  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Button
          className="site-btn"
          onClick={() => window.history.back()}
          startIcon={<ArrowBackIcon />}
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
                <div className="div-1">{data?.mavzu}</div>
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
                <p className="info_single">{data?.id}</p>
              </div>
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.data")}</p>
                <p className="info_single">{data?.date}</p>
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
                  {data?.qoshimcha === "undefined"
                    ? t("input.mavjud")
                    : data?.qoshimcha
                      ? data?.qoshimcha
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
              {data?.file ? (
                <div className="rol_ariza_bottom_div_t6">
                  <a
                    style={{ border: "none", backgroundColor: "#1464C0", color: "#fff", borderRadius: "16px", paddingLeft: "5px", paddingRight: "15px", }}
                    className="items-center gap-8 flex "

                    href={`https://admin-mpbt.ssv.uz/static/${data?.file}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CloudDownload />
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
    </div>
  );
}
export default Applicationsdetail;

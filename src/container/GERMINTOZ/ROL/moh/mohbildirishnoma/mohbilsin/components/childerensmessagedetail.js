import { Button } from "@mui/material";
import { get } from "lodash";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
function Childrensmessagedetail({ person }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="rol_ariza">
        <div className="rol_ariza_top">
          <Button
            onClick={() => window.history.back()}
            startIcon={<ArrowBackIcon />}
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
                  <div className="div-1">{t("vosita.bola")}</div>
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
                  <div className="div-1--1">{get(person, "muddati")}</div>
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
                <p className="info_single">{get(person, "id")}</p>
              </div>
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.data")}</p>
                <p className="info_single">{get(person, "sana")}</p>
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
                      <p>
                        {get(person, "kimdan") === "MOH"
                          ? "SSV"
                          : get(person, "kimdan")}
                      </p>
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
                      <p>
                        {get(person, "kimga") === "MOH"
                          ? "SSV"
                          : get(person, "kimga")}
                      </p>
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
              <h4 className="rol_ariza_bottom_title">{t("input.toif")}</h4>
              {person?.yosh_toifa && person?.yosh_toifa !== "[]" ? (
                <ul className="site-list">
                  {JSON.parse(person.yosh_toifa).map((el) => (
                    <li className="site-list__items">{el}</li>
                  ))}
                </ul>
              ) : (
                t("input.mavjud")
              )}
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <h4 className="rol_ariza_bottom_title">{t("modalariza.toif")}</h4>
              {person?.oy_toifa && person?.oy_toifa !== "[]" ? (
                <ul className="site-list">
                  {JSON.parse(person.oy_toifa).map((el) => (
                    <li className="site-list__items">{el}</li>
                  ))}
                </ul>
              ) : (
                t("input.mavjud")
              )}
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.qoshimcha")}
                </h4>
                <div className="document_left_title_block">
                  <p className="document_left_title">
                    {person?.qoshimcha === "undefined" || !person?.qoshimcha
                      ? t("Kiritilmagan")
                      : person.qoshimcha}
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
                  {get(person, "fayl") ? (
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
                      rel="noreferrer"
                      href={`https://admin-mpbt.ssv.uz/static/${get(
                        person,
                        "fayl.fayl"
                      )}`}
                      download
                    >
                      <CloudDownloadIcon />
                      {/* {get(person, "fayl.fayl")} */}
                      <p className="m-0 py-10">{t("input.yuklab")}</p>
                    </a>
                  ) : (
                    t("Fayl mavjud emas")
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Childrensmessagedetail;

import { CloudDownload } from "@mui/icons-material";
import { Button } from "@mui/material";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

function Combol() {
  const navigate = useNavigate();

  const [person, setPerson] = useState({});

  const { t } = useTranslation();

  const params = useParams();

  useGet({
    url: `/bildirishnoma/viloyat/?filter[id]=${params.id}`,
    onSuccess: (res) => {
      setPerson(get(res, "data.data[0]", {}));
    },
  });
  return (
    <>
      <div className="rol_ariza">
        <div className="rol_ariza_top">
          <Button
            style={{
              borderRadius: "12px",
              backgroundColor: "#DDEBFB",
              padding: "8px",
            }}
            onClick={() => navigate(-1)}
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
                <p className="info_single">{person?.id}</p>
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
                      <p>{person?.kimga}</p>
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
              <ul className="site-list p-0">
                {person?.yosh_toifa && JSON.parse(person?.yosh_toifa).length ? (
                  JSON.parse(person?.yosh_toifa).map((el) => {
                    return <li className="site-list__items">{el}</li>;
                  })
                ) : (
                  <li>{t("Kiritilmagan")}</li>
                )}
              </ul>
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <h4 className="rol_ariza_bottom_title">{t("modalariza.toif")}</h4>
              <ul className="site-list p-0">
                {person.oy_toifa && JSON.parse(person.oy_toifa).length ? (
                  JSON.parse(person.oy_toifa).map((el) => {
                    return <li className="site-list__items">{el}</li>;
                  })
                ) : (
                  <li className="text-capitalize">{t("Kiritilmagan")}</li>
                )}
              </ul>
            </div>
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.qoshimcha")}
                </h4>
                <div className="document_left_title_block">
                  {/* <p className="document_left_title">
                    {person?.qoshimcha
                      ? person?.qoshimcha
                      : t("Kiritilmagan")}
                  </p> */}
                  <p className="document_left_title">
                    {person?.qoshimcha === "undefined" ||
                    person?.qoshimcha === "null"
                      ? "Kiritilmagan"
                      : person?.qoshimcha}
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
                  {person?.fayl ? (
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
                      target="_blank"
                      href={`https://admin-mpbt.ssv.uz/static/${
                        person.fayl && person.fayl.fayl
                      }`}
                      download
                      rel="noreferrer"
                    >
                      <CloudDownload />
                      <p className="m-0 py-10">{t("input.yuklab")}</p>
                    </a>
                  ) : (
                    t("input.mavjud")
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
export default Combol;

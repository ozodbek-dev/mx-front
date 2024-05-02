import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../../../../api/request.js";
import Loading from "../../../../../components/loading/loading.js";
import "../../../../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";
import { get } from "lodash";
import { CloudDownload } from "@mui/icons-material";

function Ttbcom() {
  const [person, setPerson] = useState({
    isFetched: false,
    data: [],
    error: null,
  });

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { t } = useTranslation();

  const params = useParams();

  useEffect(() => {
    request
      .get(`/bildirishnoma/erkin/?filter[id]=${params.id}`, config)
      .then(function (res) {
        setPerson({
          isFetched: true,
          data: get(res, "data.data[0]"),
        });
      });
  }, []);
  const navigate = useNavigate();
  if (!person.isFetched) return <Loading />;
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
            <span className="text-capitalize">
              {t("bildirishnoma.single.ortga")}
            </span>
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
                    {person.data && person.data?.muddati}
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
                  {person.data && person.data?.sana}
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
                      <p>{person.data && person.data?.kimdan}</p>
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
                      <p>{person.data && person.data?.kimga}</p>
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
                    {person.data?.qoshimcha
                      ? person.data?.qoshimcha
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
                <div className="rol_ariza_bottom_div_t6">
                  {person?.data?.fayl ? (
                    <a
                      style={{ border: "none" }}
                      target="_blank"
                      rel="noreferrer"
                      href={`https://admin-mpbt.ssv.uz/static/${person.data?.fayl?.fayl}`}
                      download
                    >
                      <Button variant="contained" startIcon={<CloudDownload />}>
                        {t("input.yuklab")}
                      </Button>
                    </a>
                  ) : (
                    "Biriktirlgan fayllar mavjud emas"
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
export default Ttbcom;

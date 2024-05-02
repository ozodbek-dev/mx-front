import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../../api/request";
import Loading from "../../../components/loading/loading";
import "./singlebemorMin.scss";

const SingleBemorMin = () => {
  const { t } = useTranslation();
  const token = window.localStorage.token;
  const params = useParams();
  const navigate = useNavigate();
  const [bemorIdpro, setBemorIdPro] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    request
      .get(`/muassasa/bola/${params.id}`, config)
      .then(function (res) {
        setBemorIdPro({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setLoeder(false);
      })
      .catch(function (err) {
        setBemorIdPro({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [params.id]);
  console.log("bemorIdpro", bemorIdpro);
  const [loader, setLoeder] = useState(false);
  const item = bemorIdpro.data;

  if (loader) return <Loading />;
  return (
    <div className="singlebemor">
      <div className="singlebemor_top">
        <div className="singlebemor_top_left">
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            variant="contained"
          >
            <span className="text-capitalize">

              {t("bildirishnoma.single.ortga")}
            </span>
          </Button>
        </div>
      </div>
      <div className="singlebemor_block">
        <div className="singlebemor_block_left">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.sh")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.surname")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{item.familiya}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.name")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{item.ism}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.otch")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.pfl")}</h5>
              <h5 className="singlebemor_block_info_desc">{item.JSHSHIR}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.birthday")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.tugilgan_sana}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.male")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{item.jinsi}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.guruh")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {item.qon_guruhi == 1
                  ? "AB(IV)Rh+"
                  : item.qon_guruhi == 2
                    ? "AB(IV)Rh-"
                    : item.qon_guruhi == 3
                      ? "A(II)Rh+"
                      : item.qon_guruhi == 4
                        ? "A(II)Rh-"
                        : item.qon_guruhi == 5
                          ? "B(III)Rh+"
                          : item.qon_guruhi == 6
                            ? "B(III)Rh-"
                            : item.qon_guruhi == 7
                              ? "O(I)Rh+"
                              : item.qon_guruhi == 8
                                ? "O(I)Rh-"
                                : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.rxt")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {item.royxatga_olingan_sana}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.onot")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.ot1")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {item.otasi?.familiya} {item.otasi?.ism}{" "}
                {item.otasi?.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("sbola.ot2")} {t("input.pfl")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.otasi?.JSHSHIR}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.on1")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {/* {seanslar.data.data.length > 0 ? 
              seanslar.data.data[seanslar.data.data.length - 1].bemor_holati : 'Nomalum'
              } */}
                {item.onasi?.familiya} {item.onasi?.ism}{" "}
                {item.onasi?.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.on2")}</h5>
              <div className="singlebemor_block_info_desc">
                {item.onasi?.JSHSHIR}
              </div>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("bola.man")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.tel")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{item.tel_raqami}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.qtel")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {item.qoshimcha_raqam > 0
                  ? item.qoshimcha_raqam
                  : t("input.mavjud")}
              </h5>
            </div>

            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("Yashash manzili")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.manzil_uyi ? item.manzil_uyi : t("bola.kir")}
              </h5>
            </div>
          </div>
        </div>

        <div className="singlebemor_block_right">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">
              {t("vosita.birik")}
            </h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">ID</h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_muassasa?.muassasa_id}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("bildirishnoma.single.muas")}
              </h5>
              {/* <h5 className="singlebemor_block_info_desc">{`${shifokorid?.familiyasi} ${shifokorid?.ismi}`}</h5> */}
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_muassasa?.nomi
                  ? item.biriktirilgan_muassasa.nomi
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("vosita.vrac")}
              </h5>
              {/* <h5 className="singlebemor_block_info_desc">{`${shifokorid?.familiyasi} ${shifokorid?.ismi}`}</h5> */}
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_muassasa?.bosh_vrach
                  ? item.biriktirilgan_muassasa.bosh_vrach
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.m")}</h5>
              {/* <h5 className="singlebemor_block_info_desc">{`${shifokorid?.familiyasi} ${shifokorid?.ismi}`}</h5> */}
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_muassasa?.manzili
                  ? item.biriktirilgan_muassasa.manzili
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.tel")}
              </h5>
              {/* <h5 className="singlebemor_block_info_desc">{`${shifokorid?.familiyasi} ${shifokorid?.ismi}`}</h5> */}
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_muassasa?.telefon
                  ? item.biriktirilgan_muassasa.telefon
                  : t("bola.kir")}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.b12")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.pfl")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_shifokor?.telefon
                  ? item.biriktirilgan_shifokor.telefon
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.birthday")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_shifokor?.tugilgan_sanasi
                  ? item.biriktirilgan_shifokor.tugilgan_sanasi
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.fio")}</h5>
              <div h5 className="singlebemor_block_info_desc">
                {" "}
                {item.biriktirilgan_shifokor?.familiyasi
                  ? item.biriktirilgan_shifokor.familiyasi
                  : t("bola.kir")}{" "}
                {item.biriktirilgan_shifokor?.ismi
                  ? item.biriktirilgan_shifokor.ismi
                  : t("bola.kir")}{" "}
                {item.biriktirilgan_shifokor?.otasini_ismi
                  ? item.biriktirilgan_shifokor.otasini_ismi
                  : t("bola.kir")}
              </div>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.male")}
              </h5>
              <div h5 className="singlebemor_block_info_desc">
                {" "}
                {item.biriktirilgan_shifokor?.jinsi === "1"
                  ? t("input.e")
                  : t("input.a")}
              </div>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.lavozim")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_shifokor?.lavozimi
                  ? item.biriktirilgan_shifokor.lavozimi
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.professia")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_shifokor?.mutaxassislik_toifasi
                  ? item.biriktirilgan_shifokor.mutaxassislik_toifasi
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("vosita.malak")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_shifokor
                  ?.oxirgi_malaka_oshirgan_vaqti_va_joyi
                  ? item.biriktirilgan_shifokor
                    .oxirgi_malaka_oshirgan_vaqti_va_joyi
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.m2")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_shifokor?.qayta_malaka_oshirish_vaqti
                  ? item.biriktirilgan_shifokor.qayta_malaka_oshirish_vaqti
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.l4")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_shifokor?.passport_seriya
                  ? item.biriktirilgan_shifokor.passport_seriya
                  : t("bola.kir")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.tel")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {item.biriktirilgan_shifokor?.tel_raqami
                  ? item.biriktirilgan_shifokor.tel_raqami
                  : t("bola.kir")}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBemorMin;

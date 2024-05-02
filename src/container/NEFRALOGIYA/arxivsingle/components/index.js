import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ArchiveList = ({ person = [] }) => {
  const { t } = useTranslation();
  return (
    <div className="singlebemor">
      <div className="singlebemor_top">
        <div className="singlebemor_top_left">
          <Link to={"/arxiv"}>
            <Button startIcon={<ArrowBackIcon />} variant="contained">
              {t("bildirishnoma.single.ortga")}
            </Button>
          </Link>
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
              <h5 className="singlebemor_block_info_desc">
                {person?.familiya}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.name")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{person?.ism}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.otch")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.pfl")}</h5>
              <h5 className="singlebemor_block_info_desc">{person?.JSHSHIR}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.birthday")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.tugilgan_sana}
              </h5>
            </div>

            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.guruh")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.qon_guruhi == 1
                  ? "AB(IV)Rh+"
                  : person?.qon_guruhi == 2
                  ? "AB(IV)Rh-"
                  : person?.qon_guruhi == 3
                  ? "A(II)Rh+"
                  : person?.qon_guruhi == 4
                  ? "A(II)Rh-"
                  : person?.qon_guruhi == 5
                  ? "B(III)Rh+"
                  : person?.qon_guruhi == 6
                  ? "B(III)Rh-"
                  : person?.qon_guruhi == 7
                  ? "O(I)Rh+"
                  : person?.qon_guruhi == 8
                  ? "O(I)Rh-"
                  : t("bola.kir")}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">
              {t("sbola.contact")}
            </h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.tel")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.tel_raqami}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("input.qosh1")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.qoshimcha_raqam?.trim() || t("input.mavjud")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.male")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{person?.jinsi}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("sbola.manzil")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.manzil_tumani} {person?.manzil_mahalla}{" "}
                {person?.manzil_uyi}
                {!person?.manzil_tumani &&
                  !person?.manzil_mahalla &&
                  !person?.manzil_uyi &&
                  t("input.mavjud")}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.g1")}</h4>

            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.g2")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.passport_seriya_va_raqami}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.who")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.qachon_kim_tomonidan_berilgan || t("input.mavjud")}
              </h5>
            </div>
          </div>
        </div>

        <div className="singlebemor_block_right">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.b1")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">ID</h5>
              <h5 className="singlebemor_block_info_desc">{person?.id}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.shifo")}</h5>
              <h5 className="singlebemor_block_info_desc">{`${person?.biriktirilgan_shifokor?.ismi} ${person?.biriktirilgan_shifokor?.familiyasi}`}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.ms")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.biriktirilgan_muassasa?.nomi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.izoh")}</h5>
              <h5
                className="singlebemor_block_info_desc"
                style={{ color: "green" }}
              >
                {person?.izoh}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.rxt")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.royxatga_olingan_sana}
              </h5>
            </div>
          </div>
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.onot")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.ot1")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.otasi?.ism} {person?.otasi?.familiya}{" "}
                {person?.otasi?.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.on1")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.onasi?.ism} {person?.onasi?.familiya}{" "}
                {person?.onasi?.ism}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArchiveList;

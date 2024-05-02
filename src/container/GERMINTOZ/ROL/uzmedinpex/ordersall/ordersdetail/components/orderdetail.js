import { Button } from "@mui/material";
import { get } from "lodash";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import Eyemodal from "../../createorders/eyemodal/eyemodal";
function Orderdetail({ data }) {
  const { t } = useTranslation();
  return (
    <div style={{ paddingTop: "34px" }} className="container">
      <Button
        className="site-btn"
        onClick={() => window.history.back()}
        style={{
          backgroundColor: "#DDEBFB",
          color: "#1464C0",
          borderRadius: "12px",
        }}
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        {t("bildirishnoma.single.ortga")}
      </Button>
      <div
        style={{
          paddingTop: "24px",
          display: "flex",
          justifyContent: "sp`ace-between",
          gap: "2rem",
        }}
      >
        <section style={{ flex: 1 }}>
          <div className="card-block singlebemor_block_info">
            <h2 className="card-block__head">{t("input.qb")}</h2>
            {Math.round(
              (get(data, "partiyadan_kelgan_vosita_miqdori") /
                get(data, "vosita_miqdori")) *
                100
            ) === 0 && (
              <div
                style={{
                  width:
                    Math.round(
                      (get(data, "partiyadan_kelgan_vosita_miqdori") /
                        get(data, "vosita_miqdori")) *
                        100
                    ) * 5.5,
                }}
                className="table-load"
              ></div>
            )}
            {Math.round(
              (get(data, "partiyadan_kelgan_vosita_miqdori") /
                get(data, "vosita_miqdori")) *
                100
            ) >= 60 && (
              <div
                style={{
                  width: `${
                    Math.round(
                      (get(data, "partiyadan_kelgan_vosita_miqdori") /
                        get(data, "vosita_miqdori")) *
                        100
                    ) * 5.5
                  }px`,
                }}
                className="table-width"
              ></div>
            )}
            {Math.round(
              (get(data, "partiyadan_kelgan_vosita_miqdori") /
                get(data, "vosita_miqdori")) *
                100
            ) < 60 && (
              <div
                style={{
                  width: `${
                    Math.round(
                      (get(data, "partiyadan_kelgan_vosita_miqdori") /
                        get(data, "vosita_miqdori")) *
                        100
                    ) * 5.5
                  }px`,
                }}
                className="table-width--2"
              ></div>
            )}
            {Math.round(
              (get(data, "partiyadan_kelgan_vosita_miqdori") /
                get(data, "vosita_miqdori")) *
                100
            )}
            %
          </div>
          <div className="card-block">
            <h2 className="card-block__head">{t("input.mal1")}</h2>
            <div className="singlebemor_block_info">
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("input.shart")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.shartnoma_raqami")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">{t("input.yt")}</h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.yetgazib_beruvchi_firma_nomi")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("jihoz.ishlab")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.ishlab_chiqaruchi_firma_nomi")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("input.xar")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.xarid_qilish_usuli")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("input.shart1")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.shartnoma_qilingan_sana")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("input.pulmiq")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.shartnomaning_umumiy_pul_miqdori")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("input.sum")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.ajratilgan_pul_miqdori")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5
                  style={{ overflowY: "scroll" }}
                  className="singlebemor_block_info_desc"
                >
                  {t("input.sorov")}
                </h5>
                <h5
                  style={
                    get(data, "buyurtma.ajratilgan_pul_miqdori") -
                      get(data, "buyurtma.shartnomaning_umumiy_pul_miqdori") >
                    0
                      ? { backgroundColor: "#D4FFE8", color: "#18CF6C" }
                      : { backgroundColor: "#fb9696", color: "#f00" }
                  }
                  className="singlebemor_block_info_desc"
                >
                  {get(data, "buyurtma.ajratilgan_pul_miqdori") -
                    get(data, "buyurtma.shartnomaning_umumiy_pul_miqdori")}
                </h5>
              </div>
            </div>
          </div>
          <div className="card-block">
            <h2 className="card-block__head">{t("input.komp")}</h2>
            <div className="singlebemor_block_info">
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("input.direktor1")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.ism_familya_firma_egasi")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("input.asosiy")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.asosiy_raqam")}
                </h5>
              </div>
              <div className="singlebemor_block_info_inner">
                <h5 className="singlebemor_block_info_desc">
                  {t("input.qosh1")}
                </h5>
                <h5 className="singlebemor_block_info_desc">
                  {get(data, "buyurtma.qoshimcha_raqam")}
                </h5>
              </div>
            </div>
          </div>
        </section>
        <section style={{ flex: 1 }}>
          <div
            style={{ width: "100%" }}
            className="card-block singlebemor_block_info"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 className="card-block__head">{t("input.zakaz")}</h2>
              {/* <Singlemodal/> */}
            </div>
            <div className="site-list__div">
              <ul
                style={{
                  listStyle: "none",
                  border: "1px solid var(--greys-variants-200, #E1E1E1)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                {/* <li>#1</li> */}
                <li style={{ marginTop: "10px", marginBottom: "14px" }}>
                  <Eyemodal data={data} />
                </li>
                <li className="site-list__item">
                  <span className="border-list">{t("vosita.vositaturi")}</span>
                  <span className="border-list">
                    {get(data, "vosita_turi.nomi")}
                  </span>
                </li>
                <li className="site-list__item">
                  <span className="border-list">
                    {t("bildirishnoma.single.nomi")}
                  </span>
                  <span className="border-list">
                    {get(data, "vosita_nomi.nomi")}
                  </span>
                </li>
                <li className="site-list__item">
                  <span className="border-list">{t("sbola.olchov")}</span>
                  <span className="border-list">{data?.olchov_birligi}</span>
                </li>
                <li className="site-list__item">
                  <span className="border-list">
                    {t("bildirishnoma.single.miqdori")}
                  </span>
                  <span className="border-list">{data?.vosita_miqdori}</span>
                </li>
                <li className="site-list__item">
                  <span className="border-list">{t("bildirishnoma.yet")}</span>
                  <span className="border-list">
                    {data?.partiyadan_kelgan_vosita_miqdori}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-block singlebemor_block_info">
            <h2 className="card-block__head">{t("Qo’shimcha ma’lumot")}</h2>
            <p>{get(data, "buyurtma.qoshimcha_malumot")}</p>
          </div>
          <div className="card-block singlebemor_block_info ">
            <div className="sarflov_block_comment_inner">
              <h4 className="sarflov_block_title">{t("input.yuklab")}</h4>
              {data?.buyurtma?.file ? (
                <Button
                  //   onClick={() => {
                  //     if (data?.buyurtma.file) {
                  //       setAlert(false);
                  //       return;
                  //     } else setAlert(true);
                  //   }}
                  variant="contained"
                >
                  <a
                    href={`https://admin-mpbt.ssv.uz/static${data?.buyurtma?.file}`}
                    className="download_document_t9"
                    style={{ color: "white" }}
                    download={data?.buyurtma?.file}
                    target="_block"
                  >
                    {t("input.yuklab")}
                  </a>
                </Button>
              ) : (
                t("input.mavjud") + "!"
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Orderdetail;

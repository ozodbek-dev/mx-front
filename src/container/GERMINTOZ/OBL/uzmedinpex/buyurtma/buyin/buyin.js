import {Button} from "@mui/material";
// import "./singlebuy.scss";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import pdfDoc from "../../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../../assets/icon/scripka.svg";
import Eyemodal from "../singlebuy/eyemodal/eyemodal";
// import Singlemodal from "./singlemodal/singlemodal";
// import Eyemodal from "./eyemodal/eyemodal";

function Uzbuyin() {
  const [down, setDown] = useState([]);
  function addFile(value) {
    setDown([
      ...down,
      {
        filename: value,
      },
    ]);
  }
  function delFile(index) {
    let sss = [];
    sss.push(...down);
    sss.splice(index, 1);
    setDown(sss);
  }
  const { t } = useTranslation();
  return (
    <>
      <div
        style={{
          paddingTop: "28px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <section>
            <div className="card-block">
              <h2 className="card-block__head">{t("input.mal1")}</h2>
              <div className="singlebemor_block_info">
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.shart")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.yt")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.xar")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.shart1")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.pulmiq")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.sum")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.sorov")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
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
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.asosiy")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
                <div className="singlebemor_block_info_inner">
                  <h5 className="singlebemor_block_info_desc">
                    {t("input.qosh1")}
                  </h5>
                  <h5 className="singlebemor_block_info_desc"></h5>
                </div>
              </div>
            </div>

            <div className="card-block">
              <h2 className="card-block__head">{t("Qo’shimcha ma’lumot")}</h2>
              {/* <textarea className="card-text" disabled ></textarea> */}
            </div>
          </section>
          <section>
            <div className="card-block">
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
                <ul style={{ listStyle: "none" }}>
                  <li>#1</li>
                  <li style={{ marginTop: "10px", marginBottom: "14px" }}>
                    <Eyemodal />
                  </li>
                  <li className="site-list__item">{t("vosita.vositaturi")}:</li>
                  <li className="site-list__item">
                    {t("bildirishnoma.single.nomi")}:
                  </li>
                  <li className="site-list__item">{t("sbola.olchov")}:</li>
                  <li className="site-list__item">
                    {t("bildirishnoma.single.miqdori")}:
                  </li>
                  <li className="site-list__item">{t("bildirishnoma.yet")}:</li>
                </ul>
              </div>
              {/* <p className="card-page">
                            Bu yerga, buyurtma qilingan va shartnomaga kiritilgan vositalarni qo'shishingiz mumkin, uning uchun "Vosita qo'shish" tugmachasini bosing
                        </p> */}
            </div>
            <div style={{ width: "790px" }} className="card-block">
              <div className="sarflov_block_comment_inner">
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.new.fail")}
                </h4>
                <input
                  onChange={(e) => addFile(e.target.value)}
                  type="file"
                  id="files"
                  className="input_download"
                />
                <label htmlFor="files" className="all_download">
                  <img className="scrip_file" src={scrip} alt="" />
                  {t("vosita.qosh")}
                </label>
              </div>
              <div className="sarflov_block_inner_div">
                {down.map((item, index) =>
                  down.length > 0 ? (
                    <div key={index} className="sarflov_block_download_file">
                      <label className="input_tyle_download">
                        <img src={pdfDoc} alt="" className="label_img" />
                        {item.filename}
                        <div className="close_file">
                          <Button
                            onClick={(e) => delFile(index)}
                            startIcon={<CloseIcon />}
                          ></Button>
                        </div>
                      </label>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default Uzbuyin;

import {Button, FormControl, InputLabel, MenuItem, Select, TextField,} from "@mui/material";
import "./singlebuy.scss";
import pdfDoc from "../../../../../../assets/icon/pdf_doc.svg";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import l3 from "../../../../../../assets/icon/l3.svg";
import scrip from "../../../../../../assets/icon/scripka.svg";
import l2 from "../../../../../../assets/icon/l2.svg";
import Singlemodal from "./singlemodal/singlemodal";
import Eyemodal from "./eyemodal/eyemodal";
import {t} from "i18next";

function Singlebuy() {
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
  return (
    <div
      style={{ paddingTop: "28px", paddingLeft: "20px", paddingRight: "20px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <section>
          <div className="card-block">
            <h2 className="card-block__head">{t("input.mal1")}</h2>
            <TextField
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              id="outlined-basic"
              label={t("bildirishnoma.input.shart")}
              variant="outlined"
              required
              type={"number"}
            />
            <TextField
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              id="outlined-basic"
              label={t("input.yt")}
              variant="outlined"
              required
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("input.xar")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                >
                  <MenuItem value={"Tender"}>Tender</MenuItem>
                </Select>
              </FormControl>

              <TextField
                className="card-date"
                style={{
                  width: "100%",
                  marginBottom: "46px",
                  marginLeft: "20px",
                }}
                id="outlined-basic"
                variant="outlined"
                type="date"
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                style={{
                  width: "100%",
                }}
                id="outlined-basic"
                label={t("input.pulmiq")}
                variant="outlined"
                required
              />
              <TextField
                style={{
                  width: "100%",
                  marginLeft: "20px",
                }}
                id="outlined-basic"
                label={t("input.sum")}
                variant="outlined"
                required
              />
            </div>
            <div className="card-uzs">0 uzs</div>
          </div>
          <div className="card-block">
            <h2 className="card-block__head">{t("input.komp")}</h2>
            <TextField
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              id="outlined-basic"
              label={t("input.direktor1")}
              variant="outlined"
              required
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                style={{
                  width: "100%",
                }}
                id="outlined-basic"
                label={t("input.asosiy")}
                variant="outlined"
                type={"number"}
                required
              />
              <TextField
                style={{
                  width: "100%",
                  marginLeft: "20px",
                }}
                id="outlined-basic"
                label={t("input.qosh1")}
                variant="outlined"
                type={"number"}
                required
              />
            </div>
          </div>

          <div className="card-block">
            <h2 className="card-block__head">{t("sbola.p6")}</h2>
            <textarea
              className="card-text"
              placeholder={t("input.z")}
            ></textarea>
          </div>
        </section>
        <section>
          <div style={{ width: "790px" }} className="card-block">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 className="card-block__head">{t("input.zakaz")}</h2>
              <Singlemodal />
            </div>
            <div className="site-list__div">
              <ul style={{ listStyle: "none" }}>
                <li>#1</li>
                <li style={{ marginTop: "10px", marginBottom: "14px" }}>
                  <Eyemodal />
                  <button
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <img src={l3} />
                  </button>
                  <button
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <img src={l2} />
                  </button>
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
          <div className="card-block">
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
  );
}
export default Singlebuy;

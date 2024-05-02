import { Button, FormControl, MenuItem, Select } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { InputLabel, TextField } from "@mui/material";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import Singlemodal from "../singlemodal/singlemodal";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import pdfDoc from "assets/icon/pdf_doc.svg";
import l2 from "assets/icon/l2.svg";
import l3 from "assets/icon/l3.svg";
import scrip from "assets/icon/scripka.svg";
import { InputNumberCommas } from "react-number-format-with-commas";

function Createorderspart({
  Send,
  handleChange,
  sendevent,
  fields,
  opentool,
  setOpentool,
  edittool,
  setEdittol,
  data,
  setFiletool,
  filterTool,
  filetool,
  Removetool,
  delFiles,
  down,
  addFiles,
  setAmount,
  commonmoney,
  separetademoney,
}) {
  const { t } = useTranslation();
  return (
    <div
      style={{
        paddingTop: "28px",
        paddingLeft: "20px",
        paddingRight: "20px",
        maxWidth: "1800px",
        margin: "0 auto",
      }}
    >
      <Button
        onClick={() => window.history.back()}
        className="site-btn"
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
      <form onSubmit={Send}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <section style={{ width: "50%" }}>
            <div className="card-block">
              <h2 className="card-block__head">{t("input.mal1")}</h2>
              <TextField
                style={{
                  width: "100%",
                  marginBottom: "20px",
                }}
                onChange={(e) => handleChange(e)}
                id="outlined-basic"
                label={t("input.shart") + "*"}
                variant="outlined"
                name="shartnoma_raqami"
                error={sendevent && !get(fields, "shartnoma_raqami")}
                type={"number"}
              />
              <TextField
                style={{
                  width: "100%",
                  marginBottom: "20px",
                }}
                onChange={(e) => handleChange(e)}
                id="outlined-basic"
                label={t("input.yt") + "*"}
                variant="outlined"
                name="yetgazib_beruvchi_firma_nomi"
                error={
                  sendevent && !get(fields, "yetgazib_beruvchi_firma_nomi")
                }
              />
              <TextField
                style={{
                  width: "100%",
                  marginBottom: "20px",
                }}
                onChange={(e) => handleChange(e)}
                id="outlined-basic"
                label={t("jihoz.ishlab") + "*"}
                variant="outlined"
                name="ishlab_chiqaruchi_firma_nomi"
                error={
                  sendevent && !get(fields, "ishlab_chiqaruchi_firma_nomi")
                }
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t("input.xar")} *
                  </InputLabel>
                  <Select
                    label={t("input.xar")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => handleChange(e)}
                    name="xarid_qilish_usuli"
                    error={sendevent && !get(fields, "xarid_qilish_usuli")}
                  >
                    <MenuItem value={"Tender"}>{t("Tender")}</MenuItem>
                    <MenuItem
                      value={
                        "Boshlangʼich narxni pasaytirish boʼyicha auktsion"
                      }
                    >
                      {t("Boshlangʼich narxni pasaytirish boʼyicha auktsion")}
                    </MenuItem>
                    <MenuItem value={"Elektron doʼkon orqali xarid"}>
                      {t("Elektron doʼkon orqali xarid")}
                    </MenuItem>
                    <MenuItem value={"Tanlov"}>{t("Tanlov")}</MenuItem>
                    <MenuItem value={"Yagona yetkazib beruvchi orqali xarid"}>
                      {t("Yagona yetkazib beruvchi orqali xarid")}
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className="card-date"
                  style={{
                    width: "100%",
                    marginBottom: "21px",
                    marginLeft: "20px",
                  }}
                  data-content={t("input.shart1") + "*"}
                  onChange={(e) => handleChange(e)}
                  id="outlined-basic"
                  variant="outlined"
                  type="date"
                  name="shartnoma_qilingan_sana"
                  error={sendevent && !get(fields, "shartnoma_qilingan_sana")}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "19px",
                }}
              >
                <div>
                  <p className="input-number__label">
                    {t("Shartnomaning umumiy pul miqdori")} *
                  </p>
                  <InputNumberCommas
                    className="input-number"
                    onChange={(e) =>
                      setAmount((prev) => ({
                        ...prev,
                        commonmoney: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <p className="input-number__label">
                    {t("Ajratilgan pul miqdori")}*
                  </p>
                  <InputNumberCommas
                    className="input-number"
                    onChange={(e) =>
                      setAmount((prev) => ({
                        ...prev,
                        separetademoney: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div
                className={
                  separetademoney - commonmoney > 0
                    ? "card-uzs card-uzs--green"
                    : separetademoney - commonmoney < 0
                    ? "card-uzs card-uzs--red"
                    : "card-uzs"
                }
              >
                {(separetademoney - commonmoney).toLocaleString()}
                uzs
              </div>
            </div>
            <div className="card-block">
              <h2 className="card-block__head">{t("input.komp")}</h2>
              <TextField
                style={{
                  width: "100%",
                  marginBottom: "20px",
                }}
                id="outlined-basic"
                label={t("input.direktor1") + "*"}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                name="ism_familya_firma_egasi"
                error={sendevent && !get(fields, "ism_familya_firma_egasi")}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  style={{
                    width: "100%",
                  }}
                  id="outlined-basic"
                  label={t("input.asosiy") + "*"}
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                  type={"number"}
                  name="asosiy_raqam"
                  error={sendevent && !get(fields, "asosiy_raqam")}
                />
                <TextField
                  style={{
                    width: "100%",
                    marginLeft: "20px",
                  }}
                  id="outlined-basic"
                  label={t("input.qosh1") + "*"}
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                  type={"number"}
                  name="qoshimcha_raqam"
                  error={sendevent && !get(fields, "qoshimcha_raqam")}
                />
              </div>
            </div>

            <div className="card-block">
              <h2 className="card-block__head">{t("Qo’shimcha ma’lumot")}</h2>
              <textarea
                style={{ width: "100%" }}
                onChange={(e) => handleChange(e)}
                className="card-text"
                name="qoshimcha_malumot"
                placeholder={t("input.z")}
                error={sendevent && !get(fields, "qoshimcha_malumot")}
              ></textarea>
            </div>
          </section>
          <section style={{ width: "50%" }}>
            <div className="card-block">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="card-block__head">{t("input.zakaz")}</h2>
                <Singlemodal
                  opentool={opentool}
                  setOpentool={setOpentool}
                  edittool={edittool}
                  setEdittol={setEdittol}
                  handleChange={handleChange}
                  fields={fields}
                  setFiletool={setFiletool}
                  filetool={filetool}
                  data={data}
                />
              </div>
              {opentool ? (
                <div className="site-list__div">
                  <ul
                    style={{
                      listStyle: "none",
                      border: "1px solid var(--greys-variants-200, #E1E1E1)",
                      borderRadius: "12px",
                      padding: "20px",
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        marginBottom: "20px",
                      }}
                      className="site-list__item"
                    >
                      {/* <span>#1</span> */}
                      <span style={{ marginTop: "10px", marginBottom: "14px" }}>
                        {/* <Eyemodal/> */}
                        <button
                          onClick={Removetool}
                          type={"button"}
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <img src={l3} alt="delete" />
                        </button>
                        <button
                          onClick={() => setEdittol(true)}
                          type={"button"}
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <img src={l2} alt="edit" />
                        </button>
                      </span>
                    </li>
                    <li className="site-list__item">
                      <span className="border-list">
                        {t("vosita.vositaturi")}
                      </span>
                      <span className="border-list">
                        {get(filterTool, "nomi")}
                      </span>
                    </li>
                    <li className="site-list__item">
                      <span className="border-list">
                        {t("bildirishnoma.single.nomi")}
                      </span>
                      <span className="border-list">
                        {
                          get(filterTool, "vosita_nomlari")?.find(
                            (el) => el.id === get(fields, "vosita_nomi")
                          )?.nomi
                        }
                      </span>
                    </li>
                    <li className="site-list__item">
                      <span className="border-list">{t("sbola.olchov")}</span>
                      <span className="border-list">
                        {fields?.olchov_birligi}
                      </span>
                    </li>
                    <li className="site-list__item">
                      <span className="border-list">
                        {t("bildirishnoma.single.miqdori")}
                      </span>
                      <span className="border-list">
                        {fields?.olchov_birligi_narxi}
                      </span>
                    </li>
                  </ul>
                </div>
              ) : (
                <p className="card-page">{t("Buyurtma haqida")}</p>
              )}
            </div>
            <div className="card-block">
              <div className="sarflov_block_comment_inner">
                <h4 className="sarflov_block_title">
                  {t("bildirishnoma.new.fail")} *
                </h4>
                <input
                  onChange={down?.length < 1 && addFiles}
                  type="file"
                  id="orderfiles"
                  className="input_download"
                  disabled={down?.length > 0}
                />
                <label htmlFor="orderfiles" className="all_download">
                  <img className="scrip_file" src={scrip} alt="" />
                  {t("vosita.qosh")}
                </label>
              </div>
              <div className="sarflov_block_inner_div">
                {down?.map((item, index) =>
                  down?.length > 0 ? (
                    <div key={index} className="sarflov_block_download_file">
                      <label className="input_tyle_download">
                        <img src={pdfDoc} alt="" className="label_img" />
                        {item?.filename}
                        <div className="close_file">
                          <Button
                            onClick={(e) => delFiles(index)}
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
        <footer style={{ marginTop: "21px" }} className="site-footer">
          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                borderRadius: "12px",
                backgroundColor: "#1464C0",
                width: "448px",
              }}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SendIcon />}
            >
              {t("input.otp")}
            </Button>
          </div>
        </footer>
      </form>
    </div>
  );
}
export default Createorderspart;

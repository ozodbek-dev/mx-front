import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pdfDoc from "../../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../../assets/icon/scripka.svg";
import { Contextvalue } from "../../../../../../context/context";
import Mohmenu from "./mohmenu";

const Mohcreaterkin = () => {
  const [date, setDate] = useState(null);
  const [text, setText] = useState([]);
  const navigate = useNavigate();
  const {
    data: { muassasalar },
  } = useGet({ url: "/user/respublika/viloyatlar/" });
  const { mutate } = usePost();
  const { men } = useContext(Contextvalue);
  const [down, setDown] = useState(null);
  const downRef = useRef(null);
  const dateHandler = (val) => {
    let dateLimit = dayjs(Date.now()).add(1, "day");
    const limit = new Date(dayjs(Date.now()));
    const inputVal = new Date(val);
    if (limit > inputVal) {
      setDate(dateLimit);
      return toast.warning(
        `Topshirish muddati ${dayjs(Date.now())
          .add(1, "days")
          .format("DD-MM-YYYY")} dan oldin bo'lishi mumkin emas!`
      );
    }
    setDate(val);
  };
  function Send(e) {
    e.preventDefault();
    if (date) {
      const formData = new FormData();
      formData.append(
        "kimga",
        men?.map((el) => el.id)
      );
      formData.append("qoshimcha", text);
      formData.append("text", "");
      formData.append("muddati", dayjs(date).format("YYYY-MM-DD"));
      formData.append("fayl", down ? down.files[0] : "");
      mutate({
        url: "/bildirishnoma/erkin/MOHdanVSSBga/",
        data: formData,
        onSuccess: () => {
          toast.success("Bildirishnoma Yuborildi!");
          navigate("/notification?value=0&value1=1");
        },
        onError: (err) => {
          toast.error("Bildirishnoma Yuborilmadi!");
          toast.error(err.response.data.message);
          throw err;
        },
      });
    } else toast.warning("Vazifani Topshirish Muddatini Kiriting!");
  }
  const { t } = useTranslation();
  return (
    <div className="sarflov">
      <div className="sarflov_inner">
        <Button
          onClick={() => window.history.back()}
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          {t("bildirishnoma.single.ortga")}
        </Button>
      </div>

      <form onSubmit={Send}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ padding: 30, width: "48%" }} className="sarflov_block">
            <h4 className="sarflov_block_title">
              {t("bildirishnoma.new.kimdankimga")}
            </h4>
            <div
              style={{ display: "flex", flexWrap: "wrap" }}
              className="sarflov_block_inner"
            >
              <div>
                <h5 className="sarflov_block_inner_div_title">
                  {t("bildirishnoma.new.kimdan")}
                </h5>
                <TextField
                  style={{ minWidth: "400px", width: "20vmax" }}
                  id="outlined-basic"
                  variant="outlined"
                  label={t("Sog'liqni saqlash vazirligi")}
                  disabled
                />
              </div>

              <div>
                <h5 className="sarflov_block_inner_div_title">
                  {t("bildirishnoma.vlssv")}({t("bildirishnoma.send")}) *
                </h5>
                <Mohmenu names={muassasalar} />
              </div>
            </div>
          </div>
          <div className="sarflov_block" style={{ padding: 30, width: "48%" }}>
            <h4
              className="sarflov_block_title"
              style={{ marginBottom: "56px" }}
            >
              {t("Boshqa ma'lumotlar")}
            </h4>
            <div className="grid grid-cols-2 gap-15">
              <div>
                <p className="mb-[10px]"> {t("bildirishnoma.turi")}</p>
                <TextField
                  style={{ width: "100%", marginTop: "8px" }}
                  id="outlined-basic"
                  variant="outlined"
                  label={t("vosita.erkin")}
                  disabled
                />
              </div>
              <div>
                <p className="mb-[10px]">{t("bildirishnoma.new.vazifasi")} *</p>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    style={{ outline: "none" }}
                    onChange={(val) => dateHandler(val)}
                    value={date}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className="sarflov_comment">
          <div className="sarflov_block_comment">
            <h4 className="sarflov_block_title">{t("Qo’shimcha ma’lumot")}</h4>
            <div
              style={{ height: "inherit", overflow: "auto" }}
              className="sarflov_block_inner_div1"
            >
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="..."
                name="qoshimcha_matn"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>
          <div className="sarflov_block_comment">
            <div className="sarflov_block_comment_inner">
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")}
              </h4>
              {!down ? (
                <div>
                  <input
                    ref={downRef}
                    onChange={(e) => {
                      setDown(e.target);
                    }}
                    type="file"
                    disabled={down}
                    id="files"
                    className="input_download"
                  />
                  <label htmlFor="files" className="all_download">
                    <img className="scrip_file" src={scrip} alt="" />
                    {t("vosita.qosh")}
                  </label>
                </div>
              ) : null}
            </div>
            <div className="sarflov_comment">
              <div
                style={{ height: "200px", overflow: "inherit", width: "100%" }}
                className="sarflov_block_inner_div"
              >
                {down ? (
                  <div className="sarflov_block_download_file">
                    <label className="input_tyle_download">
                      <img src={pdfDoc} alt="" className="label_img" />
                      {get(down, "value")}
                      <div className="close_file">
                        <Button
                          onClick={() => {
                            setDown(null);
                            downRef.current.value = "";
                          }}
                          startIcon={<CloseIcon />}
                        ></Button>
                      </div>
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <footer className="site-footer">
          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                borderRadius: "12px",
                backgrounColor: "#1464C0",
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
};
export default Mohcreaterkin;

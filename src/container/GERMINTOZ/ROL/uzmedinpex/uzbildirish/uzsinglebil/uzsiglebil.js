import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {Button, TextField} from "@mui/material";
import Loading from "components/loading/loading";
import usePost from "hooks/usePost";
import moment from "moment";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import pdfDoc from "../../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../../assets/icon/scripka.svg";

const Uzsinglebil = () => {
  let todayDate = moment().add(1, "days").format().split("T")[0];
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [date, setDate] = useState(todayDate);
  const [num, setNum] = useState({
    from: 0,
    to: 0,
  });
  const [num2, setNum2] = useState({
    from: 0,
    to: 0,
  });
  const [numarr, setNumarr] = useState([]);
  const [numarr2, setNumarr2] = useState([]);
  const [down, setDown] = useState([]);
  const navigate = useNavigate();
  const { mutate, isLoading } = usePost();
  function addFile(e) {
    setDown([
      ...down,
      {
        filename: e.target.value,
        fil: e.target.files[0],
      },
    ]);
  }
  const files = useRef({});
  function delFile(index) {
    if (files.current) {
      files.current.value = "";
    }
    let sss = [];
    // sss.push(...down);
    // sss.splice(index, 1);
    setDown(sss);
  }

  function Send(e) {
    e.preventDefault();
    const formData = new FormData();
    const numarrsend2 = numarr.map(
      (item) => `${Number(item.from)}-${Number(item.to)}`
    );
    const numarrsend1 = numarr2.map(
      (item) => `${Number(item.from)}-${Number(item.to)}`
    );
    formData.append("yosh_toifa", JSON.stringify(numarrsend2));
    formData.append("oy_toifa", JSON.stringify(numarrsend1));
    formData.append("muddati", date);
    down[0] && formData.append("fayl", down[0].fil);
    formData.append("text", "");
    formData.append("qoshimcha", text);
    mutate({
      url: "/bildirishnoma/uzmedimpeks/",
      data: formData,
      onSuccess: () => {
        toast.success("Bildirishnoma Yuborildi!");
        navigate("/notification?value=1");
      },
      onError: (err) => {
        toast.error("Bildirishnoma Yuborilmadi!");
        throw err;
      },
    });
  }
  if (numarr) {
    var uniqueNames = [...new Set(numarr)];
  }
  if (numarr2) {
    var uniqueMonth = [...new Set(numarr2)];
  }

  function numAdd() {
    setNumarr([...numarr, num]);
  }
  function numAdd2() {
    setNumarr2([...numarr2, num2]);
  }
  function numDel(e) {
    let delarr = [];
    delarr.push(...uniqueNames);
    delarr.splice(e, 1);
    setNumarr(delarr);
  }
  function numDel2(e) {
    let delarr = [];
    delarr.push(...uniqueMonth);
    delarr.splice(e, 1);
    setNumarr2(delarr);
  }

  if (todayDate > date) {
    toast.error("Topshirish Muddatini Ortga Surib Bo'lmaydi!");
    setDate(todayDate);
  }
  if (isLoading) return <Loading />;
  return (
    <div className="sarflov">
      <div className="sarflov_inner">
        <Button
          className="site-btn"
          onClick={() => window.history.back()}
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          {t("bildirishnoma.single.ortga")}
        </Button>
      </div>

      <form onSubmit={Send}>
        <div className="sarflov_block" style={{ paddingBottom: "24px" }}>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="sarflov_block_inner"
          >
            <div style={{ marginRight: "7px", marginTop: "9px", width: "30%" }}>
              <h4
                style={{ marginBottom: "23px" }}
                className="sarflov_block_title"
              >
                {t("bildirishnoma.new.kimdankimga")}
              </h4>
              <TextField
                style={{ width: "42%" }}
                id="outlined-basic"
                label={t("bildirishnoma.sog")}
                variant="outlined"
                disabled
              />
            </div>

            <div>
              <h4
                className="sarflov_block_title"
                style={{ marginBottom: "16px" }}
              >
                {t("bildirishnoma.new.mud")}
              </h4>
              <TextField
                className="befor-date"
                style={{ width: "359px" }}
                id="outlined-basic"
                variant="outlined"
                required
                type="date"
                value={date ? date : todayDate}
                // disabled={todayDate >= date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="rol_ariza_bottom" style={{ width: "50%" }}>
            <div className="rol_ariza_bottom_div" style={{ width: "100%" }}>
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4
                    style={{ fontWeight: "normal" }}
                    className="rol_ariza_bottom_title"
                  >
                    {t("bildirishnoma.new.bolalar")}
                  </h4>
                  <p className="yil_oy">{t("bola.yosh")}</p>
                  <div className="num_block_ariza">
                    <div className="rol_ariza_textarea">
                      <p className="rol_num_ariza">
                        {t("bildirishnoma.new.dan")}
                      </p>
                      <div className="rol_ariza_number_left">
                        {num.from === 0 ? (
                          <button
                            type="button"
                            disabled
                            onClick={() =>
                              setNum({ ...num, from: num.from - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setNum({ ...num, from: num.from - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        )}
                        <p className="num_title">{num.from}</p>
                        <button
                          type="button"
                          onClick={() => setNum({ ...num, from: num.from + 1 })}
                          className="num_btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="rol_ariza_textarea">
                      <p className="rol_num_ariza">
                        {t("bildirishnoma.new.gacha")}
                      </p>
                      <div className="rol_ariza_number_left">
                        {num.to === 0 ? (
                          <button
                            type="button"
                            disabled
                            onClick={() => setNum({ ...num, to: num.to - 1 })}
                            className="num_btn"
                          >
                            -
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setNum({ ...num, to: num.to - 1 })}
                            className="num_btn"
                          >
                            -
                          </button>
                        )}
                        <p className="num_title">{num.to}</p>
                        <button
                          type="button"
                          onClick={() => setNum({ ...num, to: num.to + 1 })}
                          className="num_btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <Button
                      style={{ marginTop: "53px", borderRadius: "12px" }}
                      type="button"
                      onClick={numAdd}
                      variant="contained"
                      disabled={num.from >= num.to}
                      startIcon={<AddIcon />}
                    ></Button>
                  </div>
                  <div className="age_num_block">
                    {uniqueNames.map((item, index) => (
                      <div className="age_num_block_inner">
                        <p>{item.from}</p>
                        <p>-</p>
                        <p>{item.to}</p>
                        <p>-</p>
                        <p>{t("bola.yosh")}</p>
                        <button type="button" onClick={(e) => numDel(index)}>
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rol_ariza_bottom_div_inner_block">
                  <p className="yil_oy">{t("vosita.oy")}</p>
                  <div className="num_block_ariza">
                    <div className="rol_ariza_textarea">
                      <p className="rol_num_ariza">
                        {t("bildirishnoma.new.dan")}
                      </p>
                      <div className="rol_ariza_number_left">
                        {num2.from === 0 ? (
                          <button
                            type="button"
                            disabled
                            onClick={() =>
                              setNum2({ ...num2, from: num2.from - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setNum2({ ...num2, from: num2.from - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        )}
                        <p className="num_title">{num2.from}</p>
                        <button
                          type="button"
                          onClick={() =>
                            setNum2({ ...num2, from: num2.from + 1 })
                          }
                          className="num_btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="rol_ariza_textarea">
                      <p className="rol_num_ariza">
                        {t("bildirishnoma.new.gacha")}
                      </p>
                      <div className="rol_ariza_number_left">
                        {num2.to === 0 ? (
                          <button
                            type="button"
                            disabled
                            onClick={() =>
                              setNum2({ ...num2, to: num2.to - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setNum2({ ...num2, to: num2.to - 1 })
                            }
                            className="num_btn"
                          >
                            -
                          </button>
                        )}
                        <p className="num_title">{num2.to}</p>
                        <button
                          type="button"
                          onClick={() => setNum2({ ...num2, to: num2.to + 1 })}
                          className="num_btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <Button
                      type="button"
                      style={{ marginTop: "53px", borderRadius: "12px" }}
                      onClick={numAdd2}
                      disabled={num2.from >= num2.to}
                      variant="contained"
                      startIcon={<AddIcon />}
                    ></Button>
                  </div>
                  <div className="age_num_block">
                    {uniqueMonth.map((item, index) => (
                      <div className="age_num_block_inner">
                        <p>{item.from}</p>
                        <p>-</p>
                        <p>{item.to}</p>
                        <p>-</p>
                        <p>{t("vosita.oy")}</p>
                        <button type="button" onClick={(e) => numDel2(index)}>
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="sarflov_block_comment"
            style={{ width: "47%", height: 444 }}
          >
            <div className="sarflov_block_comment_inner">
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")}
              </h4>
              <input
                onChange={(e) => addFile(e)}
                ref={files}
                type="file"
                id="files"
                className="input_download"
              />
              {down.length === 0 && (
                <label htmlFor="files" className="all_download">
                  <img className="scrip_file" src={scrip} alt="" />
                  {t("vosita.fayl")}
                </label>
              )}
            </div>
            <div className="sarflov_block_inner_div">
              {down.length > 0 ? (
                <div className="sarflov_block_download_file">
                  <label className="input_tyle_download">
                    <img src={pdfDoc} alt="" className="label_img" />
                    {down[0]?.filename}
                    <div className="close_file">
                      <Button
                        onClick={(e) => delFile(0)}
                        startIcon={<CloseIcon />}
                      ></Button>
                    </div>
                  </label>
                </div>
              ) : (
                "Fayl yuklanmagan"
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="sarflov_block_comment">
            <h4 className="sarflov_block_title">{t("sbola.p6")}</h4>
            <textarea onChange={(e) => setText(e.target.value)}></textarea>
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
export default Uzsinglebil;

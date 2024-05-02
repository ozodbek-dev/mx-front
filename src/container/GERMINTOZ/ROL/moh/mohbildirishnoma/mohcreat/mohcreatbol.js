import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextareaAutosize } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import pdfDoc from "../../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../../assets/icon/scripka.svg";
import { LoadingButton } from "@mui/lab";
import Mohmenu from "./mohmenu";
import { Contextvalue } from "context/context";

const Mohcreatbol = () => {
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
  const [down, setDown] = useState(null);
  const [vilId, setVilId] = useState();
  const [text, setText] = useState("");
  const [date, setDate] = useState(dayjs(Date.now()).add(1, "day"));
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { men } = useContext(Contextvalue);
  const downRef = useRef(null);
  const navigate = useNavigate();
  const {
    data: { muassasalar },
  } = useGet({ url: "/user/respublika/viloyatlar/" });
  const { mutate } = usePost();
  function numAdd() {
    if (!isValidInterval(num, numarr, "Yosh")) return;
    setNumarr([...numarr, num]);
  }
  function numAdd2() {
    if (!isValidInterval(num2, numarr2, "Oy")) return;
    setNumarr2([...numarr2, num2]);
  }

  const isValidInterval = ({ from, to }, arr, str) => {
    if (from >= to) {
      toast.error(`${str} oralig'i noto'g'ri berilgan!`);
      return false;
    }
    if (arr.some((item) => item.from === from && item.to === to)) {
      toast.error("Bu toifa oldin qo'shilgan!");
      return false;
    }
    return true;
  };

  function numDel(e) {
    let delarr = [];
    delarr.push(...numarr);
    delarr.splice(e, 1);
    setNumarr(delarr);
  }
  function numDel2(e) {
    let delarr = [];
    delarr.push(...numarr2);
    delarr.splice(e, 1);
    setNumarr2(delarr);
  }
  const dateHandler = (val) => {
    let dateLimit = dayjs(Date.now()).add(1, "day");
    const limit = new Date(dayjs(Date.now()));
    const inputVal = new Date(val);
    if (limit > inputVal) {
      setDate(dateLimit);
      return toast.error(
        `Topshirish muddati ${dayjs(Date.now())
          .add(1, "days")
          .format("DD-MM-YYYY")} dan oldin bo'lishi mumkin emas!`
      );
    }
    setDate(val);
  };

  const UpdateHandler = (e) => {
    e.preventDefault();
    const numarrsend2 = [];
    numarr.map((item) => {
      numarrsend2.push(`${Number(item.from)}-${Number(item.to)}`);
    });
    const numarrsend1 = [];
    numarr2.map((item) => {
      numarrsend1.push(`${Number(item.from)}-${Number(item.to)}`);
    });
    if (men) {
      const formmdata = new FormData();
      formmdata.append(
        "kimga",
        men?.map((el) => el.id)
      );
      formmdata.append("yosh_toifa", JSON.stringify(numarrsend2));
      formmdata.append("oy_toifa", JSON.stringify(numarrsend1));
      formmdata.append("qoshimcha", text);
      formmdata.append("muddati", dayjs(date).format("YYYY-MM-DD"));
      formmdata.append("fayl", down ? down.files[0] : "");
      mutate({
        url: "/bildirishnoma/respublika/",
        data: formmdata,
        onSuccess: () => {
          toast.success("Bildirishnoma Yuborildi!");
          navigate("/notification?value=2&value1=1");
          setLoading(false);
        },
        onError: (err) => {
          toast.error("Bildirishnoma Yuborilmadi!");
          toast.error(err.response.data.message);
          setLoading(false);
          throw err;
        },
      });
      setLoading(true);
    } else toast.warning("Iltimos Hududni Tanlang!");
  };
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
      <form onSubmit={UpdateHandler}>
        <div className="sarflov_block">
          <h4 className="sarflov_block_title">
            {t("bildirishnoma.new.kimdankimga")}
          </h4>
          <div style={{ display: "flex" }} className="sarflov_block_inner ">
            <div
              style={{
                marginRight: "20px",
              }}
            >
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.new.mud")}
              </h5>

              <div style={{ display: "flex" }}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    style={{ background: "white", outline: "none" }}
                    onChange={(val) => dateHandler(val)}
                    value={date}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </div>
            </div>

            <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.vlssv")}
              </h5>
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select1">
                  {t("bildirishnoma.send")}
                </InputLabel>

                <Select
                  label={"kimga"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select1"
                  onChange={(e) => setVilId(e.target.value)}
                >
                  <MenuItem
                    value={JSON.stringify(muassasalar?.map((el) => el.id))}
                  >
                    Barchasi
                  </MenuItem>
                  {muassasalar?.map((item, key) => (
                    <MenuItem key={item.id} id={item.id} value={item.id}>
                      {item.nomi}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <Mohmenu names={muassasalar} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="sarflov_block" style={{ width: "49%" }}>
            <div id="parent">
              <div
                className="sarflov_block_comment_inner"
                style={{ margin: "0!important" }}
              >
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
              {down ? (
                <div className="sarflov_block_inner_div" id="child">
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
                </div>
              ) : null}
            </div>
          </div>

          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.new.bolalar")}
                </h4>
                <p className="yil_oy">{t("bola.yosh")}</p>
                <div
                  className="num_block_ariza"
                  style={{
                    display: "flex",
                    alignItems: "flex-end!important",
                    gap: "1rem",
                  }}
                >
                  <div className="rol_ariza_textarea">
                    <p style={{ margin: "0" }} className="rol_num_ariza">
                      {t("bildirishnoma.new.dan")}
                    </p>
                    <div className="rol_ariza_number_left">
                      {num.from === 0 ? (
                        <button
                          disabled
                          type="button"
                          onClick={() => setNum({ ...num, from: num.from - 1 })}
                          className="num_btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => setNum({ ...num, from: num.from - 1 })}
                          type="button"
                          className="num_btn"
                        >
                          -
                        </button>
                      )}
                      <p className="num_title">{num.from}</p>
                      <button
                        onClick={() => setNum({ ...num, from: num.from + 1 })}
                        type="button"
                        className="num_btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="rol_ariza_textarea">
                    <p style={{ margin: "0" }} className="rol_num_ariza">
                      {t("bildirishnoma.new.gacha")}
                    </p>
                    <div
                      className="rol_ariza_number_left"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      {num.to === 0 ? (
                        <button
                          disabled
                          onClick={() => setNum({ ...num, to: num.to - 1 })}
                          type="button"
                          className="num_btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => setNum({ ...num, to: num.to - 1 })}
                          type="button"
                          className="num_btn"
                        >
                          -
                        </button>
                      )}
                      <p className="num_title">{num.to}</p>
                      <button
                        onClick={() => setNum({ ...num, to: num.to + 1 })}
                        type="button"
                        className="num_btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="rol_ariza_textarea">
                    <p className="rol_num_ariza"></p>
                    <div className="">
                      <Button
                        type="button"
                        className="num_btn"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0",
                          borderRadius: "12px",
                          backgroundColor: "#ddebfb",
                          color: "#1464c0",
                        }}
                        onClick={numAdd}
                        variant="contained"
                      >
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  className="age_num_block"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "1rem",
                  }}
                >
                  {numarr.map((item, index) => (
                    <div className="age_num_block_inner">
                      <p>{item.from}</p>
                      <p>-</p>
                      <p>{item.to}</p>
                      <button onClick={(e) => numDel(index)}>x</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rol_ariza_bottom_div_inner_block">
                <p className="yil_oy">{t("vosita.oy")}</p>
                <div
                  className="num_block_ariza"
                  style={{
                    display: "flex",
                    alignItems: "flex-end!important",
                    gap: "1rem",
                  }}
                >
                  <div className="rol_ariza_textarea">
                    <p style={{ margin: "0" }} className="rol_num_ariza">
                      {t("bildirishnoma.new.dan")}
                    </p>
                    <div className="rol_ariza_number_left">
                      {num2.from === 0 ? (
                        <button
                          disabled
                          onClick={() =>
                            setNum2({ ...num2, from: num2.from - 1 })
                          }
                          type="button"
                          className="num_btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setNum2({ ...num2, from: num2.from - 1 })
                          }
                          type="button"
                          className="num_btn"
                        >
                          -
                        </button>
                      )}
                      <p className="num_title">{num2.from}</p>
                      <button
                        onClick={() =>
                          setNum2({ ...num2, from: num2.from + 1 })
                        }
                        type="button"
                        className="num_btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="rol_ariza_textarea">
                    <p style={{ margin: "0" }} className="rol_num_ariza">
                      {t("bildirishnoma.new.gacha")}
                    </p>
                    <div className="rol_ariza_number_left">
                      {num2.to === 0 ? (
                        <button
                          disabled
                          onClick={() => setNum2({ ...num2, to: num2.to - 1 })}
                          type="button"
                          className="num_btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => setNum2({ ...num2, to: num2.to - 1 })}
                          type="button"
                          className="num_btn"
                        >
                          -
                        </button>
                      )}
                      <p className="num_title">{num2.to}</p>
                      <button
                        onClick={() => setNum2({ ...num2, to: num2.to + 1 })}
                        type="button"
                        className="num_btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="rol_ariza_textarea">
                    <p className="rol_num_ariza"></p>
                    <div className="">
                      <Button
                        type="button"
                        className="num_btn"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0",
                          borderRadius: "12px",
                          backgroundColor: "#ddebfb",
                          color: "#1464c0",
                        }}
                        onClick={numAdd2}
                        variant="contained"
                      >
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="age_num_block">
                  {numarr2.map((item, index) => (
                    <div className="age_num_block_inner">
                      <p>{item.from}</p>
                      <p>-</p>
                      <p>{item.to}</p>
                      <button onClick={(e) => numDel2(index)}>x</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sarflov_comment">
          <div className="sarflov_block_comment">
            <h4 className="sarflov_block_title">{t("Qo’shimcha ma’lumot")}</h4>
            <div
              style={{ overflow: "auto", height: "inherit" }}
              className="sarflov_block_inner_div1"
            >
              <TextareaAutosize
                style={{ resize: "none" }}
                aria-label="minimum height"
                minRows={3}
                placeholder="..."
                name="qoshimcha_matn"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <footer className="site-footer">
          <div style={{ textAlign: "center" }}>
            {loading ? (
              <LoadingButton
                style={{
                  borderRadius: "12px",
                  width: "448px",
                }}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                <span>{t("input.otp")}</span>
              </LoadingButton>
            ) : (
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
            )}
          </div>
        </footer>
      </form>
    </div>
  );
};
export default Mohcreatbol;

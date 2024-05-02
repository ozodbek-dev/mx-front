import CallMadeIcon from "@mui/icons-material/CallMade";
import { Button } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import l1 from "assets/icon/l1.svg";
import { Contextvalue } from "context/context";
import dayjs from "dayjs";

const Chiqimvss = ({ setClose2, data }) => {
  const { setCur4 } = useContext(Contextvalue);
  const { t } = useTranslation();
  const More = (e) => {
    setCur4(data?.find((el) => +el.chiqim.id === +e));
    setClose2(true);
  };
  return (
    <>
      {data &&
        data.map((el, index) => {
          return (
            <div className="kirim_card chiqim_card" key={index}>
              <div
                className="kirim_card_left chiqim_card_left"
                style={{ textAlign: "center", color: "rgb(255 90 0)" }}
              >
                <div>
                  <CallMadeIcon />
                </div>
                <p>
                  {t("shifokor.jami")}:{" "}
                  {el.vositalar.reduce(
                    (prev, curr) => prev + curr.vosita_miqdori,
                    0
                  )}
                </p>
              </div>
              <div className="chiqim_card_center">
                <div className="kirim_card_center_top">
                  <div className="top_left">
                    <p>{t("bildirishnoma.send")}:</p>
                    <h5>
                      {el.chiqim.chiqim_qilingan_tashkilot === "LPU"
                        ? t("pdf.oshp")
                        : el.chiqim.chiqim_qilingan_tashkilot}
                    </h5>
                  </div>
                  <div className="top_left" style={{ flexDirection: "column" }}>
                    <p>{t("input.barkod")}:</p>
                    <h5>
                      {el.chiqim.unique_raqam
                        ? el.chiqim.unique_raqam
                        : t("bola.kir")}
                    </h5>
                  </div>
                  <div className="top_right">
                    <div className="kirim_card_right_left">
                      <p>
                        {dayjs(el.chiqim.created_at, "DD.MM.YYYY").format(
                          "DD.MM.YYYY"
                        )}
                      </p>
                      <span>
                        {dayjs(
                          `${el.chiqim.created_at}`,
                          "DD.MM.YYYY HH:mm"
                        ).format("HH:mm")}
                      </span>
                    </div>
                    <div className="kirim_card_right_left">
                      <Button onClick={() => More(el.chiqim.id)}>
                        <img src={l1} alt="" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="vosita chiqim">
                  <div style={{ overflowY: "auto" }}>
                    <span className="flex gap-5">
                      {t("vosita.vositaturi")}:{" "}
                      {el.vositalar.map((item, index) => (
                        <span key={index}>
                          {item.vosita_turi.nomi}
                          {el.vositalar.length - 1 !== index ? "," : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div style={{ overflowY: "auto" }}>
                    <span className="flex gap-5">
                      {t("bildirishnoma.single.nomi")}:{" "}
                      {el.vositalar.map((item, index) => (
                        <span key={index}>
                          {item.vosita_nomi.nomi}
                          {el.vositalar.length - 1 !== index ? "," : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Chiqimvss;

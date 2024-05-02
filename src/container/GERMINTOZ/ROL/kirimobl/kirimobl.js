import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import kirims from "assets/icon/kirim2.svg";
import l1 from "assets/icon/l1.svg";
import "components/component/RMO/kirimcard/kirimcard.scss";
import { Contextvalue } from "context/context";

const Kirimobl = ({ kirim = [], setClose }) => {
  const { setCur3 } = useContext(Contextvalue);
  const { t } = useTranslation();
  const Den = (e) => {
    setCur3(kirim.find((el) => +el.kirim.id === +e));
    setClose(true);
  };

  return (
    <>
      {kirim.map((el, index) => {
        return (
          <div key={index} className="kirim_card chiqim_card">
            <div
              className="kirim_card_left chiqim_card_left "
              style={{ textAlign: "center" }}
            >
              <img src={kirims} alt="" />
              <p>
                {t("shifokor.jami")}:{" "}
                {el.vositalar
                  .map((el) => el.vosita_miqdori)
                  .reduce((acc, cur) => acc + cur, 0)}
              </p>
            </div>
            <div className="chiqim_card_center">
              <div className="kirim_card_center_top">
                <div className="top_left">
                  <p>{t("vosita.partiys")}:</p>
                  <h5>{el.kirim.partiya_raqam}</h5>
                </div>
                <div className="top_right">
                  <div className="kirim_card_right_left">
                    <p>
                      {dayjs(el.kirim.created_at, "DD.MM.YYYY").format(
                        "DD.MM.YYYY"
                      )}
                    </p>
                    <span>
                      {dayjs(
                        `${el.kirim.created_at}`,
                        "DD.MM.YYYY HH:mm"
                      ).format("HH:mm")}
                    </span>
                  </div>
                  <div className="kirim_card_right_left">
                    <Button onClick={() => Den(el.kirim.id)}>
                      <img src={l1} alt="" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className=" vosita">
                <div style={{ overflowY: "auto" }}>
                  <span>
                    {t("vosita.vositaturi")}:{" "}
                    {el.vositalar.map((item, index) => (
                      <span key={index} style={{ marginRight: "6px" }}>
                        {item.vosita_turi.nomi}
                        {el.vositalar.length - 1 !== index ? "," : ""}
                      </span>
                    ))}{" "}
                  </span>
                </div>
                <div style={{ overflowY: "scroll" }}>
                  <span>
                    {t("bildirishnoma.single.nomi")}:{" "}
                    {el.vositalar.map((item, index) => (
                      <span key={index} style={{ marginRight: "6px" }}>
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

export default Kirimobl;

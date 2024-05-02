import { Button } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import kirims from "../../../../../assets/icon/kirim2.svg";
import l1 from "../../../../../assets/icon/l1.svg";
import "../../../../../components/component/RMO/kirimcard/kirimcard.scss";
import { Contextvalue } from "../../../../../context/context";
import "./kirimkard.scss";

const Kirimcard = ({ classes, kirim, setClose }) => {
  const { setCur } = useContext(Contextvalue);
  const Den = (e) => {
    setCur(kirim.find((el) => +el.id === +e));
    setClose(true);
  };
  const { t } = useTranslation();
  return (
    <>
      {kirim.map((el) => {
        return (
          <div className="kirim_card chiqim_card">
            <div div className="kirim_card_left chiqim_card_left ">
              <img src={kirims} alt="..." />
              <p>
                {t("shifokor.jami")} {el.vositalar.vosita_miqdori}
              </p>
            </div>
            <div className="chiqim_card_center">
              <div className="kirim_card_center_top">
                <div style={{ display: "block" }} className="top_left">
                  <p style={{ width: "100%" }}>{t("input.shart")}:</p>
                  <h5 className="text-hide">
                    {el.vositalar.buyurtma.shartnoma_raqami}
                  </h5>
                </div>
                <div className="top_right">
                  <div className="kirim_card_right_left">
                    <p>{el.created_at.split(" ")[0]}</p>
                    <span>{el.created_at.split(" ")[1]}</span>
                  </div>
                  <div className="kirim_card_right_left">
                    <Button onClick={() => Den(el.id)}>
                      <img src={l1} alt="..." />
                    </Button>
                  </div>
                </div>
              </div>
              <div
                style={{ alignItems: "inherit", flexDirection: "column" }}
                className="bottom vosita"
              >
                <div style={{ overflowY: "scroll", border: "none" }}>
                  <span style={{ width: "200px" }}>
                    {t("vosita.vositaturi")}: {el.vositalar.vosita_turi.nomi}{" "}
                  </span>
                </div>
                <div style={{ overflowY: "scroll", border: "none" }}>
                  <span style={{ width: "200px" }}>
                    {t("bildirishnoma.single.nomi")}:{" "}
                    {el.vositalar.vosita_nomi.nomi}
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

export default Kirimcard;

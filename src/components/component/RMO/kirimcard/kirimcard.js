import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import kirim from "../../../../assets/icon/kirim2.svg";
import l1 from "../../../../assets/icon/l1.svg";
import { Contextvalue } from "../../../../context/context";
import "./kirimcard.scss";

const Kirimcard = ({ setClose, data }) => {
  const { t } = useTranslation();
  const { setCur5 } = useContext(Contextvalue);
  const Get = (e) => {
    setCur5(data.find((el) => +el.kirim.id === +e));
    setClose(true);
  };
  return (
    <>
      {data.map((el, index) => {
        return (
          <div className="kirim_card chiqim_card">
            <div div className="kirim_card_left chiqim_card_left ">
              <img src={kirim} alt="" />
              <p>
                {t("shifokor.jami")}{" "}
                {el.vositalar
                  .map((el) => el.vosita_miqdori)
                  .reduce((acc, cur) => acc + cur, 0)}
              </p>
            </div>
            <div className="chiqim_card_center">
              <div className="kirim_card_center_top">
                <div className="top_left">
                  <p>{t("Kimdan")}:</p>
                  <h5>{el.kirim.kimdan_kelgan}</h5>
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
                    <Button>
                      <img onClick={() => Get(el.kirim.id)} src={l1} alt="" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="my-10">
                <div>
                  <span>
                    {t("vosita.vositaturi")}:{" "}
                    {el.vositalar.map((item, index) => (
                      <span style={{ marginRight: "4px" }}>
                        {item.vosita_turi.nomi}
                        {el.vositalar.length - 1 !== index ? "," : ""}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="mt-10">
                  <span>
                    {t("bildirishnoma.single.nomi")}:{" "}
                    {el.vositalar.map((item, index) => (
                      <span style={{ marginRight: "4px" }}>
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

export default Kirimcard;

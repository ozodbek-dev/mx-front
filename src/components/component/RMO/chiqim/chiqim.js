import CallMadeIcon from "@mui/icons-material/CallMade";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import l1 from "../../../../assets/icon/l1.svg";
import { Contextvalue } from "../../../../context/context";
import "./chiqim.scss";

const Chiqimcard = ({ classes, setClose, data }) => {
  const { setCur6 } = useContext(Contextvalue);

  const Min = (e) => {
    setCur6(data && data.find((el) => +el.chiqim.id === +e));
    setClose(true);
  };
  const { t } = useTranslation();
  return (
    <>
      {data &&
        data.map((el) => {
          return (
            <div className="kirim_card chiqim_card">
              <div div className="kirim_card_left chiqim_card_left">
                <Button
                  // variant="contained"
                  // color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<CallMadeIcon />}
                ></Button>
                <p>
                  {t("shifokor.jami")}{" "}
                  {el.vositalar
                    .map((el) => el.vosita_miqdori)
                    .reduce((acc, cur) => acc + cur, 0)}
                </p>
              </div>
              <div className="chiqim_card_center">
                <div className="kirim_card_center_top">
                  <div>
                    <div className="top_left">
                      <p>{t("bildirishnoma.send")}:LPU</p>
                    </div>
                    <div className="top_left">
                      <p>{t("input.barkod")}:</p>
                      <h5>
                        {el.chiqim.unique_raqam
                          ? el.chiqim.unique_raqam
                          : t("bola.kir")}
                      </h5>
                    </div>
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
                      <Button>
                        <img
                          onClick={() => Min(el.chiqim.id)}
                          src={l1}
                          alt=""
                        />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div>
                    <span>
                      {t("vosita.vositaturi")}:{" "}
                      {el.vositalar.map((item, index) => (
                        <span style={{ marginRight: "4px" }}>
                          {item.vosita_turi.nomi}
                          {el.vositalar.length - 1 !== index ? "," : ""}
                        </span>
                      ))}{" "}
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

export default Chiqimcard;

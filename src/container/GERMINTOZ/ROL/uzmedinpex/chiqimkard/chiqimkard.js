import { Button } from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import l1 from "../../../../../assets/icon/l1.svg";
import Loading from "../../../../../components/loading/loading";
import { useContext, useEffect, useState } from "react";
import { request } from "../../../../../api/request";
import { Contextvalue } from "../../../../../context/context";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import moment from "moment";

const Chiqimcarduz = ({ classes, setClose, date, setExcel }) => {
  const [data, setData] = useState({ loading: false, error: false, data: [] });
  const [back, setBack] = useState({ loading: false, error: false, data: [] });
  const { setCur2 } = useContext(Contextvalue);
  const { t } = useTranslation();
  const token = window.localStorage.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  let newDate = moment(date).format("DD.MM.YYYY");
  useEffect(() => {
    request
      .get("/omborxona/UzMedImpeks/kirim/chiqim/malumotlar", config)
      .then((data) => {
        if (date) {
          setData({
            loading: true,
            error: false,
            data: data.data.chiqim.data.filter(
              (el) => el.created_at === newDate
            ),
          });
        } else {
          setData({
            loading: true,
            error: false,
            data: data.data.chiqim.data,
          });
        }
        setBack({ loading: true, error: false, data: data.data.chiqim });

        setExcel(
          get(data, "data.chiqim.data").map((el) => {
            const { kirim_chiqim } = el;
            return {
              ...el,
              kirim_chiqim: {
                ID: kirim_chiqim?.id,
                Barkod: kirim_chiqim?.unique_raqam,
                "Partya raqam": kirim_chiqim?.partiya_raqam,
                Status: kirim_chiqim?.qabul_qilish_status,
                "Chiqim nomi": kirim_chiqim?.chiqim_qilingan_tashkilot,
                "Chiqim ID": kirim_chiqim?.chiqim_qilingan_tashkilot_id,
                Izoh: kirim_chiqim?.comment,
                "Yaratilgan sana": kirim_chiqim?.created_at
                  ?.split(":")
                  .splice(0, 2)
                  .join(":"),
                "O'zgartirilgan sana": kirim_chiqim?.edited_at
                  ?.split(":")
                  .splice(0, 2)
                  .join(":"),
              },
            };
          })
        );
      });
  }, [date]);
  const More = (e) => {
    setCur2(data?.data?.find((el) => +el?.id === +e));
    setClose(true);
  };
  if (!data.loading) return <Loading />;
  return (
    <>
      {data.data && !data.data[0] && (
        <>
          <p style={{ color: "red", fontWeight: "bold" }}>Ro'yxat Topilmadi!</p>
          <Button onClick={() => setData(back)} variant="contained">
            Ortga
          </Button>
        </>
      )}
      {data?.data?.map((el) => {
        return (
          <div key={el.id} className="kirim_card chiqim_card">
            <div div className="kirim_card_left chiqim_card_left">
              <Button
                size="large"
                className={classes.button}
                startIcon={<CallMadeIcon />}
              ></Button>
              <p>
                {t("shifokor.jami")}: {el?.vosita_miqdori}
              </p>
            </div>
            <div className="chiqim_card_center">
              <div className="kirim_card_center_top">
                <div className="top_left">
                  <p>{t("bildirishnoma.send")}:</p>
                  <h5>{get(el, "kirim_chiqim.chiqim_qilingan_tashkilot")}</h5>
                </div>
                <div style={{ flexDirection: "column" }} className="top_left">
                  <p>{t("input.barkod")}:</p>
                  <h5>
                    {!get(el, "kirim_chiqim.unique_raqam")
                      ? t("bola.kir")
                      : get(el, "kirim_chiqim.unique_raqam")}
                  </h5>
                </div>
                <div className="top_right">
                  <div className="kirim_card_right_left">
                    <p>{get(el, "created_at")}</p>
                    <span>
                      {get(el, "kirim_chiqim.created_at.split(' ')[1]")}
                    </span>
                  </div>
                  <div className="kirim_card_right_left">
                    <Button onClick={() => More(el.id)}>
                      <img src={l1} alt="..." />
                    </Button>
                  </div>
                </div>
              </div>
              <div
                style={{ flexDirection: "column", alignItems: "start" }}
                className="bottom"
              >
                <div style={{ border: "none" }}>
                  <span>
                    {t("vosita.vositaturi")}: {get(el, "vosita_turi.nomi")}
                  </span>
                </div>
                <div style={{ border: "none" }}>
                  <span>
                    {t("bildirishnoma.single.nomi")}:{" "}
                    {get(el, "vosita_nomi.nomi")}
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

export default Chiqimcarduz;

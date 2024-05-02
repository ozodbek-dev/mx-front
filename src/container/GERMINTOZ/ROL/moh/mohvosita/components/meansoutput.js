import CallMadeIcon from "@mui/icons-material/CallMade";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import l1 from "assets/icon/l1.svg";
import { get } from "lodash";

const classes = {
  table: {
    minWidth: 700,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "50px",
    width: "80%",
    margin: "30px auto 0 auto",
  },
  formControl: {
    margin: "1px",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "5px",
  },
  button: {
    padding: "8px",
    borderRadius: "12px",
  },
  button2: {
    backgroundColor: "#F69641",
  },
};
function Meansoutput({ data, setOutput, setClose }) {
  const { t } = useTranslation();
  return (
    <>
      {data?.map((item) => {
        return (
          <div key={item.id} className="kirim_card chiqim_card">
            <div className="kirim_card_left chiqim_card_left">
              <Button
                size="large"
                className={classes.button}
                startIcon={<CallMadeIcon />}
              ></Button>
              <p>
                {t("shifokor.jami")}: {item.vosita_miqdori}{" "}
              </p>
            </div>
            <div className="chiqim_card_center">
              <div className="kirim_card_center_top">
                <div className="top_left">
                  <p>{t("bildirishnoma.send")}:</p>
                  <h5>
                    {item.kirim_chiqim &&
                      item.kirim_chiqim.chiqim_qilingan_tashkilot}
                  </h5>
                </div>
                <div className="top_left">
                  <p>{t("input.barkod")}:</p>
                  <h5>
                    {item.kirim_chiqim && item.kirim_chiqim.unique_raqam
                      ? item.kirim_chiqim.unique_raqam
                      : t("bola.kir")}
                  </h5>
                </div>
                <div className="top_right">
                  <div className="kirim_card_right_left">
                    <p>{item?.created_at}</p>
                    <span>
                      {get(item, "kirim_chiqim.created_at.split(' ')[1]")}
                    </span>
                  </div>
                  <div className="kirim_card_right_left">
                    <Button
                      onClick={() => {
                        setOutput(item.kirim_chiqim.id);
                        setClose(true);
                      }}
                    >
                      <img src={l1} alt="..." />
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "1rem",
                }}
              >
                <div>
                  <span>
                    {t("bildirishnoma.single.nomi")}:{" "}
                    {item.vosita_nomi && item.vosita_nomi.nomi}
                  </span>
                </div>
                <div>
                  <span>
                    {t("vosita.vositaturi")}:{" "}
                    {item.vosita_turi && item.vosita_turi.nomi}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Meansoutput;

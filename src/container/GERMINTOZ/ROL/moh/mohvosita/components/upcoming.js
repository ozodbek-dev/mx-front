import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { Button } from "@mui/material";
import l1 from "assets/icon/l1.svg";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
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
function Upcoming({ data, setEnter, setClose }) {
  const { t } = useTranslation();
  return (
    <>
      {data?.map((item) => {
        return (
          <div className="kirim_card" key={item.id}>
            <div className="kirim_card_left">
              <Button
                size="large"
                className={classes.button}
                startIcon={<CallReceivedIcon />}
              ></Button>
              <p>
                {t("shifokor.jami")}: {item.vosita_miqdori}
              </p>
            </div>
            <div style={{ display: "block" }} className="kirim_card_center">
              <div
                style={{
                  width: "250px",
                  marginBottom: "7px",
                  border: "none",
                }}
              >
                <span>
                  {t("bildirishnoma.single.nomi")}:
                  {item.vosita_nomi && item.vosita_nomi.nomi}
                </span>
              </div>
              <div style={{ width: "250px", border: "none" }}>
                <span>
                  {t("vosita.vositaturi")}:{" "}
                  {item.vosita_turi && item.vosita_turi.nomi}
                </span>
              </div>
            </div>
            <div
              style={{ justifyContent: "flex-end" }}
              className="kirim_card_right"
            >
              <div className="kirim_card_right_left">
                <p>{item?.created_at}</p>
                <span>
                  {get(item, "kirim_chiqim.created_at.split(' ')[1]")}
                </span>
              </div>
              <div className="kirim_card_right_left">
                <Button
                  onClick={() => {
                    setEnter(item.kirim_chiqim.id);
                    setClose(true);
                  }}
                >
                  <img src={l1} alt="..." />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Upcoming;

import { Button } from "@mui/material";
import kirims from "assets/icon/kirim2.svg";
import l1 from "assets/icon/l1.svg";
import { get } from "lodash";

function Rawmaterials({ data, t, setInout, setClose }) {
  return (
    <>
      {data?.map((el) => {
        return (
          <div key={el.id} className="kirim_card chiqim_card">
            <div div className="kirim_card_left chiqim_card_left ">
              <img src={kirims} alt="..." />
              <p>
                {t("shifokor.jami")}: {el.vosita_miqdori}
              </p>
            </div>
            <div className="chiqim_card_center">
              <div className="kirim_card_center_top">
                <div className="top_left">
                  <p>{t("vosita.partiys")}:</p>
                  <h5>{el?.kirim_chiqim?.partiya_raqam}</h5>
                </div>
                <div className="top_right">
                  <div className="kirim_card_right_left">
                    <p>{el.created_at}</p>

                    <span>
                      {get(el, "kirim_chiqim.created_at.split(' ')[1]")}
                    </span>
                  </div>
                  <div className="kirim_card_right_left">
                    <Button
                      onClick={() => {
                        setInout((prev) => ({
                          ...prev,
                          upcomingID: el.kirim_chiqim.id,
                        }));
                        setClose(true);
                      }}
                    >
                      <img src={l1} alt="..." />
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className="bottom"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ border: "none", padding: "5px" }}>
                  <span>{t("vosita.vositaturi")}</span>: {el?.vosita_turi?.nomi}{" "}
                </div>
                <div style={{ border: "none", padding: "5px" }}>
                  <span>{t("bildirishnoma.single.nomi")}</span>:{" "}
                  {el?.vosita_nomi?.nomi}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Rawmaterials;

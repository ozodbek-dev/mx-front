import { Button } from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import l1 from "assets/icon/l1.svg";
import { get } from "lodash";

function Outputmeans({ data, t, setInout, setClose, query }) {
  return (
    <>
      {data?.map((el) => {
        return (
          <div key={el.id} className="kirim_card chiqim_card">
            <div className="kirim_card_left chiqim_card_left">
              <Button size="large" startIcon={<CallMadeIcon />}></Button>
              <p>
                {t("shifokor.jami")}: {el.vosita_miqdori}
              </p>
            </div>
            <div className="chiqim_card_center">
              <div className="kirim_card_center_top">
                <div className="top_left">
                  <p>{t("bildirishnoma.send")}:</p>
                  <h5>
                    {query
                      ? t("OSHP")
                      : el.kirim_chiqim.chiqim_qilingan_tashkilot}
                  </h5>
                </div>
                <div style={{ flexDirection: "column" }} className="top_left">
                  <p>{t("input.barkod")}:</p>
                  <h5>
                    {!el.kirim_chiqim.unique_raqam
                      ? t("bola.kir")
                      : el.kirim_chiqim.unique_raqam}
                  </h5>
                </div>
                <div className="top_right">
                  <div className="kirim_card_right_left">
                    <p>{el.created_at.split("T")[0]}</p>
                    <span>
                      {get(el, "kirim_chiqim.created_at.split(' ')[1]")}
                    </span>
                  </div>
                  <div className="kirim_card_right_left">
                    <Button
                      onClick={() => {
                        setInout((prev) => ({
                          ...prev,
                          outputID: el.kirim_chiqim.id,
                        }));
                        setClose(true);
                      }}
                    >
                      <img src={l1} alt="" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div style={{ overflowY: "scroll" }}>
                  <span>
                    {t("vosita.vositaturi")}: {el.vosita_turi.nomi}
                  </span>
                </div>
                <div>
                  <span>
                    {t("bildirishnoma.single.nomi")}: {el.vosita_nomi.nomi}
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
export default Outputmeans;

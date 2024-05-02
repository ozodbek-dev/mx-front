import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { request } from "../../api/request";
import BasicTabsBildirishnoma from "./bildirishnoma/muiTab";
import BasicTable from "./uzQabul";
import "./uzmedimpeks.scss";
import Loading from "components/loading/loading";

export default function Uzmedimpeks() {
  const kirimz = {
    div: {
      backgroundColor: "#DDEBFB",
      border: "1px solid #9AC4F4",
      color: "#1258A8",
    },
    border: {
      borderRadius: "1px solid #9AC4F4",
    },
  };
  const token = localStorage.getItem("token");
  const [kirim, setKirim] = useState([]);
  const [vosita, setVosita] = useState([]);
  const [data, setData] = useState([]);
  const [chiqim, setChiqim] = useState([]);
  const [dori, setDori] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    request.get(`/omborxona/buyurtma/yaratish`, config).then((data) => {
      setVosita(data?.data.data);
    });
    request
      .get("/omborxona/UzMedImpeks/kirim/chiqim/malumotlar", config)
      .then((data) => setChiqim(data.data.chiqim.data));
    request
      .get("/omborxona/buyurtma/vositalari/partiya/yaratish", config)
      .then((data) => setKirim(data.data));
    request
      .get("/omborxona/uzmedimpeks/malumotlar", config)
      .then((data) => setDori(data.data));
  }, []);
  window.localStorage.setItem("name", data[0]?.bosh_vrach);
  const Data = vosita?.filter(
    (el) =>
      (el.partiyadan_kelgan_vosita_miqdori / el.vosita_miqdori) * 100 === 100
  );
  const aktiv = vosita?.filter(
    (el) =>
      (el.partiyadan_kelgan_vosita_miqdori / el.vosita_miqdori) * 100 < 100
  );
  const { t } = useTranslation();
  return (
    <>
      <div className="asosiy_menu">
        <div className="div_1">
          <h1>{t("bildirishnoma.qariz")}</h1>
          <BasicTable />
        </div>
        <div className="div_2">
          <div className="dori_vitamin">
            <div className="dorilar">
              <h1>{t("bildirishnoma.b")}</h1>
              <div className="header_kirim_chiqim">
                <div className="span">{t("bildirishnoma.a")}</div>
                <div className="span">{t("bildirishnoma.ba")}</div>
              </div>
              <div className="button_kir">
                <div className="kirim" style={kirimz.div}>
                  {aktiv?.length}
                </div>
                <div className="chiqim_d">{Data.length}</div>
              </div>
            </div>
          </div>
          <div className="dori_vitamin">
            <div className="dorilar">
              <h1>{t("bildirishnoma.kir")} </h1>
              <div className="header_kirim_chiqim">
                <div className="span">{t("bildirishnoma.kirim")}</div>
                <div className="span">{t("bildirishnoma.chiqim")}</div>
              </div>
              <div className="button_kir">
                <div className="kirim" style={kirimz.div}>
                  {kirim?.length}
                </div>
                <div className="chiqim">{chiqim.length}</div>
              </div>
            </div>
          </div>
          <div className="dori_vitamin">
            <div className="dorilar">
              <h1>{t("sidebar.li3")}</h1>
              <div className="header_kirim_chiqim">
                <div className="span">{t("bildirishnoma.dori")}</div>
              </div>
              <div className="button_kir">
                <div className="kirim">
                  {
                    dori?.hozirgi_oy_kirim?.data.map((el) => el.shu_oy_mavjud)
                      .length
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="div_3" style={{ overflow: "hidden" }}>
          <h1>{t("yubxar")}</h1>
          <BasicTabsBildirishnoma />
        </div>
      </div>
    </>
  );
}

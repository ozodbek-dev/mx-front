import { useEffect, useState } from "react";
import { request } from "api/request";
import TabsBildirishnoma from "../bildirishnoma/muiTab";
import "./datatable.scss";
import { useTranslation } from "react-i18next";
import BasicTable from "./jonatilganArizaTable";

const DataTable = () => {
  const [vosita, setVosita] = useState([]);
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    request.get(`/omborxona/buyurtma/yaratish`, config).then((data) => {
      setVosita(data?.data?.data);
    });
  }, []);

  const Data = vosita?.filter(
    (el) =>
      (el.partiyadan_kelgan_vosita_miqdori / el.vosita_miqdori) * 100 === 100
  );
  const aktiv = vosita?.filter(
    (el) =>
      (el.partiyadan_kelgan_vosita_miqdori / el.vosita_miqdori) * 100 < 100
  );

  const kirim = {
    div: {
      backgroundColor: "#DDEBFB",
      border: "1px solid #9AC4F4",
      color: "#1258A8",
    },
  };
  return (
    <div className="main-page !p-0">
      <div style={{ height: "700px" }} className="box">
        <h1 className="main-page-title">{t("bildirishnoma.qariz")}</h1>
        <div className="box-item">
          <BasicTable />
        </div>
      </div>
      <div className="box">
        <div className="box-item">
          <div className="dori_vitamin">
            <div className="dorilar">
              <h1 className="main-page-title">{t("bildirishnoma.b")}</h1>
              <div className="header_kirim_chiqim">
                <div className="span">
                  <b>{t("bildirishnoma.a")}</b>
                </div>

                <div className="span">
                  <b>{t("bildirishnoma.ba")}</b>
                </div>
              </div>
              <div className="button_kir">
                <div className="kirim" style={kirim.div}>
                  {aktiv?.length}
                </div>
                <div className="chiqim_d">{Data.length}</div>
              </div>
              {/* <div style={{ visibility: "hidden", minWidth: 400 }}></div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="box">
        <h1 className="main-page-title">{t("qabxar")}</h1>
        <div className="box-item">
          <TabsBildirishnoma />
        </div>
      </div>
    </div>
  );
};

export default DataTable;

import {useEffect, useState} from "react";
import "./muassasaHaqida.scss";
import {request} from "../../../../../../api/request";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function MuassasaHaqidaMalumot() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const params = useParams();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    request
      .get("/user/rmo/muassasalar/", config)
      .then((data) =>
        setData(data.data.muassasalar.find((el) => +el.id === +params.id))
      );
  }, []);
  return (
    <div>
      <div className="div_m">
        <div
          style={{
            height: "292px",
            marginTop: 0,
          }}
          className="tablisa"
        >
          <span>{t("bildirishnoma.um")}</span>
          <div className="body">
            <div className="div">
              <div className="left">{t("input.m")}</div>
              <div className="rigth">{data.manzili}</div>
            </div>
            <div className="div">
              <div className="left">{t("bildirishnoma.single.muas")}</div>
              <div className="rigth">{data.nomi}</div>
            </div>
            <div className="div">
              <div className="left">{t("shifokor.tel")}</div>
              <div className="rigth">{data.telefon}</div>
            </div>
            <div className="div">
              <div className="left">Email</div>
              <div className="rigth">{data.email}</div>
            </div>
            <div className="div">
              <div className="left">{t("vosita.vrac")}</div>
              <div className="rigth">{data.bosh_vrach}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

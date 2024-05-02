import {Button,} from "@mui/material";
import {useEffect, useState} from "react";
import "../../../../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {request} from "../../../../../api/request.js";
import Loading from "../../../../../components/loading/loading.js";

function Comerkin() {
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
  };
  const [age, setAge] = useState("");
  const [pass, setPass] = useState();
  const [num, setNum] = useState({
    from: 0,
    to: 0,
  });
  const [numarr, setNumarr] = useState([]);

  let col3 = window.localStorage.getItem("col3");
  let col4 = window.localStorage.getItem("col4");

  console.log(numarr);

  const [person, setPerson] = useState({
    isFetched: false,
    data: [],
    error: null,
  });
  const [delebemor, setDeleBemor] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const { t } = useTranslation();

  console.log(col3, "col3");
  console.log(col4, "col4");
  const params = useParams();

  console.log(person, "person");
  useEffect(() => {
    request
      .get(`/bildirishnoma/erkin/VSSBdanTTBga/`, config)
      .then(function (res) {
        setPerson({
          isFetched: true,
          data: res.data.data.find((el) => +el.id === +params.id),
        });
      })
      .catch((err) => console.log(err));
  }, []);
  if (!person.isFetched) return <Loading />;
  return (
    <>
      <div className="rol_ariza">
        <div className="rol_ariza_top">
          <Link Link to={"/notification"}>
            <Button
              style={{
                borderRadius: "12px",
                backgroundColor: "#DDEBFB",
                padding: "8px",
              }}
              variant="text"
            >
              {t("bildirishnoma.single.ortga")}
            </Button>
          </Link>
        </div>
        <div className="rol_ariza_bottom">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.turi")}
                  </h4>
                  <div className="div-1">{t("vosita.erkin")}</div>
                </div>
              </div>
            </div>

            <div
              style={{ marginLeft: "20px" }}
              className="rol_ariza_bottom_div"
            >
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.new.vazifasi")}
                  </h4>
                  <div className="div-1--1">
                    {person.data && person.data?.muddati}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rol_ariza_bottom_top">
            <h4 className="rol_ariza_bottom_title">
              {t("bildirishnoma.single.iddata")}
            </h4>
            <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.id")}</p>
                <p className="info_single">{params?.id}</p>
              </div>
              <div className="rol_ariza_bottom_block1">
                <p className="info_single">{t("bildirishnoma.single.data")}</p>
                <p className="info_single">
                  {person.data && person.data?.sana}
                </p>
              </div>
            </div>
          </div>
          <div className="rol_ariza_flex">
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.kimdan")}
                  </h4>
                  <div className="rol_ariza_bottom_div_t6">
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{t("bildirishnoma.single.kimdan")}</p>
                    </div>
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{person.data && person.data?.kimdan}</p>
                      {/* <p>{t("bildirishnoma.single.muas")}</p> */}
                      {/* <p>{current.kimdan}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.kimga")}
                  </h4>
                  <div className="rol_ariza_bottom_div_t6">
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{t("bildirishnoma.single.kimga")}</p>
                    </div>
                    <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                      <p>{person.data && person.data?.kimga}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single_table_document">
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.qoshimcha")}
                </h4>
                <div className="document_left_title_block">
                  <p className="document_left_title">
                    {person.data && person.data?.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.fayl")}
                </h4>
                <div className="rol_ariza_bottom_div_t6">
                  <a
                    style={{ border: "none" }}
                    className="div-1"
                    target="_blank"
                    href={`https://admin-mpbt.ssv.uz/static/${
                      person?.data?.fayl && person.data?.fayl?.fayl
                    }`}
                    download
                  >
                    {person?.data?.fayl && person.data.fayl.fayl}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comerkin;

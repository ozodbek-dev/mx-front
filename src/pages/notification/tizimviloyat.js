import CheckIcon from "@mui/icons-material/Check";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {request} from "../../api/request.js";
import "../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";

function TizmVio() {
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
      // boxShadow: theme.shadows[5],
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

  const params = useParams();
  useEffect(() => {
    request
      .get("/omborxona/tizimli/xabarnoma/vssb", config)
      .then((data) => setPerson(data.data.find((el) => +el.id === +params.id)));
  }, [params.id]);
  console.log(person);
  const Exp = () => {
    const body = {
      status: "qabul_qilinmadi",
    };
    request.post(
      `/omborxona/tizimli/xabarnoma/lpu/tasdiqlash/${person.kirim_chiqim.kimdan_kelgan}/${person.id}`,
      body,
      config
    );
  };
  const Tru = () => {
    const body = {
      status: "qabul_qilindi",
    };
    request.post(
      `/omborxona/tizimli/xabarnoma/vssb/tasdiqlash/UzMedImpeks/${person.id}`,
      body,
      config
    );
  };
  // if (!person.isFetched) return <Loading/>
  return (
    <>
      <div className="rol_ariza">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="rol_ariza_top">
            <Link to={"/notification"}>
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
          <div>
            <Button onClick={Tru} startIcon={<CheckIcon />} variant="contained">
              {t("bildirishnoma.arstatus.qabul")}
            </Button>
            {/* <Button onClick={Exp} style={{backgroundColor:"red",marginLeft:"20px"}} startIcon={<ClearIcon/>} variant="contained">Qabul Qilinmadi</Button> */}
          </div>
        </div>
        <div className="rol_ariza_bottom">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="rol_ariza_bottom_div">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.turi")}
                  </h4>
                  <div className="div-1">{t("sidebar.om")}</div>
                </div>
              </div>
            </div>

            <div
              style={{ width: "48%", marginLeft: "62px", marginBottom: "20px" }}
              className="rol_ariza_bottom_top"
            >
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.iddata")}
              </h4>
              <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
                <div className="rol_ariza_bottom_block1">
                  <p className="info_single">{t("bildirishnoma.single.id")}</p>
                  <p className="info_single">{person && person.id}</p>
                </div>
                <div className="rol_ariza_bottom_block1">
                  <p className="info_single">
                    {t("bildirishnoma.single.data")}
                  </p>
                  <p className="info_single">
                    {person && new Date(person.created_at).getFullYear()}-
                    {person && new Date(person.created_at).getMonth() + 1}-
                    {person && new Date(person.created_at).getDate()}
                  </p>
                </div>
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
                      <p>
                        {person.kirim_chiqim &&
                          person.kirim_chiqim.kimdan_kelgan}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "48%" }} className="t9">
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.fayl")}
                  </h4>
                  {/* <div className="rol_ariza_bottom_div_t6">
                <a style={{border:"none"}} href={`https://admin-mpbt.ssv.uz/static/${person.fayl &&person.fayl.fayl}`} className="div-1"  download >
                  {person.fayl && person.fayl.fayl}
                </a> 
              </div> */}
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
                    {person && person.qoshimcha}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TizmVio;

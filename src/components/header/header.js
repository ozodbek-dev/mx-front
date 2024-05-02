import { FormControl, MenuItem, Select } from "@mui/material";
import useGet from "hooks/useGet";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { request } from "../../api/request";
import calcal from "../../assets/icon/calacala.svg";
import call from "../../assets/icon/call.svg";
import "./site-header.scss";

function Header() {
  const token = window.localStorage.token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [vil, setVil] = useState();
  const id = localStorage.getItem("id");
  const tid = localStorage.getItem("tid");
  const uzb = localStorage.getItem("uzb");
  const vsb = localStorage.getItem("vsb");
  const moh = localStorage.getItem(token);

  for (let name in vil) {
    if (vil[name].viloyat_id == vsb) {
      var findsName = name;
    }

    for (let dist in vil[name]) {
      if (vil[name][dist].tuman_id == tid) {
        var findDistrict = dist;
      }
      for (let institution in vil[name][dist]) {
        if (vil[name][dist][institution].id == id) {
          var findInst = institution;
        }
      }
    }
  }
  useEffect(() => {
    request.get("/hududlar/", config).then((data) => setVil(data.data));
  }, []);

  const langs = localStorage.getItem("i18nextLng");
  const [age, setAge] = useState(langs);

  const { t, i18n } = useTranslation();
  const changeLanguage = (event) => {
    setAge(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const location = useLocation();
  const {
    refetch,
    data: { data = {} },
  } = useGet({ url: "/bildirishnoma/new-notification-count/" });

  useEffect(() => {
    refetch();
  }, [location.pathname, location.search]);
  return (
    <>
      <header className="site-header">
        <div className="header_inner">
          <div className="header_inner_block">
            <img src={call} alt="" />
            <a className="site-link" href="tel:998712394795">
              +998 (71) 239-47-95
            </a>
            <a className="site-link" href="tel:1003">
              1003
            </a>
          </div>
          <div className="header_inner_block">
            <div className="language">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={changeLanguage}
                  label="Age"
                >
                  <MenuItem value={"uz"}>O'zb</MenuItem>
                  <MenuItem MenuItem value={"krl"}>
                    Ўзб
                  </MenuItem>
                  <MenuItem value={"ru"}>Рус</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="header_right">
              <h3 className="hospital_name">
                {uzb && t("Uzmedimpeks")}
                {moh && t("Sog'liqni saqlash vazirligi")}
                {vsb && t(findsName)}
                {tid && "TTB " + t(findDistrict)}
                {id && t(findInst)}
              </h3>
              <h3 className="tex_title">
                {t("header.title")}:{" "}
                <a className="tex_link" href="https://t.me/+jVPcWYVezpw3NWUy">
                  Link
                </a>
              </h3>
            </div>
            <Link to={"/notification"}>
              <button className="bildirishnoma_div">
                <img className="cal_cal" src={calcal} alt="" />
                {data.new && (
                  <span className="bildirish_uvi">{data.number}</span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;

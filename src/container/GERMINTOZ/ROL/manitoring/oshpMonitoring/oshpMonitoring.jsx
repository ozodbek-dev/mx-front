import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {get} from "lodash";
import {useEffect, useState} from "react";
import {CSVLink} from "react-csv";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {request} from "../../../../../api/request";
import Loading from "../../../../../components/loading/loading";
import l1 from "./../../../../../assets/icon/l1.svg";
import "./oshpMonitoring.scss";

const OshpMonitoring = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({ loading: false, data: [], error: false });
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    request
      .get("/hududlar/tuman/", config)
      .then((res) =>
        setData({ loading: true, data: get(res, "data", []), error: false })
      )
      .catch((err) => {
        setData({ loading: false, data: [], error: true });
      });
  }, []);
  console.log(data);
  if (!data.loading) return <Loading />;
  return (
    <div className="ddddd">
      <div className="monitoring">
        <div className="header__monitor">
          <div className="oshp__title">
            {t("TTB")} {t("input.monitor")}
          </div>
          <div className="button">
            <Link to={"/oshpadd"}>
              {" "}
              <button className="addButton">+ {t("sidebar.d")}</button>
            </Link>
            <CSVLink
              data={data.data}
              separator=";"
              headers={[
                { label: "Oilaviy Shifokorlik Punktlari", key: "nomi" },
                { label: "Bosh shifokor	", key: "bosh_vrach" },
                { label: "Bosh shifokor raqami", key: "bosh_vrach_tel" },
                { label: "Bolalar Soni	", key: "bolalar_soni" },
              ]}
              filename="Oshp monitoring"
            >
              <button className="downoaldBtn">{t("bola.excel")}</button>
            </CSVLink>
          </div>
        </div>
        <TableContainer style={{ borderRadius: "12px" }} component={Paper}>
          <Table
            style={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <span className="font-700">{t("Soni")}</span>{" "}
                </TableCell>
                <TableCell align="left">
                  <span className="font-700">
                    {t("bildirishnoma.single.vositainf")}
                  </span>{" "}
                </TableCell>
                <TableCell align="left">
                  <span className="font-700">{t("Bosh shifokor")}</span>
                </TableCell>
                <TableCell align="left">
                  <span className="font-700">{t("Bosh shifokor raqami")}</span>
                </TableCell>
                <TableCell align="left">
                  <span className="font-700">
                    {t("bildirishnoma.single.bolalar")}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-600">{t("bildirishnoma.harakat")}</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data &&
                data.data.map((el, index) => {
                  return (
                    <TableRow>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{el.nomi}</TableCell>
                      <TableCell align="left">
                        {el.bosh_vrach ? el.bosh_vrach : t("bola.kir")}
                      </TableCell>
                      <TableCell align="left">
                        {el.bosh_vrach_tel ? el.bosh_vrach_tel : t("bola.kir")}
                      </TableCell>
                      <TableCell align="left">{el.bolalar_soni}</TableCell>
                      <TableCell
                        align="center"
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <Link to={`/monitoring/all/${el.id}`}>
                          <img
                            className="delete_icon"
                            src={l1}
                            alt="batafsil"
                          />
                        </Link>
                        {/* <img className="delete_icon" src={l2} alt="batafsil" />
                        <img className="delete_icon" src={l3} alt="batafsil" /> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OshpMonitoring;

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";

const Sendariza = () => {
  const [person, setPerson] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tab, setTab] = useState(false);
  const params = useParams();
  useGet({
    url: `/ariza/vssb/mohgayuborish/?filter[id]=${params.id}`,
    onSuccess: (res) => {
      setPerson(get(res, "data.data[0]"));
    },
  });

  const vositalar = useMemo(() => {
    return person.vositalar?.reduce((prev, curr) => {
      curr.data.forEach((item) => prev.push({ turi: curr.turi, ...item }));
      return prev;
    }, []);
  }, [person.vositalar]);

  return (
    <div className="rol_ariza">
      <div className="rol_ariza_top">
        <Button onClick={() => navigate(-1)} variant="contained">
          {t("bildirishnoma.single.ortga")}
        </Button>
      </div>
      <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.status")}
        </h4>
        {person?.status === "O'qildi" ? (
          <div className="status_info" style={{ background: "green" }}>
            <p className="status_info_title" style={{ color: "white" }}>
              {t(person.status)}
            </p>
          </div>
        ) : (
          <div className="status_info">
            <p className="status_info_title">{person?.status} </p>
          </div>
        )}
      </div>
      <div className="rol_ariza_bottom">
        <div className="rol_ariza_bottom_top">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.iddata")}
          </h4>
          <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.id")}</p>
              <p className="info_single">{person?.id}</p>
            </div>
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.data")}</p>
              <p className="info_single">
                {person?.date && person.date.slice(0, 10)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="rol_ariza_bottom_div_inner" style={{ marginTop: "20px" }}>
        <h4 className="rol_ariza_bottom_title">
          {t("bildirishnoma.single.vosita")}
        </h4>
        <div className="single_table_all_block">
          <div className="single_table_all_block_inner">
            <div className="single_table_all_block_top">
              <button
                onClick={() => setTab(!tab)}
                style={
                  tab === false
                    ? { color: "#1464C0", borderBottom: "2px solid #1464C0" }
                    : { color: "black" }
                }
              >
                {t("bildirishnoma.single.vosi")}
              </button>
              <button
                onClick={() => setTab(!tab)}
                style={
                  tab === true
                    ? { color: "#1464C0", borderBottom: "2px solid #1464C0" }
                    : { color: "black" }
                }
              >
                {t("bildirishnoma.single.bolalar")}
              </button>
            </div>
            <div className="single_table_all_block_bottom">
              {tab === false ? (
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                        <TableCell align="left">
                          {t("vosita.vositaturi")}
                        </TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.nomi")}
                        </TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.miqdori")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vositalar?.length
                        ? vositalar.map((item, index) => (
                            <TableRow key={v4()}>
                              <TableCell align="left">{++index}</TableCell>
                              <TableCell align="left">{item.turi}</TableCell>
                              <TableCell align="left">{item.nomi}</TableCell>
                              <TableCell align="left">{item.soni}</TableCell>
                            </TableRow>
                          ))
                        : t("Kiritilmagan")}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("input.toif")}</TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.bolalar")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {person.ariza &&
                      Object.keys(person.ariza.yosh_toifa).length ? (
                        Object.keys(person.ariza.yosh_toifa).map(
                          (it, index) => (
                            <TableRow key={index}>
                              <TableCell align="left">{it}</TableCell>
                              <TableCell align="left">
                                {person.ariza.yosh_toifa &&
                                  person.ariza?.yosh_toifa[it]}
                              </TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <TableRow>
                          <TableCell align="left">{t("bola.kir")}</TableCell>
                          <TableCell align="left">{t("bola.kir")}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                    <TableHead style={{ marginTop: "20px" }}>
                      <TableRow style={{ backgroundColor: "white" }}>
                        <TableCell>{t("modalariza.toif")}</TableCell>
                        <TableCell align="left">
                          {t("bildirishnoma.single.bolalar")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {person.ariza &&
                      Object.keys(person.ariza.oy_toifa).length ? (
                        Object.keys(person.ariza.oy_toifa).map((it, index) => (
                          <TableRow>
                            <TableCell align="left">{it}</TableCell>
                            <TableCell align="left">
                              {person.ariza.oy_toifa &&
                                person.ariza?.oy_toifa[it]}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell align="left">{t("bola.kir")}</TableCell>
                          <TableCell align="left">{t("bola.kir")}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
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
                <p>
                  {person?.qoshimcha ? person?.qoshimcha : t("Kiritilmagan")}
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
                {person.file ? (
                  <a
                    target={"_blank"}
                    href={
                      person?.file !== "None"
                        ? `https://admin-mpbt.ssv.uz/static/${person?.file}`
                        : "#"
                    }
                    className="download_document_t9"
                    rel="noreferrer"
                  >
                    <Button variant="contained">{t("input.yuklab")}</Button>
                  </a>
                ) : (
                  t("input.mavjud")
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sendariza;

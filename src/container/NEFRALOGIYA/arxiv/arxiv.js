import {
  Fade,
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/loading/loading";
import "./muassasa.scss";
import Koriklar from "../../../components/component/seanslar/koriklar";
import l1 from "../../../assets/icon/l1.svg";
import { useTranslation } from "react-i18next";
import useGet from "hooks/useGet";
import { get } from "lodash";

export default function Arxiv() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGet({
    url: `/muassasa/arxiv/?page=${currentPage}`,
  });

  console.log(data, "archiveData");

  const { t } = useTranslation();
  const [shifokorlar, setShifokorlar] = useState([]);

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
  };

  const [seans, setSeans] = React.useState(false);

  const handleSeansClose = () => {
    setSeans(false);
  };

  const [sea, setSea] = useState({
    isFetched: false,
    data: {},
    error: null,
  });

  const [bemId, setBemId] = useState(null);

  function Seansbemor(e) {
    setBemId(e);
    setSeans(true);
  }

  // eslint-disable-next-line no-extend-native
  Array.prototype.remove = function () {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  if (error?.message)
    return (
      <Stack p={5} alignItems={"center"} justifyContent={"center"}>
        <h1>{t("input.mavjud")}</h1>
      </Stack>
    );

  if (isLoading) return <Loading />;
  return (
    <div
      className="arxiv_personal"
      style={{ paddingRight: "20px", paddingLeft: "20px" }}
    >
      {
        <div className="poliklinika">
          <h1>{t("sidebar.li5")}</h1>
          <div className="poliklinika">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "white" }}>
                    <TableCell>{t("bildirishnoma.soni")}</TableCell>
                    <TableCell align="left">{t("input.pfl")}</TableCell>
                    <TableCell align="left">
                      {t("shifokor.alladd.name")} {t("shifokor.alladd.surname")}{" "}
                      {t("shifokor.alladd.otch")}
                    </TableCell>
                    <TableCell align="left">{t("shifokor.birthday")}</TableCell>
                    <TableCell align="left">{t("bola.shifo")}</TableCell>
                    <TableCell align="left">{t("bola.ms")}</TableCell>
                    <TableCell align="center">
                      {t("shifokor.batafsil")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="arxiv1">
                  {get(data, "bolalar")?.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell TableCell component="th" scope="row">
                        {index + 1}{" "}
                      </TableCell>
                      <TableCell align="left">{row.JSHSHIR}</TableCell>
                      <TableCell align="left">{`${row.familiya} ${row.ism} ${row.otasining_ismi}`}</TableCell>
                      <TableCell align="left">{row.tugilgan_sana}</TableCell>
                      <TableCell align="left">{`${row.biriktirilgan_shifokor.familiyasi} ${row.biriktirilgan_shifokor.ismi} `}</TableCell>
                      <TableCell align="left">
                        {row.biriktirilgan_muassasa.nomi}
                      </TableCell>
                      <TableCell align="right">
                        <div className="button_modal button_modal_1">
                          <Link
                            Link
                            to={`/arxivmalumot/${row.id}`}
                            className="single_info"
                          >
                            <img
                              className="delete_icon"
                              src={l1}
                              alt="batafsil"
                            />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {get(data, "meta.total_pages") > 1 && (
              <Stack
                spacing={2}
                mt={4}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
              >
                {" "}
                <Pagination
                  onChange={(e, value) => setCurrentPage(value)}
                  count={get(data, "meta.total_pages")}
                  color="primary"
                  page={currentPage}
                />
              </Stack>
            )}
          </div>
        </div>
      }

      <div className="modal_seans">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal_one}
          open={seans}
          onClose={handleSeansClose}
          closeAfterTransition
          BackdropProps={{
            timeout: 400,
          }}
          style={{
            marginTop: "0",
            width: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Fade in={seans}>
            <div style={classes.paper}>
              <Koriklar
                Seansbemor={Seansbemor}
                sea={sea}
                setSea={setSea}
                id={bemId}
                shifokorlar={shifokorlar}
                handleSeansClose={handleSeansClose}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

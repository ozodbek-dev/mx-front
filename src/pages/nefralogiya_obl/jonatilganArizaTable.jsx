import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useTranslation } from "react-i18next";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import l1 from "./../../../src/assets/icon/l1.svg";
import time from "./../../../src/assets/icon/time.svg";
import { request } from "../../api/request";
import { Link } from "react-router-dom";
import ptichka from "../../assets/icon/ptichka.svg";
import usePost from "hooks/usePost";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function BasicTable() {
  const [ariza, setAriza] = useState();
  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [loader, setLoeder] = useState(true);
  useEffect(() => {
    request
      .get(`/ariza/vssb/`, config)
      .then(function (res) {
        setAriza(res?.data.data);
        setLoeder(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [loader]);
  const { mutate } = usePost();
  const isViewed = (id) => {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "O'qildi");
    mutate({
      url: "/ariza/vssb/",
      data: data,
    });
  };
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "33%" }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#ffff !important" }}>
          <TableRow style={{ backgroundColor: "#ffff !important" }}>
            <TableCell style={{ width: "120px" }}>
              {t("bildirishnoma.send")}
            </TableCell>
            <TableCell align="center" style={{ width: "112px" }}>
              {t("bildirishnoma.sana")}
            </TableCell>
            <TableCell align="center" style={{ width: "112px" }}>
              {t("bildirishnoma.status")}
            </TableCell>
            <TableCell align="center" style={{ width: "120px" }}>
              {t("bildirishnoma.harakat")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ariza?.map((item, key) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {item.kimga}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.vaqti.split("T")[0]}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.status === "Yuborildi" ? (
                  <div className="status">
                    <img src={time} alt="" />
                  </div>
                ) : (
                  <div className="status_green">
                    <img src={ptichka} alt="" />
                  </div>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  to={`/rolarizasobl/${item.id}`}
                  onClick={() => isViewed(item.id)}
                  className="single_info"
                >
                  <img className="delete_icon" src={l1} alt="batafsil" />
                </Link>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

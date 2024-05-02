import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import l1 from "assets/icon/l1.svg";
import time from "assets/icon/time.svg";
import { request } from "api/request";
import { Link } from "react-router-dom";
import ptichka from "assets/icon/ptichka.svg";

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
      .get(`/ariza/moh/`, config)
      .then(function (res) {
        setAriza(res?.data.data);
        setLoeder(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [loader]);
  const knop = (e) => {
    const formData = new FormData();
    formData.append("id", e);
    formData.append("status", "O'qildi");
    request.put("/ariza/moh/", formData, config);
  };
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table sx={{ minWidth: "300px" }}>
        <TableHead style={{ backgroundColor: "#ffff !important" }}>
          <TableRow style={{ backgroundColor: "#ffff !important" }}>
            <TableCell style={{ width: "120px" }}>
              <b>{t("bildirishnoma.single.kimdan")}</b>
            </TableCell>
            <TableCell align="center" style={{ width: "112px" }}>
              <b>{t("bildirishnoma.sana")}</b>
            </TableCell>
            <TableCell
              align="center"
              style={{ width: "112px", paddingRight: "56px" }}
            >
              <b>{t("bildirishnoma.status")}</b>
            </TableCell>
            <TableCell align="center" style={{ width: "120px" }}>
              <b>{t("bildirishnoma.harakat")}</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ariza?.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {item.kimdan}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.date.split("T")[0]}
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
                  to={`/arizamoh/${item.id}`}
                  className="single_info"
                  onClick={() => knop(item.id)}
                  style={{ cursor: "pointer" }}
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

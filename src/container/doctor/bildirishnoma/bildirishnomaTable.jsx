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
import { request } from "../../../api/request";
import time from "../../../assets/icon/time.svg";
import l1 from "../../../assets/icon/l1.svg";
import { useNavigate } from "react-router-dom";
import ptichka from "../../../assets/icon/ptichka.svg";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Bildirishnomalar() {
  const [bildirishnoma, setBildirishnoma] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    request
      .get(`/bildirishnoma/tumanga/`, config)
      .then(function (res) {
        console.log(res, "bildirishnoma");
        setBildirishnoma(res?.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const { t } = useTranslation();
  const StatusChangerBolalar = (e) => {
    const formData = new FormData();
    formData.append("id", e);
    formData.append("status", "O'qildi");
    request.put("/bildirishnoma/tumanga/", formData, config);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "33%" }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#ffff !important" }}>
          <TableRow style={{ backgroundColor: "#ffff !important" }}>
            <TableCell className="!font-700" style={{ width: "120px" }}>
              {t("bildirishnoma.single.kimdan")}
            </TableCell>
            <TableCell
              className="!font-700"
              align="center"
              style={{ width: "112px" }}
            >
              {t("bildirishnoma.single.data")}
            </TableCell>
            <TableCell
              className="!font-700"
              align="center"
              style={{ width: "112px" }}
            >
              {t("bildirishnoma.status")}
            </TableCell>
            <TableCell
              className="!font-700"
              align="center"
              style={{ width: "120px" }}
            >
              {t("bildirishnoma.harakat")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bildirishnoma?.map((item, idx) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={idx}
            >
              <StyledTableCell component="th" scope="row">
                {item.kimdan}
              </StyledTableCell>
              <StyledTableCell align="center">{item.sana}</StyledTableCell>
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
                <Button
                  onClick={() => {
                    navigate(`/singlettb/${item.id}/${item.Yuboruvchi}`);
                    StatusChangerBolalar(item.id);
                  }}
                  className="single_info"
                >
                  <img className="delete_icon" src={l1} alt="batafsil" />
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

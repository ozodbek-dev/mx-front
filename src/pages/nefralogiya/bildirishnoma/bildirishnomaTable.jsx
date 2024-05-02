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
import { useTranslation } from "react-i18next";
import time from "../../../assets/icon/time.svg";
import newimg from "../../../assets/icon/ptichka.svg";
import l1 from "../../../assets/icon/l1.svg";
import { Link } from "react-router-dom";
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

export default function Bildirishnomalar() {
  const [bildirishnoma, setBildirishnoma] = useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    request
      .get(`bildirishnoma/respublikaga/`, config)
      .then(function (res) {
        setBildirishnoma(res?.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const { mutate } = usePost();
  const statusChange = (id) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("status", "o'qildi");
    mutate({
      url: "/bildirishnoma/respublikaga/",
      data: formdata,
      method: "post",
    });
  };
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "33%" }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#ffff !important" }}>
          <TableRow style={{ backgroundColor: "#ffff !important" }}>
            <TableCell style={{ width: "120px" }}>
              <b>{t("bildirishnoma.single.kimdan")}</b>
            </TableCell>
            <TableCell align="center" style={{ width: "112px" }}>
              <b>{t("bildirishnoma.sana")}</b>
            </TableCell>
            <TableCell align="center" style={{ width: "112px" }}>
              <b>{t("bildirishnoma.status")}</b>
            </TableCell>
            <TableCell align="center" style={{ width: "120px" }}>
              <b>{t("bildirishnoma.harakat")}</b>
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
                {item.status.toLowerCase() !== "o'qildi" ? (
                  <div className="">
                    <img src={time} alt="" />
                  </div>
                ) : (
                  <div className="status_green">
                    <img src={newimg} alt="" />
                  </div>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  Link
                  to={`/mohbilbola/${item.id}`}
                  onClick={() => statusChange(item.id)}
                >
                  <img src={l1} alt="..." />
                </Link>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

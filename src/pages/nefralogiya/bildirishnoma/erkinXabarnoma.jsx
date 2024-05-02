import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { request } from "../../../api/request";
import l1 from "../../../assets/icon/l1.svg";
import ptichka from "../../../assets/icon/ptichka.svg";
import time from "../../../assets/icon/time.svg";
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

export default function BasicTableErkin() {
  const [bildirishnoma, setBildirishnoma] = useState([]);
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const { mutate } = usePost();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    request
      .get(`/bildirishnoma/erkin/MOHga/`, config)
      .then(function (res) {
        setBildirishnoma(res?.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const handleView = (id) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("status", "O'qildi");
    mutate({
      url: "/bildirishnoma/erkin/MOHga/",
      data: formdata,
      method: "put",
    });
  };
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
              <b> {t("bildirishnoma.status")}</b>
            </TableCell>
            <TableCell align="center" style={{ width: "120px" }}>
              <b>{t("bildirishnoma.harakat")}</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bildirishnoma?.map((item) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={item.name}
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
                <Link
                  onClick={() => handleView(item.id)}
                  Link
                  to={`/moherkin/${item.id}/${item.qabul_qiluvchi}`}
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

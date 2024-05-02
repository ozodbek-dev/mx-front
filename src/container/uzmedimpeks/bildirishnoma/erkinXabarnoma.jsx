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
  const { t } = useTranslation();
  const [bildirishnoma, setBildirishnoma] = useState([]);
  const [value, setValue] = useState(0);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    request
      .get(`/bildirishnoma/erkin/UzMedImpeksdanVSSBga/`, config)
      .then(function (res) {
        setBildirishnoma(res?.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "33%" }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#ffff !important" }}>
          <TableRow style={{ backgroundColor: "#ffff !important" }}>
            <TableCell style={{ width: "120px", fontWeight: "bold" }}>
              №
            </TableCell>
            <TableCell
              align="center"
              style={{ width: "112px", fontWeight: "bold" }}
            >
              {t("bildirishnoma.sana")}
            </TableCell>
            <TableCell
              align="center"
              style={{ width: "112px", fontWeight: "bold" }}
            >
              {t("bildirishnoma.status")}
            </TableCell>
            <TableCell
              align="center"
              style={{ width: "120px", fontWeight: "bold" }}
            >
              {t("bildirishnoma.harakat")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bildirishnoma?.map((item, index) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={item.id}
            >
              <StyledTableCell component="th" scope="row">
                {index + 1}
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
                  Link
                  to={
                    value === 0
                      ? `/uzbilsinbil/${item.id}/${item.qabul_qiluvchi}`
                      : `/uzbilbol/${item.id}`
                  }
                >
                  <img src={l1} alt=".." />
                </Link>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

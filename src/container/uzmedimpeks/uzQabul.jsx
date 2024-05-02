import { Button } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { request } from "../../api/request";
import ptichka from "../../assets/icon/ptichka.svg";
import l1 from "./../../../src/assets/icon/l1.svg";
import time from "./../../../src/assets/icon/time.svg";

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
      .get(`/ariza/uzmedimpeks/`, config)
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
    request.put("/ariza/uzmedimpeks/", formData, config);
  };
  const navigate = useNavigate();
  const kirimz = {
    div: {
      backgroundColor: "#DDEBFB",
      border: "1px solid #9AC4F4",
      color: "#1258A8",
    },
    border: {
      border: "1px solid #9AC4F4 !important",
    },
  };
  const { t } = useTranslation();
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
          {ariza?.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.date.split("T")[0]}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.status !== "O'qildi" ? (
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
                    knop(item.id);
                    navigate(`/uzarizacos/${item.id}`);
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

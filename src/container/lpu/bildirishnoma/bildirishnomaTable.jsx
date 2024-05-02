import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import time from "../../../assets/icon/time.svg";
import ptichka from "../../../assets/icon/ptichka.svg";
import l1 from "../../../assets/icon/l1.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import usePost from "../../../hooks/usePost";
import useGet from "../../../hooks/useGet";
import { useTranslation } from "react-i18next";

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
  const {
    data: { data = [] },
  } = useGet({ url: "/bildirishnoma/muassasa/erkin/" });
  const navigete = useNavigate();
  const { mutate } = usePost();
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "33%" }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#ffff !important" }}>
          <TableRow style={{ backgroundColor: "#ffff !important" }}>
            <TableCell style={{ width: "120px" }}>
              {t("bildirishnoma.single.kimdan")}
            </TableCell>
            <TableCell align="center" style={{ width: "112px" }}>
              {t("bildirishnoma.single.data")}
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
          {data?.map((item) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={item.name}
            >
              <StyledTableCell component="th" scope="row">
                {item.kimdan}
              </StyledTableCell>
              <StyledTableCell align="center">{item.sana}</StyledTableCell>
              <StyledTableCell align="center">
                {item.status === "O'qildi" ? (
                  <div className="status_green">
                    <img src={ptichka} alt="" />
                  </div>
                ) : (
                  <div className="status">
                    <img src={time} alt="" />
                  </div>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  style={{ padding: 0 }}
                  onClick={() => {
                    const formData = new FormData();
                    formData.append("status", "O'qildi");
                    formData.append("id", item.id);
                    formData.append("kimdan", item.kimdan);
                    mutate({
                      url: "/bildirishnoma/muassasa/erkin/",
                      method: "put",
                      data: formData,
                    });
                    navigete(`/singlelpuasosiy/${item.id}/${item.Yuboruvchi}`);
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

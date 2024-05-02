import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [bildirishnoma, setBildirishnoma] = useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    request
      .get(`/bildirishnoma/tuman/erkin/`, config)
      .then(function (res) {
        console.log(res, "bildirishnoma");
        setBildirishnoma(res?.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const StatusChangerErkin = (e, kimdan) => {
    const formData = new FormData();
    formData.append("id", e);
    formData.append("status", "O'qildi");
    formData.append(
      "kimdan",
      ["MOH", "UzMedImpeks", "VSSB"].includes(kimdan) ? kimdan : "VSSB"
    );
    request.post("/bildirishnoma/tuman/erkin/", formData, config);
  };

  const { t } = useTranslation();
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
                <Button
                  onClick={() => {
                    navigate(
                      `/ttberkin/${item.id}/${item.Yuboruvchi}?kimdan=${item.kimdan}`
                    );
                    StatusChangerErkin(item.id, item.kimdan);
                  }}
                >
                  <img src={l1} alt="batafsil" />
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

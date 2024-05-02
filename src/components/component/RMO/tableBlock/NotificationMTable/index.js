import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import l1 from "assets/icon/l1.svg";
import { v4 } from "uuid";

const NotificationMTable = ({
  data = [],
  handleClick = () => {},
  handleNavigate = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow style={{ backgroundColor: "white" }}>
            <TableCell> {t("bildirishnoma.soni")}</TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="left"
            >
              ID
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="left"
            >
              {t("bildirishnoma.single.kimdan")}
            </TableCell>

            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="left"
            >
              {t("bildirishnoma.new.mud")}
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="left"
            >
              {t("bildirishnoma.single.kimga")}
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="left"
            >
              {t("bildirishnoma.sana")}
            </TableCell>
            <TableCell align="center">{t("bildirishnoma.status")}</TableCell>
            <TableCell align="center">{t("bildirishnoma.harakat")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={v4()}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{item.id}</TableCell>
              <TableCell align="left"> {t(item.kimdan)}</TableCell>
              <TableCell align="left">
                {item.muddati || t("Kiritilmagan")}
              </TableCell>
              <TableCell align="left">{item.kimga}</TableCell>
              <TableCell align="left">{item.sana}</TableCell>
              <TableCell align="center">
                <button
                  className={
                    item.status === "Yuborildi"
                      ? "status_btn"
                      : "status_btn--not"
                  }
                >
                  {item.status === "Yuborildi"
                    ? t("bildirishnoma.arstatus.yangi")
                    : t("vosita.oqil")}
                </button>
              </TableCell>
              <TableCell align="center">
                <div className="button_modal button_modal_1">
                  <Link
                    to={handleNavigate(item)}
                    className="single_info"
                    onClick={() => handleClick(item)}
                  >
                    <img className="delete_icon" src={l1} alt="batafsil" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationMTable;

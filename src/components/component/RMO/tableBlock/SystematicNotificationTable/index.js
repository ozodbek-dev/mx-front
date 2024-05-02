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
import dayjs from "dayjs";
import { v4 } from "uuid";

const SystematicNotificationTable = ({
  data = [],
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
            <TableCell>{t("input.barkod")}</TableCell>
            <TableCell>{t("bildirishnoma.sana")}</TableCell>
            <TableCell align="center">{t("bildirishnoma.status")}</TableCell>
            <TableCell align="center">{t("bildirishnoma.harakat")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((el, index) => {
            return (
              <TableRow key={v4()}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{el.kirim_chiqim.id}</TableCell>
                <TableCell>{el.kirim_chiqim.kimdan_kelgan}</TableCell>
                <TableCell>{el.kirim_chiqim.unique_raqam}</TableCell>
                <TableCell>
                  {dayjs(el.kirim_chiqim.created_at, "DD.MM.YYYY").format(
                    "DD.MM.YYYY"
                  )}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                  align="center"
                >
                  <button
                    className={
                      el.kirim_chiqim.qabul_qilish_status === "qabul_qilindi"
                        ? "status_btn"
                        : "status_btn--not2"
                    }
                  >
                    {el.kirim_chiqim.qabul_qilish_status === "qabul_qilindi"
                      ? t("Qabul qilindi")
                      : t("bildirishnoma.arstatus.qabulnot")}
                  </button>
                </TableCell>
                <TableCell align="center">
                  <div className="button_modal button_modal_1">
                    <Link to={handleNavigate(el)} className="single_info">
                      <img className="delete_icon" src={l1} alt="batafsil" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SystematicNotificationTable;

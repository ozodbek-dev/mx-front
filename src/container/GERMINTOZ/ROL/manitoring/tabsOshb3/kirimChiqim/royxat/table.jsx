import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {Contextvalue} from "../../../../../../../context/context";

export default function StickyHeadTable() {
  const { t } = useTranslation();
  const { enter, exit } = React.useContext(Contextvalue);
  console.log(enter, exit);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>{t("bildirishnoma.single.nomi")}</TableCell>
              <TableCell>{t("vosita.vositaturi")}</TableCell>
              <TableCell>{t("bildirishnoma.single.seriyasi")}</TableCell>
              <TableCell>{t("vosita.miq")}</TableCell>
              <TableCell>{t("bildirishnoma.single.fayl")}</TableCell>
              <TableCell>{t("input.barkod")}</TableCell>
              <TableCell>{t("bildirishnoma.status")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enter ? (
              <TableRow>
                <TableCell>
                  {enter.vositalar &&
                    enter.vositalar.map((el) => el.vosita_nomi.nomi)}
                </TableCell>
                <TableCell>
                  {enter.vositalar &&
                    enter.vositalar.map((el) => el.vosita_turi.nomi)}
                </TableCell>
                <TableCell>
                  {enter.vositalar &&
                    enter.vositalar.map((el) => el.vosita_seryasi)}
                </TableCell>
                <TableCell>
                  {enter.vositalar &&
                    enter.vositalar.map((el) => el.vosita_miqdori)}
                </TableCell>
                <TableCell>
                  {enter.kirim?.file ? (
                    <a
                      href={`https://admin-mpbt.ssv.uz/static${enter.kirim.file}`}
                      target="_blank"
                      rel={"noreferrer"}
                    >
                      {t("Yuklab olish")}
                    </a>
                  ) : (
                    t("Fayl mavjud emas")
                  )}
                </TableCell>
                <TableCell>{enter.kirim && enter.kirim.unique_raqam}</TableCell>
                <TableCell>{enter.kirim && enter.kirim.status}</TableCell>
              </TableRow>
            ) : null}
            {exit ? (
              <TableRow>
                <TableCell>
                  {exit && exit.vositalar.map((el) => el.vosita_nomi.nomi)}
                </TableCell>
                <TableCell>
                  {exit && exit.vositalar.map((el) => el.vosita_turi.nomi)}
                </TableCell>
                <TableCell>
                  {exit && exit.vositalar.map((el) => el.vosita_seryasi)}
                </TableCell>
                <TableCell>
                  {exit && exit.vositalar.map((el) => el.vosita_miqdori)}
                </TableCell>
                <TableCell>
                  {exit.chiqim?.file ? (
                    <a
                      href={`https://admin-mpbt.ssv.uz/static${exit.chiqim.file}`}
                      target="_blank"
                      rel={"noreferrer"}
                    >
                      {t("Yuklab olish")}
                    </a>
                  ) : (
                    t("Fayl mavjud emas")
                  )}
                </TableCell>
                <TableCell>{exit && exit.chiqim.unique_raqam}</TableCell>
                <TableCell>{exit && exit.chiqim.status}</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

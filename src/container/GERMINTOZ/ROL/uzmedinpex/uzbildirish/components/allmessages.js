import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import l1 from "assets/icon/l1.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Allmessages({ data, value }) {
  const { t } = useTranslation();
  return (
    <TableContainer className="table-not" component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow style={{ backgroundColor: "white" }}>
            <TableCell>{t("bildirishnoma.soni")}</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>{t("bildirishnoma.single.kimdan")}</TableCell>
            <TableCell style={{ width: "250px" }}>
              {t("bildirishnoma.single.kimga")}
            </TableCell>
            <TableCell>{t("bildirishnoma.turi")}</TableCell>
            <TableCell>{t("bildirishnoma.sana")}</TableCell>
            <TableCell>{t("bildirishnoma.status")}</TableCell>
            <TableCell>{t("bildirishnoma.harakat")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((el, index) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{el.id}</TableCell>
                <TableCell>{el.kimdan}</TableCell>
                <TableCell>{el.kimga === "MOH" ? "SSV" : el.kimga}</TableCell>
                <TableCell>
                  {value === 0 ? t("vosita.erkin") : t("vosita.bola")}
                </TableCell>
                <TableCell>{el.sana}</TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <button
                    className={`${
                      el.status === "Yuborildi"
                        ? "status_btn"
                        : "status_btn--not"
                    }`}
                  >
                    {t(el.status)}
                  </button>
                </TableCell>
                <TableCell>
                  <Link
                    to={
                      value === 0
                        ? `/uzbilbol/${el.id}/?name=${el.qabul_qiluvchi}`
                        : `/uzbilbol/${el.id}`
                    }
                  >
                    <img src={l1} alt="l1" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Allmessages;

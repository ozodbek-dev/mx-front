import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {Link} from "react-router-dom";
import l4 from "assets/icon/l4.svg";
import l1 from "assets/icon/l1.svg";
import {useTranslation} from "react-i18next";

function Childrenslist({ data, setBemId, setSeans, classes }) {
  const { t } = useTranslation();
  return (
    <TableContainer style={{ marginTop: "24px" }} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow style={{ backgroundColor: "white" }}>
            <TableCell>{t("shifokor.number")}</TableCell>
            <TableCell align="left">{t("input.pfl")}</TableCell>
            <TableCell align="left">
              {t("shifokor.alladd.name")} {t("shifokor.alladd.surname")}{" "}
              {t("shifokor.alladd.otch")}
            </TableCell>
            <TableCell align="left">{t("shifokor.birthday")}</TableCell>
            <TableCell align="center">{t("shifokor.batafsil")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{row.JSHSHIR}</TableCell>
              <TableCell align="left">{`${row.familiya} ${row.ism} ${row.otasining_ismi}`}</TableCell>
              <TableCell align="left">{row.tugilgan_sana}</TableCell>
              <TableCell align="right">
                <div className="button_modal button_modal_1">
                  <Link
                    Link
                    to={`/mohsingle/${row.id}`}
                    className="single_info"
                  >
                    <img className="delete_icon" src={l1} alt="batafsil" />
                  </Link>
                  <div className="seans_div">
                    <Button
                      className="seanslar_btn_muassasa"
                      onClick={() => {
                        setBemId(row.id);
                        setSeans(true);
                      }}
                    >
                      <img src={l4} alt="..." />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Childrenslist;

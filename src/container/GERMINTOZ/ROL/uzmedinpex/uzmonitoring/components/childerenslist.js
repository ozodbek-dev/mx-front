
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import l1 from "assets/icon/l1.svg";
import l4 from "assets/icon/l4.svg";
import { Link } from "react-router-dom";
function Childrenslist({ data, t, Seansbemor }) {
  return (
    <TableContainer style={{ marginTop: "24px" }} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow style={{ backgroundColor: "white" }}>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("shifokor.number")}
            </TableCell>
            <TableCell align="left" style={{ fontWeight: "bold" }}>
              {t("input.pfl")}
            </TableCell>
            <TableCell align="left" style={{ fontWeight: "bold" }}>
              {t("shifokor.alladd.name")} {t("shifokor.alladd.surname")}{" "}
              {t("shifokor.alladd.otch")}
            </TableCell>
            <TableCell align="left" style={{ fontWeight: "bold" }}>
              {t("shifokor.birthday")}
            </TableCell>
            <TableCell align="left" style={{ fontWeight: "bold" }}></TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              {t("shifokor.batafsil")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{row.JSHSHIR}</TableCell>
              <TableCell align="left">{`${row.familiya} ${row.ism} ${row.otasining_ismi}`}</TableCell>
              <TableCell align="left">{row.tugilgan_sana}</TableCell>
              <TableCell align="center">{row.yosh}</TableCell>
              <TableCell align="right">
                <div className="button_modal button_modal_1">
                  <Link
                    Link
                    to={`/uzsinglechild/${row.id}`}
                    className="single_info"
                  >
                    <img className="delete_icon" src={l1} alt="batafsil" />
                  </Link>
                  <div className="seans_div">
                    <Button
                      className="seanslar_btn_muassasa"
                      onClick={() => Seansbemor(row.id)}
                    >
                      <img src={l4} alt="...." />
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

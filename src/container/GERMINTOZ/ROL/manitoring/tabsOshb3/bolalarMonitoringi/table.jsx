import {Button} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import l1 from "./../../../../../../assets/icon/l1.svg";
import l4 from "./../../../../../../assets/icon/l4.svg";
import Inspections from "./Inspections";
import {useState} from "react";

export default function BasicTable({ data }) {
  const { t } = useTranslation();
  const [modal, setModal] = useState({ modal: false, id: null });
  return (
    <div>
      <Inspections
        isOpen={modal.modal}
        id={modal.id}
        handleClose={() => setModal({ ...modal, id: null, modal: false })}
      />
      <TableContainer style={{ borderRadius: "12px" }} component={Paper}>
        <Table
          style={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">
                {t("bildirishnoma.single.soni")}
              </TableCell>
              <TableCell align="left">
                {t("input.pfl")} / {t("bola.gaz")}{" "}
              </TableCell>
              <TableCell align="left">{t("input.fio")}</TableCell>
              <TableCell align="left">{t("shifokor.birthday")}</TableCell>
              <TableCell align="left">{t("bola.yosh")}</TableCell>
              <TableCell align="left">{t("sidebar.li4")}</TableCell>
              <TableCell align="left">{t("bola.ms")}</TableCell>
              <TableCell align="center">{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">123321123321</TableCell>
                <TableCell align="left">
                  {item.familiya} {item.ism} {item.otasining_ismi}
                </TableCell>
                <TableCell align="left">{item.tugilgan_sana}</TableCell>
                {item.oy > 12 ? (
                  <TableCell align="left">{item.yosh}</TableCell>
                ) : (
                  <TableCell align="center">
                    {item.oy} {t("vosita.oy")}
                  </TableCell>
                )}
                <TableCell align="left">
                  {item.biriktirilgan_shifokor.familiyasi}{" "}
                  {item.biriktirilgan_shifokor.ismi}
                </TableCell>
                <TableCell align="left">
                  {item.biriktirilgan_muassasa.nomi}
                </TableCell>

                <TableCell align="left">
                  <div className="button_modal button_modal_1">
                    <Link to={`/bemor/${item.id}`} className="single_info">
                      <img className="delete_icon" src={l1} alt="batafsil" />
                    </Link>

                    <div className="seans_div">
                      <Button
                        className="seanslar_btn_muassasa"
                        onClick={() =>
                          setModal({ ...modal, modal: true, id: item.id })
                        }
                      >
                        <img src={l4} alt="" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

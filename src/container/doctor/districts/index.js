import React from "react";
import "./style.scss";
import l1 from "assets/icon/l1.svg";
import {useTranslation} from "react-i18next";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {Link} from "react-router-dom";
import {get} from "lodash";

const Districts = ({ data = [] }) => {
  const calculateTableColumns = ({ array = [], column }) => {
    return array.reduce((prev, curr) => prev + get(curr, column), 0);
  };
  const { t } = useTranslation();
  return (
    <div>
      <TableContainer className="moh-table-container" component={Paper}>
        <Table
          className="table-container"
          style={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="!font-700">
                {t("bildirishnoma.soni")}
              </TableCell>
              <TableCell className="!font-700">
                {t("bildirishnoma.single.muas")}
              </TableCell>
              <TableCell className="!font-700">
                {t("shifokor.shifokorlar")}
              </TableCell>
              <TableCell className="!font-700">
                {t("shifokor.bemorlar")}
              </TableCell>
              <TableCell className="!font-700">
                {t("bildirishnoma.harakat")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, index) => {
              return (
                <TableRow key={get(el, "muassasa")}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{get(el, "muassasa")}</TableCell>
                  <TableCell>{get(el, "shifokor_soni")}</TableCell>
                  <TableCell>{get(el, "bemor_soni")}</TableCell>
                  <TableCell>
                    <Link
                      to={`/ttb-family-medical-center/${get(
                        el,
                        "muassasa_id"
                      )}`}
                    >
                      <img src={l1} alt="nimadir" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className="total-row">
              <TableCell>{t("shifokor.jami")}</TableCell>
              <TableCell></TableCell>
              <TableCell>
                {calculateTableColumns({
                  array: data,
                  column: "shifokor_soni",
                })}
              </TableCell>
              <TableCell>
                {calculateTableColumns({
                  array: data,
                  column: "bemor_soni",
                })}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Districts;

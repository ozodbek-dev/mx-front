import React from "react";
import "./style.scss";
import l1 from "assets/icon/l1.svg";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const RegionsTable = ({ data = [], placeKey, path }) => {
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
              <TableCell style={{ fontWeight: "bold" }}>
                {t("bildirishnoma.soni")}
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {t("sbola.hudud")}
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {t("shifokor.shifokorlar")}
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {t("vosita.muas")}
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {t("shifokor.bemorlar")}
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {t("bildirishnoma.harakat")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((el, index) => {
              return (
                <TableRow key={get(el, placeKey)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{t(get(el, placeKey))}</TableCell>
                  <TableCell>{get(el, "shifokor_soni")}</TableCell>
                  <TableCell>{get(el, "muassasa_soni")}</TableCell>
                  <TableCell>{get(el, "bemor_soni")}</TableCell>
                  <TableCell>
                    <Link to={`${path}/${get(el, `${placeKey}_id`)}?tab=1`}>
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
                  column: "muassasa_soni",
                })}
              </TableCell>
              <TableCell>
                {calculateTableColumns({
                  array: data,
                  column: "bemor_soni",
                })}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RegionsTable;

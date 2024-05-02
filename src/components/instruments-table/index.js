import React, {useState} from "react";
import "./style.scss";
import l1 from "assets/icon/l1.svg";
import {useTranslation} from "react-i18next";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {get} from "lodash";
import InstrumentStatistcsModal
    from "../../pages/nefralogiya/moh-statistcs-table/components/instrument-statistcs-modal";

const Instruments = ({ data = [], url }) => {
  const [modal, setModal] = useState({ info: false, url: "" });

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
              <TableCell>{t("bildirishnoma.soni")}</TableCell>
              <TableCell>{t("vosita.vositaturi")}</TableCell>
              <TableCell>{t("bildirishnoma.kirim")}</TableCell>
              <TableCell>{t("bildirishnoma.chiqim")}</TableCell>
              <TableCell>{t("bildirishnoma.qoldiq")}</TableCell>
              <TableCell>{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, index) => {
              return (
                <TableRow key={get(el, "vosita_turi")}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{get(el, "vosita_turi")}</TableCell>
                  <TableCell>{get(el, "kirim")}</TableCell>
                  <TableCell>{get(el, "chiqim")}</TableCell>
                  <TableCell>{get(el, "qoldiq")}</TableCell>
                  <TableCell>
                    <img
                      onClick={() =>
                        setModal({
                          info: true,
                          url: `?${url}&vosita=${get(el, "vosita_id")}`,
                        })
                      }
                      src={l1}
                      alt="nimadir"
                    />
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
                  column: "kirim",
                })}
              </TableCell>
              <TableCell>
                {calculateTableColumns({
                  array: data,
                  column: "chiqim",
                })}
              </TableCell>
              <TableCell>
                {calculateTableColumns({
                  array: data,
                  column: "qoldiq",
                })}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {modal.info && (
        <InstrumentStatistcsModal
          handleClose={() => setModal({ ...modal, info: false, url: "" })}
          isOpen={modal.info}
          url={modal.url}
        />
      )}
    </div>
  );
};

export default Instruments;

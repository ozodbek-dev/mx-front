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

const MohStatistcsTable = () => {
  const data = [];
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
              <TableCell>No</TableCell>
              <TableCell>Hudud</TableCell>
              <TableCell>Shifokorlar</TableCell>
              <TableCell>Bolalar</TableCell>
              <TableCell>Vosita nomi</TableCell>
              <TableCell>Vosita turi</TableCell>
              <TableCell>Vosita miqdori</TableCell>
              <TableCell>Harakatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>
                    {el.buyurtma && el.buyurtma.yetgazib_beruvchi_firma_nomi}
                  </TableCell>
                  <TableCell>
                    {el.buyurtma && el.buyurtma.shartnoma_raqami}
                  </TableCell>
                  <TableCell>
                    {el.buyurtma &&
                      new Date(el.buyurtma.created_at).getFullYear()}
                    -
                    {el.buyurtma &&
                      new Date(el.buyurtma.created_at).getMonth() + 1}
                    -{el.buyurtma && new Date(el.buyurtma.created_at).getDate()}
                  </TableCell>
                  <TableCell>
                    {Math.round(
                      (el.partiyadan_kelgan_vosita_miqdori /
                        el.vosita_miqdori) *
                        100
                    ) === 0 && <div className="table-load"></div>}
                    {Math.round(
                      (el.partiyadan_kelgan_vosita_miqdori /
                        el.vosita_miqdori) *
                        100
                    ) > 60 && (
                      <div
                        style={{
                          width: `${
                            Math.round(
                              (el.partiyadan_kelgan_vosita_miqdori /
                                el.vosita_miqdori) *
                                100
                            ) + 50
                          }px`,
                        }}
                        className="table-width"
                      ></div>
                    )}
                    {Math.round(
                      (el.partiyadan_kelgan_vosita_miqdori /
                        el.vosita_miqdori) *
                        100
                    ) < 60 && (
                      <div
                        style={{
                          width: `${Math.round(
                            (el.partiyadan_kelgan_vosita_miqdori /
                              el.vosita_miqdori) *
                              100
                          )}px`,
                        }}
                        className="table-width--2"
                      ></div>
                    )}
                    {Math.round(
                      (el.partiyadan_kelgan_vosita_miqdori /
                        el.vosita_miqdori) *
                        100
                    )}
                    %
                  </TableCell>
                  <TableCell>
                    <Link to={`/ordersdetail/${el.buyurtma && el.buyurtma.id}`}>
                      <img src={l1} alt="nimadir" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className="total-row">
              <TableCell>Jami:</TableCell>
              <TableCell>322</TableCell>
              <TableCell>456</TableCell>
              <TableCell>456</TableCell>
              <TableCell>456</TableCell>
              <TableCell>456</TableCell>
              <TableCell>456</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MohStatistcsTable;

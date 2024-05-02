import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import l1 from "assets/icon/l1.svg";
function Ordersdata({ data }) {
  const { t } = useTranslation();
  return (
    <TableContainer style={{ borderRadius: "12px" }} component={Paper}>
      <Table
        className="table-container"
        style={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("bildirishnoma.single.soni")}
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("input.yt")}
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("input.shart")}
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("input.qs")}
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("input.pulmiq")}
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("input.data")}
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("input.qb")}
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              {t("bildirishnoma.harakat")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((el, index) => {
            return (
              <TableRow key={el.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{el.id}</TableCell>
                <TableCell>
                  {el.buyurtma && el.buyurtma.yetgazib_beruvchi_firma_nomi}
                </TableCell>
                <TableCell>
                  {el.buyurtma && el.buyurtma.shartnoma_raqami}
                </TableCell>
                <TableCell>
                  {el.buyurtma && el.buyurtma.created_at.split(" ")[0]}
                </TableCell>
                <TableCell>
                  {el.buyurtma && el.buyurtma.shartnomaning_umumiy_pul_miqdori}
                </TableCell>
                <TableCell>
                  {el.buyurtma && el.buyurtma.shartnoma_qilingan_sana}
                </TableCell>
                <TableCell>
                  {Math.round(
                    (el.partiyadan_kelgan_vosita_miqdori / el.vosita_miqdori) *
                      100
                  ) === 0 && <div className="table-load"></div>}
                  {Math.round(
                    (el.partiyadan_kelgan_vosita_miqdori / el.vosita_miqdori) *
                      100
                  ) >= 60 && (
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
                    (el.partiyadan_kelgan_vosita_miqdori / el.vosita_miqdori) *
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
                    (el.partiyadan_kelgan_vosita_miqdori / el.vosita_miqdori) *
                      100
                  )}
                  %
                </TableCell>

                <TableCell>
                  <Link to={`/ordersdetail/${el.buyurtma && el.buyurtma.id}`}>
                    <img src={l1} alt="..." />
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
export default Ordersdata;

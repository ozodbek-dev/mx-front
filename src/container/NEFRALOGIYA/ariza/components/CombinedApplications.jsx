import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import l1 from "assets/icon/l1.svg";
import useGet from "hooks/useGet";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const CombinedApplications = ({ search = "", setApplicationCount }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  useEffect(() => {
    setPage(1);
  }, [search]);
  const {
    data: { data = [], meta = {} },
  } = useGet({
    url: `/ariza/rmo/birlashtirish/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setApplicationCount(meta?.total);
    },
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "white" }}>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
              >
                {t("bildirishnoma.single.soni")}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
                align="center"
              >
                ID
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
                align="center"
              >
                {t("bildirishnoma.bil1")} ID
              </TableCell>

              <TableCell
                style={{
                  fontWeight: "bold",
                }}
                align="center"
              >
                {t("bildirishnoma.sana")}
              </TableCell>

              <TableCell
                style={{
                  fontWeight: "bold",
                }}
                align="center"
              >
                {t("input.vaqt")}
              </TableCell>

              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                }}
              >
                {t("bildirishnoma.harakat")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={v4()}>
                  <TableCell align="left">
                    {index + 1}
                    <div className="ariza_bgc"></div>
                  </TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.bildirishnoma_id}</TableCell>
                  <TableCell align="center">{item.sana}</TableCell>
                  <TableCell align="center">{item.date}</TableCell>
                  <TableCell align="center">
                    <div className="button_modal button_modal_1">
                      <Link
                        to={`/rolarizaRmo/${item.id}`}
                        className="single_info"
                      >
                        <img className="delete_icon" src={l1} alt="batafsil" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="table-pagination-content">
        <Pagination
          page={page}
          count={meta?.total_pages ?? 1}
          onChange={(e, page) => handleChangePage(page)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default CombinedApplications;

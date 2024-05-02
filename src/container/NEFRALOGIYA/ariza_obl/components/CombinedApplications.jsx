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
import usePagination from "hooks/usePagination";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CombinedApplications = ({ search = "", setApplicationCount }) => {
  const { t } = useTranslation();
  const { page, changePage } = usePagination();
  useEffect(() => {
    if (search) {
      changePage(1);
    }
  }, [search]);
  const {
    data: { data = [], meta = {} },
  } = useGet({
    url: `/ariza/vssb/birlashtirish/?page=${page}&search=${search}`,
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
              <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">{t("bildirishnoma.sana")}</TableCell>

              <TableCell align="center">{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.date}</TableCell>

                  <TableCell align="center">
                    <div className="button_modal button_modal_1">
                      <Link
                        to={`/rolarizabirlashtirish/${item.id}`}
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
          onChange={(e, page) => changePage(page)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default CombinedApplications;

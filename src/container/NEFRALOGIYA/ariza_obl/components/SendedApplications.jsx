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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Status from "./Status";
import usePagination from "hooks/usePagination";

const SendedApplications = ({ search = "", setApplicationCount }) => {
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
    url: `/ariza/vssb/mohgayuborish/?page=${page}&search=${search}`,
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
              <TableCell>ID</TableCell>
              <TableCell>{t("bildirishnoma.single.kimdan")}</TableCell>
              <TableCell>{t("bildirishnoma.sana")}</TableCell>
              <TableCell align="center">{t("bildirishnoma.status")}</TableCell>
              <TableCell>{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((el, index) => {
              return (
                <TableRow key={el.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.kimdan}</TableCell>
                  <TableCell>{el.date}</TableCell>
                  <TableCell>
                    {el.status === "O'qildi" ? (
                      <Status status={"O'qildi"} label={t("vosita.oqil")} />
                    ) : (
                      <Status status={"Yangi"} label={t("vosita.yubor")} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/sendariza/${el.id}`}>
                      <img src={l1} alt="eye" />
                    </Link>
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

export default SendedApplications;

import {
  Button,
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
import usePost from "hooks/usePost";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { get } from "lodash";
const ReceivedApplications = ({
  selectedApplications = [],
  selectApplication,
  isCombinedApplication,
  search = "",
  setApplicationCount,
}) => {
  const { t } = useTranslation();
  const { mutate } = usePost();
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
    url: `/ariza/rmo/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setApplicationCount(meta?.total);
    },
  });

  const isViewed = (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", "O'qildi");
    mutate({
      url: "/ariza/rmo/",
      data: formData,
      method: "put",
    });
  };
  const navigate = useNavigate();
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
              <TableCell align="center">
                {t("bildirishnoma.bil1")}
                {t("       ID")}
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
                {t("bildirishnoma.single.muas")}
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
                align="center"
                style={{
                  fontWeight: "bold",
                }}
              >
                {t("bildirishnoma.single.status")}
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
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "60px",
                        cursor: "pointer",
                      }}
                    >
                      {isCombinedApplication === true ? (
                        <input
                          className="check_box_inp_inner"
                          type="checkbox"
                          checked={selectedApplications?.some(
                            (el) => el.id === item.id
                          )}
                          onChange={(e) => selectApplication(item)}
                        />
                      ) : null}
                      <span>{index + 1}</span>
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.bildirishnoma_id}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.kimdan}</TableCell>
                  <TableCell align="center">{item.vaqti}</TableCell>

                  <TableCell align="center">
                    <button
                      className={
                        item.status !== "O'qildi"
                          ? "status_btn"
                          : "status_btn--not"
                      }
                    >
                      {item.status !== "O'qildi"
                        ? t("bildirishnoma.arstatus.yangi")
                        : t("vosita.oqil")}
                    </button>
                  </TableCell>

                  <TableCell align="center">
                    <div className="button_modal button_modal_1">
                      <Button
                        onClick={() => {
                          isViewed(
                            get(item, "id"),
                            get(item, "bildirishnoma_id")
                          );
                          navigate(`/rolariza/${item.id}`);
                        }}
                        className="single_info"
                      >
                        <img className="delete_icon" src={l1} alt="batafsil" />
                      </Button>
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

export default ReceivedApplications;

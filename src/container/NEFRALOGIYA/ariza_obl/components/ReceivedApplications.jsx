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
import Status from "./Status";
import usePagination from "hooks/usePagination";
import usePost from "hooks/usePost";
import { Link } from "react-router-dom";

const ReceivedApplications = ({
  selectedApplications = [],
  selectApplication,
  isCombinedApplication,
  search = "",
  setApplicationCount,
}) => {
  const { t } = useTranslation();
  const { mutate } = usePost();
  const { page, changePage } = usePagination();
  useEffect(() => {
    if (search) {
      changePage(1);
    }
  }, [search]);
  const {
    data: { data = [], meta = {} },
  } = useGet({
    url: `/ariza/vssb/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setApplicationCount(meta?.total);
    },
  });

  const isViewed = (id) => {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "O'qildi");
    mutate({
      url: "/ariza/vssb/",
      data: data,
    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "white" }}>
              <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">
                {t("bildirishnoma.single.kimdan")}
              </TableCell>
              <TableCell align="center">{t("bildirishnoma.sana")}</TableCell>
              <TableCell align="center">
                {t("bildirishnoma.single.status")}
              </TableCell>

              <TableCell align="center">{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell
                    align="center"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "60px",
                      cursor: "pointer",
                    }}
                  >
                    <p style={{ marginRight: "12px" }}>{index + 1}</p>
                    {isCombinedApplication === true ? (
                      <div className="check_inp_block">
                        <input
                          className="check_box_inp_inner"
                          type="checkbox"
                          name=""
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          checked={selectedApplications?.some(
                            (el) => el === item.id
                          )}
                          onChange={(e) =>
                            selectApplication(item.id, item.bildirishnoma_id)
                          }
                        />
                      </div>
                    ) : null}
                    <div className="ariza_bgc"></div>
                  </TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.kimdan}</TableCell>
                  <TableCell align="center">{item.vaqti}</TableCell>
                  <TableCell align="center">
                    {item.status !== "O'qildi" ? (
                      <Status
                        status={"Yangi"}
                        label={t("bildirishnoma.arstatus.yangi")}
                      />
                    ) : (
                      <Status status={"O'qildi"} label={t("vosita.oqil")} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <div className="button_modal button_modal_1">
                      <Link
                        to={`/rolarizasobl/${item.id}`}
                        className="single_info"
                        onClick={() => isViewed(item.id)}
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

export default ReceivedApplications;

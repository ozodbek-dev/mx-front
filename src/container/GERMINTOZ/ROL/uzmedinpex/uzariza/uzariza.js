import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { request } from "api/request";
import Loading from "components/loading/loading";
import { Contextvalue } from "context/context";
import useDebounce from "hooks/useDebounce";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import l1 from "../../../../../assets/icon/l1.svg";

const Uzariza = () => {
  const [value, setValue] = useState("");
  const [pagination, setPagination] = useState(1);
  const debounceVal = useDebounce(value, 1000);
  const params = +debounceVal
    ? `&filter[id]=${debounceVal}`
    : `&search=${debounceVal}`;
  const { t } = useTranslation();
  const { setCountes } = useContext(Contextvalue);
  const { data: applications, isLoading } = useGet({
    url: `/ariza/uzmedimpeks/?page=${pagination}` + params,
    enabled: pagination,
    debounceVal,
    params,
  });
  const { mutate } = usePost();
  const changeStatus = (id) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("status", "O'qildi");
    mutate({
      url: "/ariza/uzmedimpeks/",
      method: "put",
      data: formdata,
      onSuccess: () => {
        setCountes(true);
        setTimeout(() => {
          setCountes(false);
        }, 1500);
      },
    });
  };
  if (isLoading && !value) return <Loading />;
  return (
    <div style={{ marginTop: "28px", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{t("sidebar.li6")}</h2>
          <TextField
            className="search-ariza"
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("input.qidir")}
            style={{ marginLeft: "40px" }}
            id="standard-basic"
            variant="outlined"
            value={value}
            InputProps={{
              startAdornment: (
                <InputAdornment style={{ position: "absolute", right: "18px" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      <TableContainer className="table-not" component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "white" }}>
              <TableCell>{t("bildirishnoma.soni")}</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>{t("bildirishnoma.single.kimdan")}</TableCell>
              <TableCell>{t("input.ta")}</TableCell>
              <TableCell>{t("bildirishnoma.single.data")}</TableCell>
              <TableCell>{t("bildirishnoma.status")}</TableCell>
              <TableCell>{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.data?.map((el, index) => {
              return (
                <TableRow key={el.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>MOH</TableCell>
                  <TableCell style={{ width: "300px" }}>
                    {el.mavzu.length > 100
                      ? el.mavzu.slice(0, 100) + "..."
                      : el.mavzu}
                  </TableCell>
                  <TableCell>{get(el, "date")}</TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {get(el, "status") === "O'qildi" ? (
                      <button className="status_btn--not">
                        {t("vosita.oqil")}
                      </button>
                    ) : (
                      <button className="status_btn">
                        {t("bildirishnoma.arstatus.yangi")}
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/uzarizasin/${el.id}`}
                      onClick={() =>
                        get(el, "status") !== "O'qildi" && changeStatus(el.id)
                      }
                    >
                      <img src={l1} alt="uzariza" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack className="pagination-position" spacing={2}>
        <Pagination
          onChange={(e, value) => setPagination(value)}
          count={get(applications, "meta.total_pages")}
          size={"large"}
          color="primary"
          page={pagination}
        />
      </Stack>
    </div>
  );
};
export default Uzariza;

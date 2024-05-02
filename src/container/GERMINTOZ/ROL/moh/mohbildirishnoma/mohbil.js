import {
  Box,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import useDebounce from "hooks/useDebounce";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Uzbilmodal from "../../uzmedinpex/uzbildirish/uzbilmodal/uzbilmodal";
import Childrensmessage from "./mohcreat/components/childrensmessage";
import Freemessage from "./mohcreat/components/freemessage";
import Loading from "components/loading/loading";

const Mohbil = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    value: 0,
    value1: 0,
  });
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    freemessageaccepted: 1,
    freemessagesend: 1,
    childrenmessageaccepted: 1,
    childrenmessagesend: 1,
  });
  const [searchByDate, setSearchByDate] = useState(null);
  const [query, setQuery] = useState(searchParams);
  const debounceVal = useDebounce(searchValue, 500);
  let count_of_new_erkin = 0;
  let count_of_new_bol = 0;
  const {
    freemessageaccepted,
    freemessagesend,
    childrenmessageaccepted,
    childrenmessagesend,
  } = pagination;
  const { value, value1 } = query;
  const freemessageUrl =
    +value1 === 1 ? "/bildirishnoma/moh/erkin/" : "/bildirishnoma/erkin/MOHga/";
  const childrensmessageUrl =
    +value1 === 1
      ? "/bildirishnoma/respublika/"
      : "/bildirishnoma/respublikaga/";
  const params = `${
    +debounceVal ? "&filter[id]=" + debounceVal : "&search=" + debounceVal
  }`;
  const paramsDate = `${"&search=" + dayjs(searchByDate).format("DD.MM.YYYY")}`;
  const { data, isLoading } = useGet({
    url:
      freemessageUrl +
      `?page=${
        +value === 0 && +value1 === 0 ? freemessageaccepted : freemessagesend
      }${params ? params : ""}${searchByDate ? paramsDate : ""}`,
    enabled: pagination,
    searchByDate,
    debounceVal,
    value,
    value1,
    freemessagesend,
    freemessageaccepted,
    params,
  });
  const { data: childrensmessageData } = useGet({
    url:
      childrensmessageUrl +
      `?page=${
        +value === 2 && +value1 === 0
          ? childrenmessageaccepted
          : childrenmessagesend
      }${params ? params : ""}${searchByDate ? paramsDate : ""}`,
    enabled: pagination,
    searchByDate,
    debounceVal,
    value,
    value1,
    childrenmessageaccepted,
    childrenmessagesend,
    params,
  });
  const handleChange = (event, value) => {
    setQuery((prev) => ({ ...prev, value }));
    setSearchParams({ ...query, value });
  };
  const { t } = useTranslation();
  useEffect(() => {
    if (searchParams.get("value")) {
      setQuery((prev) => ({ ...prev, value: +searchParams.get("value") }));
    }
    if (searchParams.get("value1")) {
      setQuery((prev) => ({ ...prev, value1: +searchParams.get("value1") }));
    }
    setSearchParams(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div style={{ marginTop: "28px", padding: "20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>
            {t("input.bso")} :{" "}
            {value === 0
              ? get(data, "meta.total")
              : get(childrensmessageData, "meta.total")}
          </h2>
          <Box component={Stack} direction={"row"} gap={15}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <TextField
                className="search-ariza"
                placeholder={t("input.qidir")}
                style={{ marginLeft: "40px" }}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                id="standard-basic"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      style={{ position: "absolute", right: "18px" }}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />{" "}
              {!!searchValue && (
                <IconButton onClick={() => setSearchValue("")}>
                  <CloseOutlined />
                </IconButton>
              )}
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <DemoContainer
                components={["DatePicker"]}
                style={{
                  border: "none",
                  outline: "none",
                }}
              >
                <DatePicker
                  className="search-ariza"
                  onChange={(val) => setSearchByDate(val)}
                  value={searchByDate}
                  format="DD.MM.YYYY"
                />
              </DemoContainer>

              {!!searchByDate && (
                <IconButton onClick={() => setSearchByDate("")}>
                  <CloseOutlined />
                </IconButton>
              )}
            </Box>
          </Box>

          <div className="green_block">
            <Uzbilmodal />
          </div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            style={{ backgroundColor: "#fff", borderRadius: "12px" }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={t("vosita.erkin")} value={0} />
            {count_of_new_erkin && (
              <span
                style={{
                  fontWeight: "bold",
                  background: "blue",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "4px",
                  fontSize: "14px",
                }}
              >
                {}
              </span>
            )}

            <Tab label={t("vosita.bola")} value={2} />
            {!!count_of_new_bol &&
              +value1 ===
                0(
                  <span
                    style={{
                      fontWeight: "bold",
                      background: "blue",
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      color: "white",
                      textAlign: "center",
                      paddingTop: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {count_of_new_bol}
                  </span>
                )}
          </Tabs>
        </Box>
        {value === 0 && (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              style={{ backgroundColor: "#fff", borderRadius: "12px" }}
              value={value1}
              onChange={(e, value) => {
                setQuery((prev) => ({ ...prev, value1: value }));
                setSearchParams({ ...query, value1: value });
              }}
              aria-label="basic tabs example"
            >
              <Tab label={t("qabxar")} />
              <Tab label={t("yubxar")} />
            </Tabs>
          </Box>
        )}
        {value === 2 && (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              style={{ backgroundColor: "#fff", borderRadius: "12px" }}
              value={value1}
              onChange={(e, value) => {
                setQuery((prev) => ({ ...prev, value1: value }));
                setSearchParams({ ...query, value1: value });
              }}
              aria-label="basic tabs example"
            >
              <Tab label={t("qabxar")} />
              <Tab label={t("yubxar")} />
            </Tabs>
          </Box>
        )}
        <TableContainer className="table-not" component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow style={{ backgroundColor: "white" }}>
                <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>
                  {value1 === 0
                    ? t("bildirishnoma.single.kimdan")
                    : t("bildirishnoma.send")}
                </TableCell>
                <TableCell>{t("bildirishnoma.new.mud")}</TableCell>
                <TableCell>{t("bildirishnoma.sana")}</TableCell>
                <TableCell>{t("bildirishnoma.status")}</TableCell>
                <TableCell>{t("bildirishnoma.harakat")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value === 0 ? (
                <Freemessage data={data?.data} value={value} value1={value1} />
              ) : (
                <Childrensmessage
                  data={childrensmessageData?.data}
                  value={value}
                  value1={value1}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {+value === 0 && +value1 === 0 ? (
        // Erkin Xabarnoma
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(_e, value) =>
              setPagination((prev) => ({ ...prev, freemessageaccepted: value }))
            }
            count={get(data, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={freemessageaccepted}
          />
        </Stack>
      ) : +value === 0 && +value1 === 1 ? (
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(e, value) =>
              setPagination((prev) => ({ ...prev, freemessagesend: value }))
            }
            count={get(data, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={freemessagesend}
          />
        </Stack>
      ) : null}
      {+value === 2 && +value1 === 0 ? (
        // Bolalar Ehtiyoji va so'rovi
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(e, value) =>
              setPagination((prev) => ({
                ...prev,
                childrenmessageaccepted: value,
              }))
            }
            count={get(childrensmessageData, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={childrenmessageaccepted}
          />
        </Stack>
      ) : +value === 2 && +value1 === 1 ? (
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(e, value) =>
              setPagination((prev) => ({ ...prev, childrenmessagesend: value }))
            }
            count={get(childrensmessageData, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={childrenmessagesend}
          />
        </Stack>
      ) : null}
    </div>
  );
};
export default Mohbil;

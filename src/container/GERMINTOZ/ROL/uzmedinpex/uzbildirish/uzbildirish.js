import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  Pagination,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import useDebounce from "hooks/useDebounce";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Loading from "../../../../../components/loading/loading";
import Allmessages from "./components/allmessages";
import "./uzbildirish.scss";
import Uzbilmodal from "./uzbilmodal/uzbilmodal";
import CloseIcon from '@mui/icons-material/Close';
const Uzbildirish = () => {
  const [searchParams, setSearchParams] = useSearchParams({ value: 0 });
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();
  const [pagination, setPagination] = useState({
    freemessagecount: 1,
    childrenmessagecount: 1,
  });
  const debounceVal = useDebounce(search, 1000);
  const { t } = useTranslation();
  const { freemessagecount, childrenmessagecount } = pagination;
  const params = +debounceVal
    ? `&filter[id]=${debounceVal}`
    : `&search=${debounceVal}`;
  const { data: freemessageData, isLoading } = useGet({
    url:
      `/bildirishnoma/erkin/UzMedImpeksdanVSSBga/?page=${freemessagecount}` +
      params,
    enabled: freemessagecount,
    value,
    debounceVal,
  });
  const { data: childrenmessageData, isLoading: childrenspiner } = useGet({
    url: `/bildirishnoma/uzmedimpeks/?page=${childrenmessagecount}` + params,
    enabled: childrenmessagecount,
    value,
    debounceVal,
  });
  const handleChange = (event, newValue) => {
    setSearchParams({ value: newValue });
    setValue(newValue);
  };
  useEffect(() => {
    if (searchParams.get("value")) setValue(+searchParams.get("value"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && !search) return <Loading />;
  if (childrenspiner && !search) return <Loading />;
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
          <h2>
            {t("input.bso")}:{" "}
            {+value === 0
              ? get(freemessageData, "meta.total")
              : get(childrenmessageData, "meta.total")}
          </h2>

          <TextField
            className="search-ariza"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("input.qidir")}
            style={{ marginLeft: "40px" }}
            id="standard-basic"
            variant="outlined"
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="end"
                  style={{ position: "absolute", right: "10px", cursor: "pointer" }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                search && (
                  <InputAdornment
                    position="end"
                    style={{ position: "absolute", right: "-30px", cursor: "pointer" }}
                    onClick={() => {
                      setSearch(""); // Ma'lumotni tozalash
                    }}
                  >
                    <CloseIcon />
                  </InputAdornment>
                )
              ),
            }}
            inputProps={{
              style: {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "200px",
              },
            }}
          />


        </div>

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
          <Tab label={t("vosita.bola")} value={1} />
        </Tabs>
      </Box>
      {+value === 0 ? (
        <Allmessages data={freemessageData?.data} value={value} />
      ) : (
        <Allmessages data={childrenmessageData?.data} value={value} />
      )}
      {+value === 0 ? (
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(e, value) =>
              setPagination((prev) => ({ ...prev, freemessagecount: value }))
            }
            count={get(freemessageData, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={freemessagecount}
          />
        </Stack>
      ) : (
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(e, value) =>
              setPagination((prev) => ({
                ...prev,
                childrenmessagecount: value,
              }))
            }
            count={get(childrenmessageData, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={childrenmessagecount}
          />
        </Stack>
      )}
    </div>
  );
};
export default Uzbildirish;

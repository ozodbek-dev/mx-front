import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { TabContext } from "@mui/lab";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Box,
  Button,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import Loading from "components/loading/loading";
import useDebounce from "hooks/useDebounce";
import useGet from "hooks/useGet";
import { get } from "lodash";
import moment from "moment";
import qs from "qs";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./buyurtma.scss";
import Ordersdata from "./components";
import ClearIcon from "@mui/icons-material/Clear";

function Orders() {
  const [value, setValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const debaunceVal = useDebounce(searchValue, 500);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const locationValues = qs.parse(location.search.slice(1));
  const uzb = localStorage.getItem("uzb");
  const filterStatus = +value === 1 ? "active" : "done";
  const { data, isLoading } = useGet({
    url: `/omborxona/buyurtma/yaratish?vosita_status=${filterStatus}${
      debaunceVal ? `&search=${debaunceVal} ` : ""
    }`,
    enabled: value,
    debaunceVal,
  });
  useEffect(() => {
    if (locationValues.value) setValue(+locationValues.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading && !debaunceVal) return <Loading />;
  return (
    <div style={{ padding: "20px", paddingTop: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{t("input.bs1")}: </h2>
          <TextField
            className="search-ariza"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder={t("input.qidir")}
            style={{ marginLeft: "40px" }}
            id="standard-basic"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment style={{ position: "absolute", right: "18px" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {debaunceVal ? (
            <Button
              onClick={() => setSearchValue(null)}
              startIcon={<ClearIcon />}
            />
          ) : null}
        </div>
        <div className="green_block">
          {uzb ? (
            <Link to={"/createorder"}>
              <Button type="button" startIcon={<AddIcon />} variant="contained">
                {t("input.bq1")}
              </Button>
            </Link>
          ) : null}
          <CSVLink
            data={[get(data, "data")]?.flat()?.map((item) => ({
              ...item,
              buyurtma: {
                ...item?.buyurtma,
                created_at: moment(get(item, "buyurtma.created_at")).format(
                  "YYYY-MM-DD"
                ),
                shartnoma_qilingan_sana: moment(
                  get(item, "buyurtma.shartnoma_qilingan_sana")
                ).format("YYYY-MM-DD"),
              },
              qancha_bajarilgan:
                Math.round(
                  (item?.partiyadan_kelgan_vosita_miqdori /
                    item?.vosita_miqdori) *
                    100
                ) + "%",
            }))}
            headers={[
              { label: "ID", key: "id" },
              {
                label: "Yetkazib beruvchi kompaniya	",
                key: "buyurtma.yetgazib_beruvchi_firma_nomi",
              },
              { label: "Shartnoma Raqami", key: "buyurtma.shartnoma_raqami" },
              { label: "Qo'shilgan sana	", key: "buyurtma.created_at" },
              {
                label: "Shartnomaning umumiy pul miqdori	",
                key: "buyurtma.shartnomaning_umumiy_pul_miqdori",
              },
              {
                label: "Shartnoma qilingan sanasi	",
                key: "buyurtma.shartnoma_qilingan_sana",
              },
              { label: "Qanchaga bajarilgan	", key: "qancha_bajarilgan" },
            ]}
            filename="Buyurtmalar"
            className="excel_download"
            separator=";"
          >
            <Button
              style={{ backgroundColor: "#18CF6C", marginLeft: "20px" }}
              variant="contained"
              size="large"
              startIcon={<DescriptionIcon />}
              type="button"
            >
              {t("bola.excel")}
            </Button>
          </CSVLink>
        </div>
      </div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            aria-label="basic tabs example"
            onChange={(e, newValue) => {
              setValue(newValue);
              navigate(
                `${location.pathname}?${qs.stringify({ value: newValue })}`
              );
            }}
          >
            <Tab label={t("bildirishnoma.a")} value={1} />
            <Tab label={t("bildirishnoma.ba")} value={2} />
          </Tabs>
        </Box>
      </TabContext>
      <Ordersdata data={data?.data} />
    </div>
  );
}
export default Orders;

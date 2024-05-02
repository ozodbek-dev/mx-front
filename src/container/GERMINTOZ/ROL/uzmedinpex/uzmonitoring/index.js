import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Autocomplete,
  Button,
  Pagination,
  Paper,
  Stack,
  Tab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
import Koriklar from "components/component/seanslar/koriklar";
import dayjs from "dayjs";
import useGet from "hooks/useGet";
import useParamsall from "hooks/useParamsall";
import { get } from "lodash";
import "moment/locale/uz";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Upcomingdetail from "../../moh/mohvosita/components/upcomingdetail";
import Childrenslist from "./components/childerenslist";
import Outputmeans from "./components/outputmeans";
import Rawmaterials from "./components/rawmaterials";

const Monitoringtool = () => {
  const { t } = useTranslation();
  const [seans, setSeans] = useState(false);
  const [date, setDate] = useState(null);
  const [bemid, setBemid] = useState();
  const [close, setClose] = useState(false);
  const [value, setValue] = useState(0);
  const [pagination, setPagination] = useState({
    regionPage: 1,
    districtsPage: 1,
    organizationPage: 1,
  });
  const [inout, setInout] = useState({
    upcomingID: 0,
    outputID: 0,
  });
  const navigate = useNavigate();
  const { upcomingID, outputID } = inout;
  const { regionPage, districtsPage, organizationPage } = pagination;
  const { query, change } = useParamsall([
    "regionID",
    "districtID",
    "organizationID",
  ]);
  const paginationUrl =
    query?.regionID && !query?.districtID && !query?.organizationID
      ? regionPage
      : query?.districtID && !query?.organizationID
      ? districtsPage
      : query?.organizationID
      ? organizationPage
      : null;
  const baseUrl = `/omborxona/${
    localStorage.getItem("uzb") ? "uzmedimpeks" : "moh"
  }/vositalar/manitoringi?viloyat=${query?.regionID ? query?.regionID : ""}&${
    query?.districtID ? `tuman=${query?.districtID}` : ""
  }&${query?.organizationID ? `muassasa=${query?.organizationID}` : ""}${
    +value === 0 ? `&status=kirim` : `&status=chiqim`
  }${paginationUrl ? `&page=${paginationUrl}` : ""}${
    date ? `&date=${date}` : ""
  }`;

  const {
    data: { muassasalar: regions = [] },
  } = useGet({ url: "/user/respublika/viloyatlar/" });
  const {
    data: { muassasalar: districts = [] },
  } = useGet({
    url: `/user/respublika/tumanlar/${
      query?.regionID ? `?viloyat_id=${query?.regionID}` : ""
    }`,
    enabled: query?.regionID ? true : false,
  });
  const {
    data: { muassasalar: points = [] },
  } = useGet({
    url: `/user/respublika/muassasalar/${
      query?.districtID ? `?tuman_id=${query?.districtID}` : ""
    }`,
    enabled: query?.districtID,
  });
  const { data } = useGet({
    url: baseUrl,
    enabled: paginationUrl,
    query,
    date,
  });
  function Seansbemor(e) {
    setBemid(e);
    setSeans(true);
  }
  console.log(date);
  // console.log(!!query?.organizationID);
  return (
    <div className="prihod">
      <div className="prihod_top">
        <div className="prihod_top_inner">
          <h4 className="monitoring_top_inner_title">{t("sidebar.monitor")}</h4>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            margin: "28px 0 0 10px",
            alignItems: "center",
          }}
        >
          <div
            className=""
            style={{
              width: "100%",
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "10px",
            }}
          >
            <div className="">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.vlssv")}
              </h5>
              <Autocomplete
                options={regions}
                value={
                  query?.regionID
                    ? regions.find((item) => +item.id === +query?.regionID)
                    : ""
                }
                onChange={(_, value, reason) => {
                  change(get(value, "id", 0), "regionID");
                  if (reason === "clear") navigate(`/monitoringtool`);
                }}
                getOptionLabel={(option) => option.nomi || ""}
                renderInput={(params) => {
                  return <TextField {...params} label={t("VSSB")} placeholder={t("bola.add")} />;
                }}
              />
            </div>
            <div className="">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.tuman")}
              </h5>
              <Autocomplete
                options={districts.length ? districts : []}
                value={
                  query?.districtID
                    ? districts.find((item) => +item.id === +query?.districtID)
                    : ""
                }
                disabled={!query?.regionID || !districts.length}
                onChange={(_, value, reason) => {
                  change(get(value, "id", 0), "districtID");
                  setClose(false);
                  if (reason === "clear")
                    navigate(`?regionID=${query?.regionID}`);
                }}
                getOptionLabel={(option) => option.nomi || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("pdf.rmo")}
                    disabled={!query?.regionID || !districts.length}
                    placeholder={t("bola.add")}
                  />
                )}
              />
            </div>
            <div className="">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.single.vositainf")}
              </h5>
              <Autocomplete
                id="checkboxes-tags-demo"
                options={points}
                disabled={!query?.districtID}
                value={
                  query?.organizationID
                    ? points.find((item) => +item.id === +query?.organizationID)
                    : ""
                }
                onChange={(_, value, reason) => {
                  change(get(value, "id", 0), "organizationID");
                  if (reason === "clear")
                    navigate(
                      `?regionID=${query?.regionID}&districtID=${query?.districtID}`
                    );
                }}
                getOptionLabel={(option) => option.nomi || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("pdf.oshp")}
                    disabled={!query?.districtID}
                    placeholder={t("bola.add")}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      {!query?.organizationID && (
        <div className="prihod_block">
          <div className="prihod_block_inner">
            <div className="prihod_block_inner_top">
              <h4 className="prihod_block_inner_title">{t("input.sps")}</h4>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DatePicker
                  format="DD.MM.YYYY"
                  onChange={(e) => setDate(dayjs(e).format("YYYY-MM-DD"))}
                  value={date}
                />
                {date ? (
                  <Button
                    onClick={() => setDate(null)}
                    startIcon={<ClearIcon />}
                  />
                ) : null}
              </div>
              <Tabs
                style={{ backgroundColor: "#fff" }}
                value={value}
                onChange={(e = null, value) => setValue(value)}
                aria-label="basic tabs example"
              >
                <Tab label={t("bildirishnoma.kirim")} />
                <Tab label={t("bildirishnoma.chiqim")} />
              </Tabs>
            </div>
            <div
              className="prihod_block_inner_middle"
              style={{ overflowY: "scroll", height: "500px" }}
            >
              <div className="card_blocks">
                {value === 0 ? (
                  <Rawmaterials
                    data={data?.data}
                    t={t}
                    setInout={setInout}
                    setClose={setClose}
                  />
                ) : (
                  <Outputmeans
                    query={query?.districtID}
                    data={data?.data}
                    t={t}
                    setInout={setInout}
                    setClose={setClose}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="prihod_block_inner">
            <div className="kirim_right_inner_top">
              <h4>{t("input.kr")}</h4>
              <Button
                onClick={() => setClose(false)}
                variant="contained"
                startIcon={<CloseIcon />}
              >
                {t("input.yop")}
              </Button>
            </div>
            {close ? (
              <div className="kirim_right_inner_bottom">
                <div className="kirim_right_inner_bottom_bottom">
                  <TableContainer
                    style={{ borderRadius: "12px" }}
                    component={Paper}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            {t("Vosita nomi")}
                          </TableCell>
                          <TableCell align="center">
                            {t("Vosita Turi")}
                          </TableCell>
                          <TableCell align="center">
                            {t("Vosita Seriyasi")}
                          </TableCell>
                          <TableCell align="center">
                            {t("bildirishnoma.single.miqdori")}
                          </TableCell>
                          <TableCell align="center">
                            {t("input.barkod")}
                          </TableCell>
                          <TableCell align="center">{t("input.yuk")}</TableCell>
                          <TableCell align="center">
                            {t("Rasm Yuklash")}
                          </TableCell>
                          <TableCell align="center">
                            {t("bildirishnoma.status")}
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      {+value === 0 && upcomingID ? (
                        <Upcomingdetail
                          baseUrl={baseUrl}
                          status={value}
                          enter={upcomingID}
                        />
                      ) : null}
                      {+value === 1 && outputID ? (
                        <Upcomingdetail
                          baseUrl={baseUrl}
                          status={value}
                          enter={outputID}
                        />
                      ) : null}
                    </Table>
                  </TableContainer>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {query?.organizationID ? (
        <Childrenslist data={data?.data} t={t} Seansbemor={Seansbemor} />
      ) : null}
      <div className="modal_seans">
        <Koriklar open={seans} id={bemid} handleClose={() => setSeans(false)} />
      </div>
      {query?.regionID && !query?.districtID && !query?.organizationID ? (
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(_e, value) =>
              setPagination((prev) => ({ ...prev, regionPage: value }))
            }
            count={get(data, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={regionPage}
          />
        </Stack>
      ) : null}
      {query?.districtID && !query?.organizationID ? (
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(_e, value) =>
              setPagination((prev) => ({ ...prev, districtsPage: value }))
            }
            count={get(data, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={districtsPage}
          />
        </Stack>
      ) : null}
      {query?.organizationID ? (
        <Stack className="pagination-position" spacing={2}>
          <Pagination
            onChange={(_e, value) =>
              setPagination((prev) => ({ ...prev, organizationPage: value }))
            }
            count={get(data, "meta.total_pages")}
            size={"large"}
            color="primary"
            page={organizationPage}
          />
        </Stack>
      ) : null}
    </div>
  );
};
export default Monitoringtool;

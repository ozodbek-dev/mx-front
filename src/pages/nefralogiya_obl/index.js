import React, { useState } from "react";
import DataTable from "./datatable";
import "./style.scss";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RegionsTable from "../../components/regions-table";
import useGet from "hooks/useGet";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import qs from "qs";
import { useTranslation } from "react-i18next";

const Index = () => {
  const {
    data: { data = [] },
  } = useGet({ url: "/omborxona/manitoring/vssb" });
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("1");
  const handleChange = (v) => {
    setTab(v);
    navigate(
      `${pathname}?${qs.stringify({ ...qs.parse(search.slice(1)), mtab: v })}`
    );
  };
  React.useEffect(() => {
    if (searchParams.get("mtab")) {
      setTab(searchParams.get("mtab"));
    }
  }, []);
  return (
    <div className="content">
      <Box sx={{ width: "100%", typography: "body1", padding: "30px" }}>
        <TabContext value={tab}>
          <Box sx={{}}>
            <TabList
              onChange={(e, v) => handleChange(v)}
              aria-label="lab API tabs example"
              className="n-tabs"
            >
              <Tab label={t("Asosiy menyu")} value="1" />
              <Tab label={t("Hududlar")} value="2" />
            </TabList>
            <TabPanel value="1" className="!p-0">
              <DataTable />
            </TabPanel>
            <TabPanel value="2" className="!p-0">
              <RegionsTable
                data={data}
                placeKey={"tuman"}
                path={`/vssb-district-instruments`}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default Index;

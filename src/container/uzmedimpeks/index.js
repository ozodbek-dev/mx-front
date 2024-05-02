import React, { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RegionsTable from "components/regions-table";
import useGet from "hooks/useGet";
import Uzmedimpeks from "./uzmedimpeks";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [tab, setTab] = useState("1");
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const handleChange = (e = null, v) => {
    setSearchParams({ value: v });
    setTab(v);
  };
  useEffect(() => {
    if (searchParams.get("value")) setTab(searchParams.get("value"));
  }, []);
  const { data = [] } = useGet({ url: "/omborxona/manitoring/moh" });
  return (
    <div className="content">
      <Box sx={{ width: "100%", typography: "body1", padding: "30px" }}>
        <TabContext value={tab}>
          <Box sx={{}}>
            <TabList
              onChange={(e, v) => handleChange(e, v)}
              aria-label="lab API tabs example"
              className="n-tabs"
            >
              <Tab label={t("sbola.hudud")} value="1" />
              <Tab label={t("sidebar.li1")} value="2" />
            </TabList>
            <TabPanel value="1" style={{ padding: 0 }}>
              <RegionsTable
                data={data?.data}
                placeKey={"viloyat"}
                path={`/moh-region-instruments`}
              />
            </TabPanel>
            <TabPanel value="2" style={{ padding: 0 }}>
              <Uzmedimpeks />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default Index;

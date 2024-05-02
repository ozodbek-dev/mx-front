import * as React from "react";
import {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BasicTableBildirishnoma from "./bildirishnomaTable";
import BasicTableErkin from "./erkinXabarnoma";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import qs from "qs";
import {TabContext, TabPanel} from "@mui/lab";

export default function BasicTabsBildirishnoma() {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("1");
  const handleTabChange = (v) => {
    setTab(v);
    navigate(
      `${pathname}?${qs.stringify({ ...qs.parse(search.slice(1)), tab: v })}`
    );
  };
  useEffect(() => {
    if (searchParams.get("tab")) {
      setTab(searchParams.get("tab"));
    }
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={tab}>
        <Tabs
          value={tab}
          onChange={(_, v) => handleTabChange(v)}
          className="n-tab-header"
        >
          <Tab
            className="n-tab-header-item"
            value={"1"}
            label={t("vosita.erkin")}
          />
          <Tab
            className="n-tab-header-item"
            value={"2"}
            label={t("vosita.bola")}
          />
        </Tabs>
        <TabPanel style={{ padding: 0 }} value={"1"}>
          <BasicTableBildirishnoma />
        </TabPanel>
        <TabPanel style={{ padding: 0 }} value={"2"}>
          <BasicTableErkin />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

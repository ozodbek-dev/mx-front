import { TabContext, TabList, TabPanel } from "@mui/lab";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import BasicTable from "./doriTable";
import BasicTableVitamin from "./vitaminTable";
import { useState } from "react";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (tab) => {
    setValue(tab);
  };
  const { t } = useTranslation();
  return (
    <TabContext value={value}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(_, v) => handleChange(v)}
            aria-label="basic tabs example"
          >
            <Tab
              value={"1"}
              label={t("bildirishnoma.shuoy")}
              {...a11yProps(0)}
            />
            <Tab
              value={"2"}
              label={t("bildirishnoma.otoy")}
              {...a11yProps(1)}
            />
          </TabList>
        </Box>
        <TabPanel className="!p-0" value="1">
          <BasicTable />
        </TabPanel>
        <TabPanel className="!p-0" value="2">
          <BasicTableVitamin />
        </TabPanel>
      </Box>
    </TabContext>
  );
}

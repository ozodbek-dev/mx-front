import { TabContext, TabList, TabPanel } from "@mui/lab";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useTab from "hooks/useTab";
import { useTranslation } from "react-i18next";
import BasicTableBildirishnoma from "./bildirishnomaTable";
import BasicTableErkin from "./erkinXabarnoma";

export default function BasicTabsBildirishnoma() {
  const { t } = useTranslation();

  const { handleTabChange, tab } = useTab();
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(_, t) => handleTabChange(t)}
            aria-label="basic tabs example"
          >
            <Tab value={"1"} label={t("vosita.erkin")} />
            <Tab value={"2"} label={t("vosita.bola")} />
          </TabList>
        </Box>
        <TabPanel value={"1"} className="!p-0">
          <BasicTableErkin />
        </TabPanel>
        <TabPanel value={"2"} className="!p-0">
          <BasicTableBildirishnoma />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

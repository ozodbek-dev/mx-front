import { Box, Pagination, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TabContext, TabPanel } from "@mui/lab";
import Kirim from "./kirim";
import Chiqim from "./chiqim";
import { useState } from "react";

const KirimChiqim = ({ searchValue }) => {
  const { t } = useTranslation();
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
      className=""
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <div className="header_r">
        <h2>{t("input.sps")}</h2>
      </div>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t("bildirishnoma.kirim")} {...a11yProps(0)} />
              <Tab label={t("bildirishnoma.chiqim")} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={0} index={0}>
            <Kirim searchValue={searchValue} />
          </TabPanel>
          <TabPanel value={1} index={1}>
            <Chiqim searchValue={searchValue} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default KirimChiqim;

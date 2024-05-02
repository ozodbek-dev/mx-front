import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import BasicTableBildirishnoma from "./bildirishnomaTable";
import BasicTableErkin from "./erkinXabarnoma";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabsBildirishnoma() {
  const [value, setValue] = React.useState({
    value: "2",
    value1: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (event, newValue) => {
    setValue((prev) => ({ ...prev, value1: newValue }));
    setSearchParams({ ...value, value1: newValue });
  };
  React.useEffect(() => {
    if (searchParams.get("value1"))
      setValue((prev) => ({ ...prev, value1: +searchParams.get("value1") }));
  }, []);
  console.log(value);
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "100%", height: "620px!important", overflowX: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value.value1}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            style={{ fontSize: "12px" }}
            label={t("vosita.erkin")}
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: "12px" }}
            label={t("vosita.bola")}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value.value1} index={0}>
        <BasicTableErkin />
      </TabPanel>
      <TabPanel value={value.value1} index={1}>
        <BasicTableBildirishnoma />
      </TabPanel>
    </Box>
  );
}

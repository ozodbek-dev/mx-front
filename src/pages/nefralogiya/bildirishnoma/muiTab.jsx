import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicTableBildirishnoma from "./bildirishnomaTable";
import BasicTableErkin from "./erkinXabarnoma";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";
import {TabContext} from "@mui/lab";

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
        <Box sx={{ p: 0 }}>
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

export default function TabsBildirishnoma() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = React.useState({
    tab: "2",
    value: 0,
  });

  const handleChange = (event, newValue) => {
    setSearchParams({ ...value, value: newValue });
    setValue((prev) => ({ ...prev, value: newValue }));
  };
  React.useEffect(() => {
    if (searchParams.get("tab")) {
      setValue((prev) => ({ ...prev, value: searchParams.get("tab") }));
    }
    setValue((prev) => ({ ...prev, value: +searchParams.get("value") }));
  }, []);
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value.tab}>
        <Tabs
          value={value.value}
          onChange={handleChange}
          className="n-tab-header"
        >
          <Tab
            label={t("vosita.erkin")}
            className="n-tab-header-item"
            {...a11yProps(0)}
          />
          <Tab
            label={t("vosita.bola")}
            className="n-tab-header-item"
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value.value} className={"!p-0"} index={0}>
          <BasicTableErkin />
        </TabPanel>
        <TabPanel value={value.value} className={"!p-0"} index={1}>
          <BasicTableBildirishnoma />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicTableBildirishnoma from "./bildirishnomaTable";
import BasicTableErkin from "./erkinXabarnoma";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import qs from "qs";

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

export default function BasicTabsBildirishnoma() {
  const [value, setValue] = React.useState(0);
  const { pathname, search } = useLocation();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(
      `${pathname}?${qs.stringify({
        ...qs.parse(search.slice(1)),
        tab: newValue,
      })}`
    );
  };
  React.useEffect(() => {
    if (searchParams.get("tab")) {
      setValue(+searchParams.get("tab"));
    }
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          className="n-tab-header"
          aria-label="basic tabs example"
        >
          <Tab
            className="n-tab-header-item"
            label={t("vosita.erkin")}
            {...a11yProps(0)}
          />
          <Tab
            className="n-tab-header-item"
            label={t("vosita.bola")}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicTableErkin />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BasicTableBildirishnoma />
      </TabPanel>
    </Box>
  );
}

import React, { useState } from "react";
// import "./style.scss";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useGet from "hooks/useGet";
import Doctor from "./doctor";
import Districts from "./districts";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import qs from "qs";

const Index = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("1");
  const {
    data: { data = [] },
  } = useGet({ url: "/omborxona/manitoring/ttb" });
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
  const { t } = useTranslation();
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
              <Tab label={t("Muassasalar")} value="2" />
            </TabList>
            <TabPanel value="1" style={{ padding: 0 }}>
              <Doctor />
            </TabPanel>
            <TabPanel value="2" style={{ padding: 0 }}>
              <Districts
                data={data}
                placeKey={"viloyat"}
                path={`/moh-region-instruments`}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default Index;

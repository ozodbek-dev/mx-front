import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";

import { useTranslation } from "react-i18next";
import { customUrl } from "utils/urlswitcher";
import Instruments from "../../../../components/instruments-table";
import RegionsTable from "../../../../components/regions-table";

const Index = () => {
  const [tab, setTab] = useState("1");
  const { region_id } = useParams();
  const { data = [] } = useGet({
    url: `/omborxona/manitoring/${customUrl()}?viloyat=${region_id}`,
  });
  const regions = get(data, "data[0].tumanlar", []);
  console.log("🚀 ~ file: index.js:21 ~ Index ~ regions:", regions);
  const instruments = get(data, "data[0].vositalar", []);
  const { t } = useTranslation();

  const navigate = useNavigate();
  return (
    <div className="content">
      <Box sx={{ width: "100%", typography: "body1", padding: "30px" }}>
        <div>
          <Button
            variant="contained"
            className="site-btn"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            {t("bildirishnoma.single.ortga")}
          </Button>
        </div>
        <TabContext value={tab}>
          <Box sx={{ marginTop: "12px" }}>
            <TabList
              onChange={(e, v) => setTab(v)}
              aria-label="lab API tabs example"
              className="n-tabs"
            >
              <Tab label={t("bildirishnoma.tuman1")} value="1" />
              <Tab label={t("bildirishnoma.single.vosi")} value="2" />
            </TabList>
            <TabPanel value="1" style={{ padding: 0 }}>
              <RegionsTable
                data={regions} 
                placeKey={"tuman"}
                path={`/moh-district-instruments/${region_id}`}
              />
            </TabPanel>
            <TabPanel value="2" style={{ padding: 0 }}>
              <Instruments data={instruments} url={`viloyat=${region_id}`} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default Index;

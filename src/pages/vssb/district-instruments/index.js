import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Instruments from "components/instruments-table";
import Districts from "./districts";
import "./style.scss";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  const [tab, setTab] = useState("1");
  const { district_id } = useParams();
  const {
    data: { data = [] },
  } = useGet({
    url: `/omborxona/manitoring/vssb?tuman=${district_id}`,
  });
  const districts = get(data, "[0].tumanlar", []);
  const instruments = get(data, "[0].vositalar", []);
  const navigate = useNavigate();
  return (
    <div className="content">
      <Box sx={{ width: "100%", typography: "body1", padding: "30px" }}>
        <div>
          <Button onClick={() => navigate(-1)}>
            {t("bildirishnoma.single.ortga")}
          </Button>
        </div>
        <TabContext value={tab}>
          <Box sx={{}}>
            <TabList
              onChange={(e, v) => setTab(v)}
              aria-label="lab API tabs example"
              className="n-tabs"
            >
              <Tab label={t("vosita.muas")} value="1" />
              <Tab label={t("bildirishnoma.single.vosi")} value="2" />
            </TabList>
            <TabPanel value="1" style={{ padding: 0 }}>
              <Districts data={districts} />
            </TabPanel>
            <TabPanel value="2" style={{ padding: 0 }}>
              <Instruments data={instruments} url={`tuman=${district_id}`} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default Index;

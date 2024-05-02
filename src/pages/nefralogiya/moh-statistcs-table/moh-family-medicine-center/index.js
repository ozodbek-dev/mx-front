import React, { useState } from "react";
import "./style.scss";
import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useGet from "hooks/useGet";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import Patients from "./patients";
import Instruments from "../../../../components/instruments-table";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Index = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("1");
  const { region_id, district_id, medical_id } = useParams();

  const { data = [] } = useGet({
    url: `/omborxona/manitoring/moh?viloyat=${region_id}&tuman=${district_id}&muassasa=${medical_id}`,
  });

  const navigate = useNavigate();

  const patients = get(data, "data[0].bolalar", []);
  const instruments = get(data, "data[0].vositalar", []);
  return (
    <div className="content">
      <Box sx={{ width: "100%", typography: "body1", padding: "30px" }}>
        <div>
          <Button
            className="site-btn"
            variant="contained"
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
              <Tab label={t("shifokor.bemorlar")} value="1" />
              <Tab label={t("bildirishnoma.single.vosi")} value="2" />
            </TabList>
            <TabPanel value="1" style={{ padding: 0 }}>
              <Patients data={patients} />
            </TabPanel>
            <TabPanel value="2" style={{ padding: 0 }}>
              <Instruments
                data={instruments}
                url={`viloyat=${region_id}&tuman=${district_id}&muassasa=${medical_id}`}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default Index;

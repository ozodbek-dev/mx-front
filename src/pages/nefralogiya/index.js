import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Tab} from "@mui/material";
import useGet from "hooks/useGet";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import RegionsTable from "../../components/regions-table";
import DataTable from "./datatable";
import "./style.scss";
import {useTranslation} from "react-i18next";

const Index = () => {
  const [tab, setTab] = useState("2");
  const { data = [], refetch } = useGet({ url: "/omborxona/manitoring/moh" });
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e, v) => {
    setSearchParams({ tab: v });
    setTab(v);
  };
  useEffect(() => {
    if (searchParams.get("tab")) {
      setTab(searchParams.get("tab"));
      refetch();
    }
  }, []);
  const { t } = useTranslation();
  return (
    <div className="content">
      <Box sx={{ width: "100%", typography: "body1", padding: "30px" }}>
        <TabContext value={tab}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            className="n-tabs"
          >
            <Tab label={t("Asosiy menyu")} value={"2"} />
            <Tab label={t("Xududlar")} value={"1"} />
          </TabList>
          <TabPanel value={"1"} style={{ padding: 0 }}>
            <RegionsTable
              data={data?.data}
              placeKey={"viloyat"}
              path={`/moh-region-instruments`}
            />
          </TabPanel>
          <TabPanel value={"2"} style={{ padding: 0 }}>
            <DataTable />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Index;

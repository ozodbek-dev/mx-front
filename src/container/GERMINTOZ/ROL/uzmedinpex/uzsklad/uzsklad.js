import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Modal,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { request } from "../../../../../api/request";
import l1 from "../../../../../assets/icon/l1.svg";
import Loading from "../../../../../components/loading/loading";
import "./uzsklad.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  background: "white",
  pt: 2,
  px: 4,
  pb: 3,
};
function Uzsklad() {
  const [data, setData] = useState({ loding: false, error: false, data: [] });
  const [opens2, setOpens2] = useState(false);
  const [value, setValue] = useState(1);
  const [detail, setDetail] = useState([]);
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    request.get("/omborxona/uzmedimpeks/malumotlar", config).then((data) => {
      setData({ loading: true, error: false, data: data.data });
    });
  }, []);
  const handlerClick = (e) => {
    request
      .get(`/omborxona/vositalar/moh?vosita=${e}`, config)
      .then((data) => setDetail(data.data))
      .catch((err) => {
        throw err;
      });
    if (!opens2) setDetail([]);
    setOpens2(true);
  };
  // if (!data.loading) return <Loading />;

  return (
    <TabContext value={value}>
      <div
        style={{
          marginTop: "34px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      >
        <Link to={"/"}>
          <Button
            className="site-btn"
            startIcon={<ArrowBackIcon />}
            variant="contained"
          >
            {t("bildirishnoma.single.ortga")}
          </Button>
        </Link>

        <TableContainer style={{ marginTop: "25px" }} component={Paper}>
          <Table
            className="modal-m1"
            style={{ minWidth: 650, padding: "20px", borderRadius: "12px" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {t("bildirishnoma.single.soni")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("bildirishnoma.single.nomi")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {t("bildirishnoma.qoldig")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {t("bildirishnoma.kirim")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {t("bildirishnoma.chiqim")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {t("bildirishnoma.qoldiq")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {t("shifokor.kont")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {t("bildirishnoma.harakat")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data?.otgan_oy_qoldiq?.data ? (
                data.data.otgan_oy_qoldiq?.data.map((el, index) => {
                  return (
                    <TableRow key={el.vosita_id}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell>{el.vosita_nomi}</TableCell>
                      <TableCell>{el.otgan_oy_qoldiq}</TableCell>
                      <TableCell align="left">
                        {data.data &&
                          data.data.hozirgi_oy_kirim.data[index].kirim}
                      </TableCell>
                      <TableCell align="left">
                        {data.data &&
                          data.data.hozirgi_oy_chiqim.data[index].chiqim}
                      </TableCell>
                      <TableCell align="left">
                        {data.data &&
                          data.data.shu_oy_mavjud.data[index].shu_oy_qoldiq}
                      </TableCell>
                      <TableCell align="left">
                        {data.data &&
                          data.data.shartnoma_boyicha_miqdor.data[index]
                            .shartnoma_boyicha_miqdor}
                      </TableCell>
                      <TableCell align="left">
                        <button onClick={() => handlerClick(el.vosita_id)}>
                          <img src={l1} alt="detail" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <h2>{t("input.mavjud")}</h2>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="modal_manitoring_seans">
          <Modal keepMounted open={opens2} onClose={() => setOpens2(false)}>
            <Box className="modal-one" sx={{ ...style }}>
              <div
                className="seans_modal"
                style={{ height: "90vh", overflowY: "auto" }}
              >
                <TabList
                  style={{ marginBottom: "20px", borderBottom: "1px solid" }}
                  onChange={handleChange}
                >
                  <Tab label={t("bildirishnoma.kirim")} value={1} />
                  <Tab label={t("bildirishnoma.chiqim")} value={2} />
                </TabList>
                <h4 className="seans_modal_title">{t("vosita.mal")}</h4>

                <TabPanel value={1}>
                  {detail.shu_oy_kirim ? (
                    detail.shu_oy_kirim?.map((el, index) => {
                      return (
                        <div key={el?.id} className="seans_modal_inner">
                          <div className="seans_modal_inner_top">
                            <p className="seans_modal_inner_desc">
                              {index + 1}
                            </p>
                          </div>
                          <div className="seans_modal_inner_bottom">
                            <div className="seans_modal_inner_bottom_left">
                              <p className="">
                                {t("bildirishnoma.single.nomi")}
                              </p>
                              <p className="">{t("vosita.vositaturi")}</p>
                              <p className="">
                                {t("bildirishnoma.single.seriyasi")}
                              </p>
                              <p className="">{t("vosita.miq")}</p>
                              <p className="">{t("bildirishnoma.sana")}</p>
                            </div>
                            <div className="seans_modal_inner_bottom_left">
                              <p className="">
                                {el?.vosita_nomi.nomi || t("input.mavjud")}
                              </p>
                              <p className="">
                                {el?.vosita_turi.nomi || t("input.mavjud")}
                              </p>
                              <p className="">
                                {el?.vosita_seryasi || t("input.mavjud")}
                              </p>
                              <p className="">
                                {el?.vosita_miqdori || t("input.mavjud")}
                              </p>
                              <p className="">
                                {el?.created_at?.split("T")[0] ||
                                  t("input.mavjud")}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h2>{t("input.mavjud")}</h2>
                  )}
                </TabPanel>
                <TabPanel value={2}>
                  {detail?.shu_oy_chiqim ? (
                    detail?.shu_oy_chiqim?.map((el, index) => {
                      return (
                        <div key={index} className="seans_modal_inner">
                          <div className="seans_modal_inner_top">
                            <p className="seans_modal_inner_desc">
                              {index + 1}
                            </p>
                          </div>
                          <div className="seans_modal_inner_bottom">
                            <div className="seans_modal_inner_bottom_left">
                              <p className="">
                                {t("bildirishnoma.single.nomi")}
                              </p>
                              <p className="">{t("vosita.vositaturi")}</p>
                              <p className="">
                                {t("bildirishnoma.single.seriyasi")}
                              </p>
                              <p className="">{t("vosita.miq")}</p>
                              <p className="">Chiqim qilingan sana</p>
                            </div>
                            <div className="seans_modal_inner_bottom_left">
                              <p className="">{el.vosita_nomi.nomi}</p>
                              <p className="">{el.vosita_turi.nomi}</p>
                              <p className="">{el.vosita_seryasi}</p>
                              <p className="">{el.vosita_miqdori}</p>
                              <p className="">{el.created_at.split("T")[0]}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h2>{t("input.mavjud")}</h2>
                  )}
                </TabPanel>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </TabContext>
  );
}
export default Uzsklad;

import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
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
  Tabs,
  TextField,
} from "@mui/material";
import { get } from "lodash";
import { Fragment, useEffect, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { request } from "../../../../api/request";
import l1 from "../../../../assets/icon/l1.svg";
import Chiqimvsb from "./chiqimvsb";
import "./omborhona.scss";
import useGet from "hooks/useGet";

export default function Oblsklad() {
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
  const [opens2, setOpens2] = useState(false);
  const [value, setValue] = useState(0);
  const [detail, setDetail] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [searchValue, setSearchValue] = useState("");

  const handlerDetail = (e) => {
    setIsLoading(true);
    request
      .get(`omborxona/vositalar/vssb?vosita=${e}`, config)
      .then((data) => {
        setDetail(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          window.location.reload();
          alert("Ma'lumotlar ba'zada mavjud emas!");
        }
        setIsLoading(false);
      });
    setOpens2(true);
  };

  const { data } = useGet({ url: "/omborxona/vssb/malumotlar" });

  const excelData = useMemo(() => {
    let result = [];
    let hozirgi_oy_kirim = get(data, "hozirgi_oy_kirim.data");
    let otgan_oy_qoldiq = get(data, "otgan_oy_qoldiq.data");
    let shu_oy_mavjud = get(data, "shu_oy_mavjud.data");
    get(data, "hozirgi_oy_chiqim.data", []).forEach((item, index) => {
      result.push({
        ...item,
        ...hozirgi_oy_kirim[index],
        ...otgan_oy_qoldiq[index],
        ...shu_oy_mavjud[index],
      });
    });
    return result;
  }, [data]);

  return (
    <div className="" style={{ paddingRight: "20px" }}>
      <div className="sklad_top_block">
        <div className="sklad_top_block_inner">
          <h1 className="sklad_title">{t("sidebar.li3")}</h1>
          <TextField
            id="outlined-basic"
            label={t("bildirishnoma.doriq")}
            variant="outlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="sklad_top"></div>
        </div>
        <div className="sklad_top_block_inner">
          <Link to={"/kirim_viloyat"}>
            <Button
              variant="contained"
              // color="primary"
              size="large"
              startIcon={<HistoryIcon />}
            >
              {t("bildirishnoma.kir")}
            </Button>
          </Link>

          <Chiqimvsb />
          <CSVLink
            data={excelData}
            headers={[
              { label: "Vosita nomi", key: "vosita_nomi" },
              { label: "O'tgan oyning qoldig'i", key: "otgan_oy_qoldiq" },
              { label: "Kirim", key: "kirim" },
              { label: "Chiqim", key: "chiqim" },
              { label: "Qoldiq", key: "shu_oy_qoldiq" },
            ]}
            filename="Omborxona"
            separator=";"
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<DescriptionIcon />}
            >
              {t("bola.excel")}
            </Button>
          </CSVLink>
        </div>
      </div>

      <div className="sklad">
        <h2 className="sklad-head">{t("jihoz.j10")}</h2>
        <TableContainer style={{ borderRadius: "12px" }} component={Paper}>
          <Table
            style={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  {t("bildirishnoma.single.soni")}
                </TableCell>
                <TableCell align="center">
                  {t("bildirishnoma.single.nomi")}
                </TableCell>
                <TableCell align="center">
                  {t("bildirishnoma.qoldig")}
                </TableCell>
                <TableCell align="center">{t("bildirishnoma.kirim")}</TableCell>
                <TableCell align="center">
                  {t("bildirishnoma.chiqim")}
                </TableCell>
                <TableCell align="center">
                  {t("bildirishnoma.qoldiq")}
                </TableCell>
                <TableCell align="center">
                  {t("bildirishnoma.harakat")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.otgan_oy_qoldiq?.data &&
                data.otgan_oy_qoldiq?.data
                  .filter((item) =>
                    item.vosita_nomi
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .map((el, index) => {
                    return (
                      <Fragment key={el.id}>
                        <TableRow>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{el.vosita_nomi}</TableCell>
                          <TableCell align="center">
                            {el?.otgan_oy_qoldiq}
                          </TableCell>
                          <TableCell align="center">
                            {data.hozirgi_oy_kirim?.data &&
                              data.hozirgi_oy_kirim?.data[index].kirim}
                          </TableCell>
                          <TableCell align="center">
                            {data.hozirgi_oy_chiqim?.data &&
                              data.hozirgi_oy_chiqim?.data[index].chiqim}
                          </TableCell>
                          <TableCell align="center">
                            {data.shu_oy_mavjud &&
                              data.shu_oy_mavjud.data[index].shu_oy_qoldiq}
                          </TableCell>
                          <TableCell align="center">
                            <Link
                              to="#"
                              onClick={() => handlerDetail(el.vosita_id)}
                            >
                              <img src={l1} alt="..." />
                            </Link>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="modal_manitoring_seans">
        <Modal
          keepMounted
          open={opens2}
          onClose={() => setOpens2(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box className="modal-one" sx={{ ...style }}>
            <div
              className="seans_modal"
              style={{ height: "90vh", overflowY: "auto" }}
            >
              <Tabs
                style={{ marginBottom: "20px", borderBottom: "1px solid" }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label={t("bildirishnoma.kirim")} />
                <Tab label={t("bildirishnoma.chiqim")} />
              </Tabs>
              <h4 className="seans_modal_title">{t("vosita.mal")}</h4>
              <h1>{isLoading ? "Yuklanmoqda..." : ""}</h1>
              <div>
                {value === 0 && detail.shu_oy_kirim?.length
                  ? detail.shu_oy_kirim.map((el, index) => {
                      return (
                        <div className="seans_modal_inner">
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
                              <p className="">{t("Yaratilgan Sanasi")}</p>
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
                  : ""}
                <h1>
                  {!isLoading &&
                  detail?.shu_oy_kirim?.length === 0 &&
                  value === 0
                    ? "Kirimlar mavjud emas"
                    : ""}
                </h1>
              </div>
              <div>
                {value === 1 && detail.shu_oy_chiqim?.length
                  ? detail.shu_oy_chiqim?.map((el, index) => {
                      return (
                        <div className="seans_modal_inner">
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
                  : ""}
                <h1>
                  {" "}
                  {!isLoading &&
                  detail?.shu_oy_chiqim?.length === 0 &&
                  value === 1
                    ? "Chiqimlar mavjud emas"
                    : ""}
                </h1>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

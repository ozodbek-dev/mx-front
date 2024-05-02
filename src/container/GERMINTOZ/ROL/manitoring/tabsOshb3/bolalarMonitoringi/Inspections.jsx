import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import CloseIcon from "assets/icon/Close.png";
import EyeIcon from "assets/icon/l1.svg";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
// import PersonalInfo from "./personalInfo";
import dayjs from "dayjs";

const Inspections = ({ isOpen, id, handleClose = () => {} }) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState({ data: [], open: false });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    borderRadius: "10px",
    bgcolor: "#EFF2F5",
    boxShadow: 24,
    p: 4,
  };

  const { data, isLoading } = useGet({
    url: `/korik/bola/malumotlari/${id}`,
    enabled: id,
    initialState: { bola_malumoti: {}, koriklar_hammasi: [] },
  });
  const { koriklar_hammasi } = data;
  console.log(koriklar_hammasi, isLoading);
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          {modal.open ? (
            <div className="inspections-container">
              <button
                className="close-button"
                onClick={() => setModal({ ...modal, data: [], open: false })}
              >
                <img src={CloseIcon} alt="close-icon" />
              </button>
              <h2 className="inspections-box-title">{t("Vositalar")}</h2>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 600 }} align="left">
                        {t("Vosita nomi")}
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }} align="left">
                        {t("Vosita turi")}
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }} align="left">
                        {t("Vosita seriyasi")}
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }} align="left">
                        {t("Vosita miqdori")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {get(modal, "data", []).map((row) => (
                      <TableRow
                        key={get(row, "id")}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {get(row, "vosita_nomi.nomi")}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {get(row, "vosita_turi.nomi")}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {get(row, "vosita_seriyasi")}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {get(row, "vosita_miqdori")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div className="inspections-container">
              <button className="close-button" onClick={handleClose}>
                <img src={CloseIcon} alt="close-icon" />
              </button>
              {isLoading ? (
                `${t("Yuklanmoqda")}...`
              ) : (
                <div>
                  <h2 className="inspections-box-title">{t("Ko'riklar")}</h2>
                  <div className="inspections-content">
                    {koriklar_hammasi.map((item, index) => {
                      return (
                        <div className="inspection-box" key={index}>
                          <div className="inspection-box-header">
                            <div className="inspection-box-title">
                              #{index + 1} {t("ko'rik")}
                            </div>
                            <div
                              className="inspection-box-header-view-icon"
                              onClick={() =>
                                setModal({
                                  ...modal,
                                  open: true,
                                  data: get(item, "vositalar"),
                                })
                              }
                            >
                              <img src={EyeIcon} alt="Eye icon" />
                            </div>
                          </div>
                          <div className="inspection-box-table">
                            <div className="grid grid-cols-2 inspection-box-table-col">
                              <div className="f-bold ">
                                {t("Ko'rik sanasi")}
                              </div>
                              <div className="">
                                {dayjs(get(item, "korik.created_at")).format(
                                  "DD.MM.YYYY"
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 inspection-box-table-col">
                              <div className="f-bold">
                                {t("Shifokor F.I.O")}
                              </div>
                              <div>
                                {get(item, "korik.bola_shifokori.ismi")}{" "}
                                {get(item, "korik.bola_shifokori.familiyasi")}{" "}
                                {get(item, "korik.bola_shifokori.otasini_ismi")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {!isLoading && koriklar_hammasi?.length === 0 ? (
            <div>{t("Ko'riklar mavjud emas")}</div>
          ) : null}

          {!isLoading && modal.data?.lenght === 0 ? (
            <div>{t("Vositalar mavjud emas")}</div>
          ) : null}
        </div>
      </Box>
    </Modal>
  );
};

export default Inspections;

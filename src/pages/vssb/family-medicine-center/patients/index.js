import l1 from "assets/icon/l1.svg";
import l4 from "assets/icon/l4.svg";
import {useState} from "react";
import "./style.scss";
import {useTranslation} from "react-i18next";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,} from "@mui/material";
import {get} from "lodash";
import DoctorExaminations from "./doctor-examinations";
import PatientInfo from "./patient-info";

const Patients = ({ data = [] }) => {
  // const { region_id, district_id, medical_id } = useParams();
  // const calculateTableColumns = ({ array = [], column }) => {
  //   return array.reduce((prev, curr) => prev + get(curr, column), 0);
  // };
  const [modal, setModal] = useState({
    info: false,
    data: {},
    doctorExamination: false,
  });
  const { t } = useTranslation();
  return (
    <div>
      <TableContainer className="moh-table-container" component={Paper}>
        <Table
          className="table-container"
          style={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>{t("bildirishnoma.soni")}</TableCell>
              <TableCell>{t("input.pfl")}</TableCell>
              <TableCell>{t("input.fio")}</TableCell>
              <TableCell>{t("shifokor.birthday")}</TableCell>
              <TableCell>{t("shifokor.tel")}</TableCell>
              <TableCell>{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, index) => {
              return (
                <TableRow key={get(el, "id")}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{get(el, "JSHSHIR")}</TableCell>
                  <TableCell>
                    {get(el, "ism")} {get(el, "familiya")}
                  </TableCell>
                  <TableCell>{get(el, "tugilgan_sana")}</TableCell>
                  <TableCell>
                    {get(el, "tel_raqami")
                      ? get(el, "tel_raqami")
                      : t("bola.kir")}
                  </TableCell>
                  <TableCell>
                    <div className="action-btn">
                      <Tooltip
                        title={t("bildirishnoma.batafsil")}
                        placement="top"
                      >
                        <img
                          onClick={() =>
                            setModal({ ...modal, info: true, data: el })
                          }
                          src={l1}
                          alt="nimadir"
                        />
                      </Tooltip>
                      <Tooltip title={"Ko'riklar"} placement="top">
                        <img
                          onClick={() =>
                            setModal({
                              ...modal,
                              doctorExamination: true,
                              data: el,
                            })
                          }
                          src={l4}
                          alt="nimadir"
                        />
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PatientInfo
        isOpen={modal.info}
        data={modal.data}
        handleClose={() => setModal({ ...modal, info: false })}
      />
      <DoctorExaminations
        isOpen={modal.doctorExamination}
        id={get(modal, "data.id")}
        handleClose={() => setModal({ ...modal, doctorExamination: false })}
      />
    </div>
  );
};

export default Patients;

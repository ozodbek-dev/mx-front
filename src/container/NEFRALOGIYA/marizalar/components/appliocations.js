import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import l1 from "assets/icon/l1.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Applications({ data, tab }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Table
        // className={classes.table}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow style={{ backgroundColor: "white" }}>
            <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
            <TableCell align="left">ID</TableCell>

            <TableCell align="left">{t("bildirishnoma.sana")}</TableCell>
            {tab === "3" ? (
              <TableCell align="center">
                {t("bildirishnoma.single.status")}
              </TableCell>
            ) : null}
            <TableCell align="center">{t("bildirishnoma.harakat")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((el, index) => {
            return (
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "60px",
                    cursor: "pointer",
                  }}
                >
                  <p>{index + 1}</p>

                  <div className="ariza_bgc"></div>
                </TableCell>
                <TableCell align="left">{el.id}</TableCell>

                <TableCell align="left">{el.date}</TableCell>
                {tab === "3" ? (
                  <TableCell align="center">
                    <button
                      className={
                        el.status === "Yuborildi"
                          ? "status_btn"
                          : "status_btn--not"
                      }
                    >
                      {el.status === "Yuborildi"
                        ? t("vosita.yubor")
                        : t("vosita.oqil")}
                    </button>
                  </TableCell>
                ) : null}

                <TableCell align="center">
                  <div className="button_modal button_modal_1">
                    <button
                      onClick={() => {
                        tab === "3"
                          ? navigate(`/ariza/${el.id}/send`)
                          : navigate(`/combinedapplication/${el.id}`);
                      }}
                      className="single_info"
                    >
                      <img className="delete_icon" src={l1} alt="batafsil" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
export default Applications;

import { TableCell, TableRow } from "@mui/material";
import useGet from "hooks/useGet";
import { useTranslation } from "react-i18next";
function Upcomingdetail({ baseUrl, enter, status }) {
  const { data } = useGet({
    url: baseUrl + `${enter ? `&id=${enter}` : ""}`,
    enabled: enter,
  });
  const { t } = useTranslation();
  return (
    <>
      {data?.map((el) => {
        return (
          <TableRow key={el.id}>
            <TableCell align="center">
              {el.vosita_nomi && el.vosita_nomi.nomi}
            </TableCell>
            <TableCell align="center">
              {el.vosita_turi && el.vosita_turi.nomi}
            </TableCell>
            <TableCell align="center">{el.vosita_seryasi}</TableCell>
            <TableCell align="center">{el.vosita_miqdori}</TableCell>
            <TableCell align="center">
              {+status === 0 ? t("input.mavjud") : el.kirim_chiqim.unique_raqam}
            </TableCell>
            <TableCell align="center">
              {+status === 0 ? t("input.mavjud") : el.kirim_chiqim.comment}
            </TableCell>

            <TableCell align="center">
              {+status === 0 ? (
                t("input.mavjud")
              ) : el?.fayl ? (
                <a
                  style={{ border: "none" }}
                  className="div-1"
                  href={`https://admin-mpbt.ssv.uz/static${el?.kirim_chiqim?.image}`}
                  download
                >
                  {el?.fayl?.fayl} {t("yuk")}
                </a>
              ) : (
                t("input.mavjud")
              )}
            </TableCell>
            <TableCell>{+status === 0 ? t("Kirim") : t("Chiqim")}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default Upcomingdetail;

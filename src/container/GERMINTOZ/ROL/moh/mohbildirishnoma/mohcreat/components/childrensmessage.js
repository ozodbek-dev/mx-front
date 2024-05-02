import { TableCell, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import l1 from "assets/icon/l1.svg";
import usePost from "hooks/usePost";

function Childrensmessage({ data, value1, value }) {
  const { t } = useTranslation();
  const { mutate } = usePost();
  console.log(data);
  const statusChange = (id) => {
    if (value1 === 0) {
      const formdata = new FormData();
      formdata.append("id", id);
      formdata.append("status", "O'qildi");
      mutate({
        url: "/bildirishnoma/respublikaga/",
        data: formdata,
        method: "post",
      });
    }
  };
  return (
    <>
      {data?.map((el, index) => {
        return (
          <TableRow key={el.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{el.id}</TableCell>
            <TableCell>{value1 === 0 ? el.kimdan : el.kimga}</TableCell>
            <TableCell>{el?.muddati}</TableCell>
            <TableCell>{el?.sana}</TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
            >
              <button
                className={
                  el.status === "Yuborildi" ? "status_btn" : "status_btn--not"
                }
              >
                {el.status !== "O'qildi"
                  ? value1 === 1
                    ? t("vosita.yubor")
                    : t("bildirishnoma.arstatus.yangi")
                  : t("vosita.oqil")}
              </button>
            </TableCell>
            <TableCell>
              <Link
                to={`/mohbilbol/${el.id}?value=${value}&value1=${value1}`}
                onClick={() => statusChange(el.id)}
              >
                <img src={l1} alt="" />
              </Link>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default Childrensmessage;

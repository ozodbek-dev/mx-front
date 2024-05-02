import { TableCell, TableRow } from "@mui/material";
import l1 from "assets/icon/l1.svg";
import usePost from "hooks/usePost";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Freemessage({ data = [], value1, value }) {
  const { mutate } = usePost();

  const { t } = useTranslation();
  const handleView = (id) => {
    const formdata = new FormData();
    formdata.append("status", "O'qildi");
    formdata.append("id", id);
    mutate({
      url: "/bildirishnoma/erkin/MOHga/",
      data: formdata,
      method: "put",
    });
  };
  return data.map((el, index) => {
    return (
      <TableRow key={uuidv4()}>
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
              el.status !== "O'qildi" ? "status_btn" : "status_btn--not"
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
            to={`/mohbilerkin/${el.id}/${el.qabul_qiluvchi}?value=${value}&value1=${value1}`}
            onClick={() => handleView(el.id)}
          >
            <img src={l1} alt="..." />
          </Link>
        </TableCell>
      </TableRow>
    );
  });
}

export default Freemessage;

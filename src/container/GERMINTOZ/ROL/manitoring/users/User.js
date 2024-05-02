import useGet from "hooks/useGet";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

function User() {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    data: { users = [] },
  } = useGet({ url: `/user/tuman/?muassasa_id=${id}` });
  console.log(
    users?.sort((a, b) => (a.user_id > b.user_id ? 1 : -1)),
    "ueserasdfasdfasdf"
  );
  return (
    <div>
      <div className="div_m">
        <div
          style={{ height: "800px", overflowY: "scroll", marginTop: 0 }}
          className="tablisa"
        >
          <span>{t("vosita.foy")}</span>
          {users
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((el, index) => { 
              return (
                <div key={index} className="body" style={{ marginTop: "30px" }}>
                  <span>N{index + 1}</span>
                  <div className="div">
                    <div className="left"> {t("vosita.nomi")}</div>
                    <div className="rigth">{el.username}</div>
                  </div>
                  <div className="div">
                    <div className="left">{t("vosita.parol")}</div>
                    <div className="rigth">{el.user_password}</div>
                  </div>
                  <div className="div">
                    <div className="left">{t("Yaratilgan vaqti")}</div>
                    <div className="rigth">
                      {" "}
                      {dayjs(el.expire_date).format("DD.MM.YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default User;

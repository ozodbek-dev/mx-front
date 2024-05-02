import { Pagination } from "@mui/material";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Contextvalue } from "context/context";
import img1 from "assets/icon/Kirim.svg";
import img from "assets/icon/l1.svg";
import { useParams } from "react-router-dom";

const Kirim = ({ searchValue }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  const { setEnter } = useContext(Contextvalue);

  const {
    data: { kirim: { data = [], meta = {} } = {} },
  } = useGet({
    url: `/omborxona/ttb/kirim/chiqim/malumotlar?page=${page}&search=${searchValue}`,
  });
  const handlerEdit = (e) => {
    setEnter(data.find((el) => el.kirim.id === e));
  };

  return (
    <div>
      <div style={{ height: "550px", overflowY: "scroll" }}>
        {data
          ?.filter((el) => +get(el, "kirim.tuman") === +id)
          ?.map((el) => {
            return (
              <div className="box_kirim" style={{ marginBottom: "10px" }}>
                <div className="jami">
                  <img src={img1} alt="" />
                  {t("shifokor.jami")}:{" "}
                  {el.vositalar.map((item) => item.vosita_miqdori)}
                </div>
                <div className="box_xs">
                  <div className="btn">
                    <button>
                      {t("bildirishnoma.single.nomi")}:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {get(
                          el,
                          "vositalar[0].vosita_nomi.nomi",
                          t("Kiritilmagan")
                        )}
                      </span>
                    </button>
                    <button className="btn_gap">
                      {t("vosita.vositaturi")}:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {get(
                          el,
                          "vositalar[0].vosita_turi.nomi",
                          t("Kiritilmagan")
                        )}
                      </span>
                    </button>
                  </div>
                  <div className="data">
                    <div className="time">{el.kirim.created_at}</div>
                    <div className="icon">
                      <button onClick={() => handlerEdit(el.kirim.id)}>
                        <img src={img} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="table-pagination-content">
        <Pagination
          page={page}
          count={meta?.total_pages ?? 1}
          onChange={(e, page) => handleChangePage(page)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Kirim;

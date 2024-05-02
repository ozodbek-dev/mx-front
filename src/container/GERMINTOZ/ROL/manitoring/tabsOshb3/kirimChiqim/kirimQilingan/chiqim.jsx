import { Pagination } from "@mui/material";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Contextvalue } from "context/context";
import img2 from "assets/icon/chiqim.svg";
import img from "assets/icon/l1.svg";

const Chiqim = ({ searchValue }) => {
  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  const {
    data: { chiqim: { data = [], meta = {} } = {} },
  } = useGet({
    url: `/omborxona/ttb/kirim/chiqim/malumotlar?page=${page}&search=${searchValue}`,
  });
  const { t } = useTranslation();
  const { setExit } = useContext(Contextvalue);
  const handlerVision = (e) => {
    setExit(data.find((el) => el.chiqim.id === e));
  };
  return (
    <div>
      <div style={{ height: "550px", overflowY: "scroll" }}>
        {data.map((el) => {
          return (
            <div className="box_kirim">
              <div className="jami">
                <img src={img2} alt="" />
                {t("shifokor.jami")}:{" "}
                {el.vositalar.map((item) => item.vosita_miqdori)}
              </div>
              <div className="box_xs">
                <div className="btn">
                  <button>
                    {t("vosita.vositaturi")}:{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {get(
                        el,
                        "vositalar[0].vosita_turi.nomi",
                        t("Kiritilmagan")
                      )}
                    </span>
                  </button>
                  <button className="btn_gap">
                    {t("bildirishnoma.single.nomi")}:{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {get(
                        el,
                        "vositalar[0].vosita_nomi.nomi",
                        t("Kiritilmagan")
                      )}
                    </span>
                  </button>
                </div>
                <div className="data">
                  <div className="time">{el.chiqim.created_at}</div>
                  <div className="icon">
                    <button onClick={() => handlerVision(el.chiqim.id)}>
                      <img src={img} alt="213dlkafmnskjfn" />
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

export default Chiqim;

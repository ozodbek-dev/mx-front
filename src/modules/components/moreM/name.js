import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {request} from "../../../api/request";
import Loading from "../../../components/loading/loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Error from "../../../Error/Error";
import {useTranslation} from "react-i18next";

function Name() {
  const { t } = useTranslation();
  const params = useParams();
  const [data, setData] = useState({ loading: false, data: [], error: false });
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("token", token);

  useEffect(() => {
    formData.append("yil", new Date().getFullYear());
    formData.append("oy", new Date().getMonth() + 1);
    formData.append("mahsulot_turi", params.name);
    formData.append("muassasa_id", localStorage.getItem("parid"));
    request
      .post("/omborxona/mahsulotmuassasa/", formData)
      .then((data) =>
        setData({ loading: true, error: false, data: data.data.data })
      )
      .catch((err) => {
        setData({ error: true, loading: false });
        throw err;
      });
  }, []);

  const time = data.data && data.data[data.data.length - 1];
  if (data.error) return <Error />;
  if (!data.loading) return <Loading />;

  return (
    <>
      <Link to={`/more/${params.name}`}>
        <Button
          style={{
            marginTop: "24px",
            marginLeft: "20px",
            marginBottom: 0,
            backgroundColor: "#DDEBFB",
            borderRadius: "12px",
            color: "#1464C0",
          }}
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          {t("bildirishnoma.single.ortga")}
        </Button>
      </Link>
      <h2 style={{ marginLeft: "20px" }}>
        {"Eng so'ngi qo'shilgan vaqti :"}{" "}
        {time && time.partiya.sanasi.split(" ")[0]}
      </h2>
      <TableContainer
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "24px",
          width: "98%",
        }}
        component={Paper}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>№</b>
              </TableCell>
              <TableCell align="center">
                <b>{t("vosita.vositaturi")}</b>
              </TableCell>
              <TableCell align="center">
                <b>{t("sbola.olchov")}</b>
              </TableCell>
              <TableCell align="center">
                <b>{t("bildirishnoma.kirim")}</b>
              </TableCell>

              <TableCell align="center">
                <b>Sanasi</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data &&
              data.data.map((el, index) => {
                return (
                  <TableRow>
                    <TableCell align="center">
                      <b>{index + 1}</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>{el.nomi}</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>{el.olchov_birligi}</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>{el.miqdori}</b>
                    </TableCell>

                    <TableCell align="center">
                      <b>{el.partiya.sanasi.split(" ")[0]}</b>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Name;

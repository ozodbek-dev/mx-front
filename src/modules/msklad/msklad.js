import {Fragment, useEffect, useState} from "react";
import {request} from "../../api/request";
import Error from "../../Error/Error";
import "./sklads.scss";
import Loading from "../../components/loading/loading";
import l1 from '../../assets/icon/l1.svg';
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useTranslation} from "react-i18next";

function  Msklad() {
  const { t } = useTranslation();
    const params = useParams()
    const [data, setData] = useState({
      loading: false,
      data: [],
      error: false,
    });
const token = localStorage.getItem("token");
const formData = new FormData();

formData.append("token", token);

console.log(params.id);
localStorage.setItem("ids",params.id)
useEffect(() =>{
  formData.append("viloyat_id",params.id)
  request
  .post("/omborxona/muassasa/",formData)
  .then((data) =>
  setData({ loading: true, data: data.data, error: false })
)
.catch((err) => {
  setData({
    loading: false,
    data: [],
    error: true,
  });
  throw new err();
});
},[])

if (data.error) return <Error />;
if (!data.loading) return <Loading />;
console.log(data.data,"data");
    return (
      <>
        <div style={{marginLeft:"20px",marginRight:"20px"}}>
          <Link to={"/sklad"}>
              <Button style={{marginTop:"24px",marginBottom:0,backgroundColor:"#DDEBFB",borderRadius:"12px",color:"#1464C0"}} startIcon={<ArrowBackIcon />} variant="contained">
              {t("bildirishnoma.single.ortga")}
              </Button>
          </Link>
          <TableContainer style={{marginTop:"88px"}} component={Paper}>
{/* =======
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <div className="msklad_back">
            <Link to={"/sklad"}>
              <Button startIcon={<ArrowBackIcon />} variant="contained">
                {t("bildirishnoma.single.ortga")}
              </Button>
            </Link>
          </div>
          <TableContainer style={{ marginTop: "88px" }} component={Paper}>
>>>>>>> master */}
            <Table
              style={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">{t("bildirishnoma.single.soni")}</TableCell>
                  <TableCell>{t("bildirishnoma.single.muas")}</TableCell>
                  <TableCell align="center">Filtr</TableCell>
                  <TableCell align="center">Magistral</TableCell>
                  <TableCell align="center">Konsentrat</TableCell>
                  <TableCell align="center">Igna Arterial</TableCell>
                  <TableCell align="center">Igna Venoz</TableCell>
                  <TableCell align="center">Dezinfiktant</TableCell>
                  <TableCell align="center">Kateter</TableCell>
                  <TableCell align="center">Tuz</TableCell>
                  <TableCell align="center">Harakat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data &&
                  data.data.map((el, index) => {
                    return (
                      <Fragment key={el.id}>
                        <TableRow>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell style={{ border: "none" }}>
                            <Link to={`/skladM/${el.id}`}>{el.nomi}</Link>
                          </TableCell>
                          <TableCell align="center">
                            {el.keldi.filtr +
                              el.qoldi.filtr -
                              el.ishlatildi.filtr}
                          </TableCell>
                          <TableCell align="center">
                            {el.keldi.magistral +
                              el.qoldi.magistral -
                              el.ishlatildi.magistral}
                          </TableCell>
                          <TableCell align="center">
                            {el.keldi.konsentrat +
                              el.qoldi.konsentrat -
                              el.ishlatildi.konsentrat}
                          </TableCell>
                          <TableCell align="center">
                            {el.keldi.igna + el.qoldi.igna - el.ishlatildi.igna}
                          </TableCell>
                          <TableCell align="center">
                            {el.keldi.igna2 + el.qoldi.igna2 - el.ishlatildi.igna2}
                          </TableCell>
                          <TableCell align="center">
                            {el.keldi.dezinfiktant +
                              el.qoldi.dezinfiktant -
                              el.ishlatildi.dezinfiktant}
                          </TableCell>
                          <TableCell align="center">
                            {el.keldi.katetr +
                              el.qoldi.katetr -
                              el.ishlatildi.katetr}
                          </TableCell>
                          <TableCell align="center">
                            {el.keldi.tuz + el.qoldi.tuz - el.ishlatildi.tuz}
                          </TableCell>
                          <TableCell align="center">
                            <Link to={`/skladM/${el.id}`}>
                              <img src={l1} />
                            </Link>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    );
                  })}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{t("shifokor.jami")}:</TableCell>
                    <TableCell align="center">{data.data && data.data.map(el => el.keldi.filtr+el.qoldi.filtr - el.ishlatildi.filtr).reduce((per,acc) => per+acc,0)}</TableCell>
                    <TableCell align="center">{data.data && data.data.map(el => el.keldi.magistral+el.qoldi.magistral - el.ishlatildi.magistral).reduce((per,acc) => per+acc,0)}</TableCell>
                    <TableCell align="center">{data.data && data.data.map(el => el.keldi.konsentrat+el.qoldi.konsentrat - el.ishlatildi.konsentrat).reduce((per,acc) => per+acc,0)}</TableCell>
                    <TableCell align="center">{data.data && data.data.map(el => el.keldi.igna+el.qoldi.igna - el.ishlatildi.igna).reduce((per,acc) => per+acc,0)}</TableCell>
                    <TableCell align="center">{data.data && data.data.map(el => el.keldi.igna2+el.qoldi.igna2 - el.ishlatildi.igna2).reduce((per,acc) => per+acc,0)}</TableCell>
                    <TableCell align="center">{data.data && data.data.map(el => el.keldi.dezinfiktant+el.qoldi.dezinfiktant - el.ishlatildi.dezinfiktant).reduce((per,acc) => per+acc,0)}</TableCell>
                    <TableCell align="center">{data.data && data.data.map(el => el.keldi.katetr+el.qoldi.katetr - el.ishlatildi.katetr).reduce((per,acc) => per+acc,0)}</TableCell>
                    <TableCell align="center">{data.data && data.data.map(el => el.keldi.tuz+el.qoldi.tuz - el.ishlatildi.tuz).reduce((per,acc) => per+acc,0)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
}

export default Msklad;
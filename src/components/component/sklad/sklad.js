import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './sklad.scss'
import {request} from "../../../api/request";
import Loading from "../../loading/loading";
import Error from "../../../Error/Error";
import l1 from "../../../assets/icon/l1.svg";
import {useTranslation} from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });




export default function Sklad() {
  const { t } = useTranslation();
  const [data,setData] = useState({
    loading:false,
    data:[],
    error:false
  })
const id = localStorage.getItem("id")
const token = localStorage.getItem("token")
const formData = new FormData();

formData.append("token",token)
// useEffect(() => {
//   request
//   .post("/viloyatlar/",formData)
//   .then(data =>setData({loading:true,data:data.data.data,error:false}))
//   .catch(err => {
//     setData({
//       loading:false,
//       data:[],
//       error:true
//     })
//     throw new err;
//   })
// },[])

useEffect(() =>{
  request
  .post("/omborxona/viloyat/",formData)
  .then(data =>setData({loading:true,data:data.data,error:false}))
  .catch(err => {
    setData({
      loading:false,
      data:[],
      error:true
    })
    throw new err;
  })
},[])

if (data.error) return <Error/>
if (!data.loading) return <Loading/>

console.log(data.data && data.data.map(el => el.keldi.filtr+el.qoldi.filtr-el.ishlatildi.filtr).reduce((per,acc) => per+acc,0));
  return (
    <div className="" style={{ paddingRight: "20px" }}>
      <h1 className="sklad_title">{t("sidebar.li3")}</h1>
      <div className="sklad_top">
        <Link to={"/"}>
          <Button startIcon={<ArrowBackIcon />} variant="contained">
          {t("bildirishnoma.single.ortga")}
          </Button>
        </Link>
      </div>

      <div className="sklad">
        <h2 className="sklad-head">{t("jihoz.j10")}</h2>
        <TableContainer style={{ borderRadius: "12px" }} component={Paper}>
          <Table
            style={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">{t("bildirishnoma.single.soni")}</TableCell>
                <TableCell>{t("sbola.hudud")}</TableCell>
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
                data.data?.map((el, index) => {
                  return (
                    <Fragment key={el.id}>
                      <TableRow>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell
                          style={{ border: "none", textTransform: "uppercase" }}
                        >
                          <Link to={`/mSklad/${el.id}`}>{el.nomi}</Link>
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
                          <Link to={`/mSklad/${el.id}`}>
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
                <TableCell align="center">{data.data && data.data.map(el => el.keldi.filtr+el.qoldi.filtr-el.ishlatildi.filtr).reduce((per,acc) => per+acc,0)}</TableCell>
                <TableCell align="center">{data.data && data.data.map(el => el.keldi.magistral+el.qoldi.magistral-el.ishlatildi.magistral).reduce((per,acc) => per+acc,0)}</TableCell>
                <TableCell align="center">{data.data && data.data.map(el => el.keldi.konsentrat+el.qoldi.konsentrat-el.ishlatildi.konsentrat).reduce((per,acc) => per+acc,0)}</TableCell>
                <TableCell align="center">{data.data && data.data.map(el => el.keldi.igna+el.qoldi.igna-el.ishlatildi.igna).reduce((per,acc) => per+acc,0)}</TableCell>
                <TableCell align="center">{data.data && data.data.map(el => el.keldi.igna2+el.qoldi.igna2-el.ishlatildi.igna2).reduce((per,acc) => per+acc,0)}</TableCell>
                <TableCell align="center">{data.data && data.data.map(el => el.keldi.dezinfiktant+el.qoldi.dezinfiktant-el.ishlatildi.dezinfiktant).reduce((per,acc) => per+acc,0)}</TableCell>
                <TableCell align="center">{data.data && data.data.map(el => el.keldi.katetr+el.qoldi.katetr-el.ishlatildi.katetr).reduce((per,acc) => per+acc,0)}</TableCell>
                <TableCell align="center">{data.data && data.data.map(el => el.keldi.tuz+el.qoldi.tuz-el.ishlatildi.tuz).reduce((per,acc) => per+acc,0)}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

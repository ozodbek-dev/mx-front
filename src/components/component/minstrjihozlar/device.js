import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {request} from "../../../api/request";
import Error from "../../../Error/Error";
import Loading from "../../loading/loading";
import l1 from "../../../assets/icon/l1.svg";
import summary_renderer from "../../../utils/tableSummaryCalc";
import "./divice.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {useTranslation} from "react-i18next";

function Device() {


 
  const { t } = useTranslation();
    const [data,setData] = useState({
        data:[],
        loading:false,
        error:false,
    })
    const token = localStorage.getItem("token");
    const formData = new FormData()
    formData.append("token",token)
    useEffect(() => {
        request
        .post("/viloyatlar/",formData)
        .then(data => setData({loading:true, data:data.data,error:false}))
        .catch(err => {
            setData({loading:false,data:[],error:true})
            throw err;
        })
    },[])
    const Data = data.data.data && data.data.data.map(el => el.Jihozlar)
  
    console.log(data.data.data && data.data.data.map(el => el),"el");
    if (data.error) return <Error/>
    if(!data.loading) return <Loading/>

  return (
    <>
      <div className="site-device">
         <h1 className="sklad_title">Jihozlar</h1>
        <div className="sklad_top">
        <Link to={"/"}>
          <Button startIcon={<ArrowBackIcon />} variant="contained">
          {t("bildirishnoma.single.ortga")}
          </Button>
        </Link>
      </div>
       <h1 h1 className = "sklad_title1" > Hududlar bo 'yicha malumotlar</h1>
       
        <TableContainer component={Paper}>
          <Table
            style={{ minWidth: 100 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{width: "80px" }}
                >
                  {t("bildirishnoma.single.soni")}
                </TableCell>
                <TableCell
                  align="left"
                >
                  {t("sbola.hudud")}
                </TableCell>
                <TableCell
                  align="left"
                >
                  Yaroqli
                </TableCell>
                
                <TableCell
                  align="left"
                >
                  Ta'mirga muhtoj
                </TableCell>

                <TableCell
                  align="left"
                >
                
                  Ishdan chiqgan
                </TableCell>
                <TableCell
                  align="left"
                >
                  {t("bildirishnoma.harakat")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {data.data.data &&
                data.data.data?.map((el, index) => {
                  return (
                    <Fragment key={el.id}>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{
                            padding:"20px"
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            width: "10px",
                          }}
                        >
                          <Link to={`/region/${el.id}`}>{el.viloyat}</Link>
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            width: "150px",
                          }}
                        >
                          {el.Jihozlar.yaroqli}
                        </TableCell>

                        <TableCell
                          align="left"
                          style={{
                            width: "150px",
                          }}
                        >
                          {el.Jihozlar["tamirga muhtoj"]}
                        </TableCell>
                        
                        <TableCell
                          align="left"
                          style={{
                            width: "150px",
                          }}
                        >
                          {el.Jihozlar["ishdan chiqqan"]}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            width: "150px",
                          }}
                        >
                          <Link to={`/region/${el.id}`}><img src={l1}/></Link>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
                <TableRow >
                  <TableCell></TableCell>
                  <TableCell>{t("shifokor.jami")}</TableCell>
                  <TableCell>{summary_renderer(Data,"yaroqli")}</TableCell>
                  <TableCell>{summary_renderer(Data,"tamirga muhtoj")}</TableCell>
                  <TableCell>{summary_renderer(Data,"ishdan chiqqan")}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Device;

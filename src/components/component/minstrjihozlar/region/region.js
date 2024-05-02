import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {request} from "../../../../api/request";
import Error from "../../../../Error/Error";
import Loading from "../../../loading/loading";
import l1 from '../../../../assets/icon/l1.svg';
import './region.scss';
import summary_renderer from "../../../../utils/tableSummaryCalc";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useTranslation} from "react-i18next";

function Region() {
  const { t } = useTranslation();
  const params = useParams();
  const [data, setData] = useState({
    data: [],
    loading: false,
    error: false,
  });
  const [current, setCurrent] = useState(null);
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("token", token);
  useEffect(() => {
    request
      .post("/viloyatlar/", formData)
      .then((data) => setData({ loading: true, data: data.data, error: false }))
      .catch((err) => {
        setData({ loading: false, data: [], error: true });
        throw err;
      });
  }, []);
  useEffect(() => {
    const Data =
      data.data.data && data.data.data.find((el) => +el.id === +params.id);
    setCurrent(Data);
  }, [params.id, data.data.data]);
  current && console.log(current.muassasalar);

  const Data = current && current.muassasalar.map(el => el.Jihozlar)
  console.log(Data);
  if(data.error) return <Error/>
  if (!data.loading) return <Loading/>

  return (
    <>
      <div className="site-region">
        <div className="sklad_top">
        <Link  to = {
          "/device"
        } >
          <Button startIcon={<ArrowBackIcon />} variant="contained">
          const { t } = useTranslation();
          </Button>
        </Link>
      </div>
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
                  style={{  width: "0px",padding:"20px" }}
                >
                №
                </TableCell>
                <TableCell
                  align="left"
                  style={{  width: "80px",padding:"20px" }}
                >
                {current && current.viloyat}
                </TableCell>
                <TableCell
                  align="left"
                  style={{  width: "80px",padding:"20px" }}
                >
                Yaroqli
                </TableCell>
                
                <TableCell
                  align="left"
                  style={{  width: "80px",padding:"20px" }}
                >
                Ta'mirga muhtoj
                </TableCell>
                <TableCell
                  align="left"
                  style={{  width: "80px",padding:"20px" }}
                >
                Ishdan chiqgan
                </TableCell>
                <TableCell
                  align="left"
                  style={{  width: "80px",}}
                >
                  {t("bildirishnoma.harakat")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {current &&
                current.muassasalar.map((el, index) => {
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
                            padding: "20px"
                          }}
                        >
                          <Link to={`/jihozlar/${el.id}`}>
                            {el.muassasa_nomi}
                          </Link>
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            padding: "20px"
                          }}
                        >
                          {el.Jihozlar.yaroqli}
                        </TableCell>
                        
                        <TableCell
                          align="left"
                          style={{
                            padding: "20px"
                          }}
                        >
                          {el.Jihozlar["tamirga muhtoj"]}
                        </TableCell>

                        <TableCell
                          align="left"
                          style={{
                            padding: "20px"
                          }}
                        >
                          {el.Jihozlar["ishdan chiqqan"]}
                        </TableCell>
                        <TableCell
                          align="left"
                        >
                          <Link to={`/jihozlar/${el.id}`}>
                            <img src={l1}/>
                          </Link>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{t("shifokor.jami")}</TableCell>
                    <TableCell>{Data && summary_renderer(Data,"yaroqli")}</TableCell>
                    <TableCell>{Data && summary_renderer(Data,"tamirga muhtoj")}</TableCell>
                    <TableCell>{Data && summary_renderer(Data,"ishdan chiqqan")}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Region;

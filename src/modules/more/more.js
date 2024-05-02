import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {request} from "../../api/request";
import Loading from "../../components/loading/loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Error from "../../Error/Error";
import Mmodal from "../components/add-director/minusmodal/Mmodal";
import {useTranslation} from "react-i18next";

function More (){
    const { t } = useTranslation();
    const params = useParams();
    const [data,setData] = useState({loading:false,data:[],error:false})
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const formData =  new FormData();
    formData.append("token",token)
    
    useEffect(() =>{
        formData.append("yil",new Date().getFullYear());
        formData.append("oy",new Date().getMonth()+1);
        formData.append("mahsulot_turi",params.name)
        if (id){
            request
            .post("/omborxona/mahsulotlar/", formData)
            .then((data) => setData({loading:true,error:false,data:data.data.data}))
            .catch(err =>{
                setData({error:true,loading:false});
                throw err;
            })
        }
        else{
            formData.append("muassasa_id",localStorage.getItem("parid"))
                request
                .post("/omborxona/mahsulot/", formData)
                .then((data) => setData({loading:true,error:false,data:data.data.data}))
                .catch(err =>{
                    setData({error:true,loading:false});
                    throw err;
                })
        }
      },[])

    

   const time =   data.data && data.data[data.data.length-1]
    console.log(data.data && data.data.map(el => el),"bata");
    console.log(data.data);
      if (data.error) return <Error/>
      if(!data.loading) return <Loading/>

    return(
        <>
        <div className="container" style={{
            marginTop:"20px"
        }}>
            <Link style={{display:"block", marginBottom:"27px"}} to={`/skladM/${localStorage.getItem("parid")}`}>
            <Button style={{backgroundColor:"#DDEBFB",borderRadius:"12px",color:"#1464C0"}} startIcon={<ArrowBackIcon />}  variant="contained">
            {t("bildirishnoma.single.ortga")}
            </Button>
         </Link>
         {id && params.name === "Tuz" && <Mmodal/>}
         {id && params.name === "Konsentrat" && <Mmodal/>}
         {id && params.name === "Dezinfiktant" && <Mmodal/>}
            {
                !id &&
                <Link to={`/nameMore/${params.name}`}>
                    <Button variant="contained">
                            {t("bildirishnoma.batafsil")}
                    </Button>
                </Link>
            }
             
            <h2>{id && "Eng so'ngi qo'shilgan vaqti :"}  { id && time && time.partiya.sanasi.split(" ")[0]  }</h2>
            <TableContainer component={Paper}>
          <Table  
            size="small"
            aria-label="a dense table"
          >
                <TableHead>
                    <TableRow>
                            <TableCell align="center">
                                    <b>№</b>
                            </TableCell>
                            <TableCell align="center">
                                    <b>{t("vosita.vositaturi")}</b>
                            </TableCell>
                           {
                            id && 
                            <TableCell align="center">
                                    <b>{t("sbola.olchov")}</b>
                            </TableCell>
                           }
                           {
                             !id &&
                             <TableCell align="center">
                                    <b>{t("bildirishnoma.kirim")}</b>
                            </TableCell>
                           }
                            <TableCell align="center">
                                    <b>{t("bildirishnoma.chiqim")}</b>
                            </TableCell>
                            {
                                !id &&
                                <TableCell align="center">
                                    <b>{t("bildirishnoma.qoldiq")}</b>
                                </TableCell>
                            }
                            {   
                                id &&
                                <TableCell align="center">
                                    <b>Sanasi</b>
                            </TableCell>
                            }
                            
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.data && 
                        data.data.map((el,index) =>{
                            return(
                                 <TableRow>
                                    <TableCell align="center">
                                        <b>{index+1}</b>
                                    </TableCell>
                                    <TableCell align="center">
                                       <b>
                                       {el.nomi}
                                        </b>
                                    </TableCell>
                                    <TableCell align="center">
                                       <b>
                                       {id ? el.olchov_birligi:el.keldi}
                                        </b>
                                    </TableCell>
                                    <TableCell align="center">
                                       <b>
                                       {id?el.miqdori:el.ishlatildi}
                                        </b>
                                    </TableCell>
                                    {
                                        !id &&
                                        <TableCell align="center">
                                           <b>{el.mavjud}</b> 
                                        </TableCell>
                                    }
                                    <TableCell align="center">
                                       <b>
                                       {id && el.partiya.sanasi.split(" ")[0] }
                                        </b>
                                    </TableCell>
                                 </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            </TableContainer>
        </div>
        </>
    )
}
export default More;
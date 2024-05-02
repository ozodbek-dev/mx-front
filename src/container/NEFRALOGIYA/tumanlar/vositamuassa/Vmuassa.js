import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {request} from "../../../../api/request";
import l1 from '../../../../assets/icon/l1.svg';
import Loading from "../../../../components/loading/loading";
import {useTranslation} from "react-i18next";

import "./Vmuassa.scss";

function Vmuassa({id}){
    const { t } = useTranslation();
    const [current,setCurrent] = useState({loding:true,data:[],error:false})
    const formData = new FormData()
    const token = localStorage.getItem("token")
    formData.append("token",token)
    useEffect(() =>{
        formData.append("viloyat_id",id)
        request
        .post("/omborxona/muassasa/",formData)
        .then(data => setCurrent({loding:true,data:data.data,error:false}))
      },[])
      console.log(current,"curent");
       
      if (!current.loding) return <Loading/>

    return(
        <>
             <TableContainer  component={Paper}>
          <Table 
            style={{ minWidth: 650, padding:'20px' }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
                <TableRow>
                <TableCell>
                    {t("bildirishnoma.single.soni")}
                </TableCell>
                <TableCell>
                    {t("vosita.muas")}
                </TableCell> 
                <TableCell >
                    Filtr
                </TableCell>
                <TableCell>
                    Magistral
                </TableCell>
                <TableCell>
                    Igna Arterial
                </TableCell>
                <TableCell>
                    Igna Venoz
                </TableCell>
                <TableCell>
                    {t("bildirishnoma.harakat")}
                </TableCell>
                </TableRow>
            </TableHead>
                <TableBody className="table">
                    {
                        current.data && current.data?.map((el,index) =>{
                            return(
                                <TableRow>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>
                                        <Link to={`/skladM/${el.id}`}>
                                            {el.nomi}
                                         </Link>
                                    </TableCell>
                                    <TableCell  className={`tabele__qoldiq tabele__qoldiq--${el.mavjud.mahsulotlar.Filtr.color}`} data-type="4">{t("bildirishnoma.qoldiq")}:{el.mavjud.filtr} <span   className="table__span" >Tugash sanasi:{el.mavjud.mahsulotlar.Filtr.tugash_vaqti}</span></TableCell>
                                    <TableCell className={`tabele__qoldiq tabele__qoldiq--${el.mavjud.mahsulotlar.Magistral.color}`} data-type="4">{t("bildirishnoma.qoldiq")}:{el.mavjud.magistral} <span   className="table__span">Tugash sanasi:{el.mavjud.mahsulotlar.Magistral.tugash_vaqti}</span></TableCell>
                                    <TableCell className={`tabele__qoldiq tabele__qoldiq--${el.mavjud.mahsulotlar.Igna.color}`} data-type="4">{t("bildirishnoma.qoldiq")}:{el.mavjud.igna} <span  className="table__span">Tugash sanasi:{el.mavjud.mahsulotlar.Igna.tugash_vaqti}</span></TableCell>
                                    <TableCell className={`tabele__qoldiq tabele__qoldiq--${el.mavjud.mahsulotlar.Igna2.color}`} data-type="4">{t("bildirishnoma.qoldiq")}:{el.mavjud.igna2} <span   className="table__span">Tugash sanasi:{el.mavjud.mahsulotlar.Igna2.tugash_vaqti}</span></TableCell>
                                    <TableCell>
                                        <Link to={`/skladM/${el.id}`}>
                                            <img src={l1} />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                    {/* <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{t("shifokor.jami")}</TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}
export default Vmuassa;
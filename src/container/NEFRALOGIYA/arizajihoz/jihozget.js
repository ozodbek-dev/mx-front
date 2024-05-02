import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import '../ariza/ariza.scss';
import {Link, useParams} from 'react-router-dom';
import {useTranslation} from "react-i18next";

import l1 from "../../../assets/icon/l1.svg";
import {useEffect, useState} from 'react';
import {request} from '../../../api/request';

function Jihozget (){
  const { t } = useTranslation();
    const token = window.localStorage.token
  const muassasa_id = window.localStorage.muassasaId
  const formData = new FormData();
  formData.append('token', token);
  const [loader, setLoeder] = useState(true);
  const [ariza, setAriza] = useState([])
  const [sar, setSar] = useState([])
  const params = useParams();
  const [person, setPerson] = useState([]);
  useEffect(() => {
    request
      .post(`/omborxona/ariza/list/`, formData)
      .then(function (res) {

        setAriza(res.data.data);
        setSar({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setLoeder(false);
      })
      .catch(function (err) {
        setAriza({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [loader, ]);

  const classes = {
    table: {
      minWidth: 700,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: "white",

      // boxShadow: theme.shadows[5],
      padding: "10px",
      width: "80%",
      margin: "30px auto 0 auto",
      borderRadius: "12px",
    },
    formControl: {
      margin: "1px",
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: "5px",
    },
    button: {
      padding: "8px",
      borderRadius: "12px",
    },
  };
   const [open2, setOpen2] = useState(false);
   const handleOpen2 = (e) => {
     setOpen2(true);
   };
   const handleClose2 = () => {
     setOpen2(false);
   };
    const [cl, setCl] = useState("");

    function Sarflovlar(e) {
      setAriza(sar.data.data.filter(item => item.ariza_turi == e))
      setCl(e)
    }
    const Data = ariza.filter(el => el.ariza_turi === "Jihoz") 
    return (
        <>
            <div className="ariza_bottom_bottom">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableBody>
                { 
                  ariza && Data.map((item,index) => {    
                    return  (
                      <>
                      <TableRow>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                {item.ariza_id}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                {item.kimdan}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  {item.qayerdan}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  {item.sana.slice(0, 10)}
                </TableCell>
                <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="center"
                      >
                      {
                        item.status === `Ariza jo'natildi` ?  <button
                          className="status_btn"
                          // onClick={(e) => Statusall(item.ariza_id)}
                          // disabled={state.includes(item.ariza_id)}
                          disabled
                          
                        >
                          {
                            item.status === "Ariza jo'natildi" ? t("bildirishnoma.arstatus.yangi") : item.status === 'rad qilish' ? 'Rad etildi' : item.status === 'qabul qilish' ? 'Qabul qilindi' : 'Javob berilmadi'
                          }
                        </button> : item.status ==='rad qilish' ?  <button
                          className="status_btn"
                          // onClick={(e) => Statusall(item.ariza_id)}
                          // disabled={state.includes(item.ariza_id)}
                          disabled
                          style={{background:'red', color:'white'}}
                        >
                          {
                            item.status === "Ariza jo'natildi" ? t("bildirishnoma.arstatus.yangi") : item.status === 'rad qilish' ? 'Rad etildi' : item.status === 'qabul qilish' ? 'Qabul qilindi' : 'Javob berilmadi'
                          }
                        </button> : item.status === 'qabul qilish' ? <button
                          className="status_btn"
                          // onClick={(e) => Statusall(item.ariza_id)}
                          // disabled={state.includes(item.ariza_id)}
                          disabled
                          style={{background:'green', color:'white'}}
                        >
                          {
                            item.status === "Ariza jo'natildi" ? t("bildirishnoma.arstatus.yangi") : item.status === 'rad qilish' ? 'Rad etildi' : item.status === 'qabul qilish' ? 'Qabul qilindi' : 'Javob berilmadi'
                          }
                        </button> : <button
                          className="status_btn"
                          // onClick={(e) => Statusall(item.ariza_id)}
                          // disabled={state.includes(item.ariza_id)}
                          disabled
                          style={{background:'#888888', color:'white'}}
                        >
                          {
                            item.status === "Ariza jo'natildi" ? t("bildirishnoma.arstatus.yangi") : item.status === 'rad qilish' ? 'Rad etildi' : item.status === 'qabul qilish' ? 'Qabul qilindi' : 'Javob berilmadi'
                          }
                        </button>
                      }
                      </TableCell>

                <TableCell align="center">
                  <div className="button_modal button_modal_1">
                    <Link Link to = {
                      `/arizasi/${item.ariza_id}`
                    }
                    className = "single_info" >
                      <img className="delete_icon" src={l1} alt="batafsil" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
                </>
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

export default Jihozget;
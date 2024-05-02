import {
    Button,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import {Link} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import l1 from "../../../../../assets/icon/l1.svg";
import l3 from "../../../../../assets/icon/l3.svg";
import {useEffect, useState} from 'react';
import Arizamodal from './arizamodal';
import {request} from '../../../../../api/request';
import Loading from '../../../../../components/loading/loading';
import Error from '../../../../../Error/Error';
import "./arizalpu.scss";

function Arizalpu() {
  const [data,setData] = useState({
    data:[],
    loding:false,
    error:false,
  })
  const token = window.localStorage.token 
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }; 
 
  
  useEffect(() =>{
    request
    .get("/ariza/lpu/list/",config)
    .then(data => setData(
      {
        data:data.data.arizalar,
        loading:true,
        error:false
      }
    ))
    .catch(err =>{
      setData({
        error:true,
        data:[],
        loading:false
      })
      throw err;
    }) 
  },[])
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
   console.log(data);
   if (data.error) return <Error/>
   if (!data.loading) return <Loading/>
  return (
    <dvi className="ariza">
      <div className="ariza_top">
        <div style={{display:"flex",alignItems:"center"}}>
          <h4 className="ariza_top_title">{t("bildirishnoma.allariza")}:{data.data && data.data.length} </h4>
                <TextField
                  className='search-ariza'
                  placeholder={t("bildirishnoma.plac")}
                  style={{marginLeft:"40px"}}
                  id="standard-basic"
                  variant="outlined"
                  InputProps={{
                    startAdornment: ( 
                      <InputAdornment style={{position:"absolute",right:"18px"}} >
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
        </div>
        <div className="create_ariza_btn">
                  <Arizamodal/>
        </div>
      </div>
      <div className="ariza_bottom">
      
        <div className="ariza_bottom_bottom">
          {
             <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                 <TableRow style={{ backgroundColor: "white" }}>
                  <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                    }}
                    align="left"
                  >
                    ID
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                    }}
                    align="left"
                  >
                    {t("bildirishnoma.single.kimdan")}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                    }}
                    align="left"
                  >
                    {t("bildirishnoma.send")}
                  </TableCell>
                 
                  <TableCell
                    style={{
                      fontWeight: "bold",
                    }}
                    align="left"
                  >
                    {t("bildirishnoma.sana")}
                  </TableCell>
                  <TableCell
                    
                    align="center"
                  >
                    {t("bildirishnoma.single.status")}
                  </TableCell>
                  <TableCell
                    align="center"
                  >
                    {t("bildirishnoma.harakat")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {   
                  data.data && data.data.map((item,index) => {    
                    return  (
                      <>
                      <TableRow>
                <TableCell align="left">{index + 1}
                <div className='ariza_bgc'></div>
                </TableCell>
                <TableCell
                  
                  align="left"
                >
                {item.id}
                </TableCell>
                <TableCell
                  
                  align="left"
                >
                {item.kimdan}
                </TableCell>
                <TableCell
                  
                  align="left"
                >
                  {item.kimga}
                </TableCell>
                <TableCell
                  
                  align="left"
                >
                  {new Date(item.vaqti).getFullYear()}-{new Date(item.vaqti).getMonth()+1}-{new Date(item.vaqti).getDate()}
                </TableCell>
                <TableCell
                align="center"
                >
                  {
                    item.status === "Yuborilmadi" && 
                  <span className='status status--1'>
                    {item.status}
                  </span>
                  }
                  {
                    item.status === "Javob berilmadi" &&
                    <span className='status status--2'>
                    {item.status}
                  </span>
                  }
                  </TableCell>
                <TableCell align="center">
                  <div className="button_modal button_modal_1">
                    <Link Link to = {
                      `/arizasingle/${item.id}`
                    }
                    className = "single_info" >
                      <img className="delete_icon" src={l1} alt="batafsil" />
                    </Link> 
                    <Button>
                      <img className="delete_icon" src={l3} />
                    </Button>
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
          }
          
        </div>
      </div>
      
      
    </dvi>
  );
}
export default Arizalpu; 
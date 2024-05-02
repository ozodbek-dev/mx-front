import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Box, Button, Tab, Tabs} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import l1 from '../../../../assets/icon/l1.svg';
import Loading from "../../../../components/loading/loading";
import {Contextvalue} from "../../../../context/context";
import Error from "../../../../Error/Error";
import Vmuassa from "../vositamuassa/Vmuassa";
import './muassasalar.scss';

const Muassasalar = () => {
  const { t } = useTranslation();
  const token = window.localStorage.token

  const formData = new FormData();
  formData.append('token', token);

    const params = useParams()
const{setParamsid} = useContext(Contextvalue)
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
        
   const [viloyat, setViloyat] = useState({
  isFetched: false,
  data: {},
  error: null,
});
const [block, setBlock] = useState([])
// useEffect(() => {
//   request
//     .post(`/viloyatlar/`, formData)
//     .then(function (res) {
//       setViloyat({
//         isFetched: true,
//         data: res.data,
//         error: false
//       })
//     })
//     .catch(function (err) {
//       setViloyat({
//         isFetched: false,
//         data: [],
//         error: err
//       })
//     })
// }, [params.id])

localStorage.setItem('hudud', params.id);


  const columns = [
    {
      field:"index",
      headerName: "Soni",
      width: 10,
      headerAlign: "left",
    },
    {
      renderCell: (params) => (
        <strong>
          <Link
            to={`/poliklinika/${params.row.id}`}
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
          >
            {params.row.muassasa_nomi}
          </Link>
        </strong>
      ),
      field: "muassasa_nomi",
      headerName: "MUASSASALAR",
      width:230,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Bemorlar_soni",
      headerName: "BEMORLAR",
      width: 310,
      headerAlign: "center",
    },
    {
      field: "Shifokorlar",
      headerName: "SHIFOKORLAR",
      width: 350,
      headerAlign: "center",
    },
    
    
    // {
    //   field: "Rasxodniklar",
    //   headerName: "RASXODNIKLAR",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   headerAlign: "left",
    // },
    {
      renderCell: (params) => (
          <Link
            to={`/poliklinika/${params.row.id}`}
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}

          >
            <img src={l1} />
          </Link>
      ),
      headerName: "Harakatlar",
      width:300,
      headerAlign: "right",
      align: "right",
    },
  ];
  


 
 if (viloyat.error) return <Error/>
if(!viloyat.isFetched) return <Loading/>
 const muassasa = viloyat.data.data.filter((item) => +item.id === +params.id)[0]
const data = muassasa.muassasalar?.map((user, i) => ({ index: i + 1, ...user }));

 let cur = 0;
 let room = data.map((el) => el.muassasa);
 let think = data.map((el) => el.Bemorlar_soni);
 let doctor = data.map((el) => el.Shifokorlar);

 let roomAll = room.reduce((el, ind) => el + ind, cur);
 let thinkAll = think.reduce((el, ind) => el + ind, cur);
 let doctorAll = doctor.reduce((el, ind) => el + ind, cur); 

console.log('data',data);
console.log(value);
 return (
   <div className="data_muassasa" >
     <div className="back_btn" style={{
      marginBottom:"14px"
     }}>
       <Link to={"/"}>
         <Button startIcon={<ArrowBackIcon />} variant="contained">
         {t("bildirishnoma.single.ortga")}
         </Button>
       </Link>
     </div>
     <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                <Tabs style={{backgroundColor:"#fff"}} value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Bemor va shifokorlar"  />
                <Tab label="Vositalar qoldig’i"  />
                </Tabs>
            </Box>

     <div className={value  === 1 ?"table_height table_height--none":"table_height"}>
       <DataGrid
         style={{ borderRadius:"12px"}}
         rows={data}
         columns={columns}
       />
       <div className="data_grid_all">
         <div className="data_grid_all_block">
           <h2
             style={{
               fontSize: "16px",
               fontWeight: "600",
               lineHeight: "1.5",
             }}
           >
             {t("shifokor.jami")}
           </h2>
         </div>
         <div className="data_grid_all_block">
           <h2
             style={{
               fontSize: "16px",
               fontWeight: "600",
               lineHeight: "1.5",
             }}
           >
             {data.length}
           </h2>
         </div>
         <div className="data_grid_all_block">
           <h2
             style={{
               marginLeft:"318px",
               fontSize: "16px",
               fontWeight: "600",
               lineHeight: "1.5",
             }}
           >
             {thinkAll}
           </h2>
         </div>
         <div className="data_grid_all_block">
           <h2
             style={{
               marginLeft:"457px", 
               fontSize: "16px",
               fontWeight: "600",
               lineHeight: "1.5",
             }}
           >
             {doctorAll}
           </h2>
         </div>
       </div>
       <div
         style={{
           position: "absolute",
           top: "720px",
           alignItems: "center",
           display: "flex",
         }}
       >
         <h2
           style={{
             fontSize: "19px",
             fontWeight: "600",
             lineHeight: "1.5",
           }}
         >
           Jami Bemorlar Soni: {muassasa.bemorlar}
         </h2>
       </div>
     </div>
     { value === 1 && <Vmuassa id={params.id} />}
   </div>
 );
};

export default Muassasalar;
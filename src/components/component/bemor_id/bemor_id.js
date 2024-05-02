import {DataGrid} from '@mui/x-data-grid';
import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {request} from '../../../api/request';
import {Contextvalue} from '../../../context/context';
import Error from '../../../Error/Error';
import Loading from '../../loading/loading';
import './bemor_id.scss'

const token = window.localStorage.token

 const formData = new FormData();
 formData.append('token', token);


const BemorId = () => {

   

    const {id} = useParams()
  const [bemorIdpro, setBemorIdPro] = useState([])
  React.useEffect(() => {
    request
      .post(`/bemor/${id}`, formData)
      .then(function (res) {
        setBemorIdPro({
          isFetched: true,
          data: res.data,
          error: false,
        });
      })
      .catch(function (err) {
        setBemorIdPro({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, []);

  const token = window.localStorage.token

  const formData = new FormData();
  formData.append('token', token);

    const params = useParams()
const{setParamsid} = useContext(Contextvalue)

   const [viloyat, setViloyat] = useState({
  isFetched: false,
  data: {},
  error: null,
});
const [block, setBlock] = useState([])
useEffect(() => {
  request
    .post(`/viloyatlar/`, formData)
    .then(function (res) {
      setViloyat({
        isFetched: true,
        data: res.data,
        error: false
      })
    })
    .catch(function (err) {
      setViloyat({
        isFetched: false,
        data: [],
        error: err
      })
    })
}, [params.id])



  const columns = [
    {
    //   renderCell: (params) => (
    //   <strong>
    //     <Link
    //     to={`/poliklinika/${params.row.id}`}
    //       variant="contained"
    //       size="small"
    //       style={{ marginLeft: 16 }}
    //       tabIndex={params.hasFocus ? 0 : -1}
    //     > {params.row.muassasa_nomi}</Link>
    //   </strong>
    // ),
    field: 'JSHSHIR',
        headerName: "PNFL",
      width: 170,
    },
  ];

  


   const [bemor, setBemor] = useState({
       isFetched: false,
       data: {},
       error: null,
   });
   const [loader, setLoeder] = useState(true);

   useEffect(() => {
    request
      .get(`/bemor/all/`)
      .then(function (res) {
        setBemor({ isFetched: true, data: res.data, error: false });
      })
      .then(() => setLoeder(false))
      .catch(function (err) {
        setBemor({ isFetched: false, data: [], error: err });
      });
  }, [params.id, loader]);

 
 if (viloyat.error) return <Error/>
if(!viloyat.isFetched) return <Loading/>
if(!bemorIdpro.isFetched) return <Loading/>
 const muassasa = viloyat.data.data.filter((item) => +item.id == params.id)[0]
 console.log('bemorid', bemorIdpro)

 return (
   <div className="data_muassasa">

    <div className="container">
      <div style={{ height: 480, width: "100%" }}>
       
               <DataGrid
               rows = {bemorIdpro.data.data}
               columns={columns}
               checkboxSelection
               />
               </div>
      </div>
    </div>
  );
};

export default BemorId;

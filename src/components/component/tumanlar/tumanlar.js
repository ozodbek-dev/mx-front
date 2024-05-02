import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useContext, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {request} from "../../../api/request";
import {Contextvalue} from "../../../context/context";
import Error from "../../../Error/Error";
import Loading from "../../loading/loading";
import './tumanlar.scss'


const Tumanlar = () => {

const params = useParams()
const{setParamsid} = useContext(Contextvalue)
console.log(params.viloyat);
// function createData(bemor, ) {
//     return {
//         bemor,
//     };
// }


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
    border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: "50px",
    width: "80%",
    margin: "30px auto 0 auto",
  },
  formControl: {
    margin: "1px",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "5px",
  },
  // eslint-disable-next-line
  table: {
    minWidth: 700,
  },
  // eslint-disable-next-line
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  // eslint-disable-next-line
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: "50px",
    width: "80%",
    margin: "30px auto 0 auto",
  },
  // eslint-disable-next-line
  formControl: {
    margin: "1px",
    minWidth: 120,
  },
  // eslint-disable-next-line
  selectEmpty: {
    marginTop: "5px",
  },
};

const [viloyat, setViloyat] = React.useState({
  isFetched: false,
  data: {},
  error: null,
});
React.useEffect(() => {
  request
    .get(`/viloyatlar/`, )
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
}, [])

const [bemor, setBemor] = React.useState({
  isFetched: false,
  data: {},
  error: null,
});
const [block, setBlock] = React.useState([])
React.useEffect(() => {
  request
    .get(`/viloyatlar/`, )
    .then(function (res) {
      setBemor({
        isFetched: true,
        data: res.data,
        error: false
      })
    })
    .catch(function (err) {
      setBemor({
        isFetched: false,
        data: [],
        error: err
      })
    })
}, [params.id])



useEffect(() =>{
  setParamsid(params.id);
  // eslint-disable-next-line
},[viloyat.data,params.id])


// React.useEffect(() => {
//   if (viloyat.isFetched) {
//   }
// }, [viloyat.isFetched])

 React.useEffect(() => {
      if(bemor.isFetched) {
        setBlock(
        );
      }
    },[bemor.isFetched])

    console.log('block',block)
    if (viloyat.error) return <Error/>
if(!viloyat.isFetched) return <Loading/>

    return (
      <>
        <div className="tumanlar">
          <h1 className="tuman-head">{t("vosita.muas")}</h1>

          <Link className="tuman-link" to={"/datatable"}>
            &#9665; {t("bildirishnoma.single.ortga")}
          </Link>
          <>
            {/* <div className="search">
              <Input
                placeholder="Search"
                inputProps={{ "aria-label": "description" }}
              />
            </div> */}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell bold>{t("bildirishnoma.single.muas")}</TableCell>
                    <TableCell align="right" bold>{t("shifokor.bemorlar")}</TableCell>
                    <TableCell align="right" bold>{t("shifokor.shifokorlar")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    
                    viloyat.data.data
                      .filter((item) => +item.id ===  +params.id)[0]
                      .muassasalar.map((_) => (
                        <TableRow>
                          <TableCell>
                            <Link Link to = {
                              `/poliklinika/${_.id}`
                            } >
                              {_.muassasa_nomi}
                            </Link>
                          </TableCell>
                          <TableCell align="right">{_.Bemorlar_soni}</TableCell>
                          <TableCell align="right">{_.Shifokorlar}</TableCell>
                        </TableRow>
                      ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </>
        </div>
      </>
    );
}
 
export default Tumanlar;
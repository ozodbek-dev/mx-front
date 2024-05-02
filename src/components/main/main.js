/* eslint-disable react/no-direct-mutation-state */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Link, useParams} from "react-router-dom";

import {request} from "../../api/request";
import {Input} from "@mui/material";
import "./site-main.scss";
import Loading from "../loading/loading";
import Error from "../../Error/Error";

// function createData(bemor,) {
//   return {
//     bemor,
//   };
// }

function Main() {
  function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
    pasport,
    kim,
    propiska,
    doppropiska,
    telefon,
    doptelefon,
    doctor,
    royhat,
    maqom,
    nogironligi,
    qon,
    anit,
    hb,
    spid,
    rw,
    toifa,
    kasalliklar,
    diagnoz,
    dioliz,
    dopdio,
    rasxodniki,
    pasp,
    batafsil,
    umumiy
  ) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      pasport,
      kim,
      propiska,
      doppropiska,
      telefon,
      doptelefon,
      doctor,
      royhat,
      maqom,
      nogironligi,
      qon,
      anit,
      hb,
      spid,
      rw,
      toifa,
      // kasalliklar,
      kasalliklar,
      diagnoz,
      dioliz,
      dopdio,
      rasxodniki,
      pasp,
      batafsil,
      umumiy,
    };
  }

  var a = {
    Ё: "YO",
    Й: "I",
    Ц: "TS",
    У: "U",
    К: "K",
    Е: "E",
    Н: "N",
    Г: "G",
    Ш: "SH",
    Щ: "SCH",
    З: "Z",
    Х: "H",
    Ъ: "'",
    ё: "yo",
    й: "i",
    ц: "ts",
    у: "u",
    к: "k",
    е: "e",
    н: "n",
    г: "g",
    ш: "sh",
    щ: "sch",
    з: "z",
    х: "h",
    ъ: "'",
    Ф: "F",
    Ы: "I",
    В: "V",
    А: "A",
    П: "P",
    Р: "R",
    О: "O",
    Л: "L",
    Д: "D",
    Ж: "ZH",
    Э: "E",
    ф: "f",
    ы: "i",
    в: "v",
    а: "a",
    п: "p",
    р: "r",
    о: "o",
    л: "l",
    д: "d",
    ж: "zh",
    э: "e",
    Я: "Ya",
    Ч: "CH",
    С: "S",
    М: "M",
    И: "I",
    Т: "T",
    Ь: "'",
    Б: "B",
    Ю: "YU",
    я: "ya",
    ч: "ch",
    с: "s",
    м: "m",
    и: "i",
    т: "t",
    ь: "'",
    б: "b",
    ю: "yu",
  };

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
  // const [age, setAge] = React.useState("");

 

  const params = useParams();

  // eslint-disable-next-line
  const [rows, setRows] = React.useState([]);

   const [viloyat, setViloyat] = React.useState({
     isFetched: false,
     data: {},
     error: null,
   });

  React.useEffect(() => {
    request
      .get(`/viloyatlar/`)
      .then(function (res) {
        setViloyat({
          isFetched: true,
          data: res.data,
          error: false,
        });
      })
      .catch(function (err) {
        setViloyat({
          isFetched: false,
          data: [],
          error: true,
        });
      });
  }, []);
  // eslint-disable-next-line
  const [bemor, setBemor] = React.useState({
    isFetched: false,
    data: {},
    error: null,
  });
  // eslint-disable-next-line
  const [block, setBlock] = React.useState([]);
  // React.useEffect(() => {
  //  
  // }, [])
  // eslint-disable-next-line
  

  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const handleOpen = () => {
    setOpen(true);
  };
  // eslint-disable-next-line
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (viloyat.isFetched) {
      setRows(createData());
    }
  }, [viloyat.isFetched]);

  React.useEffect(() => {
    if (bemor.isFetched) {
      setBlock(bemor.data.map((item, index) => createData(item.length)));
    }
    // eslint-disable-next-line
  }, [bemor.isFetched]);

const [doctor, setDoctor] = React.useState({
    isFetched: false,
    data: {},
    error: null,
  });
  
  const [loader, setLoader] = React.useState(false);
  React.useEffect(() => {
    request
      .get(`/shifokor/all/`)
      .then(function (res) {
        setDoctor({ isFetched: true, data: res.data, error: false });
      })
      .then(() => setLoader(false))
      .catch(function (err) {
        setDoctor({ isFetched: false, data: [], error: err });
      });
  }, []);
    console.log('doctor', doctor.data.data)

  const [filteredResults, setFilteredResults] = React.useState([]);
  const [filteredResults1, setFilteredResults1] = React.useState([]);
  React.useEffect(() => {
    request
      .get(`/bemor/all/`)
      .then((res) => {
        setFilteredResults1(res.data)
        setFilteredResults(res.data)
      })
      .then(() => setLoader(false))
      .catch((error) => console.log(error));
  }, [params.id, loader]);
  const [getval, setGetval] = React.useState("");
  const [inputVal, setInputValue] = React.useState("");



  function transliterate(word) {
    return word
      .split("")
      .map(function (char) {
        return a[char] || char;
      })
      .join("");
  }

  function filt(params) {
    setInputValue(params);
    setGetval(params);
    if (getval.length > 1) {
      const filteredData = filteredResults.filter((item) => {
        return Object.values(transliterate(item.ismi))
          .join("")
          .toLowerCase()
          .includes(transliterate(params).toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(filteredResults1);
    }
  }
  console.log("filteredResults", filteredResults);


  React.useEffect(() => {
    if (filteredResults) {
      const arr = filteredResults.filter((i) => +i.muassasa === params.id);
      if (arr.length > 0) {
        setFilteredResults(
          arr.map((item, index) =>
            createData(
              item.JSHSHIR,
              item.familiyasi,
              item.ismi,
              item.otasini_ismi,
              item.passport_seriyasi,
              item.passport_raqami,
              item.passport_qayerdan_kim_tomonidan_berilgan,
              item.manzil,
              item.yashash_manzili,
              item.tel_raqami,
              item["Qo'shimcha raqam"],
              item.doctor,
              item.royxatga_olingan_sana,
              item.ijtimioy_maqom,
              item.nogironligi,
              item.qon_guruhi,
              item.Anti_HCV,
              item.HBsAg,
              item.RW,
              item.SPID,
              item.status,
              item.kasalliklar,
              item.diagnoz,
              item.dializ_boshlangan_sana,
              item.dializ_olgan_miqdori,
              item.rasxodniki,
              item.bemor_passporti,
              item.id,
              item.umumiy
            )
          )
        );
      }
    }
    // eslint-disable-next-line
  }, [filteredResults]);

  console.log("filteredResults", filteredResults);

  if (viloyat.error) return <Error />;
  if (!viloyat.isFetched) return <Loading />;
  return (
    <>
      <div className="search">
        <Input
          placeholder="Bemor qidirish"
          // onClick={handleOpen}
          onChange={(e) => filt(e.target.value)}
          inputProps={{ "aria-label": "description" }}
        />
      </div>

      {inputVal.length < 1 ? (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>HUDUD</b>
                  </TableCell>
                  <TableCell align="right" bold>
                    <b>MUASSASA</b>
                  </TableCell>
                  <TableCell align="right" bold>
                    <b>BEMOR</b>
                  </TableCell>
                  <TableCell align="right" bold>
                    <b>SHIFOKORLAR</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  // Object.entries(viloyat.data.data).map((i, index) => i[0]).map((item,index) => (
                  //   <TableRow><TableCell><Link id={item.id} key={index} to={`/tumanlar/${item}`}>{item.viloyat}</Link></TableCell></TableRow>
                  // ))
                  viloyat.data.data.map((item, index) => (
                    <TableRow>
                      <TableCell>
                        <Link
                          id={item.id}
                          key={index}
                          to={`/muassasa/${item.id}`}
                        >
                          {item.viloyat}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{item.muassasa}</TableCell>
                      <TableCell align="right">{item.bemorlar}</TableCell>
                      <TableCell align="right">{item.Shifokorlar}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <h4>Jami bemor soni {filteredResults.length}</h4>
          <h4>Jami Shifokorlar soni {doctor.data.data.length}</h4>
        </>
      ) : (
        <div className="search_person">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>JSHSHIR</TableCell>
                  <TableCell align="right">familiya</TableCell>
                  <TableCell align="right">ismi</TableCell>
                  <TableCell align="right">sharifi</TableCell>
                  <TableCell align="right">pasport seriya</TableCell>
                  <TableCell align="right">pasport raqam</TableCell>
                  <TableCell align="right">
                    passport qayerdan kim tomonidan berilgan
                  </TableCell>
                  <TableCell align="right">Ro'yxatdan o'tgan manzil</TableCell>
                  <TableCell align="right">yashash manzil</TableCell>
                  <TableCell align="right">{t("shifokor.tel")}</TableCell>
                  <TableCell align="right">qo'shimcha raqam</TableCell>
                  <TableCell align="right">{t("sidebar.li4")} (FIO)</TableCell>
                  <TableCell align="right">{t("bola.rxt")}</TableCell>
                  <TableCell align="right">Ijtimoiy maqom</TableCell>
                  <TableCell align="right">nogironligi</TableCell>
                  <TableCell align="right">{t("bola.guruh")}</TableCell>
                  <TableCell align="right">Anti HCV</TableCell>
                  <TableCell align="right">HBsAg</TableCell>
                  <TableCell align="right">VICH/SPID</TableCell>
                  <TableCell align="right">RW</TableCell>
                  <TableCell align="right">{t("bildirishnoma.status")}</TableCell>
                  <TableCell align="right">Bemor turi</TableCell>
                  <TableCell align="right">Diagnoz</TableCell>
                  <TableCell align="right">dializ olgan miqdori</TableCell>
                  <TableCell align="right">dializ boshlangan sana</TableCell>
                  <TableCell align="right">rasxodniki</TableCell>
                  <TableCell align="right">bemor passporti</TableCell>
                  <TableCell align="right">qo'shimcha malumot</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults.map((row) => (
                  <TableRow TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.JSHSHIR}
                    </TableCell>
                    <TableCell align="right">{row.familiyasi}</TableCell>
                    <TableCell align="right">{row.ismi}</TableCell>
                    <TableCell align="right">{row.otasini_ismi}</TableCell>
                    <TableCell align="right">{row.passport_seriyasi}</TableCell>
                    <TableCell align="right">{row.passport_raqami}</TableCell>
                    <TableCell align="right">
                      {row.passport_qayerdan_kim_tomonidan_berilgan}
                    </TableCell>
                    <TableCell align="right">{row.manzil}</TableCell>
                    <TableCell align="right">{row.yashash_manzili}</TableCell>
                    <TableCell align="right">{row.tel_raqami}</TableCell>
                    <TableCell align="right">
                      {row["Qo'shimcha raqam"]}
                    </TableCell>
                    <TableCell align="right">{row.doctor}</TableCell>
                    <TableCell align="right">
                      {row.royxatga_olingan_sana}
                    </TableCell>
                    <TableCell align="right">{row.ijtimioy_maqom}</TableCell>
                    <TableCell align="right">{row.nogironligi}</TableCell>
                    <TableCell align="right">{row.qon_guruhi}-guruh</TableCell>
                    <TableCell align="right">{row.Anti_HCV}</TableCell>
                    <TableCell align="right">{row.HBsAg}</TableCell>
                    <TableCell align="right">{row.RW}</TableCell>
                    <TableCell align="right">{row.SPID}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.kasalliklar}</TableCell>
                    <TableCell align="right">{row.diagnoz}</TableCell>
                    {/* <TableCell align="right">{row.dializ}</TableCell> */}
                    <TableCell align="right">
                      {row.dializ_olgan_miqdori}
                    </TableCell>
                    <TableCell align="right">
                      {row.dializ_boshlangan_sana}
                    </TableCell>
                    <TableCell align="right">{row.rasxodniki}</TableCell>
                    <TableCell align="right">
                      <a href={row.pasp} download>
                        yuklash
                      </a>
                    </TableCell>
                    <TableCell align="right">
                      <Link Link>
                        {row.batafsil}
                        qo 'shimcha malumot
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}

export default Main;

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {PDFExport} from "@progress/kendo-react-pdf";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import pdfDoc from "../../../assets/icon/pdf_doc.svg";
import Loading from "../../loading/loading";
import "./usarflov.scss";

const Usarflov = () => {
  const { t } = useTranslation();

  const token = window.localStorage.token;
  const pdfExportComponent = React.useRef(null);
  const formData = new FormData();
  formData.append("token", token);
  const [loader, setLoeder] = useState(true);
  const [ariza, setAriza] = useState([]);
  const params = useParams();
  const [person, setPerson] = useState([]);
  //  useEffect(() => {
  //    request
  //      .post(`/omborxona/arizalar/`, formData)
  //      .then(function (res) {
  //        setAriza({
  //          isFetched: true,
  //          data: res.data.data,
  //          error: false,
  //        });

  //        console.log("res.data.data", res.data.data);
  //        setPerson(
  //          res.data.data.filter((item) => +item.ariza_id === +params.id)[0]
  //        );
  //        // setShifokorlar(res.data.shifokorlar);
  //        setLoeder(false);
  //      })
  //      .catch(function (err) {
  //        setAriza({
  //          isFetched: false,
  //          data: [],
  //          error: err,
  //        });
  //        setLoeder(false);
  //      });
  //  }, [loader, params.id]);
  //  console.log('person', person);
  const per = person.mahsulotlar && person.mahsulotlar[0].mahsulot_turi;
  console.log("person", per);

  const [turi, setTuri] = useState("");
  const [name, setName] = useState("");
  const [ediname, setEdiname] = useState("");
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
    button: {
      padding: "8px",
      borderRadius: "12px",
    },
  };
  const arr = [
    {
      category: "Filtr",
      name: "Юқори оқимли Диализаторлар 1,4-1,6м2 High Flux Series Hollow Fiber Dialyzers F15",
      code: "Yuqori oqimli Dializatorlar 1,4-1,6m2 High Flux Series Hollow Fiber Dialyzers F15",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Юқори оқимли Диализаторлар 1,7-1,8м2 High Flux Series Hollow Fiber Dialyzers F18",
      name: "Yuqori oqimli Dializatorlar 1,7-1,8m2 High Flux Series Hollow Fiber Dialyzers F18",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Юқори оқимли Диализаторлар 1,9-2,2м2  High Flux Series Hollow Fiber Dialyzers F19",
      name: "Yuqori oqimli Dializatorlar 1,9-2,2m2  High Flux Series Hollow Fiber Dialyzers F19",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,0-1,2м2 Low Flux Series Hollow Fiber Dialyzers F12",
      code: "Dializator 1,0-1,2m2 Low Flux Series Hollow Fiber Dialyzers F12",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,3-1,4м2 Low Flux Series Hollow Fiber Dialyzers F14",
      code: "Dializator 1,3-1,4m2 Low Flux Series Hollow Fiber Dialyzers F14",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,5-1,6м2 Low Flux Series Hollow Fiber Dialyzers F15",
      code: "Dializator 1,5-1,6m2 Low Flux Series Hollow Fiber Dialyzers F15",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,8-1,9м2 Low Flux Series Hollow Fiber Dialyzers F18",
      code: "Dializator 1,8-1,9m2 Low Flux Series Hollow Fiber Dialyzers F18",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 2,0-2,2м2 Low Flux Series Hollow Fiber Dialyzers F20",
      code: "Dializator 2,0-2,2m2 Low Flux Series Hollow Fiber Dialyzers F20",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 0,6-0,8м2 Hemoflow F4HPS",
      code: "Dializator 0,6-0,8m2 Hemoflow F4HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,0-1,2 м² Hemoflow F5HPS",
      code: "Dializator 1,0-1,2 m2 Hemoflow F5HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,3-1,4 м²  Hemoflow F6HPS",
      code: "Dializator 1,3-1,4 m2  Hemoflow F6HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,5-1,6 м² Hemoflow F7HPS",
      code: "Dializator 1,5-1,6 m2 Hemoflow F7HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 1,8-1,9 м² Hemoflow F8HPS",
      code: "Dializator 1,8-1,9 m2 Hemoflow F8HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 2,0-2,2 м²  Hemoflow F10HPS",
      code: "Dializator 2,0-2,2 m2  Hemoflow F10HPS",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Диализатор 0,2-0,5м2m2 FX-PAED",
      size: "dona",
    },
    {
      category: "Filtr",
      name: "Болалар диализатори",
      code: "Bolalar dializatori",
      size: "dona",
    },
    {
      category: "Magistral",
      name: "Унверсал магистрал (кат)",
      code: "Unversal magistral (kat)",
      size: "dona",
    },
    {
      category: "Magistral",
      name: "Қон ўтказувчи магистрал AV-Set FMS PAED-R",
      code: "Qon O'tkazuvchi magistral AV-Set FMS PAED-R",
      size: "dona",
    },
    {
      category: "Igna",
      name: "Артериал фистулали ниналар 16G ",
      code: "Arterial fistulali ninalar 16G ",
      size: "dona",
    },
    {
      category: "Igna",
      name: "Артериал фистулали игнала FistulaNeedle Art17G",
      code: "Arterial fistulali ignala FistulaNeedle Art17G",
      size: "dona",
    },
    {
      category: "Igna2",
      name: "Венозли  фистулали ниналар 16G",
      code: "Venozli  fistulali ninalar 16G",
      size: "dona",
    },
    {
      category: "Igna2",
      name: "Венозли  фистулали игнала FistulaNeedle Art17G",
      code: "Venozli  fistulali ignala FistulaNeedle Art17G",
      size: "dona",
    },
    {
      category: "Katetr",
      name: "Икки тирқишли катетер. ZDD 11F20",
      code: "Ikki tirqishli kateter. ZDD 11F20",
      size: "dona",
    },
    {
      category: "Katetr",
      name: "Икки тирқишли катетер. ZDD 12F20",
      code: "Ikki tirqishli kateter. ZDD 12F20",
      size: "dona",
    },
    {
      category: "Katetr",
      name: "Икки тирқишли катетер.ZDD 8 F15",
      code: "Ikki tirqishli kateter.ZDD 8 F15",
      size: "dona",
    },
    {
      category: "Katetr",
      name: "Икки тирқишли катетер. ZDD 6,5 F12",
      code: "Ikki tirqishli kateter. ZDD 6,5 F12",
      size: "dona",
    },
    {
      category: "Tuz",
      name: "Таблеткали туз",
      code: "Tabletkali tuz",
      size: "qop",
    },
    {
      category: "Konsentrat",
      name: "Кислотали концентрат",
      code: "Kislotali konsentrant",
      size: "quti",
    },
    {
      category: "Konsentrat",
      name: "Бикорбанат концентрат",
      code: "Bikorbanat konsentrat",
      size: "quti",
    },
    {
      category: "Dezinfiktant",
      name: "Лимон кислатаси 50%",
      code: "Limon Kislatasi 50%",
      size: "kanistr",
    },
    {
      category: "Dezinfiktant",
      name: "Цитростерил",
      code: "Sitrosteril",
      size: "kanistr",
    },
  ];

  const [sarflovarr, setSarflovarr] = useState([
    {
      vosita_nomi: "",
      olcov_birligi: "",
      miqdori: "",
      ishlab_chiqaruvchi: "",
      diametr: "",
    },
  ]);

  const [down, setDown] = useState([]);

  function addObj() {
    setSarflovarr([
      ...sarflovarr,
      {
        vosita_nomi: "",
        olcov_birligi: "",
        miqdori: "",
        ishlab_chiqaruvchi: "",
        diametr: "",
      },
    ]);
  }
  function addFile(value) {
    setDown([
      ...down,
      {
        filename: value,
      },
    ]);
  }
  console.log(person, "PRES");
  const [age, setAge] = useState("");
  // const dias = arr.filter(item =>item.category.includes(turi))
  // console.log(down);
  console.log(
    "person?.mahsulotlar",
    arr.find((el) => el.name === per)
  );
  const findName = arr.find((el) => el.name === per);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  if (loader) return <Loading />;
  return (
    <div className="sarflov msarflov">
      <div className="sarflov_inner">
        <div className="sarflov_inner_left">
          <Link to={`/sarflov/${params.id}`}>
            <Button startIcon={<ArrowBackIcon />} variant="contained">
              Ortga
            </Button>
          </Link>
          {/* <h4 className="sarflov_title">{person.ariza_turi === "sarflov"?"Sarflov vositalar":"Jihozlar"}</h4> */}
        </div>
        <div className="sarflov_inner_right">
          <Button
            onClick={() => pdfExportComponent.current.save()}
            style={{ backgroundColor: "#1464C0", color: "#fff" }}
            startIcon={<DescriptionIcon />}
            variant="contained"
          >
            Pdf shaklida yuklash
          </Button>
        </div>
      </div>
      <PDFExport ref={pdfExportComponent}>
        <div className="sarflov_block">
          <h4 className="sarflov_block_title">{t("Arizaning statusi")}</h4>
          {/* <div className="status_btn"></div> */}
        </div>
        <div className="sarflov_block">
          <h4 className="sarflov_block_title">ID va Sana</h4>
        </div>
        <div className="sarflov_block">
          <h4 className="sarflov_block_title">
            {t("bildirishnoma.new.kimdankimga")}
          </h4>
          <div className="sarflov_block_inner">
            <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.single.kimdan")} (
                {t("bildirishnoma.direktorism")})
              </h5>

              <h5 className="sarflov_block_inner_div_title1">
                {person.kimdan}
              </h5>
            </div>
            <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.single.muas")}
              </h5>
              {/* <TextField
                id="outlined-basic"
                label="Boyovut tuman ko’p tarmoqli markaziy poliklinikasi"
                variant="outlined"
              /> */}
              <h5 className="sarflov_block_inner_div_title1">
                {person.qayerdan}
              </h5>
            </div>
            <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">
                {t("bildirishnoma.send")}
              </h5>
              {/* <TextField
                id="outlined-basic"
                label="Minzdravga"
                variant="outlined"
              /> */}
              <h5 className="sarflov_block_inner_div_title1">{person.kimga}</h5>
            </div>
            {/* <div className="sarflov_block_inner_div">
              <h5 className="sarflov_block_inner_div_title">Qo’chimcha matn</h5>
              
              <h5 className="sarflov_block_inner_div_title1">
                {person.qoshimcha_matn}
              </h5>
            </div> */}
          </div>
        </div>
        <div div className="sarflov_block sarflov_block_m">
          <h4 className="sarflov_block_title">
            {person.ariza_turi === "sarflov"
              ? t("bildirishnoma.single.vosi")
              : "Jihozlar"}
          </h4>

          <div className="table_container_9">
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
                      {person.ariza_turi === "sarflov"
                        ? t("bildirishnoma.single.nomi")
                        : "Jihoz nomi"}
                    </TableCell>
                    {person.ariza_turi === "sarflov" && (
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        O’ lchov birligi
                      </TableCell>
                    )}
                    {person.ariza_turi === "sarflov" && (
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        {t("bildirishnoma.single.miqdori")}
                      </TableCell>
                    )}
                    <TableCell
                      style={{
                        fontWeight: "bold",
                      }}
                      align="left"
                    >
                      {person.ariza_turi === "sarflov"
                        ? "Mahsulot turi"
                        : "Jihoz ma'lumoti"}
                    </TableCell>
                    {person.ariza_turi !== "sarflov" && (
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        {t("bildirishnoma.single.soni")}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {person?.mahsulotlar
                    // ?.slice(0)
                    .map((item, index) => (
                      <TableRow>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">
                          {!item.mahsulot_nomi.includes("Igna") &&
                            item.mahsulot_nomi}
                          {item.mahsulot_nomi === "Igna" && "Igna Arterial"}
                          {item.mahsulot_nomi === "Igna2" && "Igna Venoz"}
                        </TableCell>
                        <TableCell align="left">
                          {person.ariza_turi === "sarflov"
                            ? item.mahsulot_olchov_birligi
                            : item.mahsulot_turi}
                        </TableCell>
                        <TableCell align="left">{item.miqdori}</TableCell>
                        <TableCell align="left">
                          {person.ariza_turi === "sarflov" && findName.code}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className="sarflov_comment">
          <div className="sarflov_block_comment">
            <h4 className="sarflov_block_title">{t("Qo’shimcha ma’lumot")}</h4>
            <div className="sarflov_block_inner_div1">
              {/* <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Yozish"
              /> */}
              <p className="desc_p">{person.qoshimcha_matn}</p>
            </div>
          </div>
          <div className="sarflov_block_comment">
            <div className="sarflov_block_comment_inner">
              <h4 className="sarflov_block_title">{t("input.hujjat")}</h4>
              <input type="file" id="files" className="input_download" />
              {/* <label htmlFor="files" className="all_download">
                <img className="scrip_file" src={scrip} alt="" />
                {t("vosita.qosh")}
              </label> */}
            </div>
            <div className="sarflov_block_inner_div">
              {down.map((item, index) =>
                down.length > 0 ? (
                  <div key={index} className="sarflov_block_download_file">
                    <label className="input_tyle_download">
                      <img src={pdfDoc} alt="" className="label_img" />
                      {item.filename}
                      {/* <div className="close_file">
                        <Button
                          onClick={(e) => delFile(index)}
                          startIcon={<CloseIcon />}
                        ></Button>
                      </div> */}
                    </label>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </PDFExport>
      {/* <div className="sent_btn">
          <Button variant="contained" color="primary" size="large">
            {t("modalariza.arizayub")}
          </Button>
        </div> */}
    </div>
  );
};

export default Usarflov;

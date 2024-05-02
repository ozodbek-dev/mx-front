import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {useTranslation} from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Uzarizasin = () =>{
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
      const [age, setAge] = useState("");
      const [pass, setPass] = useState();
      const [num, setNum] = useState({
        from: 0,
        to: 0,
      });
      const [numarr, setNumarr] = useState([]);
    
      function numAdd() {
        setNumarr([...numarr, num]);
      }
      const File = (e) => {
        // setNames(true);
        setPass(e.target.files);
      };
      console.log('pass',pass)
    
      function numDel(e) {
        let delarr = [];
        delarr.push(...numarr);
        delarr.splice(e, 1);
        setNumarr(delarr);
      }
      console.log(numarr);
    
       const [person, setPerson] = useState([])
       const [shifokorlar, setShifokorlar] = useState([])
       const [delebemor, setDeleBemor] = useState({
         isFetched: false,
         data: {},
         error: null,
       })
    const token = window.localStorage.token
       const config = {
         headers: {
           Authorization: `Bearer ${token}`
         }
       };
    
      const handleChange = (event) => {
        setAge(event.target.value);
      };
      const [loader, setLoeder] = useState(true);
     const { t } = useTranslation();
    
     const params = useParams();
    
      const {
        id
      } = useParams()
    
       
    return(
        <div className="rol_ariza">

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}} className="rol_ariza_top">
        <Link  to = {
          "/uzariza"
        } >
          <Button startIcon={<ArrowBackIcon />} style={{borderRadius: "12px",backgroundColor:"#DDEBFB",padding:"8px",color:"#1464C0"}} variant="contained">{t("bildirishnoma.single.ortga")}</Button>
        </Link>
      <Button
            variant="contained"
            // color="primary"
            size="large"
            // startIcon={<DescriptionIcon />}
          >
              PDFga yuklab olish
            {/* <CSVLink  className="excel_download"> */}
            {/* </CSVLink> */}
          </Button>
      </div>
      <div className="rol_ariza_bottom">
        <div className="rol_ariza_bottom_top">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.iddata")}
          </h4>
          <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.id")}</p>
              <p className="info_single">{person?.id}</p>
            </div>
            <div className="rol_ariza_bottom_block1">
              <p className="info_single">{t("bildirishnoma.single.data")}</p>
              <p className="info_single">{person.sana}</p>
            </div>
          </div>
        </div>
        <div className="rol_ariza_flex">
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.kimdan")}
                </h4>
                <div className="rol_ariza_bottom_div_t6">
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.direktor")}</p>
                    <p>{person?.kimdan}</p>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.muas")}</p>
                    <p>{person?.kimdan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rol_ariza_bottom_div">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.kimga")}
                </h4>
                <div className="rol_ariza_bottom_div_t6">
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.kimga")}</p>
                    <p>{person?.kimga}</p>
                  </div>
                  <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                    <p>{t("bildirishnoma.single.inf")}</p>
                    <p>{person?.qoshimcha}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rol_ariza_bottom_div_inner">
        <h4 className="rol_ariza_bottom_title">
            Respublika bo'yicha kerakli vositalar va bolalar soni
        </h4>
        <div className="single_table_all_block">
          <p className="single_table_all_title">
          Umumiy ma'lumot
          </p>
          <div className="single_table_all_block_inner">
            <div className="single_table_all_block_top">
              <button>{t("bildirishnoma.single.vosi")}</button>
              <button>{t("bildirishnoma.single.bolalar")}</button>
            </div>
            <div className="single_table_all_block_bottom">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "white" }}>
                      <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                      <TableCell align="left">
                        {t("bildirishnoma.single.nomi")}
                      </TableCell>
                      <TableCell align="left">
                        {t("bildirishnoma.single.seriyasi")}
                      </TableCell>

                      <TableCell align="left">
                        {t("bildirishnoma.single.miqdori")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">01</TableCell>
                      <TableCell align="left">Dori A</TableCell>
                      <TableCell align="left">AB123456789</TableCell>
                      <TableCell align="left">15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">01</TableCell>
                      <TableCell align="left">Dori A</TableCell>
                      <TableCell align="left">AB123456789</TableCell>
                      <TableCell align="left">15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">01</TableCell>
                      <TableCell align="left">Dori A</TableCell>
                      <TableCell align="left">AB123456789</TableCell>
                      <TableCell align="left">15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">01</TableCell>
                      <TableCell align="left">Dori A</TableCell>
                      <TableCell align="left">AB123456789</TableCell>
                      <TableCell align="left">15</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="single_table_document">
        <div className="t9">
          <div className="rol_ariza_bottom_div_inner">
            <div className="rol_ariza_bottom_div_inner_block">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.qoshimcha")}
              </h4>
              <div className="document_left_title_block">
                <p className="document_left_title">
                 {person?.text}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="t9">
          <div className="rol_ariza_bottom_div_inner">
            <div className="rol_ariza_bottom_div_inner_block">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.fayl")}
              </h4>
              <div className="rol_ariza_bottom_div_t6">
                <a href={`https://${person.fayl}`} className="download_document_t9">
                  <Button variant="contained" startIcon={<CloudDownloadIcon />}>
                    {t("input.yuklab")} 
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Button variant="contained">{t("bildirishnoma.single.qayta")}</Button>
      <Button variant="contained" style={{margin:'10px'}}>{t("bildirishnoma.single.korildi")}</Button> */}
    </div>
    )
}
export default Uzarizasin;
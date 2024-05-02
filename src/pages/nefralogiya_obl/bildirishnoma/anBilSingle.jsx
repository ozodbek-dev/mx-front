import {Button, Fade, Modal,} from "@mui/material";
import {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
// import "../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {request} from "../../../api/request";
import CloseIcon from "@mui/icons-material/Close";


function ComsbolAn() {
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
    const [open3,setOpen3] = useState(false)
    const [numarr, setNumarr] = useState([]);
  
  
  
  
    console.log(numarr);
  
    const [person, setPerson] = useState({
      isFetched: false,
      data: [],
      error: null
    })
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
    const { t } = useTranslation();
  
    const params = useParams();
  
    useEffect(() => {
      request
        .get("/bildirishnoma/viloyatga/", config)
        .then(data => setPerson(data.data.data.find(el => +el.id === +params.id)))
    }, [])
    console.log(person,'per');
    // if (!person.isFetched) return <Loading/>
    return (
      <>
        <div className="rol_ariza">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div className="rol_ariza_top">
              <Link to={"/"}>
                <Button startIcon={<ArrowBackIcon />} style={{ borderRadius: "12px", backgroundColor: "#DDEBFB", padding: "8px" }} variant="text">{t("bildirishnoma.single.ortga")}</Button>
              </Link>
            </div>
            <Button onClick={() => setOpen3(true)} variant="contained" startIcon={<AddIcon/>}>{t("bildirishnoma.add")}</Button>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal_one}
            open={open3}
            onClose={() => setOpen3(false)}
            closeAfterTransition
            BackdropProps={{
              timeout: 400,
            }}
            style={{
              marginTop: "200px",
              width: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Fade in={open3}>
              <div style={classes.paper}>
                <div className="zayavka_block">
                  <Button
                    style={{
                      color: "black",
                      textAlign: "right",
                      margin: "0 0 auto auto",
                      display: "flex",
                    }}
                    startIcon={<CloseIcon />}
                    onClick={() => setOpen3(false)}
                  ></Button>
                  <h4 className="zayavka_title">{t("input.bildir")}</h4>
                  <div className="delete_btn_group">
                    <Link
                      to={`/notificationvsb/tuman/${params.id}`}
                      className="jayavka_btn"
                    >
                      {t("bildirishnoma.tuman")}
                    </Link>
                    <Link
                      Link
                      to={`/notificationvsb/oilaviy/${params.id}`}
                      className="jayavka_btn"
                    >
                      {t("bildirishnoma.single.vositainf")}
                    </Link>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
          </div>
  
          {/* <div className="rol_ariza_bottom_top rol_ariza_bottom_top2">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.status")}
           
          </h4>
            { 
          current.status === "O'qildi" && <div className="status_info" style={{background:"green"}}>
              <p className="status_info_title" style={{color:"white"}}>
              {current.status}
            </p>
          </div> 
            }
        </div> */}
          <div className="rol_ariza_bottom">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="rol_ariza_bottom_div">
                <div className="rol_ariza_bottom_div_inner">
                  <div className="rol_ariza_bottom_div_inner_block">
                    <h4 className="rol_ariza_bottom_title">
                      {t("bildirishnoma.turi")}
                    </h4>
                    <div className="div-1">
                      {t("vosita.bola")}
                    </div>
                  </div>
                </div>
              </div>
  
              <div style={{ marginLeft: "20px",width:"52%" }} className="rol_ariza_bottom_div">
                <div className="rol_ariza_bottom_div_inner">
                  <div className="rol_ariza_bottom_div_inner_block">
                    <h4 className="rol_ariza_bottom_title">
                      {t("bildirishnoma.new.vazifasi")}
                    </h4>
                    <div className="div-1--1">
                      {person.muddati}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rol_ariza_bottom_top">
              <h4 className="rol_ariza_bottom_title">
                {t("bildirishnoma.single.iddata")}
              </h4>
              <div className="rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1">
                <div className="rol_ariza_bottom_block1">
                  <p className="info_single">{t("bildirishnoma.single.id")}</p>
                  <p className="info_single">{person.id}</p>
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
                        <p>{t("bildirishnoma.single.kimdan")}</p>
                      </div>
                      <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                        <p>{person.kimdan}</p>
                        {/* <p>{current.kimdan}</p> */}
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
                      </div>
                      <div className="rol_ariza_bottom_div_inner_block_select_inner1">
                        <p>{person.kimga}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
  
            </div>
  
          </div>
          {/* <div className="rol_ariza_bottom_div_inner">
          <h4 className="rol_ariza_bottom_title">
            {t("bildirishnoma.single.vosita")}
          </h4>
          <div className="single_table_all_block">
            <p className="single_table_all_title">
              {t("bildirishnoma.single.vositainf")} A
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
        </div> */}
  
          <div className="single_table_document">
            <div className="t9">
              <div className="rol_ariza_bottom_div_inner">
                <h4 className="rol_ariza_bottom_title">
                  {t("input.toif")}
                </h4>
                <ul className="site-list">
                  {
                    person.yosh_toifa && person.yosh_toifa.split(",").map(el => {
                      return (
                        <li className="site-list__items">
                          {t("input.yosh1")}: {el} {t("bola.yosh")}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="rol_ariza_bottom_div_inner">
                <h4 className="rol_ariza_bottom_title">
                  {t("modalariza.toif")}
                </h4>
                <ul className="silte-list">
                  {
                    person.oy_toifa && person.oy_toifa.split(",").map(el => {
                      return (
                        <li className="site-list__items">
                          {t("input.oy1")}: {el} {t("vosita.oy")}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
  
              <div className="rol_ariza_bottom_div_inner">
                <div className="rol_ariza_bottom_div_inner_block">
                  <h4 className="rol_ariza_bottom_title">
                    {t("bildirishnoma.single.qoshimcha")}
                  </h4>
                  <div className="document_left_title_block">
                    <p className="document_left_title">
                      <p>{person.qoshimcha}</p>
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
                    <a style={{ border: "none" }} target="_blank" className="div-1" href={`https://admin-mpbt.ssv.uz/static/${person.fayl && person.fayl.fayl}`} download >
                      {person.fayl && person.fayl.fayl}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </>
    )
  }
  export default ComsbolAn;
import {
    Alert,
    Button,
    Checkbox,
    Fade,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './jihozlar.scss'
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import {request} from "../../../api/request";
import Loading from "../../loading/loading";
import {Error} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import l2 from '../../../assets/icon/l2.svg'
import AddIcon from "@mui/icons-material/Add";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });


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
  
};

const rows = [{
  name:'qwe',
  id:1,
  lastname:'ewq',
   name1:'qwe',
  ids:1,
  lastname1:'ewq',
  lastname2:'ewq'
},
{
  name:'qwe',
  id:1,
  lastname:'ewq',
   name1:'qwe',
  ids:1,
  lastname1:'ewq',
  lastname2:'ewq'
},
{
  name:'qwe',
  id:1,
  lastname:'ewq',
   name1:'qwe',
  ids:1,
  lastname1:'ewq',
  lastname2:'ewq'
},
];

export default function Jihozlar() {
  const { t } = useTranslation();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [noti, setNoti] = React.useState(false);
  const [loader, setLoeder] = useState(true);
  const [notificationn, setNotificationn] = React.useState({
    state: "",
    text: "",
  });

  Array.prototype.remove = function () {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };

   const [idfill, setIdfill] = useState([]);
 const [check, setCheck] = useState([]);

   function Fillters(vall, add) {
   const l = [...check];
   if (add) {
     l.push(vall);
   } else {
     l.remove(vall);
   }
   setCheck(l);
   let fila = [];
   fila.push(jihozlar?.data.filter((item) => l.includes(item.ishchi_holati)));
   console.log(l,"Lodjo");
   setIdfill(fila);
  }


  const handleAlert = () => {
    setNoti(true);
  };

  const handlenoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNoti(false);
  };

  const handleClick = () => {
    setNoti(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInput({});
  };
  const params = useParams();
  const navigate = useNavigate()
  const token = window.localStorage.token;

  const formData = new FormData();
  formData.append("token", token);
  formData.append("muassasa", params.id);

  const [jihozlar, setJihozlar] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  useEffect(() => {
    request
      .post(`/jihoz/list/`, formData)
      .then(function (res) {
        setJihozlar({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setLoeder(false)
      })
      .catch(function (err) {
        setJihozlar({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [loader]);


  const [input, setInput] = useState({
    muassasa:params.id
  });
  function EditIt(e) {
    const arr = jihozlar.data.filter((el) => el.id === e);
    setInput(...arr);
    handleOpen(true);
    setEdi(true);
  }

  const onChange = (e) => {
    let arr = [];
    arr.push(e.target.value);
    if (e.target.type === "checkbox") {
      setInput({
        ...input,
        [e.target.name]: String(e.target.checked),
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  function Heets() {
    const formmdata = new FormData();
    formmdata.append("token", token);
    formmdata.append("jihoz_id", input.id);
    for (let [key, value] of Object.entries(input)) {
      formmdata.append(key, value);
    }
    request
      .put(`/jihoz/edit/`, formmdata)
      .then(function (res) {
        setNotificationn({
          state: "success",
          text: `Jihoz o'zgardi`,
        });
        setNewJihoz({
          isFetched: true,
          data: res.data,
          error: false,
        });
        console.log(res.data);
        handleClick(true);
      })
      .catch(function (err) {
        setNotificationn({
          state: "error",
          text: `Jihoz o'zgarmadi`,
        });
        setNewJihoz({
          isFetched: false,
          data: [],
          error: err,
        });
        handleClick(true);
      });
    setInput({});
    handleClose();
    setEdi(false);
    setLoeder(true);
  }

  const [newjihoz, setNewJihoz] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  const [edi, setEdi] = useState(false);
console.log(params.id,"id");
  function Create(e) {
      const formmdata = new FormData();
      formmdata.append("token", token);
      formData.append("muassasa",params.id)
      for (let [key, value] of Object.entries(input)) {
        formmdata.append(key, value);
      }
      request
        .post(`/jihoz/new/`, formmdata)
        .then(function (res) {
          setNotificationn({
            state: "success",
            text: `Jihoz qo'shildi`,
          });
          setNewJihoz({ isFetched: true, data: res.data, error: false });
          console.log(res.data);
          handleClick(true);
          setLoeder(false)
          setTimeout(() =>{
            window.location.reload()
          },1500)
        })
        .catch(function (err) {
          setNotificationn({ state: "error", text: `Jihoz qo'shilmadi` });
          setNewJihoz({ isFetched: false, data: [], error: err });
          handleClick(true);
        });
    handleClose();
    setLoeder(true);
    
  }


  const id = localStorage.getItem("id");
  const [data, setData] = useState({
    data: [],
    loading: false,
    error: false,
  });
  const tokens = localStorage.getItem("token");
  const formDatas = new FormData();
  formDatas.append("token", tokens);
  useEffect(() => {
    request
      .post("/viloyatlar/", formDatas)
      .then((data) => setData({
         loading: true, data: data.data, error: false
         })
      )
      .catch((err) => {
        setData({ loading: false, data: [], error: true });
        throw err;
      });
  }, []);
  const muassasaName =
    data.data.data &&
    data.data.data.find((el) =>
      el.muassasalar.find((el) => +el.id === +params.id)
    );
  const muassalar1 = muassasaName && muassasaName.muassasalar.find(el => +el.id === +params.id)
  console.log(
    muassasaName && muassasaName
  );
  
  if (params.id !== id && id){
      navigate('/')
  }
  console.log(jihozlar);
  if (jihozlar.error) return <Error />;
  if (!jihozlar.isFetched) return <Loading />;
  if(loader) return <Loading/>

  return (
    <div
      className="jihozlar_div"
      style={{ paddingLeft: "20px", paddingRight: "20px", marginTop: "50px" }}
    >
      <div className="sklad_top">
        {id && (
          <>
            <h3 className="jihozlar_title">Jihozlar</h3>
            <Button
            style={{
              backgroundColor:"#1464C0"
            }}
            startIcon={<AddIcon/>}
            onClick={handleOpen} variant="contained">
              
              Jihoz qo'shish
            </Button>
          </>
        )}
      </div>

<div className="arxiv_filter">
          <FormControl component="fieldset">
            <FormLabel component="legend">Saralash</FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="Yaroqli"
                control={<Checkbox />}
                label="Yaroqli"
                labelPlacement="end"
                onChange={(e) => {
                  if (e.target.checked) {
                    Fillters(e.target.value, true);
                  } else {
                    Fillters(e.target.value, false);
                  }
                }}
              />
              <FormControlLabel
                value="Tamirga muxtoj"
                control={<Checkbox />}
                label="Ta'mirga Muxtoj"
                labelPlacement="end"
                onChange={(e) => {
                  if (e.target.checked) {
                    Fillters(e.target.value, true);
                  } else {
                    Fillters(e.target.value, false);
                  }
                }}
              />
              <FormControlLabel
                value="Ishdan chiqqan"
                control={<Checkbox />}
                label="Ishdan Chiqqan"
                labelPlacement="end"
                onChange={(e) => {
                  if (e.target.checked) {
                    Fillters(e.target.value, true);
                  } else {
                    Fillters(e.target.value, false);
                  }
                }}
              />

              <Button variant="text" onClick={() => window.location.reload()}>
                Barchasi
              </Button>
            </FormGroup>
          </FormControl>
        </div>
      
      <div className="jihozlar">
        <div
          className="jihozlar_block_top"
          style={{ backgroundColor: "white" }}
        >
           <div className="jihozlar_block_top_inner">
            <h5 className="jihozlar_text">{t("bildirishnoma.single.soni")}</h5>
          </div>
          <div className="jihozlar_block_top_inner">
            <h5 className="jihozlar_text">Gemodializ apparat markasi</h5>
          </div>
          <div className="jihozlar_block_top_inner">
            <h5 className="jihozlar_text">
              {t("jihoz.ishlab")}
              <br />
              (davlat)
            </h5>
          </div>
          {/* <div className="jihozlar_block_top_inner">
            <h5 className="jihozlar_text">Urnatilgan joyi</h5>
          </div> */}
          <div className="jihozlar_block_top_inner">
            <h5 className="jihozlar_text">Ishlab chiqarilgan yili</h5>
          </div>
          <div className="jihozlar_block_top_inner">
            <h5 className="jihozlar_text">O'rnatilgan yili</h5>
          </div>
          <div className="jihozlar_block_top_inner">
            <h5 className="jihozlar_text">
              Ekspulatatsiya vaqti
              <br />
              (soat)
            </h5>
          </div>
          <div className="jihozlar_block_top_inner">
            <h5 className="jihozlar_text">
              Ishchi holati
              {/* <br />
              <span>
                (ishga yaroqli, tamirlashga muxtoj (tamirlash uchun zarur
                mablag' - so'mda), xisobdan chiqarishga loyiq)
              </span> */}
            </h5>
          </div>
          {id && (
            <div className="jihozlar_block_top_inner">
              <h5 className="jihozlar_text">Malumot o'zgartirish</h5>
            </div>
          )}
        </div>
      </div>
      {
        idfill.length >= 1
        ? idfill[0].map((item,index) => (
            <>
              <div className="jihozlar_blocks_bottom">
              <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{index+1}</p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{item.markasi}</p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">
                    {item.ishlab_chiqaruvchi_firma}
                  </p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">
                    {item.ishlab_chiqarilgan_yili}
                  </p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{item.ornatilgan_vaqti}</p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{item.ishlash_vaqti}</p>
                </div>
                <div div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{item.ishchi_holati}</p>
                </div>
                {id && (
                  <div
                    div
                    className="jihozlar_block_top_inner_text"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="delete_div"
                      variant="contained"
                      onClick={(e) => EditIt(item.id)}
                      // className="jihozlar_text edit_btn"
                    >
                      <img
                        className="delete_icon"
                        src={l2}
                        alt="o'zgartirish"
                      />
                    </button>
                    {/* <button
                            className="delete_div"
                            // onClick={() => handleOpen2(row.bemor_id)}
                            // id={row.bemor_id}
                          >
                            <img className="delete_icon" src={l3} alt="o'chirish" />
                          </button> */}
                  </div>
                )}
              </div>
            </>
        )) :
        jihozlar &&
        jihozlar?.data.map((item, index) => {
          return (
            <>
              <div className="jihozlar_blocks_bottom">
              <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{index+1}</p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{item.markasi}</p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">
                    {item.ishlab_chiqaruvchi_firma}
                  </p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">
                    {item.ishlab_chiqarilgan_yili}
                  </p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{item.ornatilgan_vaqti}</p>
                </div>
                <div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{item.ishlash_vaqti}</p>
                </div>
                <div div className="jihozlar_block_top_inner_text">
                  <p className="jihozlar_text">{item.ishchi_holati}</p>
                </div>
                {id && (
                  <div
                    div
                    className="jihozlar_block_top_inner_text"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="delete_div"
                      variant="contained"
                      onClick={(e) => EditIt(item.id)}
                      // className="jihozlar_text edit_btn"
                    >
                      <img
                        className="delete_icon"
                        src={l2}
                        alt="o'zgartirish"
                      />
                    </button>
                    {/* <button
                            className="delete_div"
                            // onClick={() => handleOpen2(row.bemor_id)}
                            // id={row.bemor_id}
                          >
                            <img className="delete_icon" src={l3} alt="o'chirish" />
                          </button> */}
                  </div>
                )}
              </div>
            </>
          );
        })}
      
      

      <div className="modal_seans">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal_one}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropProps={{
            timeout: 400,
          }}
          style={{
            marginTop: "0",
            width: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Fade in={open}>
            <div style={classes.paper}>
              <div className="modal_jihozlar">
                <form style={{
                  display:"flex",
                  flexDirection:"column",
                  justifyConten:"center"
                }}>
                  <div onClick={handleClose} className="btn_close_9">
                    <CloseIcon />
                  </div>
                  <div className="input_block">
                    <div className="input_div">
                      <TextField
                        id="outlined-basic"
                        label="Gemodializ apparat markasi"
                        variant="outlined"
                        name="markasi"
                        onChange={onChange}
                        value={input?.markasi}
                      />
                    </div>
                    <div className="input_div">
                      <TextField
                        id="outlined-basic"
                        label={t("jihoz.ishlab")}
                        variant="outlined"
                        name="ishlab_chiqaruvchi_firma"
                        onChange={onChange}
                        value={input?.ishlab_chiqaruvchi_firma}
                      />
                    </div>
                  </div>

                  <div className="input_block">
                    <div className="input_div">
                      <TextField
                        id="outlined-basic"
                        label="Urnatilgan joyi"
                        variant="outlined"
                        name="ornatilgan_joyi"
                        onChange={onChange}
                        value={input?.ornatilgan_joyi}
                      />
                    </div>
                    <div className="input_div">
                      <TextField
                        id="outlined-basic"
                        label="Ishlab chiqarilgan yili"
                        variant="outlined"
                        type="number"
                        name="ishlab_chiqarilgan_yili"
                        onChange={onChange}
                        value={input?.ishlab_chiqarilgan_yili}
                      />
                    </div>
                  </div>

                  <div className="input_block">
                    <div className="input_div">
                      <TextField
                        id="outlined-basic"
                        label="O'rnatilgan yili"
                        variant="outlined"
                        type="number"
                        name="ornatilgan_vaqti"
                        onChange={onChange}
                        value={input?.ornatilgan_vaqti}
                      />
                    </div>
                    <div className="input_div">
                      <TextField
                        id="outlined-basic"
                        label="Ekspulatatsiya vaqti (soat)"
                        variant="outlined"
                        name="ishlash_vaqti"
                        type="number"
                        onChange={onChange}
                        value={input?.ishlash_vaqti}
                      />
                    </div>
                    <div className="input_div">
                      <TextField
                        id="outlined-basic"
                        label={t("jihoz.ser")}
                        variant="outlined"
                        name="seriya_raqami"
                        type="text"
                        onChange={onChange}
                        value={input?.seriya_raqami}
                      />
                    </div>
                  </div>

                  <div className="input_block">
                    <div className="input_div">
                      <FormControl
                        style={{
                          width: "280px",
                        }}
                      >
                        <InputLabel id="ishchi_holati">
                          Ishchi holati
                        </InputLabel>
                        
                        <Select
                          labelId="Status"
                          id="outlined-basic"
                          onChange={onChange}
                          name="ishchi_holati"
                          value={input?.ishchi_holati}
                          required
                        >
                          <MenuItem MenuItem value={"Yaroqli"}>
                            Yaroqli
                          </MenuItem>
                          <MenuItem value={"Tamirga muxtoj"}>
                            Ta'mirga Muhtoj
                          </MenuItem>
                          <MenuItem value={"Ishdan chiqqan"}>
                            Ishdan chiqgan
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <Button
                    Button
                    variant="contained"
                    onClick={edi ? Heets : Create}
                  >
                    Qo 'shish
                  </Button>
                </form>
              </div>
            </div>
          </Fade>
        </Modal>

        <Snackbar
          Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={noti}
          autoHideDuration={6000}
          onClose={handlenoti}
        >
          <Alert
            Alert
            onClose={handlenoti}
            severity={notificationn.state}
            sx={{
              width: "100%",
            }}
          >
            {notificationn.text}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

import React, {forwardRef, useState} from 'react';
import {Button, Fade, Modal} from '@mui/material';
import './seanslar.scss'
import {request} from '../../../api/request'
import CloseIcon from "@mui/icons-material/Close";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MuiAlert from "@mui/material/Alert";
import {useTranslation} from "react-i18next";


const MSeanslar = ({ sea, setSea, handleSeansClose, id, shifokorlar,Seansbemor, loader, setLoeder }) => {

  const Alert = forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation = {
        6
      }
      ref = {
        ref
      }
      variant = "filled" {
        ...props
      }
      />;
    });
    const [noti, setNoti] = useState(false);
    const [notificationn, setNotificationn] = useState({
      state: "",
      text: "",
    });

    const handleClick = () => {
      setNoti(true);
    };

    const handlenoti = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setNoti(false);
    };

  const [inp, setInp] = useState({
    bemor_id:id,
    filtr_miqdori: 1,
    filtr_taminoti:"Muassasaniki",
    magistral_miqdori: 1,
    magistral_taminoti: "Muassasaniki",
    katetr_miqdori: 1,
    katetr_taminoti:"Muassasaniki",
    igna_miqdori:1,
    igna_taminoti:"Muassasaniki",
    igna2_miqdori:1,
    igna2_taminoti:"Muassasaniki",
  });
 



const token = window.localStorage.token


const [seansIn, setSeansIn] = useState({
  isFetched: false,
  data: {},
  error: null,
});





// const [loader, setLoeder] = useState(true);
const arr = [
  {
    category: "Filtr",
    name: "Юқори оқимли Диализаторлар 1,4-1,6м2 High Flux Series Hollow Fiber Dialyzers F15",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Юқори оқимли Диализаторлар 1,7-1,8м2 High Flux Series Hollow Fiber Dialyzers F18",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Юқори оқимли Диализаторлар 1,9-2,2м2  High Flux Series Hollow Fiber Dialyzers F19",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 1,0-1,2м2 Low Flux Series Hollow Fiber Dialyzers F12",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 1,3-1,4м2 Low Flux Series Hollow Fiber Dialyzers F14",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 1,5-1,6м2 Low Flux Series Hollow Fiber Dialyzers F15",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 1,8-1,9м2 Low Flux Series Hollow Fiber Dialyzers F18",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 2,0-2,2м2 Low Flux Series Hollow Fiber Dialyzers F20",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 0,6-0,8м2 Hemoflow F4HPS",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 1,0-1,2 м² Hemoflow F5HPS",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 1,3-1,4 м²  Hemoflow F6HPS",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 1,5-1,6 м² Hemoflow F7HPS",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 1,8-1,9 м² Hemoflow F8HPS",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 2,0-2,2 м²  Hemoflow F10HPS",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Диализатор 0,2-0,5м2 FX-PAED",
    size: "dona",
  },
  {
    category: "Filtr",
    name: "Болалар диализатори",
    size: "dona",
  },
  {
    category: "Magistral",
    name: "Унверсал магистрал (кат)",
    size: "dona",
  },
  {
    category: "Magistral",
    name: "Қон ўтказувчи магистрал AV-Set FMS PAED-R",
    size: "dona",
  },
  {
    category: "Igna",
    name: "Артериал фистулали ниналар 16G ",
    size: "dona",
  },
  {
    category: "Igna",
    name: "Артериал фистулали игнала FistulaNeedle Art17G",
    size: "dona",
  },
  {
    category: "Igna",
    name: "Венозли  фистулали ниналар 16G",
    size: "dona",
  },
  {
    category: "Igna",
    name: "Венозли  фистулали игнала FistulaNeedle Art17G",
    size: "dona",
  },
  {
    category: "Kateter",
    name: "  Икки тирқишли катетер. ZDD 11F20",
    size: "dona",
  },
  {
    category: "Kateter",
    name: "Икки тирқишли катетер. ZDD 12F20",
    size: "dona",
  },
  {
    category: "Kateter",
    name: " Икки тирқишли катетер.ZDD 8 F15",
    size: "dona",
  },
  {
    category: "Kateter",
    name: "Икки тирқишли катетер. ZDD 6,5 F12",
    size: "dona",
  },
  {
    category: "Tuz",
    name: "Таблеткали туз",
    size: "qop",
  },
  {
    category: "Konsentrat",
    name: "Кислотали концентрат",
    size: "quti",
  },
  {
    category: "Konsentrat",
    name: "Бикорбанат концентрат",
    size: "quti",
  },
  {
    category: "Dezinfiktant",
    name: "Лимон кислатаси 50%",
    size: "kanistr",
  },
  {
    category: "Dezinfiktant",
    name: "Цитростерил",
    size: "kanistr",
  },
];
  const [nuds, setNuds] = useState([]);


function Create(e) {
  const formmdata = new FormData();
  formmdata.append('token', token);
  for (let [key, value] of Object.entries(inp)) {
    formmdata.append(key, value)
  }
  request
    .post(`/seans/create/`, formmdata)
    .then(function (res) {
      Seansbemor(id)
      setSeansIn({
        isFetched: true,
        data: res.data,
        error: false
      });
      setNotificationn({
        state: 'success',
        text: `Yengi seans qo'shildi`
      })
      console.log(res.data);
      handleClick(true);
      setLoeder(false);

    })
    .catch(function (err) {
      setNotificationn({
        state: 'error',
        text: `Yengi seans qo'shilmadi`
      })
      setSeansIn({
        isFetched: false,
        data: [],
        error: err
      });
      handleClick(true);
      setLoeder(false);

    });
    handleNewClose()
  setLoeder(true);
}

console.log('NUDS',nuds);


  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setInp({
        ...inp,
        [e.target.name]: String(e.target.checked)
      });
    } else {
      setInp({
        ...inp,
        [e.target.name]: e.target.value
      });
    }
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
  };

  const [info, setInfo] = useState(false);

  const handleInfoOpen = (e) => {
    setInfo(true);
    setNuds(sea.data.filter((el) => el.id === e));
  };

  // console.log('MATRIX',sea);

  const handleInfoClose = () => {
    setInfo(false);
  };

  const [newBemor, setNewBemor] = useState(false);

  const handleNewOpen = () => {
    setNewBemor(true);
  };

  const handleNewClose = () => {
    setNewBemor(false);
  };
  console.log('SEA',sea);
  const { t } = useTranslation();
  return (
    <>
      <div className="seans_block">
        <div className="seans_item_blocks">
          <div className="btn_close">
            <button className="close_one_modal" onClick={handleSeansClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="new_seans">
            <h4 className="seans_bemor_title">Bemorning seanslari</h4>
          </div>
          {sea.isFetched &&
            sea?.data
              .slice(0)
              .reverse()
              .map((item, index) => (
                <>
                  {/* <div key={index} className="seans_item">
                    <h3>No{sea.data && sea.data.data.length - index}</h3>
                    <span>{item.vaqti.slice(0, 10)}</span>
                    <button
                      onClick={() => handleInfoOpen(item.id)}
                      variant="contained"
                    >
                      {t("bildirishnoma.batafsil")}
                    </button>
                  </div> */}
                  <div className="seans_item_block">
                    <div className="seans_item_block_top">
                      <h3>#{sea.data && sea.data.length - index} Seans</h3>
                      <Button
                        onClick={() => handleInfoOpen(item.id)}
                        variant="contained"
                        startIcon={<ReceiptLongIcon />}
                      >
                        {t("bildirishnoma.batafsil")}
                      </Button>
                    </div>
                    <div className="seans_item_block_inner">
                      <h4>{t("bildirishnoma.sana")}</h4>
                      <h4>{item.vaqti.slice(0, 10)}</h4>
                    </div>
                    <div className="seans_item_block_inner">
                      <h4>{t("jihoz.soat")}</h4>
                      <h4>{item.vaqti.slice(11, 16)}</h4>
                    </div>
                    <div className="seans_item_block_inner">
                      <h4>{t("sidebar.li4")}</h4>
                      <h4>{`${item.Shifokor_familiyasi} ${item.Shifokor_ismi}`}</h4>
                    </div>
                  </div>
                </>
              ))}
          <div className={`modal_seans_t12`}>
            {nuds.map((item, index) => (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal_one}
                open={info}
                onClose={handleInfoClose}
                closeAfterTransition
                BackdropProps={{
                  timeout: 400,
                }}
                style={{
                  marginTop: "0",
                  width: "1024px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Fade in={info}>
                  <div style={classes.paper}>
                    <div className="information_div">
                      <div className="information_block_top">
                        <h1>{item.vaqti.slice(0, 10)}</h1>
                        <button
                          className="close_modal"
                          onClick={handleInfoClose}
                        >
                          <CloseIcon />
                        </button>
                      </div>
                      <div className="sklad">
                        <div className="table_seans_block">
                          <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>VOSITALAR</h4>
                            </div>
                            <div>
                              <h4>OLINGAN MIQDORI</h4>
                            </div>
                            <div className="name_item2">
                              <h4>TURLARI</h4>
                            </div>
                            <div className="name_item2">
                              <h4>Kimniki</h4>
                            </div>
                          </div>
                        </div>
                        <div className="table_seans_block">
                          <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Filtr</h4>
                            </div>
                            <div>
                              <h4>{item.filtr_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.filtr_nomi}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.filtr_taminoti}</h4>
                            </div>
                          </div>
                          <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Magistral</h4>
                            </div>
                            <div>
                              <h4>{item.magistral_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.magistral_nomi}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.magistral_taminoti}</h4>
                            </div>
                          </div>
                          <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Igna Venoz</h4>
                            </div>
                            <div>
                              <h4>{item.igna2_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.igna2_nomi}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.igna2_taminoti}</h4>
                            </div>
                          </div>
                          <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Igna Arterial</h4>
                            </div>
                            <div>
                              <h4>{item.igna_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.igna_nomi}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.igna_taminoti}</h4>
                            </div>
                          </div>
                          
                          {/* <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Tuz</h4>
                            </div>
                            <div>
                              <h4>{item.tuz_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.tuz_nomi}</h4>
                            </div>
                          </div> */}
                          {/* <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Konsentrat</h4>
                            </div>
                            <div>
                              <h4>{item.konsentrat_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.konsentrat_nomi}</h4>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="information_block">
                        <h4>Seans vaqti</h4>
                        <h4>
                          {item.soat} soat <span>{item.minut}minut</span>
                        </h4>
                      </div>
                      <div className="information_block information_block_text">
                        <h4>Bemorning Shikoyati</h4>
                        <p className="shikoyat">{item.bemor_shikoyati}</p>
                      </div>
                      <div className="information_block">
                        <h4>{t("sidebar.li4")}</h4>
                        <h4>
                          {item.Shifokor_familiyasi} {item.Shifokor_ismi}
                        </h4>
                      </div>
                      <div className="information_block">
                        <h4>Bemor holati</h4>
                        {
                          // console.log(item.bemor_holati)
                          item.bemor_holati == 2 ? (
                            <h4>O'rta og'ir</h4>
                          ) : item.bemor_holati == 1 ? (
                            <h4>Stabil og'ir</h4>
                          ) : (
                            <h4>O'ta og'ir</h4>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </Fade>
              </Modal>
            ))}
         
           
              
          </div>
        </div>
      </div>
    </>
  );
};
 
export default MSeanslar;
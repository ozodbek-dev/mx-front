import React, {useState} from 'react';
import {Alert, Fade, Modal, Snackbar} from '@mui/material';
import './seanslar.scss'
import CloseIcon from "@mui/icons-material/Close";
import {useTranslation} from "react-i18next";


const Mseanslar = ({ sea, setSea, handleSeansClose, id, shifokorlar,Seansbemor }) => {
  const [inp, setInp] = useState({
    bemor_id:id,
  });
console.log(inp);
  const handlenoti = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNoti(false);
  };

  const { t } = useTranslation();


const token = window.localStorage.token


// const [seansIn, setSeansIn] = useState({
//   isFetched: false,
//   data: {},
//   error: null,
// });

const handleClick = () => {
  setNoti(true);
};
const [noti, setNoti] = React.useState(false);

const [notificationn, setNotificationn] = React.useState({
  state: '',
  text: ''
});

const [loader, setLoeder] = useState(true);


// function Create(e) {
//   const formmdata = new FormData();
//   formmdata.append('token', token);
//   for (let [key, value] of Object.entries(inp)) {
//     formmdata.append(key, value)
//   }
//   console.log('formmdata', formmdata)
//   request
//     .post(`/seans/create/`, formmdata)
//     .then(function (res) {
//       setNotificationn({
//         state: 'success',
//         text: `Yengi seans qo'shildi`
//       })
//       Seansbemor(id)
//       setSeansIn({
//         isFetched: true,
//         data: res.data,
//         error: false
//       });
//       console.log(res.data);
//       handleClick(true);

//     })
//     .catch(function (err) {
//       setNotificationn({
//         state: 'error',
//         text: `Yengi seans qo'shilmadi`
//       })
//       setSeansIn({
//         isFetched: false,
//         data: [],
//         error: err
//       });
//       handleClick(true);

//     });
//     handleNewClose()
//   setLoeder(true);
// }



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

  console.log('inp',inp);
 

  const [nuds, setNuds] = useState([]);

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

  console.log('sea1_1',sea);
  console.log("sea_filter", sea.isFetched && sea.filtr_miqdori);
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
            <h4>{sea.isFetched && sea?.length}</h4>
          </div>
          {sea.isFetched &&
            sea?.data.slice(0)
              .reverse()
              .map((item, index) => (
                <>
                  <div key={index} className="seans_item">
                    <h3>{t("bildirishnoma.soni")}{(sea.data && sea.data.length - index)  }</h3>
                    <span>{item.vaqti.slice(0, 10)}</span>
                    <button
                      onClick={() => handleInfoOpen(item.id)}
                      variant="contained"
                    >
                      {t("bildirishnoma.batafsil")}
                    </button>
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
                          </div>
                          <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Igna</h4>
                            </div>
                            <div>
                              <h4>{item.igna_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.igna_nomi}</h4>
                            </div>
                          </div>
                          <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Tuz</h4>
                            </div>
                            <div>
                              <h4>{item.tuz_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.tuz_nomi}</h4>
                            </div>
                          </div>
                          <div className="table_seans_block_inner">
                            <div className="name_item">
                              <h4>Konsentrat</h4>
                            </div>
                            <div>
                              <h4>{item.konsentrat_miqdori}</h4>
                            </div>
                            <div className="name_item2">
                              <h4>{item.konsentrat_nomi}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="information_block">
                        <h4>Seans vaqti</h4>
                        <h4>
                          {item.soat} soat <span>{item.minut}minut</span>
                        </h4>
                      </div>
                      <div className="information_block">
                        <h4>Gepatit</h4>
                        <h4>{item.gepatit}</h4>
                      </div>
                      <div className="information_block information_block_text">
                        <h4>Qo'shimcha</h4>
                        <p className="shikoyat">{item.bemor_shikoyati}</p>
                      </div>
                      <div className="information_block">
                        <h4>{t("sidebar.li4")}</h4>
                        <h4>
                          {item.Shifokor_familiyasi} {item.Shifokor_ismi}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Fade>
              </Modal>
            ))}
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
      </div>
    </>
  );
};
 
export default Mseanslar;
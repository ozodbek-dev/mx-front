import {
    Box,
    Button,
    Fade,
    InputAdornment,
    Modal,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import '../../container/GERMINTOZ/ROL/bildirishnoma/table/bildirish.scss';
import {Link} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import l1 from "../../assets/icon/l1.svg";
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {request} from '../../api/request';

function Notilpu() {

  const token = window.localStorage.token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const [ariza, setAriza] = useState([])
  const [sar, setSar] = useState([])
  const [data, setData] = useState([])


  const {
    t
  } = useTranslation();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    request
      .get("/bildirishnoma/muassasa/erkin/", config)
      .then(data => setData(data.data.data.reverse()))
  }, [])

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
      padding: "10px",
      width: "80%",
      margin: "30px auto 0 auto",
      borderRadius: "12px",
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
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = (e) => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const knop = (e) => {
    console.log(e.target.id);
    const formData = new FormData()
    formData.append("id", e.target.id)
    formData.append("status", "O'qildi")
    request
      .post("/bildirishnoma/muassasa/erkin/", formData, config)
  }
  const [cl, setCl] = useState("sarflov");

  function Sarflovlar(e) {
    setAriza(sar.data.data.filter(item => item.ariza_turi == e))
    setCl(e)
  }

  function change(e) {
    if (e.target.value.length > 1) {
      setAriza(ariza.filter(el => el.sana.split(" ")[0].includes(e.target.value)))
    } else {
      setAriza(sar.data.data)
    }
  }
  console.log(value);
  return ( <
    >
    <
    dvi className = "ariza" >
    <
    div className = "ariza_top" >
    <
    div style = {
      {
        display: "flex",
        alignItems: "center"
      }
    } >
    <
    h4 className = "ariza_top_title" > {
      {t("bildirishnoma.allariza")}
    }: {
      data.length
    } < /h4> <
    TextField className = 'search-ariza'
    onChange = {
      change
    }
    placeholder = {
      t("bildirishnoma.plac")
    }
    style = {
      {
        marginLeft: "40px"
      }
    }
    id = "standard-basic"
    variant = "outlined"
    InputProps = {
      {
        startAdornment: ( <
          InputAdornment style = {
            {
              position: "absolute",
              right: "18px"
            }
          } >
          <
          SearchIcon / >
          <
          /InputAdornment>
        ),
      }
    }
    /> <
    /div> {
      /* <div className="create_ariza_btn">
                <Button
                  onClick={() => handleOpen2()}
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  {t("bildirishnoma.add")}
                </Button>
              </div> */
    } <
    /div> <
    div className = "ariza_bottom" >
    <
    div className = "ariza_bottom_top" >
    <
    Box sx = {
      {
        borderBottom: 1,
        borderColor: 'divider',
      }
    } >
    <
    Tabs style = {
      {
        backgroundColor: "#fff"
      }
    }
    value = {
      value
    }
    onChange = {
      handleChange
    }
    aria - label = "basic tabs example" >
    <
    Tab label = {
      t("bildirishnoma.qabul")
    }
    /> <
    Tab label = {
      "Erkin Xabornoma"
    }
    /> <
    /Tabs> <
    /Box>

    <
    /div> <
    div className = "ariza_bottom_bottom" >
    <
    TableContainer component = {
      Paper
    } >
    <
    Table className = {
      classes.table
    }
    aria - label = "customized table" >
    <
    TableHead >
    <
    TableRow style = {
      {
        backgroundColor: "white"
      }
    } >
    <
    TableCell > {
      t("bildirishnoma.soni")
    } < /TableCell> <
    TableCell style = {
      {
        fontWeight: "bold",
      }
    }
    align = "left" >
    ID <
    /TableCell> <
    TableCell style = {
      {
        fontWeight: "bold",
      }
    }
    align = "left" >
    {
      t("bildirishnoma.send")
    } <
    /TableCell> <
    TableCell style = {
      {
        fontWeight: "bold",
      }
    }
    align = "left" >
    {
      t("bildirishnoma.turi")
    } <
    /TableCell>

    <
    TableCell style = {
      {
        fontWeight: "bold",
      }
    }
    align = "left" >
    {
      t("bildirishnoma.sana")
    } <
    /TableCell> <
    TableCell

    align = "center" >
    {
      t("bildirishnoma.status")
    } <
    /TableCell> <
    TableCell align = "center" >
    {
      t("bildirishnoma.harakat")
    } <
    /TableCell> <
    /TableRow> <
    /TableHead> <
    TableBody > {
      data.map((item, index) => {
        return ( <
          >
          <
          TableRow >
          <
          TableCell align = "left" > {
            data.length - index
          } <
          div className = 'ariza_bgc' > < /div> <
          /TableCell> <
          TableCell style = {
            {
              fontWeight: "bold",
            }
          }
          align = "left" >
          {
            item.id
          } <
          /TableCell> <
          TableCell style = {
            {
              fontWeight: "bold",
            }
          }
          align = "left" >
          {
            item.kimga
          } <
          /TableCell> <
          TableCell style = {
            {
              fontWeight: "bold",
            }
          }
          align = "left" >
          {t("vosita.erkin")} <
          /TableCell> <
          TableCell style = {
            {
              fontWeight: "bold",
            }
          }
          align = "left" >
          {
            item.sana
          } <
          /TableCell> <
          TableCell style = {
            {
              fontWeight: "bold",
            }
          }
          align = "center" >
          <
          button className = {
            item.status !== "Yuborildi" ? "status_btn" : "status_btn--not"
          } > {
            item.status !== "Yuborildi" ? t("bildirishnoma.arstatus.yangi") : t("vosita.oqil")
          } < /button> <
          /TableCell>

          <
          TableCell align = "center" >
          <
          div className = "button_modal button_modal_1" >
          <
          Link onClick = {
            item.status !== "Yuborildi" && knop
          }
          to = {
            `/singlelpu/${item.id}`
          }

          className = "single_info" >
          <
          img id = {
            item.id
          }
          className = "delete_icon"
          src = {
            l1
          }
          alt = "batafsil" / >
          <
          /Link> {
            /* <Button>
                                  <img className="delete_icon" src={l3} />
                                </Button> */
          } <
          /div> <
          /TableCell> <
          /TableRow> <
          />
        )
      })
    } <
    /TableBody> <
    /Table> <
    /TableContainer>

    <
    /div> <
    /div>

    <
    div className = "modal_one_99" >
    <
    Modal aria - labelledby = "transition-modal-title"
    aria - describedby = "transition-modal-description"
    className = {
      classes.modal_one
    }
    open = {
      open2
    }
    onClose = {
      handleClose2
    }
    closeAfterTransition BackdropProps = {
      {
        timeout: 400,
      }
    }
    style = {
      {
        marginTop: "200px",
        width: "600px",
        marginLeft: "auto",
        marginRight: "auto",
      }
    } >
    <
    Fade in = {
      open2
    } >
    <
    div style = {
      classes.paper
    } >
    <
    div className = "zayavka_block" >
    <
    Button style = {
      {
        color: "black",
        textAlign: "right",
        margin: "0 0 auto auto",
        display: "flex",
      }
    }
    startIcon = {
      < CloseIcon / >
    }
    onClick = {
      () => handleClose2()
    } >
    < /Button> <
    h4 className = "zayavka_title" > {t("modalariza.arizaturi")} < /h4> <
    div className = "delete_btn_group" >
    <
    Link to = {
      '/rmoariza'
    }
    className = 'jayavka_btn' > bildirishnoma ochish < /Link> {
      /* <Link to={'/apelatsion'} className='jayavka_btn'>Jihozlar va ehtiyot qismlar</Link> */ } <
    /div> <
    /div> <
    /div> <
    /Fade> <
    /Modal> <
    /div> <
    /dvi> <
    />
  )
}
export default Notilpu;
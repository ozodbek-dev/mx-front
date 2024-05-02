import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {request} from "../../../../../api/request";
import l1 from "../../../../../assets/icon/l1.svg";
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Erkin = ({arr}) => {
  const [sar, setSar] = useState([]);
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

  const token = window.localStorage.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [ariza, setAriza] = useState([]);
  const [loader, setLoeder] = useState(true);
  useEffect(() => {
    request
      .get(`/bildirishnoma/erkin/`, config)
      .then(function (res) {
        setAriza(res.data.data);
        setSar({
          isFetched: true,
          data: res.data,
          error: false,
        });
        setLoeder(false);
      })
      .catch(function (err) {
        setAriza({
          isFetched: false,
          data: [],
          error: err,
        });
      });
  }, [loader]);
  console.log("arr", arr);
  const { t } = useTranslation();
  return (
    <div className="ariza_bottom_bottom">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "white" }}>
              <TableCell> {t("bildirishnoma.soni")}</TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
                align="left"
              >
                ID
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
                align="left"
              >
                {t("bildirishnoma.single.kimdan")}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
                align="left"
              >
                {t("bildirishnoma.send")}
              </TableCell>

              <TableCell
                style={{
                  fontWeight: "bold",
                }}
                align="left"
              >
                {t("bildirishnoma.sana")}
              </TableCell>
              <TableCell align="center">{t("bildirishnoma.status")}</TableCell>
              <TableCell align="center">{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             <>
            {
              arr.length > 0 ? arr.map((item,index) => (
                 <TableRow>
                      <TableCell align="left">
                        {index + 1}
                        <div className="ariza_bgc"></div>
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                       {item.id}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                       {item.kimdan}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        {item.kimga}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="left"
                      >
                        {item.sana}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                        align="center"
                      >
                        <Button disabled style={{color:"black"}}  variant = "contained"
                         startIcon = {< DoneAllIcon/>} >
                          {item.status}
                        </Button>
                      </TableCell>

                      <TableCell align="center">
                        <div className="button_modal button_modal_1">
                          <Link
                            to={`/sarflov/${item.id}}`}
                            className="single_info"
                          >
                            <img
                              className="delete_icon"
                              src={l1}
                              alt="batafsil"
                            />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
              )) : null
              
            }     
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Erkin;

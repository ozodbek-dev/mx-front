import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {get} from "lodash";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {request} from "../../../../../api/request";
import "./index.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const OshpAdd = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    text: "",
    status: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const handlerSearch = () => {
    if (search.length > 3) {
      setLoading(true);
      const formData = new FormData();
      formData.append("nomi", search);
      request
        .post("/hududlar/tuman/createmuassasa/", formData, config)
        .then((data) => {
          setLoading(false);

          setData(data.data.data);
          if (data.data.data === "Bunday nomli muassasa juda ko'p") {
            setData([]);
            toast.error(data.data.data);
          }
          if (data.data.data === "Xatolik yuz berdi") {
            setData([]);
            toast.error(data.data.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Bunday nom ostida oshplar topilmadi.");
        });
    }
  };
  const handlerAdd = (e) => {
    const formData = new FormData();
    formData.append("id", e);
    request
      .post("/hududlar/tuman/createmuassasa/", formData, config)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setOpen(true);
          setState({
            text: data.data,
            status: "success",
          });
          setTimeout(() => {
            navigate(-1);
          }, 1500);
        } else {
          setOpen(true);
          setState({
            text: data.data,
            status: "error",
          });
        }
      })
      .catch((err) => alert(get(err, "response.data")));
  };

  return (
    <div className="form" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <header className="header">
          <Link className="back" to={"/monitoring/oshp"}>
            <i>
              <ArrowBackIcon />
            </i>
            {t("bildirishnoma.single.ortga")}
          </Link>
          <h2>{t("bildirishnoma.add1")}</h2>
        </header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label={t("bildirishnoma.qidir")}
            variant="outlined"
          />
          <Button
            disabled={loading}
            style={{ marginLeft: "12px" }}
            onClick={handlerSearch}
            variant="contained"
            startIcon={<SearchIcon />}
          >
            {loading ? "Qidirilmoqda..." : t("input.qidir")}
          </Button>
        </div>
      </div>
      {!data[0] && (
        <div className="site-add">
          <p
            className="site-add__page"
            data-content={t("bildirishnoma.single.add")}
          />
        </div>
      )}
      {data[0] && (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead className="table_head_block">
              <TableRow>
                <TableCell>{t("bildirishnoma.soni")}</TableCell>
                <TableCell>{t("bildirishnoma.single.muas")}</TableCell>
                <TableCell>{t("input.m")}</TableCell>
                <TableCell>{t("shifokor.tel")}</TableCell>
                <TableCell>email</TableCell>
                <TableCell>{t("jihoz.add1")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? data.map((el, index) => {
                    return (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{el.name}</TableCell>
                        <TableCell>{el.address.line}</TableCell>
                        <TableCell>
                          {el.telefon[0] && el.telefon[0].value}
                        </TableCell>
                        <TableCell>
                          {el.telefon[1] && el.telefon[1].value}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handlerAdd(el.id)}
                            variant="contained"
                            startIcon={<AddIcon />}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={state.status}
            sx={{ width: "100%" }}
          >
            {state.text}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default OshpAdd;

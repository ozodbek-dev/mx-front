import { Button, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import usePost from "hooks/usePost";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { request } from "../../../api/request";
import eye from "../../../assets/img/eye.svg";
import { onCallback } from "../get-token";
import "./auth.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Auth = ({ path }) => {
  const navigate = useNavigate();
  const [loader, setLoeder] = useState(false);
  const [login, setLogin] = useState({});
  const [open, setOpen] = React.useState(false);
  const [warnig, setWarnig] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [eyes, setEyes] = React.useState(false);
  const { mutate } = usePost();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setWarnig(false);
    setError(false);
  };
  const SSO = () => {
    mutate({
      url: "/sso/url/",
      onSuccess: (response) => {
        window.localStorage.setItem(
          "code_verifier",
          response.data.code_verifier
        );
        window.location = response.data.url;
      },
    });
  };
  function Create(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let [key, value] of Object.entries(login)) {
      formData.append(key, value);
    }
    request
      .post(`/user/login/`, formData)
      .then(function (res) {
        window.localStorage.setItem("token", res.data.token);
        if (res.data.shifokor_id)
          window.localStorage.setItem("id", res.data.shifokor_id.muassasa_id);
        if (res.data.ttb_id)
          window.localStorage.setItem("tid", res.data.ttb_id.tuman_id);
        if (res.data.uzmedimpeks_user)
          window.localStorage.setItem("uzb", res.data.uzmedimpeks_user.user_id);
        if (res.data.vssb_id)
          window.localStorage.setItem("vsb", res.data.vssb_id.viloyat_id);
        else if (
          res.data.user_type &&
          !res.data.vssb_id &&
          !res.data.ttb_id &&
          !res.data.shifokor_id &&
          !res.data.uzmedimpeks_user
        )
          window.localStorage.setItem(res.data.token, res.data.user_type);
        if (res.data.token && res.data.shifokor_id) {
          setOpen(true);
          navigate(`/`);
          window.location.reload();
        }
        if (res.data.token && res.data.ttb_id) {
          setOpen(true);
          navigate(`/`);
          window.location.reload();
        }
        if (res.data.token && res.data.uzmedimpeks_user) {
          setOpen(true);
          navigate(`/`);
          window.location.reload();
        }
        if (res.data.token && res.data.vssb_id) {
          setOpen(true);
          navigate(`/`);
          window.location.reload();
        } else if (
          res.data.token &&
          res.data.user_type &&
          !res.data.ttb_id &&
          !res.data.uzmedimpeks_user &&
          !res.data.shifokor_id &&
          !res.data.vssb_id
        ) {
          setOpen(true);
          navigate(`/`);
          window.location.reload();
        }
      })
      .catch(function (err) {
        console.log(err);
        if (err.message === "Request failed with status code 401")
          setWarnig(true);
        if (err.message === "Request failed with status code 403")
          setError(true);
      });
    setLoeder(true);
  }

  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      setLogin({ ...login, [e.target.name]: String(e.target.checked) });
    } else {
      setLogin({ ...login, [e.target.name]: e.target.value });
    }
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      onCallback();
    }
  }, []);
  const { t } = useTranslation();
  return (
    <div className="auth">
      <div className="auth_left">
        <Stack spacing={2}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Muffaqiyatli Kirish!
            </Alert>
          </Snackbar>
          <Snackbar open={warnig} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Parol yoki Foyadalanuvhi nomi xato!
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Xatolik!
            </Alert>
          </Snackbar>
        </Stack>
        <div className="img_logo-ssv">
          <p className="ssv_text">
            O'zbekiston respublikasi sog'liqni saqlash vazirligi
          </p>
        </div>
        {!path && (
          <form action="" className="form_auth" onSubmit={Create}>
            <div className="input_auth_block">
              <TextField
                id="outlined-basic"
                label="Foydalanuvchi nomi"
                variant="outlined"
                name="username"
                onChange={onChange}
              />
            </div>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="input_auth_block"
            >
              <TextField
                id="outlined-basic"
                label="Parol"
                variant="outlined"
                onChange={onChange}
                name="password"
                type={eyes ? "text" : "password"}
              />
              <img
                className={eyes ? "visabel-eye--close" : "visabel-eye"}
                src={eye}
                alt="..."
                onClick={() => setEyes(!eyes)}
              />
            </div>
            <Button color="inherit" onClick={SSO} className="sso-link">
              SSO Orqali Kirish?
            </Button>
            <div className="btn_auth">
              <Button
                type="submit"
                style={{
                  display: "block",
                  width: "100%",
                  backgroundColor: "#1464C0",
                }}
                variant="contained"
                // onClick={Create}
              >
                {t("shifokor.tasdiq")}
              </Button>
            </div>
          </form>
        )}
        {path && (
          <div
            className="btn_auth"
            style={{
              marginTop: "70px",
            }}
          >
            <p style={{ textAlign: "center" }}>
              SSO Orqali Kirishni Tasdiqlaysizmi?
            </p>
            <Button
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "#1464C0",
              }}
              variant="contained"
            >
              {t("shifokor.tasdiq")}
            </Button>
          </div>
        )}
      </div>
      <div className="auth_right"></div>
    </div>
  );
};

export default Auth;

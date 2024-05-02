import Loading from "components/loading/loading";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logins = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const postCode = async () => {
    const token_endpoint = "https://admin-mpbt.ssv.uz/api/v1/sso/authenticate/";
    localStorage.setItem(
      "verifier_DEBUG_CHECK",
      localStorage.getItem("verifier")
    );
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      code_verifier: "6xKQp8FRej8K4bRrFOBe9YpfYoLXkMIpLWxYJTtOZj0",
    });
    const token = await fetch(token_endpoint, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const json = await token.json();
    console.log(json);
    localStorage.setItem("access_token", JSON.stringify(json));
    window.localStorage.setItem("token", json.token);
    if (json.token && json.shifokor_id.muassasa_id) {
      window.localStorage.setItem("id", json.shifokor_id.muassasa_id);
      console.log("user");
      navigate(`/`);
      window.location.reload();
    }
    if (json.token && json.ttb_id.tuman_id) {
      window.localStorage.setItem("tid", json.ttb_id.tuman_id);
      console.log("ttb");
      navigate(`/`);
      window.location.reload();
    }
    if (json.token && json.uzmedimpeks_user.user_id) {
      console.log("uzb");
      window.localStorage.setItem("uzb", json.uzmedimpeks_user.user_id);
      navigate(`/`);
      window.location.reload();
    }
    if (json.token && json.vssb_id.viloyat_id) {
      console.log("vsb");
      window.localStorage.setItem("vsb", json.vssb_id.viloyat_id);
      navigate(`/`);
      window.location.reload();
    } else if (
      json.token &&
      json.user_type &&
      !json.ttb_id.tuman_id &&
      !json.uzmedimpeks_user.user_id &&
      !json.shifokor_id.muassasa_id &&
      !json.vssb_id.viloyat_id
    ) {
      console.log("vazir");
      window.localStorage.setItem(json.token, json.user_type);
      navigate(`/`);
      window.location.reload();
    }
  };

  useEffect(() => {
    postCode();
  }, [code]);

  return <div>{/* <Loading /> */}</div>;
};

export default Logins;

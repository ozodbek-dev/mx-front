import { Button } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Box, Stack, TextareaAutosize, TextField } from "@mui/material";
import usePost from "hooks/usePost";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pdfDoc from "../../../assets/icon/pdf_doc.svg";
import scrip from "../../../assets/icon/scripka.svg";

const initialState = {
  mavzu: "",
  qoshimcha: "",
  fayl: "",
};

const CreateApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const { mutate, isLoading } = usePost();
  function delFile() {
    setData((prev) => ({
      ...prev,
      fayl: "",
    }));
  }

  const getInputValue = (e) => {
    if (e.target.name === "fayl") {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
      return;
    }
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if ((key === "fayl" && !value) || (key === "qoshimcha" && !value)) return;
      formData.append(key, value);
    });
    if (!data.mavzu) {
      toast.error(t("Ma'lumotlarni to'liq kiriting!"));
      return;
    }
    mutate({
      url: "/ariza/moh/yaratish/",
      data: formData,
      onSuccess: () => {
        toast.success("Yuborildi!");
        navigate("/barchaArizalar?tab=3");
      },
      onError: (err) => {
        toast.error("Yuborilmadi!");
        console.log(err);
      },
    });
  };
  return (
    <Box style={{ margin: "1rem" }}>
      <Button onClick={() => navigate(-1)} variant="contained" color="primary">
        {t("bildirishnoma.single.ortga")}
      </Button>
      <form onSubmit={submitHandler}>
        <div style={{ marginTop: "24px" }} className="single_table_document">
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <div className="rol_ariza_bottom_div_inner_block">
                <h4 className="rol_ariza_bottom_title">
                  {t("bildirishnoma.single.qoshimcha")}
                </h4>
                <div
                  className="document_left_title_block"
                  style={{ overflow: "auto", height: "auto" }}
                >
                  <TextareaAutosize
                    className="document_left_title"
                    name="qoshimcha"
                    value={data.qoshimcha}
                    onChange={getInputValue}
                  ></TextareaAutosize>
                </div>
              </div>
            </div>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {isLoading ? (
                <LoadingButton
                  endIcon={<SendIcon />}
                  loadingPosition="end"
                  variant="contained"
                  loading={true}
                >
                  <span>{t("Yuborilmoqda!")}</span>
                </LoadingButton>
              ) : (
                <Button
                  type={"submit"}
                  style={{
                    borderRadius: "12px",
                  }}
                  startIcon={<SendIcon />}
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  {t("modalariza.arizayub")}
                </Button>
              )}
            </Stack>
          </div>
          <div className="t9">
            <div className="rol_ariza_bottom_div_inner">
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")}
              </h4>
              {!data?.fayl ? (
                <div
                  className="sarflov_block_comment_inner"
                  style={{ padding: "0!important", margin: "0!important" }}
                >
                  <input
                    onChange={getInputValue}
                    name="fayl"
                    value={data.fayl}
                    type="file"
                    id="files"
                    className="input_download"
                  />
                  <label htmlFor="files" className="all_download">
                    <img className="scrip_file" src={scrip} alt="" />
                    {t("vosita.qosh")}
                  </label>
                </div>
              ) : null}
              <div className="sarflov_block_inner_div">
                {data.fayl ? (
                  <div className="sarflov_block_download_file">
                    <label className="input_tyle_download">
                      <img
                        src={pdfDoc}
                        alt={data.fayl.name}
                        className="label_img"
                      />
                      {data.fayl.name}
                      <div className="close_file">
                        <Button
                          onClick={delFile}
                          startIcon={<CloseIcon />}
                        ></Button>
                      </div>
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <div className="rol_ariza_bottom_div_inner">
                <h4 className="rol_ariza_bottom_title">{t("Mavzu tanlash")}</h4>
                <TextField
                  onChange={getInputValue}
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  name="mavzu"
                  value={data.mavzu}
                  label={t("Mavzu tanlash")}
                  variant="outlined"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default CreateApplication;

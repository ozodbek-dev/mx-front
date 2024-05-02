import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {Box, Button, Fade, Modal, TextField} from "@mui/material";
import usePost from "hooks/usePost";
import {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {request} from "../../../api/request";
import Loading from "../../../components/loading/loading";
import "./singlebemor.scss";
import dayjs from "dayjs";
import useGet from "hooks/useGet";
import {get} from "lodash";

const SingleShifokor = () => {
  const { t } = useTranslation();
  const [loader, setLoeder] = useState(true);
  const [shifokorlar, setShifokorlar] = useState([]);
  const [comment, setComment] = useState();
  const params = useParams();
  const [del, setDel] = useState(false);
  const { mutate } = usePost();
  const token = window.localStorage.token;
  const [input, setInput] = useState({
    tugilgan_sana: "",
    id:"",
    familiya:"",
    ism:"",
    otasining_ismi:"",
    lavozimi:"",
    mutaxassislik_toifasi:"",
    qayta_malaka_oshirish_vaqti:"",
    ish_staji:"",
    tel_raqami:""
  });
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();
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
      padding: "30px",
      borderRadius: "10px",
      width: "1000px",
      position: "relative",
      margin: "auto",
    },
    formControl: {
      margin: "1px",
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: "5px",
    },
  };
  const [doctor, setDoctor] = useState(null);
  const {  refetch, isLoading, data} = useGet({
    url: `/muassasa/shifokor/?filter[id]=${params.id}`,
    onSuccess: (res) => {
      setDoctor(res.data.data[0]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(get(error, "response.data.message"));
    },
  });

  const deleteOpen = (e) => {
    setDel(true);
  };

  const deleteClose = () => {
    setDel(false);
  };

  function Deletes(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", params.id);
    formData.append("izoh", comment);
    mutate({
      url: "/muassasa/delete/shifokor/",
      data: formData,
      onSuccess: () => {
        toast.success("Shifokor O'chirildi!");
        setTimeout(() => {
          navigate("/shifokor");
        }, 1500);
      },
      onError: () => {
        toast.error("Shifokor O'chirilmadi!");
      },
    });
    deleteClose();
  }

  const handleOpen2 = (e) => {
    setOpen2(true);
    editsId();
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  function editsId(e) {
    setInput({
      ...doctor,
      tugilgan_sana:doctor.tugilgan_sana.split(".").reverse().join('-'),
    });
  }


  const edit = useCallback(
      () => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        setLoeder(true);
        const formmdata = new FormData();
        if(!input.id){
          toast.error("Shifokor malumotlari noto'g'ri kirtildi.");
          return;
        }
        for (let [key, value] of Object.entries(input)) {
          formmdata.append(key, value);
        }

        request
            .put(`/muassasa/shifokor/`, formmdata, config)
            .then(function (res) {
              setInput({
                ...input,
                diagnoz: res.data.id,
              });
              setLoeder(false);
              toast.success("Shifokor malumotlari yangilandi.");
              refetch();
            })
            .catch(function (err) {
              if(err instanceof  Error){
                toast.error("Xatolik yuz berdi! " + err.message);
                return
              }
              if(err?.response?.data?.message){
                toast.error("Xatolik yuz berdi! " + err?.response?.data?.message);
                return
              }
              toast.error("Xatolik yuz berdi! " );
              setLoeder(false);
            }).finally(()=>setLoeder(false))
        handleClose2();
      },
      [input],
  );


  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  
  if (isLoading || !doctor ) return <Loading />;
  return (
    <div className="singlebemor">
      <div className="singlebemor_top">
        <div className="singlebemor_top_left">
          <Link to={"/shifokor"}>
            <Button startIcon={<ArrowBackIcon />} variant="contained">
              {t("bildirishnoma.single.ortga")}
            </Button>
          </Link>
          <Button
            startIcon={<EditIcon />}
            onClick={handleOpen2}
            variant="contained"
          >
            {t("sbola.uz")}
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            style={{ backgroundColor: "red" }}
            onClick={() => deleteOpen(shifokorlar.shifokor_id)}
            variant="contained"
          >
            {t("sbola.rt")}
          </Button>
        </div>
      </div>
      <div className="singlebemor_block">
        <div className="singlebemor_block_left">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.sh")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.surname")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.familiya}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.name")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{doctor.ism}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.otch")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.birthday")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.tugilgan_sana}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.lavozim")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.lavozimi}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">
              {t("sbola.shiftel")}
            </h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.tel")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.tel_raqami}
              </h5>
            </div>
          </div>
        </div>

        <div className="singlebemor_block_right">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.q1")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.staj")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.ish_staji
                  ? doctor.ish_staji
                  : t("Kiritilmagan")}
              </h5>
            </div>

            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("input.malaka")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.oxirgi_malaka_oshirgan_vaqti_va_joyi
                  ? doctor.oxirgi_malaka_oshirgan_vaqti_va_joyi
                  : t("Kiritilmagan")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.m2")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.qayta_malaka_oshirish_vaqti
                  ? doctor.qayta_malaka_oshirish_vaqti
                  : t("Kiritilmagan")}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.professia")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {doctor.mutaxassislik_toifasi
                  ? doctor.mutaxassislik_toifasi
                  : t("Kiritilmagan")}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="modal_scrool">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open2}
          onClose={handleClose2}
          closeAfterTransition
          style={{ ...classes.modal, height: "100%" }}
        >
          <div style={classes.paper}>
            <Box component="form" className="doctor__form" autoComplete="off">
              <div className="doctor__form--content">
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    // onChange={onChange}
                    disabled
                    name="pinfl"
                    label={t("input.pfl")}
                    variant="outlined"
                    type={"number"}
                    value={input.JSHSHIR}
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    // onChange={onChange}
                    disabled
                    name="ism"
                    label={t("shifokor.alladd.name")}
                    variant="outlined"
                    value={input.ism}
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    // onChange={onChange}
                    disabled
                    name="familiya"
                    label={t("shifokor.alladd.surname")}
                    variant="outlined"
                    value={input.familiya}
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    // onChange={onChange}
                    disabled
                    name="otasining_ismi"
                    label={t("shifokor.alladd.otch")}
                    variant="outlined"
                    value={input.otasining_ismi}
                  />
                </div>
                <div className="doctor__form--field">
                  {/* <p>{t("shifokor.birthday")}</p> */}
                  <TextField
                    id="outlined-basic"
                    // onChange={onChange}
                    disabled
                    name="tugilgan_sana"
                    label={t("shifokor.birthday")}
                    placeholder={t("shifokor.birthday")}
                    type="date"
                    variant="outlined"
                    value={
                      dayjs(input.tugilgan_sana).format("dd/mm/yyyy")
                        ? input.tugilgan_sana
                        : dayjs(new Date())
                    }
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    label={t("shifokor.lavozim")}
                    // onChange={onChange}
                    name="lavozimi"
                    disabled
                    variant="outlined"
                    value={input.lavozimi}
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    label={t("shifokor.alladd.staj")}
                    type="number"
                    inputProps={{ min: 0 }}
                    onChange={onChange}
                    name="ish_staji"
                    variant="outlined"
                    value={input.ish_staji}
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    onChange={onChange}
                    name="oxirgi_malaka_oshirgan_vaqti_va_joyi"
                    label={t("input.malaka")}
                    variant="outlined"
                    value={input.oxirgi_malaka_oshirgan_vaqti_va_joyi}
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    onChange={onChange}
                    name="qayta_malaka_oshirish_vaqti"
                    label={t("input.m2")}
                    variant="outlined"
                    value={input.qayta_malaka_oshirish_vaqti}
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    onChange={onChange}
                    name="mutaxassislik_toifasi"
                    label={t("shifokor.professia")}
                    variant="outlined"
                    value={input.mutaxassislik_toifasi}
                  />
                </div>
                <div className="doctor__form--field">
                  <TextField
                    id="outlined-basic"
                    onChange={onChange}
                    type="number"
                    name="tel_raqami"
                    label={t("shifokor.tel")}
                    variant="outlined"
                    value={input.tel_raqami}
                  />
                </div>
              </div>
            </Box>
            <Button
              type="button"
              className="no_delete_person"
              variant="contained"
          
              style={{ marginTop: "15px", marginRight: "10px", backgroundColor:'red', color:'white' }}
              onClick={() => setOpen2(false)}
            >
              {t("bildirishnoma.single.bekor")}
            </Button>
            <Button
              variant="contained"
              onClick={edit}
              style={{ marginTop: "15px", backgroundColor:"green", color:"white" }}
            >
              {t("shifokor.tasdiq")}
            </Button>
          </div>
        </Modal>
        <div className="modal_one_99">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal_one}
            open={del}
            onClose={deleteClose}
            closeAfterTransition
            BackdropProps={{
              timeout: 400,
            }}
            style={{
              marginTop: "200px",
              width: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Fade in={del}>
              <div style={{ ...classes.paper, width: "500px" }}>
                <h2 className="text-center">
                  Siz ushbu shifokorni ochirmoqchimisiz?
                </h2>
                <form onSubmit={Deletes}>
                  <TextField
                    onChange={(e) => setComment(e.target.value)}
                    className="comment-doctor"
                    id="outlined-basic"
                    label="Izoh"
                    variant="outlined"
                    required
                  />
                  <div className="grid grid-cols-2 gap-10">
                    <Button
                      type="button"
                      className="no_delete_person"
                      variant="contained"
                      color="success"
                      onClick={deleteClose}
                    >
                      {t("bildirishnoma.single.bekor")}
                    </Button>
                    <Button
                      type="submit"
                      className="red_btn"
                      variant="contained"
                      color="error"
                    >
                      o'chirish
                    </Button>
                  </div>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SingleShifokor;

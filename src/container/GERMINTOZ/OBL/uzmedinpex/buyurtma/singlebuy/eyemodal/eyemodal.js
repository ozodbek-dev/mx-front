import {useState} from "react";
import l1 from "../../../../../../../assets/icon/l1.svg";
import {Box, Button, Modal, SvgIcon, Tab, Tabs} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useTranslation} from "react-i18next";

const Eyemodal = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const { t } = useTranslation();
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ border: "none", backgroundColor: "transparent",}}
      >
        <img src={l1} />
      </button>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-two" sx={{ ...style, width: 860 }}>
          <Button
            style={{
              marginBottom: "14px",
              marginLeft: "-25px",
            }}
            variant="text"
            onClick={() => setOpen(false)}
          >
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </Button>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginBottom: "28px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t("iput.m1")} />
              <Tab label={t("input.fayl")} />
            </Tabs>
          </Box>
          <div className={value === 1 ? "visually-hidden" : "card-block"}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 className="card-block__head">{t("input.mal1")}</h2>
            </div>
            <ul style={{ listStyle: "none" }}>
              {/* <li style={{marginTop:"10px",marginBottom:"14px"}}>
                      <button style={{border:"none",backgroundColor:"transparent"}} >
                            <img  src={l3} />
                          </button>
                          <button style={{border:"none",backgroundColor:"transparent"}} >
                              <img src={l2} />
                          </button>
                    </li> */}
              <li className="site-list__item">{t("vosita.vositaturi")}:</li>
              <li className="site-list__item">
                {t("bildirishnoma.single.nomi")}:
              </li>
              <li className="site-list__item">{t("jihoz.ser")}:</li>
              <li className="site-list__item">Ishlab chiqarilgan sana:</li>
              <li className="site-list__item">{t("jihoz.mud")}:</li>

              <li className="site-list__item">{t("sbola.olchov")}:</li>
              <li className="site-list__item">{t("vosita.b1")}:</li>
              <li className="site-list__item">{t("vosita.b2")}:</li>
              <li className="site-list__item">
                {t("bildirishnoma.single.miqdori")}:
              </li>
              <li className="site-list__item">{t("bildirishnoma.yet")}:</li>
            </ul>
          </div>
          <section className={value === 0 ? "visually-hidden" : "card-block"}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4 className="sarflov_block_title">
                {t("bildirishnoma.new.fail")}
              </h4>
              {/* <label className={"input_tyle_download fix-file"} id="f1">
                                    
                                </label> */}
            </div>
            {/* {
                                    arr[0] &&
                                <div className="sarflov_block_inner_div">
                                {arr.map((item, index) => (
                                    arr.length  > 0 ? 
                                    <div key={index} className="sarflov_block_download_file">
                                    <label className="input_tyle_download">
                                        <img src={pdfDoc} alt="" className="label_img" />
                                        {item.filename}
                                        <div className="close_file">
                                        <Button
                                        onClick={(e) => delFile(index)}
                                        startIcon={<CloseIcon/>}></Button>
                                        </div>
                                    </label>
                                    </div> : null
                                ))}
                                </div>
                                } */}
          </section>
        </Box>
      </Modal>
    </>
  );
};
export default Eyemodal;

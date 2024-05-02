import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button } from "@mui/material";
import { request } from "api/request";
import Koriklar from "components/component/seanslar/koriklar";
import Loading from "components/loading/loading";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const Uzsinglechild = () => {
  const { t } = useTranslation();
  const tokens = localStorage.getItem("token");
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${tokens}` },
  };

  const [person, setPerson] = useState([]);
  const formData = new FormData();
  const [loader, setLoeder] = useState(true);

  const token = window.localStorage.token;
  formData.append("token", token);
  const params = useParams();

  const [sea, setSea] = useState({
    isFetched: false,
    data: {},
    error: null,
  });
  const [seans, setSeans] = useState(false);

  function Seansbemor(e) {
    setSeans(true);
    // formsdata.append("token", token);
    // formsdata.append("bemor_id", e);
    request
      .get(`/korik/bola/malumotlari/${params.id}`, config)
      .then(function (res) {
        setSea({
          isFetched: true,
          data: res.data.koriklar_hammasi,
          error: false,
        });

        setLoeder(false);
        console.log(res.data.koriklar_hammasi);
      })
      .catch(function (err) {
        setSea({
          isFetched: false,
          data: [],
          error: err,
        });
        setLoeder(false);
      });
  }
  const handleSeansClose = () => {
    setSeans(false);
  };

  useEffect(() => {
    request
      .get(`/muassasa/bola/${params.id}`, config)
      .then(function (res) {
        setPerson(res.data);
        setLoeder(false);
      })
      .catch(function (err) {});
  }, [params.id]);
  const templatePdf = useRef(null);

  const downloadPdfDocument = () => {
    html2canvas(templatePdf.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "in");
      pdf.addImage(imgData, "JPEG", 0, 0, 12, 8);
      pdf.save(`docs.pdf`);
    });
  };

  if (loader) return <Loading />;

  return (
    <div className="singlebemor">
      <div className="singlebemor_top">
        <div className="singlebemor_top_left">
          <Button
            className="site-btn"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            variant="contained"
          >
            {t("bildirishnoma.single.ortga")}
          </Button>

          <Button
            onClick={() => Seansbemor(params.id)}
            startIcon={<AccessTimeIcon />}
            variant="contained"
          >
            Ko'rik
          </Button>
        </div>
        <div className="singlebemor_top_right">
          <Button
            startIcon={<DescriptionIcon />}
            onClick={() => {
              // const doc = new jsPDF("landscape", "in");
              // doc.html(templatePdf.current);
              // doc.setFont("Roboto", "normal");
              // doc.save("PDF");
              downloadPdfDocument();
            }}
            variant="contained"
          >
            PDFga yuklab olish
          </Button>
        </div>
      </div>
      <div className="singlebemor_block" id="pdf" ref={templatePdf}>
        <div className="singlebemor_block_left">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.sh")} </h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.surname")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{person.familiya}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.name")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{person.ism}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.otch")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("input.pfl")}</h5>
              <h5 className="singlebemor_block_info_desc">{person.JSHSHIR}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.birthday")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person.tugilgan_sana}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.guruh")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.qon_guruhi == 1
                  ? "AB(IV)Rh+"
                  : person.qon_guruhi == 2
                  ? "AB(IV)Rh-"
                  : person.qon_guruhi == 3
                  ? "A(II)Rh+"
                  : person.qon_guruhi == 4
                  ? "A(II)Rh-"
                  : person.qon_guruhi == 5
                  ? "B(III)Rh+"
                  : person.qon_guruhi == 6
                  ? "B(III)Rh-"
                  : person.qon_guruhi == 7
                  ? "O(I)Rh+"
                  : person.qon_guruhi == 8
                  ? "O(I)Rh-"
                  : t("bola.kir")}
                {/* {
                  person.qon_guruhi
                } */}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">
              {t("sbola.contact")}
            </h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.tel")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person.tel_raqami}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.qtel")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person?.qoshimcha_raqam}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("shifokor.alladd.male")}
              </h5>
              <h5 className="singlebemor_block_info_desc">{person.jinsi}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">
                {t("sbola.manzil")}
              </h5>
              <h5 className="singlebemor_block_info_desc">
                {person.manzil_uyi ? person.manzil_uyi : t("input.mavjud")}
              </h5>
            </div>
          </div>

          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.g1")}</h4>

            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.g2")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {`${person.passport_seriya_va_raqami}`}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.who")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.qachon_kim_tomonidan_berilgan
                  ? person.qachon_kim_tomonidan_berilgan
                  : t("input.mavjud")}
              </h5>
            </div>
          </div>
        </div>
        <div className="singlebemor_block_right">
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.b1")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">ID</h5>
              <h5 className="singlebemor_block_info_desc">{person.id}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.shifo")}</h5>
              <h5 className="singlebemor_block_info_desc">{`${person.biriktirilgan_shifokor.ismi} ${person.biriktirilgan_shifokor.familiyasi} ${person.biriktirilgan_shifokor.otasini_ismi}`}</h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.ms")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.biriktirilgan_muassasa.nomi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("bola.rxt")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.royxatga_olingan_sana}
              </h5>
            </div>
          </div>
          <div className="singlebemor_block_info">
            <h4 className="singlebemor_block_info_title">{t("sbola.onot")}</h4>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.ot1")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.otasi.ism} {person.otasi.familiya}{" "}
                {person.otasi.otasining_ismi}
              </h5>
            </div>
            <div className="singlebemor_block_info_inner">
              <h5 className="singlebemor_block_info_desc">{t("sbola.on1")}</h5>
              <h5 className="singlebemor_block_info_desc">
                {person.onasi.ism} {person.onasi.familiya}{" "}
                {person.onasi.otasining_ismi}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="modal_seans">
        <Koriklar open={seans} id={params.id} handleClose={handleSeansClose} />
      </div>
    </div>
  );
};

export default Uzsinglechild;

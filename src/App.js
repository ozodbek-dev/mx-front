import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/main.scss";
import Auth from "./components/component/auth/auth";
import Login from "./components/component/auth/sso/login";
import Jihozlar from "./components/component/jihozlar/jihozlar";
import Logins from "./components/component/login/logins";
import Device from "./components/component/minstrjihozlar/device";
import Region from "./components/component/minstrjihozlar/region/region";
import Msarflov from "./components/component/msarflov";
import Sarflov from "./components/component/sarflov";
import Usarflov from "./components/component/sarflovuser";
import Sklad from "./components/component/sklad/sklad";
import Header from "./components/header/header";
import Doctor from "./container/doctor";
import TtberkinBil from "./container/doctor/bildirishnoma/rmoBildir";
import SsvAriza from "./container/doctor/ssvaAriza";
import Rolarizaobl from "./container/GERMINTOZ/OBL/arizalar/arizalar";
import Notivsb from "./container/GERMINTOZ/OBL/arizalar/notivsb/notivsb";
import Combol from "./container/GERMINTOZ/OBL/bildirishnoma/erkinKirishs/combol";
import Comerkin from "./container/GERMINTOZ/OBL/bildirishnoma/erkinKirishs/comerkin";
import Comsbol from "./container/GERMINTOZ/OBL/bildirishnoma/erkinKirishs/comsbol";
import Comvsb from "./container/GERMINTOZ/OBL/bildirishnoma/erkinKirishs/comvsb";
import InnerCombol from "./container/GERMINTOZ/OBL/bildirishnoma/erkinKirishs/inner-combol";
import Singleobl from "./container/GERMINTOZ/OBL/bildirishnoma/erkinKirishs/singlelpu";
import Tablebildirishobl from "./container/GERMINTOZ/OBL/bildirishnoma/table/bildirish";
import Erkinobl from "./container/GERMINTOZ/OBL/erkin/arizalar";
import Monitoringobl from "./container/GERMINTOZ/OBL/manitoring/manitoring";
import Vsbsingle from "./container/GERMINTOZ/OBL/manitoring/vsbsingle";
import Rolariza from "./container/GERMINTOZ/ROL/arizalar/arizalar";
import ErkinKirish from "./container/GERMINTOZ/ROL/bildirishnoma/erkinKirish/arizalar";
import Singlermo from "./container/GERMINTOZ/ROL/bildirishnoma/erkinKirishs/singlelpu";
import Singletablerol from "./container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable";
import Tablebildirish from "./container/GERMINTOZ/ROL/bildirishnoma/table";
import Singlettb from "./container/GERMINTOZ/ROL/bildirishnoma/table/singlettb";
import Tizimttb from "./container/GERMINTOZ/ROL/bildirishnoma/table/tizimttb";
import Ttbbol from "./container/GERMINTOZ/ROL/bildirishnoma/table/ttbbol";
import Ttbcom from "./container/GERMINTOZ/ROL/bildirishnoma/table/ttbcom";
import Ttberkin from "./container/GERMINTOZ/ROL/bildirishnoma/table/ttberkin";
import Erkin from "./container/GERMINTOZ/ROL/erkin/arizalar";
import Prihod from "./container/GERMINTOZ/ROL/kirim/kirim";
import PrihodObl from "./container/GERMINTOZ/ROL/kirimobl/kirim";
import Addariza from "./container/GERMINTOZ/ROL/lpu/add/addariza";
import Arizalpu from "./container/GERMINTOZ/ROL/lpu/arizalpu/arizalpu";
import Arizasingle from "./container/GERMINTOZ/ROL/lpu/arizalpu/arizasingle/arizasingle";
import Saveariza from "./container/GERMINTOZ/ROL/lpu/saveariza/saveariza";
import Monitoring from "./container/GERMINTOZ/ROL/manitoring/manitoring";
import OshpMonitoring from "./container/GERMINTOZ/ROL/manitoring/oshpMonitoring/oshpMonitoring";
import AllAziza from "./container/GERMINTOZ/ROL/manitoring/pageoshp/allAziza";
import Mohariza from "./container/GERMINTOZ/ROL/moh/mohariza/mohariza";
import Mohbil from "./container/GERMINTOZ/ROL/moh/mohbildirishnoma/mohbil";
import Mohbilbol from "./container/GERMINTOZ/ROL/moh/mohbildirishnoma/mohbilsin/mohbilbol";
import Mohbilerkin from "./container/GERMINTOZ/ROL/moh/mohbildirishnoma/mohbilsin/mohbilerkin";
import Mohcreatbol from "./container/GERMINTOZ/ROL/moh/mohbildirishnoma/mohcreat/mohcreatbol";
import Mohcreaterkin from "./container/GERMINTOZ/ROL/moh/mohbildirishnoma/mohcreat/mohcreaterkin";
import Mohchildren from "./container/GERMINTOZ/ROL/moh/mohbola/mohchildren";
import Mohvossin from "./container/GERMINTOZ/ROL/moh/mohvosita/mohvossin/mohvossin";
import Rmosklad from "./container/GERMINTOZ/ROL/omborhona/omborhona";
import Oblsklad from "./container/GERMINTOZ/ROL/omborhonaobl/omborhona";
import Rolarizasingle from "./container/GERMINTOZ/ROL/singletable/singletable";
import Rolarizasingleb from "./container/GERMINTOZ/ROL/singletableb/singletable";
import RolarizasinglebYuborilgan from "./container/GERMINTOZ/ROL/singletableb/singletableyuborilgan";
import Rolarizasinglebobl from "./container/GERMINTOZ/ROL/singletablebobl/singletable";
import RolarizasingleboblTwo from "./container/GERMINTOZ/ROL/singletablebobl2/singletable";
import Rolarizasinglebssv from "./container/GERMINTOZ/ROL/singletablebssv/singletable";
import Rolarizasinglebssvto from "./container/GERMINTOZ/ROL/singletablebssvtwo/singletable";
import Uzkirim from "./container/GERMINTOZ/ROL/uzmedinpex/kirim/kirim";
import Uzariza from "./container/GERMINTOZ/ROL/uzmedinpex/uzariza/uzariza";
import Uzarizasin from "./container/GERMINTOZ/ROL/uzmedinpex/uzariza/uzarizasingle/uzarizasin";
import Uzbildirish from "./container/GERMINTOZ/ROL/uzmedinpex/uzbildirish/uzbildirish";
import Uzbilbol from "./container/GERMINTOZ/ROL/uzmedinpex/uzbildirish/uzbilsin/uzbilbol";
import Uzbilerkin from "./container/GERMINTOZ/ROL/uzmedinpex/uzbildirish/uzbilsin/uzbilerkin";
import Uzbilsin from "./container/GERMINTOZ/ROL/uzmedinpex/uzbildirish/uzbilsin/uzbilsin";
import Uzerkin from "./container/GERMINTOZ/ROL/uzmedinpex/uzbildirish/uzerkin/uzerkin";
import Uzsinglebil from "./container/GERMINTOZ/ROL/uzmedinpex/uzbildirish/uzsinglebil/uzsiglebil";
import Singlemoni from "./container/GERMINTOZ/ROL/uzmedinpex/uzmonitoring/singlemoni/singlemoni";
import Uzsinglechild from "./container/GERMINTOZ/ROL/uzmedinpex/uzmonitoring/uzsinglechild";
import Uzsklad from "./container/GERMINTOZ/ROL/uzmedinpex/uzsklad/uzsklad";
import SingleEhtiyoj from "./container/lpu/bildirishnoma/singleEhtiyoj";
import Lpu from "./container/lpu/lpu";
import SinglelpuAsosiy from "./container/lpu/singlelpu";
import Ariza from "./container/NEFRALOGIYA/ariza/ariza";
import Arizassv from "./container/NEFRALOGIYA/arizassv/ariza";
import Arizamoh from "./container/NEFRALOGIYA/ariza_moh/ariza";
import ArizaObls from "./container/NEFRALOGIYA/ariza_obl/ariza";
import Sendariza from "./container/NEFRALOGIYA/ariza_obl/sendariza";
import Arxiv from "./container/NEFRALOGIYA/arxiv/arxiv";
import SingleArxiv from "./container/NEFRALOGIYA/arxivsingle/arxivsingle";
import SingleBemor from "./container/NEFRALOGIYA/bemormalumoti/singleBemor";
import Marizalar from "./container/NEFRALOGIYA/marizalar";
import Muassasa from "./container/NEFRALOGIYA/muassasa/muassasa";
import Shifokor from "./container/NEFRALOGIYA/shifokor/shifokor";
import SingleShifokor from "./container/NEFRALOGIYA/shifokorsingle/singleShifokor";
import SingleBemorMin from "./container/NEFRALOGIYA/singlebemorMin/singleBemorMin";
import Sort from "./container/NEFRALOGIYA/sort/sort";
import Muassasalar from "./container/NEFRALOGIYA/tumanlar/muassasalar/muassasalar";
import ResponsiveDrawer from "./container/sidebar/sidebar";
import Uzmedimpeks from "./container/uzmedimpeks";
import UzBil from "./container/uzmedimpeks/bildirishnoma/uzBil";
import UzQabulAriza from "./container/uzmedimpeks/uzQabulAriza";
import "./i18";
import Apelation from "./modules/components/jihozariza/apelatsion";
import Name from "./modules/components/moreM/name";
import More from "./modules/more/more";
import Msklad from "./modules/msklad/msklad";
import Skladm from "./modules/skladM/skladmu";
import Storekirim from "./modules/storekirim/storekirim";
import DataTable from "./pages/nefralogiya";
import Mohbilbola from "./pages/nefralogiya/bildirishnoma/uzBil";
import Moherkin from "./pages/nefralogiya/bildirishnoma/uzErkin";
import Vsarflov from "./pages/nefralogiya/datatable/ssvaAriza";
import DataTableobl from "./pages/nefralogiya_obl";
import ComsbolAn from "./pages/nefralogiya_obl/bildirishnoma/anBilSingle";
import SingleoblAn from "./pages/nefralogiya_obl/bildirishnoma/rmoBildir";
import AndijonAriza from "./pages/nefralogiya_obl/ssvaAriza";
import Notilpu from "./pages/notification/notilpu";
import Singlebol from "./pages/notification/singlebol";
import Singlebolrmo from "./pages/notification/singlebolrmo";
import Singlelpu from "./pages/notification/singlelpu";
import Tizmlpu from "./pages/notification/tizim";
import TizmVio from "./pages/notification/tizimviloyat";
import Statis from "./statistic/statistic";
// Statistcs MOH
import MohDistrictAndInstruments from "pages/nefralogiya/moh-statistcs-table/moh-district-instruments";
import MohFamilyMedicalCenter from "pages/nefralogiya/moh-statistcs-table/moh-family-medicine-center";
import MohRegionAndInstruments from "pages/nefralogiya/moh-statistcs-table/moh-region-instruments";
// Statistcs VSSB
import VssbDistrictsAndInstruments from "pages/vssb/district-instruments";
import VssbFamilyMedicalCenter from "pages/vssb/family-medicine-center";
// TTB
import TtbFamilyMedicalCenter from "pages/ttb/family-medicine-center";
// TTB
import Combinedapplication from "components/component/msarflov/combinedapplication";
import Createorder from "container/GERMINTOZ/ROL/uzmedinpex/ordersall/createorders/createorder";
import Withinorders from "container/GERMINTOZ/ROL/uzmedinpex/ordersall/ordersdetail/withinorders";
import CreateApplication from "container/NEFRALOGIYA/marizalar/create-application";
import dayjs from "dayjs";
import "dayjs/locale/uz";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Error from "Error/Error";
import OshpAdd from "./container/GERMINTOZ/ROL/manitoring/manitoringSection/oshpAdd";
import Orders from "./container/GERMINTOZ/ROL/uzmedinpex/ordersall/orders";
import Output from "./container/GERMINTOZ/ROL/uzmedinpex/output";
import Monitoringtool from "./container/GERMINTOZ/ROL/uzmedinpex/uzmonitoring";
import Listoftools from "pages/listoftools";
import Listofname from "pages/listoftools/listofname";
import OutputList from "pages/output/pages/outputlist";
import CreateOutput from "pages/output/pages/create";
import OutPutView from "pages/output/pages/view";

function App() {
  const auth = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const tid = localStorage.getItem("tid");
  const uzb = localStorage.getItem("uzb");
  const vsb = localStorage.getItem("vsb");
  const moh = localStorage.getItem(auth);
  const [news, setNews] = useState(false);
  dayjs.locale("uz");
  dayjs.extend(localizedFormat);

  return (
    <div className="app">
      <ToastContainer />
      <div className="app_left">
        {!auth ? (
          <div className="none">
            <ResponsiveDrawer news1={news} setNews={setNews} />
          </div>
        ) : (
          <ResponsiveDrawer news1={news} setNews={setNews} />
        )}
      </div>
      <div className="app_right">
        {auth && <Header />}
        <Routes>
          <Route path="*" element={<Error />} />
          {!auth && (
            <>
              <Route path="/auth/callback/" element={<Logins />} />
              <Route path="/login/" element={<Login />} />
            </>
          )}
          {!auth ? (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="/auth/callback/" element={<Logins />} />
            </>
          ) : (
            <>
              {/* MOh  */}
              {moh && (
                <>
                  <Route path="/" element={<DataTable />} />
                  <Route path="/sklad" element={<Sklad />} />
                  <Route path="/mSklad/:id" element={<Msklad />} />
                  <Route path="/muassasalar/:id" element={<Muassasalar />} />
                  <Route path="/ariza/:id/:type" element={<Msarflov />} />
                  <Route path="/arizamoh/:id" element={<Vsarflov />} />
                  <Route
                    path="/combinedapplication/:id"
                    element={<Combinedapplication />}
                  />
                  <Route path="/arizalar_ssv" element={<Arizamoh />} />
                  <Route path="/nameMore/:name/" element={<Name />} />
                  <Route path="/region/:id" element={<Region />} />
                  <Route path="/notification" element={<Mohbil />} />
                  <Route path="/mohbilbol/:id" element={<Mohbilbol />} />
                  <Route path="/mohbilbola/:id" element={<Mohbilbola />} />
                  <Route path="/mohcreatbol" element={<Mohcreatbol />} />
                  <Route path="/mohcreaterkin" element={<Mohcreaterkin />} />
                  <Route path="/moherkin/:id/:name" element={<Moherkin />} />
                  <Route path="/mohariza" element={<Mohariza />} />
                  <Route path="/mohbola" element={<Mohchildren />} />
                  <Route path="/mohvossin" element={<Mohvossin />} />
                  <Route path="/arizalar_ssv_single" element={<Arizassv />} />
                  <Route path="/statistic" element={<Statis />} />
                  <Route
                    path="/barchaArizalar"
                    element={<Marizalar news={news} setNews={setNews} />}
                  />
                  <Route
                    path="/applicationcreate/create-application"
                    element={
                      <CreateApplication news={news} setNews={setNews} />
                    }
                  />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/device" element={<Device />} />
                  <Route
                    path="/rolarizasssv/:id"
                    element={<Rolarizasinglebssv />}
                  />
                  <Route
                    path="/rolarizasssv_birlashtirish/:id"
                    element={<Rolarizasinglebssvto />}
                  />
                  <Route
                    path="/mohbilerkin/:id/:name"
                    element={<Mohbilerkin />}
                  />
                  <Route path="/ordersdetail/:id" element={<Withinorders />} />
                  <Route path="/monitoringtool" element={<Monitoringtool />} />
                  <Route
                    path="/uzsinglechild/:id"
                    element={<Uzsinglechild />}
                  />
                </>
              )}
              {/* UZB */}
              {uzb && (
                <>
                  <Route path="/createorder" element={<Createorder />} />
                  <Route path="/notification" element={<Uzbildirish />} />
                  <Route path="/uzsinglebil" element={<Uzsinglebil />} />
                  <Route path="/uzerkin" element={<Uzerkin />} />
                  <Route path="/uzbilsin/:id/:name" element={<Uzbilsin />} />
                  <Route path="/uzbilsinbil/:id/:name" element={<UzBil />} />
                  <Route path="/uzbilbol/:id" element={<Uzbilbol />} />
                  <Route path="/uzbiltwo" element={<Uzbilerkin />} />
                  <Route path="/monitoringtool" element={<Monitoringtool />} />
                  <Route path="/singlemoni" element={<Singlemoni />} />
                  <Route path="/uzsklad" element={<Uzsklad />} />
                  <Route path="/uzariza" element={<Uzariza />} />
                  <Route path="/uzarizasin/:id" element={<Uzarizasin />} />
                  <Route path="/uzarizacos/:id" element={<UzQabulAriza />} />
                  <Route path="/ordersdetail/:id" element={<Withinorders />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/" element={<Uzmedimpeks />} />
                  <Route
                    path="/uzsinglechild/:id"
                    element={<Uzsinglechild />}
                  />
                  <Route path="/uzkirim" element={<Uzkirim />} />
                  <Route path="/output" element={<Output />} />
                  <Route path="/listoftools" element={<Listoftools />} />
                  <Route path="/listofname/:id" element={<Listofname />} />
                  <Route path="/output/immuno" element={<OutputList />} />
                  <Route
                    path="/output/immuno/view/:id"
                    element={<OutPutView />}
                  />
                  <Route
                    path="/output/immuno/create/:type"
                    element={<CreateOutput />}
                  />
                </>
              )}
              {/* TTB Users */}
              {tid && (
                <>
                  <Route path="/" element={<Doctor />} />
                  <Route path="/rmosklad" element={<Rmosklad />} />
                  <Route path="/sort" element={<Sort />} />
                  <Route path="/kirim" element={<Prihod />} />
                  <Route path="/bemor/:id" element={<SingleBemorMin />} />
                  <Route path="/tizimttb/:id" element={<Tizimttb />} />

                  <Route path="/singlebolrmo/:id" element={<Singlebolrmo />} />
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/monitoring/oshp" element={<OshpMonitoring />} />
                  <Route path="/monitoring/all/:id" element={<AllAziza />} />
                  <Route path="/notification" element={<Tablebildirish />} />
                  <Route path="/singlettb/:id/:name" element={<Singlettb />} />
                  <Route path="/ttberkin/:id/:name" element={<Ttberkin />} />
                  <Route
                    path="/ttberkinbil/:id/:name"
                    element={<TtberkinBil />}
                  />
                  <Route path="/ttbcom/:id" element={<Ttbcom />} />
                  <Route path="/arizalar" element={<Ariza />} />
                  <Route path="/oshpadd" element={<OshpAdd />} />
                  <Route path="/ttbbol/:id" element={<Ttbbol />} />
                  <Route path="/rmoariza/:id" element={<Rolariza />} />
                  <Route path="/ttbbol/:id" element={<Ttbbol />} />
                  <Route path="/rmoariza/:id/:name" element={<Rolariza />} />
                  <Route path="/rmoerkin/:id/:name" element={<Erkin />} />
                  <Route path="/erkinxat/:id" element={<ErkinKirish />} />
                  <Route path="/Singlermo/:id" element={<Singlermo />} />
                  <Route path="/rolariza/:id" element={<Rolarizasingle />} />
                  <Route path="/ssvariza/:id" element={<SsvAriza />} />
                  <Route
                    path="/singlearizarol/:id"
                    element={<Singletablerol />}
                  />
                  <Route
                    path="/rolarizaRmo/:id"
                    element={<Rolarizasingleb />}
                  />
                  <Route
                    path="/rolarizaRmoYuborilgan/:yubId"
                    element={<RolarizasinglebYuborilgan />}
                  />
                  <Route path="/rolarizas/:id" element={<Rolarizasingle />} />
                  <Route
                    path="/ttb-family-medical-center/:medical_id"
                    element={<TtbFamilyMedicalCenter />}
                  />
                </>
              )}
              {/* VSB Users */}
              {vsb && (
                <>
                  <Route path="/" element={<DataTableobl />} />
                  <Route path="/vsbsklad" element={<Oblsklad />} />
                  <Route path="/vsbsingle/:id" element={<Vsbsingle />} />
                  <Route path="/kirim_viloyat" element={<PrihodObl />} />
                  <Route path="/tizimvio/:id" element={<TizmVio />} />
                  <Route
                    path="/monitoring_viloyat"
                    element={<Monitoringobl />}
                  />
                  <Route path="/arizalar_viloyat" element={<ArizaObls />} />
                  <Route path="/notification" element={<Tablebildirishobl />} />
                  <Route path="/inner-combol/:id" element={<InnerCombol />} />
                  <Route path="/Comsbol/:id" element={<Comsbol />} />
                  <Route path="/ComsbolAn/:id" element={<ComsbolAn />} />
                  <Route path="/Comsbol/:id" element={<Comsbol />} />
                  <Route path="/ComsbolAn/:id" element={<ComsbolAn />} />
                  <Route
                    path="/rmoariza_viloyat/:type"
                    element={<Rolarizaobl />}
                  />
                  <Route
                    path="/notificationvsb/:type/:id"
                    element={<Notivsb />}
                  />
                  <Route
                    path="/rmoerkin_viloyat/:type"
                    element={<Erkinobl />}
                  />
                  <Route
                    path="/Singlermo_viloyat/:id/:name"
                    element={<Singleobl />}
                  />
                  <Route
                    path="/Singlean_viloyat/:id/:name"
                    element={<SingleoblAn />}
                  />
                  <Route path="/Comvsb/:id" element={<Comvsb />} />
                  <Route path="/Comerkin/:id" element={<Comerkin />} />

                  <Route path="/sendariza/:id" element={<Sendariza />} />
                  <Route
                    path="/rolarizasobl/:id"
                    element={<Rolarizasinglebobl />}
                  />
                  <Route path="/andarizasobl/:id" element={<AndijonAriza />} />
                  <Route
                    path="/rolarizabirlashtirish/:id"
                    element={<RolarizasingleboblTwo />}
                  />
                  <Route
                    path="/vssb-district-instruments/:district_id"
                    element={<VssbDistrictsAndInstruments />}
                  />
                  <Route
                    path="/vssb-family-medical-center/:district_id/:medical_id"
                    element={<VssbFamilyMedicalCenter />}
                  />
                  <Route path="/Combol/:id" element={<Combol />} />
                </>
              )}
              {/* LPU USers */}
              {id && (
                <>
                  <Route path="/" element={<Lpu />} />
                  <Route path="/muassasa" element={<Muassasa />} />
                  <Route path="/bemormalumoti/:id" element={<SingleBemor />} />
                  <Route path="/arxivmalumot/:id" element={<SingleArxiv />} />
                  <Route path="/shifokor/:id" element={<SingleShifokor />} />
                  <Route path="/arxiv" element={<Arxiv />} />
                  <Route path="/sarflov/:id" element={<Sarflov />} />
                  <Route path="/sarflov" element={<Sarflov />} />
                  <Route path="/singlebol/:id" element={<Singlebol />} />
                  <Route
                    path="/singleehtiyoj/:id"
                    element={<SingleEhtiyoj />}
                  />
                  <Route path="/tizimlpu/:id" element={<Tizmlpu />} />
                  <Route path="/lpubil/:id" element={<Tizmlpu />} />
                  <Route path="/arizasi/:id" element={<Usarflov />} />
                  <Route path="/arizalpu" element={<Arizalpu />} />
                  <Route path="/addariza/:id" element={<Addariza />} />
                  <Route path="/ttbcom/:id" element={<Ttbcom />} />
                  <Route path="/storekirim" element={<Storekirim />} />
                  <Route path="/apelatsion" element={<Apelation />} />
                  <Route path="/shifokor" element={<Shifokor />} />
                  <Route path="/notification" element={<Notilpu />} />
                  <Route path="/arizasingle/:id" element={<Arizasingle />} />
                  <Route path="/singlelpu/:id/:name" element={<Singlelpu />} />
                  <Route
                    path="/singlelpuasosiy/:id/:name"
                    element={<SinglelpuAsosiy />}
                  />
                  <Route path="/saveariza/:id" element={<Saveariza />} />
                </>
              )}
              <Route path="/notfound" element={<Error />} />
              <Route path="/jihozlar/:id" element={<Jihozlar />} />
              <Route path="/more/:name" element={<More />} />
              <Route path="/skladM" element={<Skladm />} />
            </>
          )}

          <Route
            path="/moh-region-instruments/:region_id"
            element={<MohRegionAndInstruments />}
          />
          <Route
            path="/moh-district-instruments/:region_id/:district_id"
            element={<MohDistrictAndInstruments />}
          />
          <Route
            path="/moh-family-medical-center/:region_id/:district_id/:medical_id"
            element={<MohFamilyMedicalCenter />}
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;

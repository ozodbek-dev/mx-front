import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Loading from "components/loading/loading";
import { Contextvalue } from "context/context";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import l1 from "../../../assets/icon/l1.svg";
import Applications from "./components/appliocations";
import "./marizalar.scss";

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
export default function CreateApplicationAriza() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams({ tab: 1 });
  const { t } = useTranslation();
  const [value, setValue] = useState("1");
  const [checkboxs, setCheckboxs] = useState(false);
  const [regionsvalue, setRegionsvalue] = useState(null);
  const [checkblock, setCheckblock] = useState([]);
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({
    accepted: 1,
    combined: 1,
    applicationsend: 1,
  });
  const tab = searchParams.get("tab");
  const { accepted, combined, applicationsend } = pagination;
  const acceptedFilter =
    regionsvalue === "all"
      ? ""
      : regionsvalue
      ? `&filter[kimdan_id]=${regionsvalue}`
      : "";
  const { mutate } = usePost();
  const { data, isLoading } = useGet({
    url: `/ariza/moh/?page=${accepted}` + acceptedFilter,
    enabled: accepted,
    regionsvalue,
  });
  const { data: application, isLoading: loadingapplication } = useGet({
    url: `/ariza/moh/yaratish/?page=${applicationsend}`,
    enabled: applicationsend,
  });
  const { data: combinedData, isLoading: loadingcombined } = useGet({
    url: `/ariza/moh/birlashtirish/?page=${combined}`,
    enabled: combined,
  });
  const {
    data: { muassasalar: regions },
  } = useGet({
    url: "/user/respublika/viloyatlar/",
  });
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
    navigate(`${location.pathname}?tab=${newValue}`);
  };
  const Create = (id) => {
    const formmdata = new FormData();
    formmdata.append("id", id);
    formmdata.append("status", `O'qildi`);
    mutate({
      url: "/ariza/moh/",
      method: "put",
      data: formmdata,
    });
  };

  function addColumn(elId, ariza_id) {
    if (!application.data.includes(ariza_id) || application.data.length === 0) {
      setApplications((prev) => [...prev, ariza_id]);
    }
    if (checkblock?.length) {
      let ss = checkblock.filter((elem) => elem == elId);
      if (ss && ss.length > 0) {
        setCheckblock(checkblock.filter((item) => item != elId));
      } else {
        setCheckblock([...checkblock, elId]);
      }
    } else {
      setCheckblock([...checkblock, elId]);
    }
    console.log(checkblock);
  }

  function Send() {
    if (!applications.length) {
      toast.error("Xatolik! Arizalar mavjud emas");
      return;
    }
    const formmdata = new FormData();
    formmdata.append("arizalar", applications);
    mutate({
      url: "/ariza/moh/",
      data: formmdata,
      onSuccess: () => {
        toast.success("Ariza Birlashdi!");
        setTimeout(() => {
          navigate("/barchaArizalar?tab=2");
          window.location.reload();
        }, 1200);
      },
      onError: (err) => {
        toast.error("Ariza Birlashmadi!");
        toast.error(err.response.data.error);
        console.log(err);
      },
    });
  }

  let statusCount = 0;
  data?.data?.forEach((item) => {
    if (item.status !== "O'qildi") {
      statusCount++;
    }
  });
  useEffect(() => {
    if (+tab !== 1) setCheckboxs(false);
    if (tab) setValue(tab);
  }, [tab]);
  // if (isLoading || loadingapplication || loadingcombined) return <Loading />;
  return (
		<div className='marizalar'>
			<div className='ariza_top'>
				<Stack direction={"row"} spacing={2} alignItems={"center"} justifyContent={"space-between"} marginTop={"20px"}>
					<h2 className='ariza_top_title text-[20px] mb-2'>
						{t("bildirishnoma.allariza")}:{" "}
						{tab === "1"
							? get(data, "meta.total")
							: tab === "2"
							? get(combinedData, "meta.total")
							: get(application, "meta.total")}
					</h2>
					{+value !== 1 && (
						<Button onClick={() => navigate("/applicationcreate/create-application")} variant='contained' color='primary'>
							{t("+ UZMEDIMPEKSGA ARIZA YUBORISH")}
						</Button>
					)}
					{+tab === 1 && (
						<div className='create_ariza_btn'>
							{checkboxs && +tab === 1 ? (
								<div>
									<Button
										style={{ marginRight: "15px" }}
										onClick={() => {
											setCheckboxs(prev => !prev);
											setCheckblock([]);
											setApplications([]);
										}}
										variant='green'
										startIcon={<CloseIcon />}
									>
										{t("bildirishnoma.single.bekor")}
									</Button>
								</div>
							) : null}
							{!checkboxs && +tab === 1 ? (
								<Button onClick={() => setCheckboxs(!checkboxs)} variant='contained' startIcon={<AddIcon />}>
									{t("vosita.birlash")}
								</Button>
							) : +tab === 1 ? (
								<Button onClick={Send} variant='contained' startIcon={<CheckIcon />}>
									{t("vosita.birlash")}
								</Button>
							) : null}
						</div>
					)}
				</Stack>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingBottom: "24px",
					marginTop: "20px",
				}}
			>
				{checkboxs === false && +tab === 1 ? (
					<div className='filter_region pt-4'>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>{t("sbola.hudud")}</InputLabel>
							<Select
								label={t("hudud")}
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								onChange={e => setRegionsvalue(e.target.value)}
							>
								<MenuItem value={"all"}>{t("bola.all")}</MenuItem>
								{regions?.map((item, index) => (
									<MenuItem key={item?.id} value={item?.id}>
										{item?.nomi}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
				) : null}
			</div>
			<div className='ariza_bottom'>
				<div className='ariza_bottom_bottom'>
					<TableContainer component={Paper}>
						<Box sx={{ width: "100%", typography: "body1" }}>
							<TabContext value={value}>
								<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
									<TabList onChange={handleChange2}>
										<Tab className='bgc-white' label={`${t("input.qabul")}`} value='1' />

										<div>
											{!!statusCount && (
												<span
													style={{
														display: "block",
														fontWeight: "bold",
														background: "blue",
														borderRadius: "50%",
														width: "22px",
														height: "22px",
														color: "white",
														textAlign: "center",
														paddingTop: "2px",
														fontSize: "14px",
													}}
												>
													{statusCount}
												</span>
											)}
										</div>

										<Tab className='bgc-white' label={t("vosita.bir")} value='2' />
										<Tab className='bgc-white' label={t("input.yubor")} value='3' />
									</TabList>
								</Box>
								<TabPanel label={"Erkin Xabornoma"} value='1'>
									<Table className={classes.table} aria-label='customized table'>
										<TableHead>
											<TableRow style={{ backgroundColor: "white" }}>
												<TableCell>{t("bildirishnoma.single.soni")}</TableCell>
												<TableCell align='left'>ID</TableCell>
												<TableCell align='left'>{t("sidebar.li10")} ID</TableCell>
												<TableCell align='left'>{t("bildirishnoma.single.kimdan")}</TableCell>

												<TableCell align='left'>{t("bildirishnoma.sana")}</TableCell>
												<TableCell align='center'>{t("bildirishnoma.single.status")}</TableCell>
												<TableCell align='center'>{t("bildirishnoma.harakat")}</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{data?.data?.map((el, index) => {
												return (
													<TableRow>
														<TableCell align='center'>
															<div
																style={{
																	display: "flex",
																	alignItems: "center",
																	gap: "10px",
																	cursor: "pointer",
																}}
															>
																{checkboxs === true ? (
																	<input
																		className='check_box_inp_inner'
																		type='checkbox'
																		style={{
																			margin: 0,
																			cursor: "pointer",
																		}}
																		name=''
																		checked={checkblock?.includes(el.id)}
																		onClick={e => {
																			addColumn(el.id, el.ariza_id);
																		}}
																	/>
																) : null}
																<span>{index + 1}</span>
															</div>
														</TableCell>
														<TableCell align='left'>{el.id}</TableCell>
														<TableCell align='left'>{el.ariza_id}</TableCell>
														<TableCell align='left'>{el.kimdan}</TableCell>
														<TableCell align='left'>{el.date}</TableCell>
														<TableCell align='center'>
															<button className={el.status !== "O'qildi" ? "status_btn" : "status_btn--not"}>
																{el.status !== "O'qildi" ? t("bildirishnoma.arstatus.yangi") : t("vosita.oqil")}
															</button>
														</TableCell>
														<TableCell align='center'>
															<div className='button_modal button_modal_1'>
																<Button
																	onClick={() => {
																		navigate(`/ariza/${el.id}/com`);
																		Create(el.id);
																	}}
																	className='single_info'
																>
																	<img className='delete_icon' src={l1} alt='batafsil' />
																</Button>
															</div>
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</TabPanel>
								{tab !== "1" ? <Applications tab={tab} data={tab === "2" ? combinedData?.data : application?.data} /> : null}
							</TabContext>
						</Box>
					</TableContainer>
				</div>
			</div>
			{tab === "1" ? (
				<Stack className='pagination-position' spacing={2}>
					<Pagination
						onChange={(e, value) => setPagination(prev => ({ ...prev, accepted: value }))}
						count={get(data, "meta.total_pages")}
						size={"large"}
						color='primary'
						page={accepted}
					/>
				</Stack>
			) : tab === "2" ? (
				<Stack className='pagination-position' spacing={2}>
					<Pagination
						onChange={(e, value) => setPagination(prev => ({ ...prev, combined: value }))}
						count={get(combinedData, "meta.total_pages")}
						size={"large"}
						color='primary'
						page={combined}
					/>
				</Stack>
			) : (
				<Stack className='pagination-position' spacing={2}>
					<Pagination
						onChange={(e, value) => setPagination(prev => ({ ...prev, applicationsend: value }))}
						count={get(application, "meta.total_pages")}
						size={"large"}
						color='primary'
						page={applicationsend}
					/>
				</Stack>
			)}
		</div>
	);
}

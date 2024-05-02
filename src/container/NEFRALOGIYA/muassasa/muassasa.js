import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
	Autocomplete,
	Button,
	Fade,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Pagination,
	Paper,
	Select,
	Snackbar,
	Stack,
	SvgIcon,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import classes from "./classess";
import MuiAlert from "@mui/material/Alert";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../../../api/request";
import pnflIcon from "../../../assets/img/pnfl.png";
import "../../../assets/scss/visually-hidden.scss";
import Loading from "../../../components/loading/loading";
import Error from "../../../Error/Error";
import "./muassasa.scss";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box } from "@mui/system";
import { CSVLink } from "react-csv";

import "react-dropdown-tree-select/dist/styles.css";
import l1 from "../../../assets/icon/l1.svg";
import l2 from "../../../assets/icon/l2.svg";
import l3 from "../../../assets/icon/l3.svg";
import l4 from "../../../assets/icon/l4.svg";
import Mockdata from "../../../assets/json/icd-10.json";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Koriklar from "components/component/seanslar/koriklar";
import { get } from "lodash";
import useGet from "hooks/useGet";
import ParentsModal from "./components/parents";
import useDebounce from "hooks/useDebounce";

const assignObjectPaths = (obj, stack) => {
	Object.keys(obj).forEach(k => {
		const node = obj[k];
		if (typeof node === "object") {
			node.path = stack ? `${stack}.${k}` : k;
			assignObjectPaths(node, node.path);
		}
	});
};

export default function Muassasa() {
	assignObjectPaths(Mockdata);
	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});
	const initialPersonState = {
		mother: {
			JSHSHIR: "",
			ism: "",
			familiya: "",
			otasining_ismi: "",
		},
		father: {
			JSHSHIR: "",
			ism: "",
			familiya: "",
			otasining_ismi: "",
		},
	};

	const [parentsInfo, setParentsInfo] = useState(initialPersonState);
	const [noti, setNoti] = useState(false);
	const [notificationn, setNotificationn] = useState({
		state: "",
		text: "",
	});
	const { t } = useTranslation();

	const handleClick = () => {
		setNoti(true);
	};

	const handlenoti = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setNoti(false);
	};
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const token = window.localStorage.token;
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const [loader, setLoeder] = useState(false);
	const [person, setPerson] = useState([]);
	const [shifokorlar, setShifokorlar] = useState([]);
	const [pass, setPass] = useState();
	const [file, setFile] = useState();
	const [bemorIdpro, setBemorIdPro] = useState([]);
	const [doc, setDoc] = useState();
	const [input, setInput] = useState({
		kasalliklar: "",
		tuman: "",
		bemor_passporti: "",
		qoshimcha_malumot: "",
		qoshimcha_tel_raqami: " ",
		passport_qayerdan_kim_tomonidan_berilgan: " ",
		royxatga_olingan_sana: "",
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const search = useDebounce(searchValue, 1500);

	const {
		data: childrensData,
		isLoading,
		refetch,
	} = useGet({
		url: `/muassasa/bola/?page=${currentPage}&search=${search}`,
	});
	const { data: doctors, isLoading: loadingDoctors } = useGet({
		url: `/muassasa/shifokor/`,
	});

	useEffect(() => {
		if (childrensData?.data?.length) {
			setPerson(childrensData.data);
			setShifokorlar(childrensData.data);
		}
	}, [childrensData?.data?.length]);
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		borderRadius: 2,
		bgcolor: "#fff",
		boxShadow: 24,
		p: 2,
	};

	const [edits, setEdits] = useState();
	const [edi, setEdi] = useState(false);

	function EditIt(e) {
		setFormType("edit");
		setEdits(e);
		const child = person.find(el => el.id === e);
		setInput(child);
		setDoc(child.biriktirilgan_shifokor.shifokor_id);
		setParentsInfo({
			mother: {
				...child.onasi,
			},
			father: {
				...child.otasi,
			},
		});

		handleOpen(true);
		setEdi(true);
	}

	function Create(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("bemor_passporti", pass);
		formData.append("qoshimcha_malumot", file);
		formData.append("biriktirilgan_shifokor_id", doc);
		for (let [key, value] of Object.entries(input)) {
			formData.append(key, value);
		}

		const matherFormData = new FormData();
		const fatherFormData = new FormData();
		Object.entries(parentsInfo.mother).forEach(([key, value]) => {
			matherFormData.append(key, value);
		});

		Object.entries(parentsInfo.father).forEach(([key, value]) => {
			fatherFormData.append(key, value);
		});

		Promise.all([
			request.post("/muassasa/bola/onasi/", matherFormData, config),
			request.post("/muassasa/bola/otasi/", fatherFormData, config),
		])
			.then(res => {
				if (!res[0].data.id || !res[1].data.id) {
					toast.error("Ota va Ona malumotlarini kiritish majburiy!");
					return;
				}
				formData.append("onasi", res[0].data.id);
				formData.append("otasi", res[1].data.id);
				request
					.post(`/muassasa/bola/`, formData, config)
					.then(function (res) {
						refetch();
						resetForm();
						setNotificationn({
							state: "success",
							text: `Bola qo'shildi`,
						});
						handleClick(true);
					})
					.catch(function (err) {
						handleClick(true);
						if (err.response.data.message === "By bola allaqachon mavjud") {
							toast.error("Bu bola qo'shilgan");
						} else {
							toast.error("Bola qo'shishda xatolik yuz berdi! " + err.response.data.message || "");
						}
					});
			})
			.catch(err => {
				if (err) toast.error("Onasining ma'lumotlarini qo'shishda xatolik yuz berdi! " + err.response.data.message);
				return;
			});
		handleClose();
	}
	function Update(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("id", edits);
		Object.keys(input).forEach(key => {
			if (typeof input[key] !== "object") {
				formData.append(key, input[key]);
			}
		});
		if (doc) formData.append("biriktirilgan_shifokor_id", doc);
		const matherFormData = new FormData();
		const fatherFormData = new FormData();
		Object.entries(parentsInfo.mother).forEach(([key, value]) => {
			matherFormData.append(key, value);
		});
		Object.entries(parentsInfo.father).forEach(([key, value]) => {
			fatherFormData.append(key, value);
		});
		Promise.all([
			request.post("/muassasa/bola/onasi/", matherFormData, config),
			request.post("/muassasa/bola/otasi/", fatherFormData, config),
		])
			.then(res => {
				formData.append("onasi", res[0].data.id);
				formData.append("otasi", res[1].data.id);
				request
					.put(`/muassasa/bola/`, formData, config)
					.then(function (res) {
						toast.success("Bola yangilandi");
						handleClose();
						refetch();
						resetForm();
					})
					.catch(function (err) {
						if (err instanceof Error) return toast.error("Bola yangilishda xatolik yuz berdi! " + err.message);
						return toast.error("Bola yangilishda xatolik yuz berdi!");
					});
			})
			.catch(err => {
				if (err) toast.error("Onasining ma'lumotlarini qo'shishda xatolik yuz berdi! " + err.response.data.message);
				return;
			});
	}

	const [open, setOpen] = React.useState(false);
	const [modal, setModal] = useState({
		ageFilter: false,
		koriklar: false,
		id: null,
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [open2, setOpen2] = React.useState(false);
	const [ides, setides] = useState(null);
	const [opens2, setOpens2] = useState(false);

	const handleOpen2 = e => {
		setides(e);
		setOpen2(true);
	};
	const [formType, setFormType] = useState("create");

	const handleClose2 = () => {
		setOpen2(false);
	};

	const [seans, setSeans] = React.useState(false);
	const [izohs, setIzohs] = React.useState("");

	const handleSeansClose = () => {
		setSeans(false);
	};

	function Deletes() {
		setLoading(true);
		request
			.delete(`/muassasa/bola/${ides}/${izohs}`, config)
			.then(function (res) {
				if (res?.data?.message) {
					toast.success(res?.data.message);
					refetch();
				} else {
					toast.success("Bola o'chirildi");
				}
			})
			.catch(function (err) {
				if (err?.response?.data?.message) {
					return toast.error(err?.response?.data?.message);
				} else {
					return toast.success("Bola o'chirilmadi");
				}
			})
			.finally(() => {
				setLoading(false);
			});

		refetch();
		handleClose2();
		setIzohs("");
	}

	const onChange = e => {
		if (e.target.type === "checkbox") {
			setInput({
				...input,
				[e.target.name]: String(e.target.checked),
			});
		} else {
			setInput({
				...input,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleDoctor = e => {
		setDoc(e.target.value);
	};

	const [sea, setSea] = useState({
		isFetched: false,
		data: {},
		error: null,
	});

	const idls = localStorage.getItem("id");
	const [bemId, setBemId] = useState(null);

	function Seansbemor(e) {
		setBemId(e);
		setSeans(true);
	}

	const danref = useRef(0);
	const garef = useRef(0);

	function filter() {
		if (danref.current.value > 0 || garef.current.value > 0) {
			if (danref.current.value >= garef.current.value) {
				toast.error(t("Yosh oralig'ini to'g'ri kiriting!"));
				return;
			}
			setModal({
				...modal,
				ageFilter: false,
			});
			request
				.get(`/muassasa/bola/${danref.current.value || 0}/${garef.current.value || 0}/`, config)
				.then(data => {
					if (!data.data.soni) toast.error("Bu yosh oralig'ida bolalar topilmadi.");

					setPerson(data.data.bolalar);
				})
				.catch();
		} else {
			toast.error("Iltimos yoshni belgilang");
		}
	}

	const [val, setVal] = useState();
	const [loading, setLoading] = useState(false);

	function subpinfl(e) {
		e.preventDefault();
		setLoading(true);
		request
			.get(`/pinfl/${val}/`, config)
			.then(data => {
				setInput({
					JSHSHIR: data.data.JSHSHIR,
					ism: data.data.ism,
					familiya: data.data.familiya,
					otasining_ismi: data.data.otasini_ismi,
					tugilgan_sana: data.data.tugilgan_sana,
					passport_seriya_va_raqami: `${data.data.pasport_seriya} ${data.data.pasport_raqami}`,
					manzil: data.data.address.line,
					passport_qayerdan_kim_tomonidan_berilgan: "",
					yashash_manzili: "",
					bemor_passporti: "",
					qoshimcha_malumot: "",
					qoshimcha_raqam: "",
					jinsi: data.data.jinsi === "male" ? "Erkak" : "Ayol",
				});

				handleOpen();
				setOpens2(false);
				setLoading(false);
			})
			.catch(err => {
				if (err.response?.data.error?.status_code === 404) return toast.error("Bemor Mavjud Emas!");
				toast.error("Xatolik");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	const [guv, setGuv] = useState();
	const [numg, setNumg] = useState();
	const [birth, setBirth] = useState();

	function bolapnfl(e) {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("documentSeries", numg);
		formData.append("documentNumber", guv);
		formData.append("birthDate", birth);
		request
			.post(`/muassasa/bola/pnfl/`, formData, config)
			.then(data => {
				if (data.data.error?.status_code === 404) {
					toast.error("Bola Mavjud Emas. Iltimos ma'lumotlarni to'g'ri kiriting!");
					return;
				}
				setOpens2(false);
				handleOpen();
				setInput({
					JSHSHIR: data.data.data.identifier.nnuzb,
					ism: data.data.data.name.firstName,
					familiya: data.data.data.name.lastName,
					otasining_ismi: data.data.data.name.patronymic,
					tugilgan_sana: data.data.data.birthDate,
					passport_seriya_va_raqami: data.data.data.identifier.btc,
					manzil: "",
					passport_qayerdan_kim_tomonidan_berilgan: " ",
					yashash_manzili: " ",
					bemor_passporti: " ",
					qoshimcha_malumot: " ",
					qoshimcha_tel_raqami: " ",
					jinsi: data.data.data.jinsi === "male" ? "Erkak" : "Ayol",
				});
			})
			.catch(err => {
				toast.error("Xatolik");
				throw err;
			})
			.finally(() => {
				setLoading(false);
			});
	}
	console.log(edi, "setEdtitasdfasdfa");
	const resetForm = () => {
		setVal("");
		setGuv("");
		setNumg("");
		setBirth("");
	};

	const [parentsModal, setParentsModal] = useState({
		open: false,
		type: "father",
	});
	const [isFetching, setIsFetching] = useState(false);

	const getFathersFieldValue = e => {
		setParentsInfo(prev => {
			return {
				...prev,
				father: {
					...prev.father,
					[e.target.name]: e.target.value,
				},
			};
		});
		if (e.target.name == "JSHSHIR" && e.target.value.length === 14) {
			setIsFetching(true);
			request
				.get(`/pinfl/${e.target.value}/`, config)
				.then(({ data }) => {
					setParentsInfo(prev => ({
						...prev,
						father: {
							...prev.father,
							ism: data.ism,
							familiya: data.familiya,
							otasining_ismi: data.otasini_ismi,
						},
					}));
				})
				.catch(err => {
					toast.error("Bunday PINFL bo'yicha hech qanday ma'lumot topilmadi");
				})
				.finally(() => setIsFetching(false));
		}
	};
	const getMothersFieldValue = e => {
		setParentsInfo(prev => {
			return {
				...prev,
				mother: {
					...prev.mother,
					[e.target.name]: e.target.value,
				},
			};
		});
		if (e.target.name == "JSHSHIR" && e.target.value.length === 14) {
			setIsFetching(true);
			request
				.get(`/pinfl/${e.target.value}/`, config)
				.then(({ data }) => {
					setParentsInfo(prev => ({
						...prev,
						mother: {
							...prev.mother,
							ism: data.ism,
							familiya: data.familiya,
							otasining_ismi: data.otasini_ismi,
						},
					}));
				})
				.catch(err => {
					toast.error("Bunday PINFL bo'yicha hech qanday ma'lumot topilmadi");
				})
				.finally(() => setIsFetching(false));
		}
	};

	if (bemorIdpro.error) return <Error />;
	if (loader || isLoading) return <Loading />;
	return (
		<div
			className='muassasa_personal'
			style={{
				paddingRight: "20px",
				paddingLeft: "20px",
				paddingBottom: "20px",
			}}
		>
			{modal.koriklar ? (
				<Koriklar
					open={modal.koriklar}
					id={modal.id}
					handleClose={() =>
						setModal({
							...modal,
							koriklar: false,
							id: null,
						})
					}
				/>
			) : null}
			<div className='muassasa_blocks'>
				<h2 className='person_all'>
					{t("bola.ball")}: {get(childrensData, "meta.total", 0)}
				</h2>
				<Stack direction={"row"} alignItems={"center"} gap={"1rem"} flexWrap={"wrap"}>
					{idls && (
						<Button
							variant='contained'
							color='primary'
							onClick={() => {
								setOpens2(true);
								setParentsInfo(initialPersonState);
								setFormType("create");
							}}
							startIcon={<AddIcon />}
						>
							{t("bola.add")}
						</Button>
					)}

					<Button
						style={{
							backgroundColor: "#18CF6C ",
						}}
						variant='contained'
						startIcon={<DescriptionIcon />}
					>
						<CSVLink
							data={person.map(item => ({
								JSHSHIR: item.JSHSHIR,
								full_name: `${item.ism} ${item.familiya} ${item.otasining_ismi}`,
								birth_date: item.tugilgan_sana,
								age: item.yosh,
								doctor_fullname: `${item.biriktirilgan_shifokor.ismi} ${item.biriktirilgan_shifokor.familiyasi} ${item.biriktirilgan_shifokor.otasini_ismi}`,
								hospital_title: item.biriktirilgan_muassasa.nomi,
							}))}
							filename={"Bolalar ro'yxati"}
							headers={[
								{
									label: "JSHSHIR",
									key: "JSHSHIR",
								},
								{
									label: "Ismi familiyasi otasining ismi",
									key: "full_name",
								},
								{
									label: "Tug’ilgan sana",
									key: "birth_date",
								},
								{
									label: "Yosh",
									key: "age",
								},
								{
									label: "Shifokor",
									key: "doctor_fullname",
								},
								{
									label: "Tibbiy muassasaning nomi",
									key: "hospital_title",
								},
							]}
							separator=';'
							style={{
								width: "100%",
								height: "100%",
								color: "#fff",
							}}
						>
							{t("bola.excel")}
						</CSVLink>
					</Button>

					<div className='serach_person'>
						<TextField
							className='search-ariza'
							onChange={e => setSearchValue(e.target.value.trim())}
							id='standard-search'
							value={searchValue}
							label={t("bola.qidirish")}
							type='search'
							variant='outlined'
						/>
					</div>
				</Stack>
			</div>

			<Modal
				open={modal.ageFilter}
				onClose={() => {
					setModal({
						...modal,
						ageFilter: false,
					});

					setParentsInfo(initialPersonState);
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography sx={{ p: 2 }}>
						<div className='sort_block'>
							<div className='sort_block_inner'>
								<p className='age_title'>{t("bola.dan")}</p>
								<TextField
									inputRef={danref}
									id='outlined-basic'
									variant='outlined'
									placeholder='0'
									type='number'
									InputProps={{ min: 0 }}
								/>
							</div>
							<div className='sort_block_inner'>
								<p className='age_title'>{t("bola.ga")}</p>
								<TextField
									inputRef={garef}
									id='outlined-basic'
									variant='outlined'
									placeholder='0'
									type='number'
									InputProps={{ min: 0 }}
								/>
							</div>
						</div>
						<div className='sorf_block_btn'>
							<Button style={{ marginRight: "10px" }} onClick={() => setPerson(shifokorlar)} variant='contained'>
								{t("bola.all")}
							</Button>
							<Button
								onClick={() => {
									filter();
								}}
								variant='contained'
							>
								{t("shifokor.tasdiq")}
							</Button>
						</div>
					</Typography>
				</Box>
			</Modal>

			<div className='poliklinika'>
				<div className='poliklinika'>
					<TableContainer component={Paper}>
						<Table style={classes.table} aria-label='customized table'>
							<TableHead>
								<TableRow style={{ backgroundColor: "white" }}>
									<TableCell>{t("shifokor.number")}</TableCell>
									<TableCell align='left'>{t("input.pfl")}</TableCell>
									<TableCell align='left'>
										{t("shifokor.alladd.name")} {t("shifokor.alladd.surname")} {t("shifokor.alladd.otch")}
									</TableCell>
									<TableCell align='left'>{t("shifokor.birthday")}</TableCell>
									<TableCell align='left'>
										<div className='age_children'>
											<Button
												variant='contained'
												onClick={() =>
													setModal({
														...modal,
														ageFilter: true,
													})
												}
											>
												{t("bola.yosh")}
											</Button>
										</div>
									</TableCell>
									<TableCell align='left'>{t("bola.shifo")}</TableCell>
									<TableCell align='left'>{t("bola.ms")}</TableCell>
									<TableCell align='center'>{t("shifokor.batafsil")}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{person.map((row, index) => (
									<TableRow key={index}>
										<TableCell align='left'>{index + 1}</TableCell>
										<TableCell align='left'>{row.JSHSHIR}</TableCell>
										<TableCell align='left'>{`${row.familiya} ${row.ism} ${row.otasining_ismi}`}</TableCell>
										<TableCell align='left'>{row.tugilgan_sana}</TableCell>
										<TableCell align='center'>{row.yosh}</TableCell>
										<TableCell align='left'>{`${row.biriktirilgan_shifokor.ismi} ${row.biriktirilgan_shifokor.familiyasi}`}</TableCell>
										<TableCell align='left'>{row.biriktirilgan_muassasa.nomi}</TableCell>
										{idls && (
											<TableCell align='right'>
												<div className='button_modal button_modal_1'>
													<Link to={`/bemormalumoti/${row.id}`} className='single_info'>
														<img className='delete_icon' src={l1} alt='batafsil' />
													</Link>
													<button onClick={e => EditIt(row.id)} className='edit_btn'>
														<img className='delete_icon' src={l2} alt="o'zgartirish" />
													</button>
													<button className='delete_div' onClick={() => handleOpen2(row.id)} id={row.id}>
														<img className='delete_icon' src={l3} alt="o'chirish" />
													</button>
													<div className='seans_div'>
														<Button
															className='seanslar_btn_muassasa'
															onClick={() =>
																setModal({
																	...modal,
																	koriklar: true,
																	id: row.id,
																})
															}
														>
															<img src={l4} alt='' />
														</Button>
													</div>
												</div>
											</TableCell>
										)}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{get(childrensData, "meta.total_pages") > 1 && (
						<Stack spacing={2} mt={4} justifyContent={"flex-end"} alignItems={"flex-end"}>
							{" "}
							<Pagination
								onChange={(e, value) => setCurrentPage(value)}
								count={get(childrensData, "meta.total_pages")}
								color='primary'
								page={currentPage}
							/>
						</Stack>
					)}
				</div>
				<div className='modal_scrool'>
					<Modal
						keepMounted
						open={opens2}
						onClose={() => {
							setOpens2(false);
							resetForm();
						}}
					>
						<Box
							className='modal-one'
							sx={{
								...style,
								width: 500,
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: "20px",
								}}
							>
								<Button
									style={{
										marginLeft: "-25px",
									}}
									variant='text'
									onClick={() => setOpens2(false)}
								>
									<SvgIcon component={ArrowBackIcon} inheritViewBox />
								</Button>
								<h2 className='modal-head'>{t("input.bo")}</h2>
							</div>
							<Tabs
								style={{
									marginBottom: "20px",
									borderBottom: "1px solid",
								}}
								value={value}
								onChange={handleChange}
								aria-label='basic tabs example'
							>
								<Tab label={t("input.pfl")} />
								<Tab label={t("bola.g")} />
							</Tabs>
							<form className={value === 1 ? "visually-hidden" : ""} onSubmit={subpinfl}>
								<div style={{ width: "100%" }} className='w-full jshshir_inner'>
									<TextField
										id='outlined-basic'
										label={t("input.pfl")}
										style={{ width: "100%" }}
										onChange={e => setVal(e.target.value)}
										value={val}
										variant='outlined'
										type='number'
										required
									/>
									<div className='jshshir_inner'>
										{/* <img src={more}/> */}
										<div className='jshshir_inner_item'>
											<img className='pnfl_icon' src={pnflIcon} alt='icon' />
										</div>
									</div>
								</div>
								<Button
									disabled={loading}
									style={{
										width: "100%",
										borderRadius: "12px",
										marginTop: "16px",
									}}
									type={"submit"}
									variant='contained'
								>
									{loading ? "Izlanmoqda..." : t("input.iz")}
								</Button>
							</form>
							<form className={value === 0 ? "visually-hidden" : ""} onSubmit={bolapnfl}>
								<div style={{ width: "100%" }} className='w-full jshshir_inner'>
									<TextField
										onChange={e => setGuv(e.target.value)}
										id='outlined-basic'
										label={t("bola.g")}
										style={{ width: "100%" }}
										variant='outlined'
										value={guv}
										type='number'
										required
									/>
									<TextField
										onChange={e => setNumg(e.target.value)}
										id='outlined-basic'
										label={t("jihoz.ser")}
										style={{
											width: "100%",
											marginTop: "17px",
										}}
										variant='outlined'
										value={numg}
										required
									/>
									<InputLabel style={{ marginTop: "6px" }}>{t("shifokor.birthday")}*</InputLabel>
									<TextField
										onChange={e => setBirth(e.target.value)}
										id='outlined-basic'
										style={{
											width: "100%",
											marginTop: "10px",
										}}
										variant='outlined'
										value={birth}
										type='date'
										required
									/>
								</div>
								<Button
									style={{
										width: "100%",
										borderRadius: "12px",
										marginTop: "16px",
									}}
									disabled={loading}
									type={"submit"}
									variant='contained'
								>
									{loading ? "Izlanmoqda..." : t("input.iz")}
								</Button>
							</form>
						</Box>
					</Modal>
				</div>
				<div className='modal_scrool'>
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby='transition-modal-description'
						style={classes.modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
					>
						<Fade in={open}>
							<div style={classes.paper}>
								<form
									className='form_control_scrool'
									style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
									onSubmit={formType === "edit" ? Update : Create}
								>
									<h1>{formType === "edit" ? t("input.boz") : t("input.bo")}</h1>
									<div className='grid grid-cols-2 gap-10'>
										<div className=''>
											<TextField
												id='outlined-basic'
												name='JSHSHIR'
												className='w-full'
												variant='outlined'
												inputProps={{ maxLength: 14 }}
												type='number'
												value={input.JSHSHIR}
												disabled
												required
											/>
											<div className='jshshir_inner'>
												<div className='jshshir_inner_item'>
													<img className='pnfl_icon' src={pnflIcon} alt='icon' />
												</div>
											</div>
										</div>
										<div className='w-full'>
											<TextField
												className='w-full'
												id='outlined-basic'
												label={t("shifokor.alladd.name")}
												onChange={e => onChange(e)}
												name='ism'
												variant='outlined'
												value={input.ism}
												required
												disabled
											/>
										</div>
									</div>
									<div className='grid grid-cols-2 gap-10'>
										<div className='w-full'>
											<TextField
												className='w-full'
												id='outlined-basic'
												label={t("shifokor.alladd.surname")}
												variant='outlined'
												onChange={onChange}
												name='familiya'
												value={input.familiya}
												required
												disabled
											/>
										</div>
										<div className='w-full'>
											<TextField
												className='w-full'
												id='outlined-basic'
												label={t("shifokor.alladd.otch")}
												variant='outlined'
												onChange={onChange}
												name='otasini_ismi'
												value={input.otasining_ismi}
												required
												disabled
											/>
										</div>
									</div>
									<div className='grid grid-cols-2 gap-10'>
										<div className='w-full'>
											<TextField
												className='w-full'
												id='outlined-basic'
												variant='outlined'
												type='date'
												label={t("shifokor.birthday")}
												onChange={onChange}
												name='tugilgan_sanasi'
												value={input.tugilgan_sana}
												required
												disabled
											/>
										</div>
										<div>
											{input.passport_seriya_va_raqami && (
												<div className='w-full'>
													<TextField
														className='w-full'
														id='outlined-basic'
														label={t("bola.pass")}
														variant='outlined'
														inputProps={{ maxLength: 2 }}
														onChange={onChange}
														name='passport_seriyasi'
														value={input.passport_seriya_va_raqami}
														required
														disabled
													/>
												</div>
											)}
										</div>
									</div>
									<div className='grid grid-cols-2 gap-10'>
										<div className='select_div_jinsi'>
											<FormControl className='w-full'>
												<InputLabel id='qon-guruh' disabled={true} required>
													{input.jinsi === "Ayol" ? "Ayol" : "Erkak"}
												</InputLabel>
												<Select
													labelid='qon-guruh'
													id='demo-simple-select2'
													// value={input.jinsi === "female" ? "Ayol" : "Erkak"}
													onChange={onChange}
													name={"jinsi"}
													disabled
												>
													<MenuItem value='Erkak'>{t("input.e")}</MenuItem>
													<MenuItem value='Ayol'>{t("input.a")}</MenuItem>
												</Select>
											</FormControl>
										</div>
										<TextField
											className='w-full'
											id='outlined-basic'
											label={t("Yashash manzili")}
											placeholder="Mirzo Ulug'bek tumani, Zakovat MFY, Farovon hayot ko'chasi, 100 uy"
											variant='outlined'
											type='text'
											inputProps={{ min: 0 }}
											onChange={onChange}
											name='manzil_uyi'
											value={input.manzil_uyi}
										/>
									</div>
									<div className='grid grid-cols-2 gap-10'>
										<div className='w-full'>
											<Button
												onClick={() => setParentsModal(prev => ({ ...prev, type: "father", open: true }))}
												labelid='diag'
												id='demo-simple-select4'
												name='diagnoz'
												className={`parent-btn ${parentsInfo.father.ism ? " active" : "danger"}`}
												required
											>
												{t("sbola.ot1")}*
											</Button>
										</div>

										<div className='w-full'>
											<TextField
												className='w-full'
												id='outlined-basic'
												label={t("shifokor.tel")}
												variant='outlined'
												type='number'
												inputProps={{ min: 0 }}
												onChange={onChange}
												name='tel_raqami'
												value={input.tel_raqami}
												required
											/>
										</div>
									</div>
									<div className='grid grid-cols-2 gap-10'>
										<div className='w-full'>
											<Button
												onClick={() => setParentsModal(prev => ({ ...prev, type: "mother", open: true }))}
												labelid='diag'
												id='demo-simple-select4'
												name='diagnoz'
												className={`parent-btn ${parentsInfo.mother.ism ? " active" : "danger"}`}
												required
											>
												{t("sbola.on1")}*
											</Button>
										</div>
										<div className='w-full'>
											<TextField
												className='w-full'
												id='outlined-basic'
												label={t("bola.who")}
												variant='outlined'
												onChange={onChange}
												name='qachon_kim_tomonidan_berilgan'
												value={input.qachon_kim_tomonidan_berilgan}
												required
											/>
										</div>
									</div>
									<div className='grid grid-cols-2 gap-10'>
										<div className='w-full'>
											<TextField
												className='w-full'
												id='outlined-basic'
												label={t("bola.qtel")}
												variant='outlined'
												type='number'
												inputProps={{ min: 0 }}
												onChange={onChange}
												name='qoshimcha_raqam'
												value={input.qoshimcha_raqam || ""}
											/>
										</div>
										<div className='w-full select_div_100'>
											<Autocomplete
												style={{
													width: "100%",
												}}
												className='w-full'
												options={doctors?.data || []}
												onChange={handleDoctor}
												autoHighlight
												value={doctors?.data?.find(item => item.id === doc)}
												getOptionLabel={option => `${option?.ism} ${option?.familiya}`}
												renderOption={(props, option) => (
													<Box
														value={option.id}
														component='li'
														sx={{
															"& > img": {
																mr: 2,
																flexShrink: 0,
															},
														}}
														{...props}
													>
														{option.ism} {option.familiya}
													</Box>
												)}
												renderInput={params => (
													<TextField {...params} name='biriktirilgan_shifokor_id' required label={t("bola.shifo")} />
												)}
											/>
										</div>
									</div>
									<div className='grid grid-cols gap-10'>
										<div className='w-full'></div>
										<div className='w-full'>
											<FormControl className={"w-full"}>
												<InputLabel id='qon-guruh'>{t("bola.guruh")}*</InputLabel>
												<Select
													label={t("bola.guruh")}
													labelid='qon-guruh'
													className='w-full'
													id='demo-simple-select2'
													value={input.qon_guruhi}
													onChange={onChange}
													name='qon_guruhi'
													required
												>
													<MenuItem value={1}>AB(IV)Rh+</MenuItem>
													<MenuItem value={2}>AB(IV)Rh-</MenuItem>
													<MenuItem value={3}>A(II)Rh+</MenuItem>
													<MenuItem value={4}>A(II)Rh-</MenuItem>
													<MenuItem value={5}>B(III)Rh+</MenuItem>
													<MenuItem value={6}>B(III)Rh-</MenuItem>
													<MenuItem value={7}>O(I)Rh+</MenuItem>
													<MenuItem value={8}>O(I)Rh-</MenuItem>
												</Select>
											</FormControl>
										</div>
									</div>
									<div className='button_block1'>
										<Button variant='contained' color='primary' size='large' type='submit' style={classes.button}>
											{formType === "edit" ? t("input.boz") : t("input.bo")}
										</Button>
									</div>
								</form>
							</div>
						</Fade>
					</Modal>
					<div className='modal_one_99'>
						<Modal
							aria-labelledby='transition-modal-title'
							aria-describedby='transition-modal-description'
							className={classes.modal_one}
							open={open2}
							onClose={handleClose2}
							closeAfterTransition
							BackdropProps={{
								timeout: 400,
							}}
							style={{
								marginTop: "200px",
								width: "600px",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						>
							<Fade in={open2}>
								<div
									style={{
										...classes.paper,
										height: "300px",
									}}
								>
									<div className='delete_g'>
										<h3 style={{ fontSize: "20px" }}>{t("input.bdel")}</h3>
										<div className='izoh_text'>
											<FormControl style={{ width: "100%" }}>
												<InputLabel id='nogironlik'>{t("input.s")}</InputLabel>
												<Select
													labelid='123'
													id='demo-simple-select3'
													onChange={e => setIzohs(e.target.value)}
													name='izoh'
													label={t("input.s")}
													value={input.bemor_kasallik_turi}
												>
													<MenuItem MenuItem value={"Vafot etdi"}>
														{t("input.vafot")}
													</MenuItem>
													<MenuItem value={t("input.trans")}>{t("input.trans")}</MenuItem>
													<MenuItem value={"Muassasa almashtirildi"}>{t("input.muas")}</MenuItem>
													<MenuItem value={"Sog'aydi"}>{t("input.sog")}</MenuItem>
												</Select>
											</FormControl>
										</div>
										<Stack direction={"row"} gap={"1rem"}>
											<Button
												variant='contained'
												style={{
													backgroundColor: "gray",
													color: "white",
													fontSize: "12px",
												}}
												onClick={handleClose2}
											>
												{t("bildirishnoma.single.bekor")}
											</Button>
											{izohs?.length > 3 ? (
												<Button
													style={{
														backgroundColor: "blue",
														color: "white",
														fontSize: "12px",
													}}
													variant='contained'
													onClick={Deletes}
												>
													{t("input.b")}
												</Button>
											) : (
												<Button variant='contained' onClick={Deletes} disabled>
													{t("input.b")}
												</Button>
											)}
										</Stack>
									</div>
								</div>
							</Fade>
						</Modal>
					</div>
				</div>
			</div>
			<Snackbar
				Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={noti}
				autoHideDuration={6000}
				onClose={handlenoti}
			>
				<Alert
					Alert
					onClose={handlenoti}
					severity={notificationn.state}
					sx={{
						width: "100%",
					}}
				>
					{notificationn.text}
				</Alert>
			</Snackbar>
			<div className='modal_seans'>
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby='transition-modal-description'
					className={classes.modal_one}
					open={seans}
					onClose={handleSeansClose}
					closeAfterTransition
					BackdropProps={{
						timeout: 400,
					}}
					style={{
						marginTop: "0",
						width: "900px",
						marginLeft: "auto",
						marginRight: "auto",
					}}
				>
					<Fade in={seans}>
						<div>
							<Koriklar
								Seansbemor={Seansbemor}
								sea={sea}
								setSea={setSea}
								id={bemId}
								shifokorlar={shifokorlar}
								handleSeansClose={handleSeansClose}
								loader={loader}
								setLoeder={setLoeder}
							/>
						</div>
					</Fade>
				</Modal>

				<ParentsModal
					parentsModal={parentsModal}
					title={t("Otasi")}
					formName='father'
					isLoading={isFetching}
					setParentsModal={setParentsModal}
					fields={[
						{
							name: "JSHSHIR",
							value: parentsInfo.father.JSHSHIR,
							label: t("input.pfl"),
							required: true,
							onChange: getFathersFieldValue,
							type: "number",
						},
						{
							name: "ism",
							value: parentsInfo.father.ism,
							label: t("shifokor.alladd.name"),
							required: true,
							onChange: getFathersFieldValue,
							type: "text",
							required: true,
							disabled: !!parentsInfo.father.ism,
						},
						{
							name: "familiya",
							value: parentsInfo.father.familiya,
							label: t("shifokor.alladd.surname"),
							onChange: getFathersFieldValue,
							required: true,
							disabled: !!parentsInfo.father.familiya,
							type: "text",
						},
						{
							name: "otasining_ismi",
							value: parentsInfo.father.otasining_ismi,
							label: "Otasining Ismi",
							onChange: getFathersFieldValue,
							required: true,
							disabled: !!parentsInfo.father.otasining_ismi,
							type: "text",
						},
					]}
				/>

				<ParentsModal
					parentsModal={parentsModal}
					title={t("Onasi")}
					formName='mother'
					isLoading={isFetching}
					setParentsModal={setParentsModal}
					fields={[
						{
							name: "JSHSHIR",
							value: parentsInfo.mother.JSHSHIR,
							label: t("input.pfl"),
							required: true,
							onChange: getMothersFieldValue,
							type: "number",
						},
						{
							name: "ism",
							value: parentsInfo.mother.ism,
							label: t("shifokor.alladd.name"),
							required: true,
							onChange: getMothersFieldValue,
							type: "text",
							disabled: !!parentsInfo.mother.ism,
						},
						{
							name: "familiya",
							value: parentsInfo.mother.familiya,
							label: t("shifokor.alladd.surname"),
							onChange: getMothersFieldValue,
							required: true,
							type: "text",
							disabled: !!parentsInfo.mother.familiya,
						},
						{
							name: "otasining_ismi",
							value: parentsInfo.mother.otasining_ismi,
							label: "Otasining Ismi",
							onChange: getMothersFieldValue,
							required: true,
							disabled: !!parentsInfo.mother.otasining_ismi,
							type: "text",
						},
					]}
				/>
			</div>
		</div>
	);
}

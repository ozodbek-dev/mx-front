import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    Button,
    Paper,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {request} from "../../../../../../api/request";
import "./arizasingle.scss";
import {TabContext, TabList, TabPanel} from "@mui/lab";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const Arizasingle = () => {
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
			border: "2px solid #000",
			// boxShadow: theme.shadows[5],
			padding: "50px",
			width: "80%",
			margin: "30px auto 0 auto",
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

	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const [bola, setBola] = useState({});
	const [person, setPerson] = useState([]);
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const params = useParams();
	const { t } = useTranslation();
	const [chidlTab, setChildTab] = useState(2);
	const [loading, setLoading] = useState(false);

	const token = window.localStorage.token;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const handleChanges = (event, newValue) => {
		setValue(newValue);
	};
	const handleChildTab = (event, newValue) => {
		setChildTab(newValue);
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const Add = id => {
		setLoading(true);
		const formData = new FormData();
		formData.append("bildirishnoma", id);
		request
			.post("/ariza/lpu/bildirishnomatoariza/", formData, config)
			.then(res => {
				setLoading(false);
				setBola(res.data);
			})
			.catch(() => {
				setLoading(false);
			});
	};
	useEffect(() => {
		setLoading(true);
		request
			.get(`/ariza/lpu/${params.id}/`, config)
			.then(function (res) {
				setLoading(false);

				setPerson(res.data.ariza);
				Add(res.data.ariza.bildirishnoma);
			})
			.catch(function (err) {
				setLoading(false);
			});
	}, [params.id]);

	const Status = () => {
		const formdata = new FormData();
		formdata.append("ariza", person.id);
		formdata.append("status", "Javob berilmadi");
		request
			.post("/ariza/lpu/changestatus/", formdata, config)
			.then(() => {
				setOpen(true);
				setTimeout(() => {
					navigate(-1);
				}, 1500);
			})
			.catch(() => setOpen1(true));
	};
	return (
		<div className='rol_ariza'>
			<Button
				onClick={() => navigate(-1)}
				style={{
					borderRadius: "12px",
					backgroundColor: "#DDEBFB",
					padding: "8px",
					marginBottom: "10px",
				}}
				variant='text'
			>
				{t("bildirishnoma.single.ortga")}
			</Button>

			<div className='rol_ariza_bottom_top rol_ariza_bottom_top2'>
				<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.status")}</h4>
				{
					<div className='status_info'>
						{person.status === "Javob berilmadi" && <p className='status_info_title page-status--1'>{t(person.status)}</p>}
						{person.status === "Yuborilmadi" && <p className='status_info_title page-status--2'>{t(person.status)}</p>}
						{person.status === "O'qildi" && (
							<p style={{ color: "#18CF6C" }} className='status_info_title page-status--3'>
								{t(person.status)}
							</p>
						)}
					</div>
				}
			</div>
			<div className='rol_ariza_bottom'>
				<div className='rol_ariza_bottom_top'>
					<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.iddata")}</h4>
					<div className='rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1'>
						<div className='rol_ariza_bottom_block1'>
							<p className='info_single'>{t("bildirishnoma.single.id")}</p>
							<p className='info_single'>{params.id}</p>
						</div>
						<div className='rol_ariza_bottom_block1'>
							<p className='info_single'>{t("bildirishnoma.single.data")}</p>
							<p className='info_single'>{person.vaqti}</p>
						</div>
					</div>
				</div>
				<div className='rol_ariza_flex'>
					<div className='rol_ariza_bottom_div'>
						<div className='rol_ariza_bottom_div_inner'>
							<div className='rol_ariza_bottom_div_inner_block'>
								<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.kimdan")}</h4>
								<div className='rol_ariza_bottom_div_t6'>
									<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
										<p>{t("bildirishnoma.single.kimdan")}</p>
									</div>
									<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
										<p>{person?.kimdan}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='rol_ariza_bottom_div'>
						<div className='rol_ariza_bottom_div_inner'>
							<div className='rol_ariza_bottom_div_inner_block'>
								<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.kimga")}</h4>
								<div className='rol_ariza_bottom_div_t6'>
									<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
										<p>{t("bildirishnoma.single.kimga")}</p>
									</div>
									<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
										<p>{person?.kimga}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='rol_ariza_bottom_div_inner'>
				<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.vosita")}</h4>
				<Box>
					<TabContext value={value}>
						<TabList onChange={handleChanges}>
							<Tab label={t("bildirishnoma.single.vosi")} value={0} />
							<Tab label={t("bildirishnoma.single.bolalar")} value={1} />
						</TabList>

						<TabPanel value={0}>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label='customized table'>
									<TableHead>
										<TableRow style={{ backgroundColor: "white", border: "1px solid #E7E7E7" }}>
											<TableCell>{t("bildirishnoma.single.soni")}</TableCell>
											<TableCell align='left'>{t("bildirishnoma.single.nomi")}</TableCell>

											<TableCell align='left'>{t("vosita.vositaturi")}</TableCell>
											<TableCell align='left'>{t("bildirishnoma.single.miqdori")}</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{person.vositalar && person.vositalar?.length ? (
											person.vositalar.map((el, index) => {
												return (
													<TableRow className='border-2'>
														<TableCell align='left'>{index + 1}</TableCell>
														<TableCell align='left'>{el.vosita_nomi}</TableCell>
														<TableCell align='left'>{el.vosita_turi}</TableCell>
														<TableCell align='left'>{el.miqdori}</TableCell>
													</TableRow>
												);
											})
										) : (
											<TableRow>
												<TableCell>{t("input.mavjud")}</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</TabPanel>

						<TabPanel value={1} style={{ padding: "0px!important" }}>
							<TabContext value={chidlTab} style={{ padding: "0!important" }}>
								<TabList onChange={handleChildTab}>
									<Tab value={2} label={t("input.yosh1")} />
									<Tab value={3} label={t("input.oy1")} />
								</TabList>

								<TabPanel value={2}>
									<TableContainer component={Paper}>
										<Table>
											<TableHead>
												<TableRow style={{ backgroundColor: "white", border: "1px solid #E7E7E7" }}>
													<TableCell>{t("bildirishnoma.single.soni")}</TableCell>
													<TableCell align='left'>{t("input.yosh1")}</TableCell>
													<TableCell align='left'>{t("bildirishnoma.single.bolalar")}</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{bola.bolalar && Object.keys(bola.bolalar).length ? (
													Object.keys(bola.bolalar).map((el, index) => {
														return (
															<TableRow>
																<TableCell align='left'>{index + 1}</TableCell>
																<TableCell align='left'>{el}</TableCell>
																<TableCell align='left'>{bola.bolalar && bola.bolalar[el]}</TableCell>
															</TableRow>
														);
													})
												) : (
													<TableRow>
														<TableCell>{t("input.mavjud")}</TableCell>
													</TableRow>
												)}
											</TableBody>
										</Table>
									</TableContainer>
								</TabPanel>

								<TabPanel value={3} style={{ padding: "0px!important" }}>
									<TableContainer component={Paper}>
										<Table>
											<TableHead>
												<TableRow style={{ backgroundColor: "white", border: "1px solid #E7E7E7" }}>
													<TableCell>{t("bildirishnoma.single.soni")}</TableCell>
													<TableCell align='left'>{t("input.oy1")}</TableCell>
													<TableCell align='left'>{t("bildirishnoma.single.bolalar")}</TableCell>
												</TableRow>
											</TableHead>

											<TableBody>
												{bola.bola_oy && Object.keys(bola.bola_oy).length ? (
													Object.keys(bola.bola_oy).map((el, index) => {
														return (
															<TableRow>
																<TableCell align='left'>{index + 1}</TableCell>
																<TableCell align='left'>{el}</TableCell>
																<TableCell align='left'>{bola.bola_oy && bola.bola_oy[el]}</TableCell>
															</TableRow>
														);
													})
												) : (
													<TableRow>
														<TableCell>{t("input.mavjud")}</TableCell>
													</TableRow>
												)}
											</TableBody>
										</Table>
									</TableContainer>
								</TabPanel>
							</TabContext>
						</TabPanel>
					</TabContext>
				</Box>
			</div>
			<div className='single_table_document'>
				<div className='t9'>
					<div className='rol_ariza_bottom_div_inner'>
						<div className='rol_ariza_bottom_div_inner_block'>
							<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.qoshimcha")}</h4>
							<div className='document_left_title_block'>
								<p className='document_left_title'>
									{person?.qoshimcha?.trim() && person.qoshimcha !== "undefined" ? person.qoshimcha : t("input.mavjud")}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='t9'>
					<div className='rol_ariza_bottom_div_inner'>
						<div className='rol_ariza_bottom_div_inner_block'>
							<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.fayl")}</h4>
							{person.fayl === undefined ? (
								<>
									<div>{t("input.mavjud")}</div>
								</>
							) : (
								<>
									<div className='rol_ariza_bottom_div_t6'>
										<a href={`https://admin-mpbt.ssv.uz/static/${person.fayl}`} className='download_document_t9' target='_blank'>
											<Button variant='contained' startIcon={<CloudDownloadIcon />}>
												{t("input.yuklab")}
											</Button>
										</a>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			{person.status === "Yuborilmadi" && (
				<footer className='site-footer'>
					<div style={{ textAlign: "center" }}>
						<Button
							onClick={Status}
							style={{
								width: "448px",
								borderRadius: "12px",
								backgrounColor: "#1464C0",
							}}
							startIcon={<SendIcon />}
							variant='contained'
							color='primary'
							size='large'
						>
							{t("modalariza.arizayub")}
						</Button>
					</div>
				</footer>
			)}
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
						Ariza Yuborildi!
					</Alert>
				</Snackbar>
				<Snackbar open={open1} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity='error' sx={{ width: "100%" }}>
						Ariza Yuborilmadi!
					</Alert>
				</Snackbar>
			</Stack>
		</div>
	);
};

export default Arizasingle;

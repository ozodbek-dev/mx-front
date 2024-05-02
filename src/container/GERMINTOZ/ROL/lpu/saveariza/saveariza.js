import {
    Box,
    Button,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {useTranslation} from "react-i18next";
import {request} from "../../../../../api/request";
import SendIcon from "@mui/icons-material/Send";
import "./saveariza.scss";
import { toast } from "react-toastify";

const Saveariza = () => {
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
	const [age, setAge] = useState("");
	const [pass, setPass] = useState();
	const [num, setNum] = useState({
		from: 0,
		to: 0,
	});
	const [chidlTab, setChildTab] = useState(2);
		const [bola, setBola] = useState({});
	const [numarr, setNumarr] = useState([]);

	function numAdd() {
		setNumarr([...numarr, num]);
	}
	const File = e => {
		// setNames(true);
		setPass(e.target.files);
	};

	const handleChildTab = (event, newValue) => {
		setChildTab(newValue);
	};


	const [person, setPerson] = useState([]);
	const [shifokorlar, setShifokorlar] = useState([]);
	const [delebemor, setDeleBemor] = useState({
		isFetched: false,
		data: {},
		error: null,
	});
	const token = window.localStorage.token;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const [loader, setLoeder] = useState(true);
	const { t } = useTranslation();

	const params = useParams();
	const [value, setValue] = useState(0);
	const handleChanges = (event, newValue) => {
		setValue(newValue);
	};



	const Add = id => {
		const formData = new FormData();
		formData.append("bildirishnoma", id);
		request
			.post("/ariza/lpu/bildirishnomatoariza/", formData, config)
			.then(res => {
				setBola(res.data);
			})
	};

	useEffect(() => {
		request
			.get(`/ariza/lpu/${params.id}/`, config)
			.then(function (res) {
				setDeleBemor({
					isFetched: true,
					data: res.data,
					error: false,
				});
				setPerson(res.data.ariza);
				setLoeder(false);
				setShifokorlar(res.data);
			})
			.catch(function (err) {
				setDeleBemor({
					isFetched: false,
					data: [],
					error: err,
				});
			});
	
	}, [params.id]);

	useEffect(() => {
			if (person?.bildirishnoma_id) {
				Add(person.bildirishnoma_id);
			}
	},[person])
	
	const navigate = useNavigate();
	const Status = () => {
		const formdata = new FormData();
		formdata.append("ariza", person.id);
		formdata.append("status", "Javob berilmadi");
		request.post("/ariza/lpu/changestatus/", formdata, config).then(() => {
			toast.success(t("Ariza yuborildi"));
			navigate("/arizalpu");
		})
	};


	return (
		<div className='rol_ariza'>
			<Button variant='contained' style={{ marginBottom: "1rem" }} onClick={() => navigate("/arizalpu")}>
				{t("bildirishnoma.single.ortga")}
			</Button>
			<div className='rol_ariza_bottom_top rol_ariza_bottom_top2'>
				<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.status")}</h4>
				{
					<div className='status_info'>
						<p className='status_info_title page-status'>Yuborilmadi</p>
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
										<p>{t("bildirishnoma.single.inf")}</p>
									</div>
									<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
										<p>{person?.kimga}</p>
										<p>{person?.qoshimcha}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='rol_ariza_bottom_div_inner'>
				<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.vosita")}</h4>

				<p className='single_table_all_title'></p>
				<Box sx={{ maxHeight: "400px", overflow: "auto" }}>
					<TabContext value={value}>
						<TabList onChange={handleChanges}>
							<Tab label={t("bildirishnoma.single.vosi")} value={0} />
							<Tab label={t("bildirishnoma.single.bolalar")} value={1} />
						</TabList>
						<TabPanel value={0}>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label='customized table'>
									<TableHead>
										<TableRow style={{ backgroundColor: "white" }}>
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
													<TableRow>
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

						<TabPanel value={1} style={{ padding: 0 }}>
							<TabContext value={chidlTab}>
								<TabList onChange={handleChildTab}>
									<Tab value={2} label={t("input.yosh1")} />
									<Tab value={3} label={t("input.oy1")} />
								</TabList>

								<TabPanel value={2}>
									<TableContainer component={Paper}>
										<Table>
											<TableHead>
												<TableRow style={{ backgroundColor: "white" }}>
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
												<TableRow style={{ backgroundColor: "white" }}>
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
								<p className='document_left_title'>{person?.qoshimcha || t("input.mavjud")}</p>
							</div>
						</div>
					</div>
				</div>
				<div className='t9'>
					<div className='rol_ariza_bottom_div_inner'>
						<div className='rol_ariza_bottom_div_inner_block'>
							<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.fayl")}</h4>
							{person?.fayl ? (
								<div className='rol_ariza_bottom_div_t6'>
									<a href={`https://admin-mpbt.ssv.uz/${person.fayl}`} className='download_document_t9'>
										<Button variant='contained' startIcon={<CloudDownloadIcon />}>
											{t("input.yuklab")}
										</Button>
									</a>
								</div>
							) : (
								<p>{t("input.mavjud")}</p>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* <Button variant="contained">{t("bildirishnoma.single.qayta")}</Button>
        <Button variant="contained" style={{margin:'10px'}}>{t("bildirishnoma.single.korildi")}</Button> */}
			<footer className='site-footer'>
				<div style={{ textAlign: "center" }}>
					<Button
						onClick={Status}
						style={{ width: "448px", borderRadius: "12px", backgrounColor: "#1464C0" }}
						startIcon={<SendIcon />}
						variant='contained'
						color='primary'
						size='large'
					>
						{t("modalariza.arizayub")}
					</Button>
				</div>
			</footer>
		</div>
	);
};

export default Saveariza;

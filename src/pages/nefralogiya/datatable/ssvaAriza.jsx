import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
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
    Tabs
} from "@mui/material";
import {request} from "api/request";
import {get} from "lodash";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";


const Vsarflov = () => {
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

	const [person, setPerson] = useState([]);
	const [value,setValue] = useState(0)
	const token = window.localStorage.token;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { t } = useTranslation();
	const params = useParams();
	const handleChange = (e,v) => {
		setValue(v)
	}

	useEffect(() => {
		request.get(`/ariza/moh/`, config).then(data => {
			console.log(data.data.data, "full");
			setPerson(data.data.data.find(el => +el.id === +params.id));
		});
	}, [params.id]);

	return (
		<div className='rol_ariza'>
			<div className='rol_ariza_top'>
				<Link to={"/?tab=2"}>
					<Button variant='contained'>{t("bildirishnoma.single.ortga")}</Button>
				</Link>
			</div>
			<div className='rol_ariza_bottom_top rol_ariza_bottom_top2'>
				<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.status")}</h4>
				{person?.status === "O'qildi" ? (
					<div className='status_info' style={{ background: "green" }}>
						<p className='status_info_title' style={{ color: "white" }}>
							{t("O'qildi")}
						</p>
					</div>
				) : (
					<div className='status_info'>
						<p className='status_info_title'>{t("bildirishnoma.arstatus.oqilmadi")}</p>
					</div>
				)}
			</div>

			<div className='rol_ariza_bottom_div_inner'>
				<div className='single_table_all_block_bottom'>
					<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.vosi")}</h4>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							style={{ backgroundColor: "#fff", alignItems: "center" }}
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'
						>
							<Tab label={t("bildirishnoma.single.vosi")} value={0} />
							<Tab label={t("bildirishnoma.single.bolalar")} value={1} />
						</Tabs>
					</Box>
					{value === 0 && (
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label='customized table'>
								<TableHead>
									<TableRow style={{ backgroundColor: "white" }}>
										<TableCell>{t("bildirishnoma.single.soni")}</TableCell>
										<TableCell align='left'>{t("vosita.vositaturi")}</TableCell>
										<TableCell align='left'>{t("bildirishnoma.single.nomi")}</TableCell>
										<TableCell align='left'>{t("bildirishnoma.single.miqdori")}</TableCell>
									</TableRow>
								</TableHead>

								{person.ariza &&
									person.ariza.map(el => {
										if (Object.keys(el?.vositalar).length > 0) {
											return Object.keys(el?.vositalar).map((item, index) => (
												<TableBody>
													<TableRow>
														<TableCell align='left'>{index + 1}</TableCell>
														<TableCell align='left'>{item}</TableCell>
														<TableCell align='left'>{el.vositalar && Object.keys(el?.vositalar[item])}</TableCell>
														<TableCell align='left'>
															{el?.vositalar && Object.keys(el?.vositalar[item]).map(els => el.vositalar[item][els])}
														</TableCell>
													</TableRow>
												</TableBody>
											));
										} else {
											return (
												<TableBody>
													<TableRow>
														<TableCell style={{ textAlign: "center", color: "red" }} colSpan={4}>
															{t("input.mavjud")}
														</TableCell>
													</TableRow>
												</TableBody>
											);
										}
									})}
							</Table>
						</TableContainer>
					)}
					{value === 1 && (
						<>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label='customized table'>
									<TableHead>
										<TableRow style={{ backgroundColor: "white" }}>
											<TableCell>{t("input.toif")}</TableCell>
											<TableCell>{t("bildirishnoma.single.bolalar")}</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{get(person, "ariza").map(els => {
											if (Object.keys(els.yosh_toifa).length > 0) {
												return Object.keys(els.yosh_toifa).map((el, index) => {
													return (
														<TableRow key={index}>
															<TableCell>{el}</TableCell>
															<TableCell>{get(els, "yosh_toifa")[el]}</TableCell>
														</TableRow>
													);
												});
											} else {
												return (
													<TableRow>
														<TableCell>{t("input.mavjud")}</TableCell>
														<TableCell>{t("input.mavjud")}</TableCell>
													</TableRow>
												);
											}
										})}
									</TableBody>
									<TableHead>
										<TableRow style={{ backgroundColor: "white" }}>
											<TableCell>{t("modalariza.toif")}</TableCell>
											<TableCell>{t("bildirishnoma.single.bolalar")}</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{get(person, "ariza").map(els => {
											if (Object.keys(els.oy_toifa).length > 0) {
												return Object.keys(els.oy_toifa).map((el, index) => {
													return (
														<TableRow key={index}>
															<TableCell>{el}</TableCell>
															<TableCell>{get(els, "yosh_toifa")[el]}</TableCell>
														</TableRow>
													);
												});
											} else {
												return (
													<TableRow>
														<TableCell>{t("input.mavjud")}</TableCell>
														<TableCell>{t("input.mavjud")}</TableCell>
													</TableRow>
												);
											}
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</>
					)}
				</div>
			</div>
			<div className='rol_ariza_bottom'>
				<div className='rol_ariza_bottom_top'>
					<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.iddata")}</h4>
					<div className='rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1'>
						<div className='rol_ariza_bottom_block1'>
							<p className='info_single'>{t("bildirishnoma.single.id")}</p>
							<p className='info_single'>{person?.id}</p>
						</div>
						<div className='rol_ariza_bottom_block1'>
							<p className='info_single'>{t("bildirishnoma.single.data")}</p>
							<p className='info_single'>{person.date}</p>
						</div>
					</div>
				</div>
			</div>
			<div style={{ marginTop: "24px" }} className='single_table_document'>
				<div className='t9'>
					<div className='rol_ariza_bottom_div_inner'>
						<div className='rol_ariza_bottom_div_inner_block'>
							<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.qoshimcha")}</h4>
							<div className='document_left_title_block'>
								<p>{person?.qoshimcha}</p>
							</div>
						</div>
					</div>
				</div>
				<div className='t9'>
					<div className='rol_ariza_bottom_div_inner'>
						<div className='rol_ariza_bottom_div_inner_block'>
							<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.fayl")}</h4>
							<div className='rol_ariza_bottom_div_t6'>
								<a target='_blank' href={`https://admin-mpbt.ssv.uz/static/${person?.file}`} className='download_document_t9'>
									<Button variant='contained' startIcon={<CloudDownloadIcon />}>
										{t("input.yuklab")}
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <Button variant="contained" onClick={() => Send()}>
        {t("input.otp")}
      </Button> */}
		</div>
	);
};

export default Vsarflov;

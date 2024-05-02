import CheckIcon from "@mui/icons-material/Check";
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../api/request.js";
import "../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

function Tizmlpu() {
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

	const navigate = useNavigate();

	const [person, setPerson] = useState({
		isFetched: false,
		data: [],
		error: null,
	});

	const token = window.localStorage.token;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { t } = useTranslation();
	const params = useParams();
	useEffect(() => {
		request.get(`omborxona/tizimli/xabarnoma/lpu/detail/${params.id}`, config).then(data => setPerson(data.data));
	}, [params.id]);

	const [isLoading, setIsloading] = useState(false);
	const Tru = () => {
		setIsloading(true);
		const body = {
			status: "qabul_qilindi",
		};
		request
			.post(
				`/omborxona/tizimli/xabarnoma/lpu/tasdiqlash/${person.kirim_chiqim.kimdan_kelgan.toLowerCase()}/${params.id}`,
				body,
				config
			)
			.then(() => {
				setIsloading(false);
				alert("Tasdiqlandi!");

				navigate(-1);
			})
			.catch(() => {
				setIsloading(false);
				alert("Tasdiqlanmadi!");
			});
	};
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, []);
	return (
		<>
			<div className='rol_ariza'>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div className='rol_ariza_top'>
						<Button
							onClick={() => navigate(-1)}
							style={{
								borderRadius: "12px",
								backgroundColor: "#DDEBFB",
								padding: "8px",
							}}
							variant='text'
						>
							{t("bildirishnoma.single.ortga")}
						</Button>
					</div>
					<div>
						{person.kirim_chiqim?.qabul_qilish_status !== "qabul_qilindi" && (
							<Button onClick={Tru} startIcon={<CheckIcon />} variant='contained' disabled={isLoading}>
								{t("bildirishnoma.arstatus.qabul")}
							</Button>
						)}
					</div>
				</div>
				<div className='rol_ariza_bottom'>
					<div style={{ display: "flex", alignItems: "center" }}>
						<div className='rol_ariza_bottom_div'>
							<div className='rol_ariza_bottom_div_inner'>
								<div className='rol_ariza_bottom_div_inner_block'>
									<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.turi")}</h4>
									<div className='div-1'>{t("vosita.tizim")}</div>
								</div>
							</div>
						</div>

						<div style={{ width: "48%", marginLeft: "62px", marginBottom: "20px" }} className='rol_ariza_bottom_top'>
							<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.iddata")}</h4>
							<div className='rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1'>
								<div className='rol_ariza_bottom_block1'>
									<p className='info_single'>{t("bildirishnoma.single.id")}</p>
									<p className='info_single'>{person.kirim_chiqim && person.kirim_chiqim.id}</p>
								</div>
								<div className='rol_ariza_bottom_block1'>
									<p className='info_single'>{t("bildirishnoma.single.data")}</p>
									<p className='info_single'>{person.kirim_chiqim && person.kirim_chiqim.created_at}</p>
								</div>
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
											<p>{person.kirim_chiqim && person.kirim_chiqim.kimdan_kelgan}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style={{ width: "48%" }} className='t9'>
							<div className='rol_ariza_bottom_div_inner'>
								<div className='rol_ariza_bottom_div_inner_block'>
									<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.fayl")}</h4>
									<Stack direction={"row"} gap='1rem'>
										<div className='rol_ariza_bottom_div_t6'>
											{person.kirim_chiqim && person.kirim_chiqim.file && (
												<a
													href={`https://admin-mpbt.ssv.uz/static${person.kirim_chiqim.file}`}
													className='download_document_t9'
													target='_blank'
													download
												>
													<Button variant='contained' startIcon={<CloudDownloadIcon />}>
														{t("input.yuklab")}
													</Button>
												</a>
											)}
										</div>
										<div className='rol_ariza_bottom_div_t6'>
											{person.kirim_chiqim && person.kirim_chiqim.image && (
												<a
													href={`https://admin-mpbt.ssv.uz/static${person.kirim_chiqim.image}`}
													className='download_document_t9'
													target='_blank'
													download
												>
													<Button variant='contained' startIcon={<CloudDownloadIcon />}>
														{t("Rasm yuklab olish")}
													</Button>
												</a>
											)}
										</div>
									</Stack>

									{person.kirim_chiqim && !person.kirim_chiqim.file && !person.kirim_chiqim.image && t("Fayl mavjud emas")}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='single_table_document'>
					<div className='t9'>
						<div className='rol_ariza_bottom_div_inner'>
							<div className='rol_ariza_bottom_div_inner_block'>
								<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.qoshimcha")}</h4>
								<div className='document_left_title_block'>
									<TableContainer component={Paper}>
										<Table className={classes.table} aria-label='customized table'>
											<TableHead>
												<TableRow>
													<TableCell>{t("bildirishnoma.single.soni")}</TableCell>
													<TableCell>{t("bildirishnoma.single.nomi")}</TableCell>
													<TableCell>{t("vosita.vositaturi")}</TableCell>
													<TableCell>{t("bildirishnoma.single.seriyasi")}</TableCell>
													<TableCell>{t("bildirishnoma.single.miqdori")}</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{person.vositalar ? (
													person.vositalar.map((el, index) => {
														return (
															<TableRow>
																<TableCell align='left'>{index + 1}</TableCell>
																<TableCell align='left'>{el.vosita_nomi.nomi}</TableCell>
																<TableCell align='left'>{el.vosita_turi.nomi}</TableCell>
																<TableCell align='left'>{el.vosita_seryasi}</TableCell>
																<TableCell align='left'>{el.vosita_miqdori}</TableCell>
															</TableRow>
														);
													})
												) : (
													<TableRow>{t("input.mavjud")}</TableRow>
												)}
											</TableBody>
										</Table>
									</TableContainer>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Tizmlpu;

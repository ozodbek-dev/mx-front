import HistoryIcon from "@mui/icons-material/History";
import {
	Box,
	Button,
	Modal,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { request } from "../../api/request";
import l1 from "../../assets/icon/l1.svg";
import "../../container/GERMINTOZ/ROL/bildirishnoma/table/bildirish.scss";
import "./skladmu.scss";
import { get } from "lodash";

function Skladm() {
	const [partnew, setPartnew] = useState([]);
	const [opens2, setOpens2] = useState(false);
	const [value, setValue] = useState(0);
	const [detail, setDetail] = useState([]);
	const token = localStorage.getItem("token");

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 800,
		bgcolor: "background.paper",
		boxShadow: 24,
		background: "white",
		pt: 2,
		px: 4,
		pb: 3,
	};
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		request.get(`omborxona/lpu/malumotlar`, config).then(data => setPartnew(data.data));
	}, []);

	const handlerClick = e => {
		request
			.get(`/omborxona/vositalar/lpu?vosita=${e}`, config)
			.then(data => setDetail(data.data))
			.catch(err => {
				setDetail({
					shu_oy_chiqim: "",
					shu_oy_chiqim_raqami: "",
				});
			});
		setOpens2(true);
	};
	console.log(detail, "detail");
	const { t } = useTranslation();
	return (
		<>
			<div
				style={{
					marginTop: "34px",
					marginRight: "20px",
					marginLeft: "20px",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "10px",
					}}
				>
					<h1>{t("sidebar.li3")}</h1>
					<Link to={"/storekirim"}>
						<Button
							variant='contained'
							// color="primary"
							size='large'
							// className={classes.button}
							startIcon={<HistoryIcon />}
						>
							{t("bildirishnoma.kir")}
						</Button>
					</Link>
				</div>

				<TableContainer component={Paper}>
					<Table style={{ minWidth: 650, padding: "20px" }} size='small' aria-label='a dense table'>
						<TableHead>
							<TableRow>
								<TableCell align='left'>{t("bildirishnoma.single.soni")}</TableCell>
								<TableCell>{t("bildirishnoma.single.nomi")}</TableCell>
								<TableCell align='left'>{t("bildirishnoma.qoldig")}</TableCell>
								<TableCell align='left'>{t("bildirishnoma.ki3")}</TableCell>
								<TableCell align='left'>{t("bildirishnoma.ch3")}</TableCell>
								<TableCell align='left'>{t("bildirishnoma.q3")}</TableCell>
								<TableCell align='left'>{t("bildirishnoma.batafsil")}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{partnew?.hozirgi_oy_chiqim?.data?.map((el, index) => (
								<TableRow key={index}>
									<>
										<TableCell align='left'>{index + 1}</TableCell>
										<TableCell>{el.vosita_nomi || t("input.mavjud")}</TableCell>
										<TableCell style={{ padding: "20px" }}>{partnew?.otgan_oy_qoldiq?.data[index]?.otgan_oy_qoldiq}</TableCell>
										<TableCell style={{ padding: "20px" }}>
											{partnew?.hozirgi_oy_kirim.data[index]?.kirim || t("input.mavjud")}
										</TableCell>
										<TableCell style={{ padding: "20px" }}>
											{partnew?.hozirgi_oy_chiqim?.data[index]?.chiqim || t("input.mavjud")}
										</TableCell>
										<TableCell style={{ padding: "20px" }}>
											{partnew?.shu_oy_mavjud?.data[index]?.shu_oy_qoldiq || t("input.mavjud")}
										</TableCell>
										<TableCell style={{ padding: "20px" }}>
											<button onClick={() => handlerClick(el.vosita_id)}>
												<img
													style={{
														width: "35px",
													}}
													className='delete_icon'
													src={l1}
													alt='batafsil'
												/>
											</button>
										</TableCell>
									</>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<div className='modal_manitoring_seans'>
					<Modal keepMounted open={opens2} onClose={() => setOpens2(false)}>
						<Box className='modal-one' sx={{ ...style }}>
							<div className='seans_modal' style={{ height: "90vh", overflowY: "auto" }}>
								<Tabs
									style={{ marginBottom: "20px", borderBottom: "1px solid" }}
									value={value}
									onChange={handleChange}
									aria-label='basic tabs example'
								>
									<Tab label={t("bildirishnoma.kirim")} />
									<Tab label={t("bildirishnoma.chiqim")} />
								</Tabs>
								<h4 className='seans_modal_title'>{t("vosita.mal")}</h4>
								{value === 0 && !!detail?.shu_oy_kirim && !detail.shu_oy_kirim[0] && t("Bu Oy Kirim Mavjud Emas!")}
								{value === 1 && !!detail?.shu_oy_chiqim && !detail.shu_oy_chiqim[0] && t("Bu Oy Chiqim Mavjud Emas!")}
								{value === 0 &&
									(!!detail.shu_oy_kirim
										? detail.shu_oy_kirim?.map((el, index) => {
												return (
													<div className='seans_modal_inner' key={index}>
														<div className='seans_modal_inner_top'>
															<p className='seans_modal_inner_desc'>{index + 1}</p>
														</div>
														<div className='seans_modal_inner_bottom'>
															<div className='seans_modal_inner_bottom_left'>
																<p className=''>{t("bildirishnoma.single.nomi")}</p>
																<p className=''>{t("vosita.vositaturi")}</p>
																<p className=''>{t("bildirishnoma.single.seriyasi")}</p>
																<p className=''>{t("vosita.miq")}</p>
																<p className=''>{t("Sanasi")}</p>
															</div>
															<div className='seans_modal_inner_bottom_left'>
																<p className=''>{el.vosita_nomi.nomi}</p>
																<p className=''>{el.vosita_turi.nomi}</p>
																<p className=''>{get(el, "vosita_seryasi") ? get(el, "vosita_seryasi") : t("bola.kir")}</p>
																<p className=''>{el.vosita_miqdori}</p>
																<p className=''>{get(el, "created_at")}</p>
															</div>
														</div>
													</div>
												);
										  })
										: t("input.mavjud"))}
								{value === 1 &&
									(!!detail.shu_oy_chiqim?.length
										? detail.shu_oy_chiqim?.map((el, index) => {
												return (
													<div className='seans_modal_inner' key={index}>
														<div className='seans_modal_inner_top'>
															<p className='seans_modal_inner_desc'>{index + 1}</p>
														</div>
														<div className='seans_modal_inner_bottom'>
															<div className='seans_modal_inner_bottom_left'>
																<p className=''>{t("bildirishnoma.single.nomi")}</p>
																<p className=''>{t("vosita.vositaturi")}</p>
																<p className=''>{t("bildirishnoma.single.seriyasi")}</p>
																<p className=''>{t("vosita.miq")}</p>
																<p className=''>Chiqim qilingan sana</p>
															</div>
															<div className='seans_modal_inner_bottom_left'>
																<p className=''>{get(el, "vosita_nomi.nomi", t("Kiritilmagan"))}</p>
																<p className=''>{get(el, "vosita_turi.nomi", t("Kiritilmagan"))}</p>
																<p className=''>{get(el, "vosita_seriyasi", t("Kiritilmagan"))}</p>
																<p className=''>{get(el, "vosita_miqdori", t("Kiritilmagan"))}</p>
																<p className=''>{get(el, "created_at")}</p>
															</div>
														</div>
													</div>
												);
										  })
										: t("input.mavjud"))}
							</div>
						</Box>
					</Modal>
				</div>
			</div>
		</>
	);
}

export default Skladm;

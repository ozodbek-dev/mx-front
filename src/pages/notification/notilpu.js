import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	Fade,
	IconButton,
	InputAdornment,
	Modal,
	Pagination,
	Paper,
	Stack,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../api/request";
import l1 from "../../assets/icon/l1.svg";
import Loading from "../../components/loading/loading";
import "../../container/GERMINTOZ/ROL/bildirishnoma/table/bildirish.scss";
import useTab from "hooks/useTab";
import { TabContext, TabPanel } from "@mui/lab";
import { Close } from "@mui/icons-material";
import useGet from "hooks/useGet";
import { get } from "lodash";

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

function Notilpu() {
	const token = window.localStorage.token;
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const [searchValue, setSearchValue] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const navigate = useNavigate();
	const { t } = useTranslation();
	const [searchQuery, setSearchQuery] = useState("");

	const { tab, handleTabChange } = useTab();

	const { data: systematicNoticeData, isLoading: systematicNoticeLoading } = useGet({
		url: `omborxona/tizimli/xabarnoma/lpu?page=${currentPage}&search=${searchQuery}`,
	});

	const { data: freeNotiseData, isLoading: freeNoticeLoading } = useGet({
		url: `/bildirishnoma/muassasa/erkin/?page=${currentPage}&search=${searchQuery}`,
	});


	const { data: childrenNoticeData, isLoading: childrenNoticeLoading } = useGet({
		url: `/bildirishnoma/muassasa/?page=${currentPage}&search=${searchQuery}`,
	});
	const { data: notification } = useGet({
		url: `/bildirishnoma/new-notification-count/`,
	});

	const [open2, setOpen2] = useState(false);

	const handleClose2 = () => {
		setOpen2(false);
	};

	const statusChange = e => {
		const formData = new FormData();
		formData.append("id", e?.id);
		formData.append("kimdan", e?.who);
		formData.append("status", "O'qildi");
		request.put("/bildirishnoma/muassasa/erkin/", formData, config);
	};
	const statusChangeBola = e => {
		const formData = new FormData();
		formData.append("id", e);
		formData.append("status", "O'qildi");
		request.put("/bildirishnoma/muassasa/", formData, config);
	};

	const handleSearch = e => {
		if (e.key === "Enter") {
			setSearchQuery(e.target.value);
		}
		setCurrentPage(1);
	};

	useEffect(() => {
		setCurrentPage(1);
		setSearchQuery("");
		setSearchValue("");
	}, [tab]);
	if (!childrenNoticeData?.data || !freeNotiseData?.data || !systematicNoticeData?.data) return <Loading />;
	return (
		<>
			<div className='ariza'>
				<div className='ariza_top'>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<h4 className='ariza_top_title'>
							{t("input.bso")}: {tab === "1" && get(systematicNoticeData, "meta.total")}{" "}
							{tab === "2" && get(freeNotiseData, "meta.total")} {tab === "3" && get(childrenNoticeData, "meta.total")}
						</h4>
						<Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
							<TextField
								className='search-ariza'
								placeholder={t("bildirishnoma.plac")}
								style={{ marginLeft: "40px" }}
								id='standard-basic'
								value={searchValue.trim()}
								variant='outlined'
								onChange={e => setSearchValue(e.target.value)}
								onKeyPress={handleSearch}
								InputProps={{
									startAdornment: (
										<InputAdornment
											style={{
												position: "absolute",
												right: "18px",
												cursor: "pointer",
											}}
										>
											<IconButton>
												<SearchIcon onClick={() => setSearchQuery(searchValue)} />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							{!!searchValue && (
								<IconButton
									onClick={() => {
										setSearchQuery("");
										setSearchValue("");
									}}
								>
									<Close />
								</IconButton>
							)}
						</Box>
					</div>
				</div>
				<TabContext value={tab}>
					<div className='ariza_bottom'>
						<div className='ariza_bottom_top'>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<Tabs
									style={{ backgroundColor: "#fff", alignItems: "center" }}
									value={tab}
									onChange={(e, v) => handleTabChange(v)}
									aria-label='basic tabs example'
								>
									<Tab label={t("vosita.tizim")} value={"1"} />
									<Tab label={t("vosita.erkin")} value={"2"} />
									{!!notification?.data?.erkin && (
										<span
											style={{
												fontWeight: "bold",
												background: "blue",
												borderRadius: "50%",
												width: "22px",
												height: "22px",
												color: "white",
												textAlign: "center",
												paddingTop: "4px",
												fontSize: "14px",
											}}
										>
											{notification.data.erkin}
										</span>
									)}

									<Tab label={t("vosita.bola")} value={"3"} />
									{!!notification?.data?.sorov && (
										<span
											style={{
												fontWeight: "bold",
												background: "blue",
												borderRadius: "50%",
												width: "22px",
												height: "22px",
												color: "white",
												textAlign: "center",
												paddingTop: "4px",
												fontSize: "14px",
											}}
										>
											{notification.data.sorov}
										</span>
									)}
								</Tabs>
							</Box>
						</div>
						<div className='ariza_bottom_bottom'>
							<TabPanel value='1' style={{ padding: 0 }}>
								<TableContainer component={Paper}>
									<Table className={classes.table} aria-label='customized table'>
										<CustomTableHead tab={tab} t={t} />
										<TableBody>
											{systematicNoticeData.data.map((el, index) => {
												return (
													<TableRow key={el.kirim_chiqim.id}>
														<TableCell>{index + 1}</TableCell>
														<TableCell>{el.kirim_chiqim.id}</TableCell>
														<TableCell>{el.kirim_chiqim.kimdan_kelgan}</TableCell>
														<TableCell>{el.kirim_chiqim.unique_raqam}</TableCell>
														<TableCell>{el.kirim_chiqim.created_at}</TableCell>
														<TableCell align='center'>
															<button
																className={
																	el.kirim_chiqim.qabul_qilish_status === "qabul_qilindi" ? "status_btn" : "status_btn--not2"
																}
															>
																{el.kirim_chiqim.qabul_qilish_status === "qabul_qilindi"
																	? t("qabulqilindi")
																	: t("bildirishnoma.arstatus.qabulnot")}
															</button>
														</TableCell>
														<TableCell align='center'>
															<div className='button_modal button_modal_1'>
																<Link to={`/tizimlpu/${el.id}`} className='single_info'>
																	<img className='delete_icon' src={l1} alt='batafsil' />
																</Link>
															</div>
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
								{get(systematicNoticeData, "meta.total_pages") > 1 && (
									<Stack spacing={2} mt={4} justifyContent={"flex-end"} alignItems={"flex-end"}>
										{" "}
										<Pagination
											onChange={(e, value) => setCurrentPage(value)}
											count={get(systematicNoticeData, "meta.total_pages")}
											color='primary'
											page={currentPage}
										/>
									</Stack>
								)}
							</TabPanel>
							<TabPanel value='2' style={{ padding: 0 }}>
								<TableContainer component={Paper}>
									<Table className={classes.table}>
										<CustomTableHead tab={tab} t={t} />
										<TableBody>
											{freeNotiseData.data.map((item, index) => {
												return (
													<>
														<TableRow>
															<TableCell align='left'>
																{index + 1}
																<div className='ariza_bgc'></div>
															</TableCell>
															<TableCell align='left'>{item.id}</TableCell>
															<TableCell align='left'>{item.kimdan}</TableCell>
															<TableCell align='left'>{item.muddati || t("Kiritilmagan")}</TableCell>
															<TableCell align='left'>{item.sana}</TableCell>
															{/* <TableCell></TableCell> */}
															<TableCell align='center'>
																<button className={item.status === "O'qildi" ? "status_btn--not" : "status_btn"}>
																	{item.status === "O'qildi" ? t("vosita.oqil") : t("bildirishnoma.arstatus.yangi")}
																</button>
															</TableCell>

															<TableCell align='center'>
																<div className='button_modal button_modal_1'>
																	<Button
																		onClick={() => {
																			statusChange({
																				id: item.id,
																				who: item.Yuboruvchi,
																			});
																			navigate(`/singlelpu/${item.id}/${item.Yuboruvchi}`);
																		}}
																		className='single_info'
																	>
																		<img id={item.id} className='delete_icon' src={l1} alt='batafsil' />
																	</Button>
																	{/* <Button>
                      <img className="delete_icon" src={l3} />
                    </Button> */}
																</div>
															</TableCell>
														</TableRow>
													</>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
								{get(freeNotiseData, "meta.total_pages") > 1 && (
									<Stack spacing={2} mt={4} justifyContent={"flex-end"} alignItems={"flex-end"}>
										{" "}
										<Pagination
											onChange={(e, value) => setCurrentPage(value)}
											count={get(freeNotiseData, "meta.total_pages")}
											color='primary'
											page={currentPage}
										/>
									</Stack>
								)}
							</TabPanel>
							<TabPanel value='3' style={{ padding: 0 }}>
								<TableContainer component={Paper}>
									<Table className={classes.table} aria-label='customized table'>
										<CustomTableHead tab={tab} t={t} />
										<TableBody>
											{childrenNoticeData.data.map((item, index) => {
												return (
													<>
														<TableRow>
															<TableCell align='left'>
																{index + 1}
																<div className='ariza_bgc'></div>
															</TableCell>
															<TableCell align='left'>{item.id}</TableCell>
															<TableCell align='left'>{item.kimdan}</TableCell>
															<TableCell align='left'>{item.muddati || t("Kiritilmagan")}</TableCell>
															<TableCell align='left'>{item.sana}</TableCell>
															<TableCell align='center'>
																<button className={item.status !== "Yuborildi" ? "status_btn--not" : "status_btn"}>
																	{item.status !== "Yuborildi" ? t("vosita.oqil") : t("bildirishnoma.arstatus.yangi")}
																</button>
															</TableCell>

															<TableCell align='center'>
																<div className='button_modal button_modal_1'>
																	<Button
																		onClick={() => {
																			statusChangeBola(item.id);
																			navigate(`/singlebol/${item.id}`);
																		}}
																		className='single_info'
																	>
																		<img id={item.id} className='delete_icon' src={l1} alt='batafsil' />
																	</Button>
																</div>
															</TableCell>
														</TableRow>
													</>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
								{get(childrenNoticeData, "meta.total_pages") > 1 && (
									<Stack spacing={2} mt={4} justifyContent={"flex-end"} alignItems={"flex-end"}>
										{" "}
										<Pagination
											onChange={(e, value) => setCurrentPage(value)}
											count={get(childrenNoticeData, "meta.total_pages")}
											color='primary'
											page={currentPage}
										/>
									</Stack>
								)}
							</TabPanel>
						</div>
					</div>
				</TabContext>

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
							<div style={classes.paper}>
								<div className='zayavka_block'>
									<Button
										style={{
											color: "black",
											textAlign: "right",
											margin: "0 0 auto auto",
											display: "flex",
										}}
										startIcon={<CloseIcon />}
										onClick={() => handleClose2()}
									></Button>
									<h4 className='zayavka_title'>{t("modalariza.arizaturi")}</h4>
									<div className='delete_btn_group'>
										<Link to={"/rmoariza"} className='jayavka_btn'>
											bildirishnoma ochish
										</Link>
									</div>
								</div>
							</div>
						</Fade>
					</Modal>
				</div>
			</div>
		</>
	);
}
export default Notilpu;

function CustomTableHead({ tab, t }) {
	return (
		<TableHead>
			<TableRow style={{ backgroundColor: "white" }}>
				<TableCell> {t("bildirishnoma.soni")}</TableCell>
				<TableCell align='left'>ID</TableCell>
				<TableCell align='left'>{t("bildirishnoma.single.kimdan")}</TableCell>
				<TableCell align='left'>{tab === "1" ? t("input.barkod") : t("bildirishnoma.new.mud")}</TableCell>

				<TableCell align='left'>{t("bildirishnoma.sana")}</TableCell>
				<TableCell align='center'>{t("bildirishnoma.status")}</TableCell>
				<TableCell align='center'>{t("bildirishnoma.harakat")}</TableCell>
			</TableRow>
		</TableHead>
	);
}

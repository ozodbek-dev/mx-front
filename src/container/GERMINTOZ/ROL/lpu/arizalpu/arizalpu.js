import SearchIcon from "@mui/icons-material/Search";
import {
    IconButton,
    InputAdornment,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import {Link} from "react-router-dom";

import {useState} from "react";
import {useTranslation} from "react-i18next";
import l1 from "../../../../../assets/icon/l1.svg";
import Loading from "../../../../../components/loading/loading";
import Error from "../../../../../Error/Error";
import "./arizalpu.scss";
import Arizamodal from "./arizamodal";
import {get} from "lodash";
import useGet from "hooks/useGet";
import {Close} from "@mui/icons-material";

function Arizalpu() {
	const { t } = useTranslation();
	const [searchInputValue, setsearchInputValue] = useState("");
	const [searchQuery, setSearchQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGet({
		url: `/ariza/lpu/list/?sort=-id&page=${currentPage}&search=${searchQuery}`,
	});



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
	const searchHandler = (e) => {
			if (e.key === "Enter") {
				setSearchQuery(e.target.value);
				setCurrentPage(1);
		}
	}


	if (data.error) return <Error />;
	if (isLoading) return <Loading />;
	return (
		<div className='ariza'>
			<div className='ariza_top'>
				<div style={{ display: "flex", alignItems: "center" }}>
					<h4 className='ariza_top_title'>
						{t("bildirishnoma.allariza")}:{get(data, "meta.total")}{" "}
					</h4>
					<TextField
						className='search-ariza'
						placeholder={t("bildirishnoma.plac")}
						style={{ marginLeft: "40px" }}
						id='standard-basic'
						value={searchInputValue.trim()}
						variant='outlined'
						onChange={e => setsearchInputValue(e.target.value)}
						onKeyPress={searchHandler}
						InputProps={{
							startAdornment: (
								<InputAdornment style={{ position: "absolute", right: "18px", cursor: "pointer" }}>
									<IconButton>
										<SearchIcon onClick={()=>setSearchQuery(searchInputValue)} />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{!!searchInputValue && (
						<IconButton
							onClick={() => {
								setSearchQuery("");
								setsearchInputValue("");
							}}
						>
							<Close />
						</IconButton>
					)}
				</div>
				<div className='create_ariza_btn'>
					<Arizamodal />
				</div>
			</div>
			<div className='ariza_bottom'>
				<div className='ariza_bottom_bottom'>
					{
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label='customized table'>
								<TableHead>
									<TableRow style={{ backgroundColor: "white" }}>
										<TableCell>{t("bildirishnoma.soni")}</TableCell>
										<TableCell align='left'>
											<b> ID</b>
										</TableCell>
										<TableCell align='left'>
											<b>{t("bildirishnoma.single.kimdan")}</b>
										</TableCell>
										<TableCell align='left'>
											<b>{t("bildirishnoma.send")}</b>
										</TableCell>

										<TableCell align='left'>
											<b>{t("bildirishnoma.sana")}</b>
										</TableCell>
										<TableCell align='center'>{t("bildirishnoma.single.status")}</TableCell>
										<TableCell align='center'>{t("bildirishnoma.harakat")}</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.data &&
										data.data.map((item, index) => {
											return (
												<TableRow key={item.id}>
													<TableCell align='left'>
														{index + 1}
														<div className='ariza_bgc'></div>
													</TableCell>
													<TableCell align='left'>{item.id}</TableCell>
													<TableCell align='left'>{item.kimdan}</TableCell>
													<TableCell align='left'>{item.kimga}</TableCell>
													<TableCell align='left'>{item.vaqti}</TableCell>
													<TableCell align='center'>
														{item?.status === "Yuborilmadi" && <span className='status status--1'>{t(item?.status)}</span>}
														{item?.status === "Javob berilmadi" && <span className='status status--2'>{t(item?.status)}</span>}
														{item.status === "O'qildi" && <span className='status status--3'>{t(item?.status)}</span>}
													</TableCell>
													<TableCell align='center'>
														<div className='button_modal button_modal_1'>
															<Link Link to={`/arizasingle/${item.id}`} className='single_info'>
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
					}
					{get(data, "meta.total_pages") > 1 && (
						<Stack spacing={2} mt={4} justifyContent={"flex-end"} alignItems={"flex-end"}>
							{" "}
							<Pagination
								onChange={(e, value) => setCurrentPage(value)}
								count={get(data, "meta.total_pages")}
								color='primary'
								page={currentPage}
							/>
						</Stack>
					)}
				</div>
			</div>
		</div>
	);
}
export default Arizalpu;

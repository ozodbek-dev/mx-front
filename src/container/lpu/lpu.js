import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { request } from "../../api/request";
import BasicTabsBildirishnoma from "./bildirishnoma/muiTab";
import "./doctor.scss";
import BasicTable from "./jonatilganArizaTable";
import Loading from "components/loading/loading";

export default function Lpu() {
	const token = localStorage.getItem("token");
	const [vosita, setVosita] = useState([]);
	const { t } = useTranslation();
	const [tab, setTab] = useState("1");

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const formData = new FormData();
	formData.append("token", token);

	useEffect(() => {
		request
			.get(`omborxona/lpu/malumotlar`, config)
			.then(function (res) {
				console.log(res, "response");
				setVosita(res?.data);
			})
			.catch(function (err) {});
	}, []);

	console.log(vosita, "vositalar");

	if (!vosita.otgan_oy_qoldiq) return <Loading />;
	return (
		<>
			<div className='main-page'>
				<div className='box'>
					<h1>{t("bildirishnoma.jariz")}</h1>
					<div className='box-item'>
						<BasicTable />
					</div>
				</div>

				<div className='box'>
					<div className='dori_vitamin'>
						<div className='dorilar'>
							<h1>{t("sidebar.li3")}</h1>
							<div className='header_kirim_chiqim'>
								<div className='span'>{t("bildirishnoma.kirim")}</div>
								<div className='span'>{t("bildirishnoma.chiqim")}</div>
							</div>

							<div className='button_kir'>
								<div className='kirim'>
									{vosita?.hozirgi_oy_kirim?.data?.map(el => el.kirim).reduce((acc, cur) => acc + cur, 0)}
								</div>
								<div className='chiqim'>
									{vosita?.hozirgi_oy_chiqim?.data?.map(el => el.chiqim).reduce((acc, cur) => acc + cur, 0)}
								</div>
							</div>
							<Box>
								<TabContext value={tab}>
									<TabList onChange={(_, val) => setTab(val)}>
										<Tab label={t("bildirishnoma.shuoy")} value={"1"}/>
										<Tab label={t("bildirishnoma.otoy")} value={"2"} />
									</TabList>

									<TabPanel value={"1"} style={{overflow:"auto"}}>
										<TableContainer component={Paper}>
											<Table sx={{ minWidth: "33%"}} aria-label='simple table'>
												<TableHead style={{ background: "#ffff !important" }}>
													<TableRow style={{ background: "#ffff !important" }}>
														<TableCell style={{ width: "120px" }}>{t("vosita.i")}</TableCell>
														<TableCell align='center' style={{ width: "112px" }}>
															{t("bildirishnoma.q1")}
														</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{vosita?.shu_oy_mavjud?.data?.map((i, k) => (
														<TableRow
															key={k}
															sx={{
																"&:last-child td, &:last-child th": {
																	border: 0,
																},
															}}
														>
															<TableCell component='th' scope='row'>
																{i.vosita_nomi}
															</TableCell>
															<TableCell align='center'>{i.shu_oy_qoldiq}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									</TabPanel>
									<TabPanel value={"2"} style={{overflow:"auto"}}>
										<TableContainer component={Paper}>
											<Table sx={{ minWidth: "33%" }} aria-label='simple table'>
												<TableHead style={{ background: "#ffff !important" }}>
													<TableRow style={{ background: "#ffff !important" }}>
														<TableCell style={{ width: "120px" }}>{t("vosita.i")}</TableCell>
														<TableCell align='center' style={{ width: "112px" }}>
															{t("bildirishnoma.q1")}
														</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{vosita?.otgan_oy_qoldiq.data?.map((i, k) => (
														<TableRow
															key={k}
															sx={{
																"&:last-child td, &:last-child th": {
																	border: 0,
																},
															}}
														>
															<TableCell component='th' scope='row'>
																{i.vosita_nomi}
															</TableCell>
															<TableCell align='center'>{i.otgan_oy_qoldiq}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									</TabPanel>
								</TabContext>
							</Box>
						</div>
					</div>
				</div>
				<div className='box'>
					<h1>{t("bildirishnoma.bil")}</h1>
					<div className='box-item'>
						<BasicTabsBildirishnoma />
					</div>
				</div>
			</div>
		</>
	);
}

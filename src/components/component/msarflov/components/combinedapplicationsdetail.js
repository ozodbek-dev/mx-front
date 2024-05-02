import { TabContext, TabList, TabPanel } from "@mui/lab";
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
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
function Combinedapplicationsdetail({ person }) {
  const [tab, setTab] = useState(1);
  const [t] = useTranslation();
  const handleChange = (_, value) => {
    setTab(value);
  };
  return (
		<div className='rol_ariza'>
			<div className='rol_ariza_top'>
				<Button onClick={() => window.history.back()} variant='contained'>
					{t("bildirishnoma.single.ortga")}
				</Button>
			</div>
			<div className='rol_ariza_bottom_top rol_ariza_bottom_top2'>
				<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.status")}</h4>
				{person?.status !== "O'qildi" ? (
					<div className='status_info' style={{ background: "green" }}>
						<p className='status_info_title' style={{ color: "white" }}>
							{t(`${person?.status?.toLowerCase()}`)}
						</p>
					</div>
				) : (
					<div className='status_info'>
						<p className='status_info_title'>{t("O'qildi")}</p>
					</div>
				)}
			</div>
			<div style={{ marginBottom: "20px" }} className='rol_ariza_bottom'>
				<div className='rol_ariza_bottom_top'>
					<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.iddata")}</h4>
					<div className='rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1'>
						<div className='rol_ariza_bottom_block1'>
							<p className='info_single'>{t("bildirishnoma.single.id")}</p>
							<p className='info_single'>{person?.id}</p>
						</div>
						<div className='rol_ariza_bottom_block1'>
							<p className='info_single'>{t("bildirishnoma.single.data")}</p>
							<p className='info_single'>{person?.date?.split("T")[0]}</p>
						</div>
					</div>
				</div>
			</div>
			<div className='rol_ariza_bottom_div_inner'>
				<div className='single_table_all_block_bottom' style={{ height: "500px", overflow: "auto" }}>
					<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.vosi")}</h4>

					<TabContext value={tab}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<TabList onChange={handleChange}>
								<Tab label={t("bildirishnoma.single.vosi")} value={1} />
								<Tab label={t("bildirishnoma.single.bolalar")} value={2} />
							</TabList>
						</Box>
						<TabPanel value={1}>
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
									<TableBody>
										{person?.vositalar2
											? person?.vositalar2.map((item, index) => (
													<TableRow key={index}>
														<TableCell align='left'>{index + 1}</TableCell>
														<TableCell align='left'>{item.turi}</TableCell>
														<TableCell align='left'>{item.nomi}</TableCell>
														<TableCell align='left'>{item.soni}</TableCell>
													</TableRow>
											  ))
											: null}
									</TableBody>
								</Table>
							</TableContainer>
						</TabPanel>
						<TabPanel value={2}>
							{person?.oy_toifa && person?.yosh_toifa ? (
								<TableContainer component={Paper}>
									<Table className={classes.table} aria-label='customized table'>
										<TableHead>
											<TableRow style={{ backgroundColor: "white" }}>
												<TableCell>{t("input.toif")}</TableCell>
												<TableCell align='left'>{t("bildirishnoma.single.bolalar")}</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{Object.keys(person.yosh_toifa).length ? (
												Object.keys(person.yosh_toifa).map((it, index) => {
													return (
														<TableRow key={index}>
															<TableCell align='left'>{it}</TableCell>
															<TableCell align='left'>{person.yosh_toifa && person?.yosh_toifa[it]}</TableCell>
														</TableRow>
													);
												})
											) : (
												<TableRow>
													<TableCell align='left'>{t("bola.kir")}</TableCell>
													<TableCell align='left'>{t("bola.kir")}</TableCell>
												</TableRow>
											)}
										</TableBody>
										<TableHead style={{ marginTop: "20px" }}>
											<TableRow style={{ backgroundColor: "white" }}>
												<TableCell>{t("modalariza.toif")}</TableCell>
												<TableCell align='left'>{t("bildirishnoma.single.bolalar")}</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{Object.keys(person.oy_toifa).length ? (
												Object.keys(person.oy_toifa).map((it, index) => {
													return (
														<TableRow key={index}>
															<TableCell align='left'>{it}</TableCell>
															<TableCell align='left'>{person.oy_toifa && person?.oy_toifa[it]}</TableCell>
														</TableRow>
													);
												})
											) : (
												<TableRow>
													<TableCell align='left'>{t("bola.kir")}</TableCell>
													<TableCell align='left'>{t("bola.kir")}</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
							) : (
								<p>{t("input.mavjud")}</p>
							)}
						</TabPanel>
					</TabContext>
				</div>
			</div>
		</div>
	);
}
export default Combinedapplicationsdetail;

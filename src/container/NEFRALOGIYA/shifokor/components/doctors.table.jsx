import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Pagination, Stack } from '@mui/material';
import l1 from "../../../../assets/icon/l1.svg";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classes from '../classes';
import { get } from 'lodash';

const DoctorsTable = ({ doctors, currentPage, setCurrentPage }) => {
	console.log(currentPage)
	const { t } = useTranslation();
	const idls = localStorage.getItem("id");
	console.log(doctors);
	return (
		<div className='poliklinika'>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='customized table'>
					<TableHead>
						<TableRow style={{ backgroundColor: "white", marginTop: "25px" }}>
							<TableCell>{t("shifokor.number")}</TableCell>
							<TableCell align='left'>{t("input.fio")}</TableCell>
							<TableCell align='left'>{t("shifokor.birthday")}</TableCell>
							<TableCell align='left'>{t("shifokor.lavozim")}</TableCell>
							<TableCell align='left'>{t("shifokor.professia")}</TableCell>
							<TableCell align='left'>{t("shifokor.tel")}</TableCell>
							{idls && <TableCell align='center'>{t("shifokor.batafsil")}</TableCell>}
						</TableRow>
					</TableHead>
					<TableBody>
						{doctors.data.map((row, index) => (
							<TableRow TableRow key={row.name}>
								<TableCell component='th' scope='row'>
									{index + 1}
								</TableCell>
								<TableCell align='left'>{`${row.familiya} ${row.ism} ${row.otasining_ismi}`}</TableCell>
								<TableCell align='left'>{row.tugilgan_sana}</TableCell>
								<TableCell align='left'>{row.lavozimi}</TableCell>
								<TableCell align='left'>{row.mutaxassislik_toifasi}</TableCell>
								<TableCell align='left'>{row.tel_raqami}</TableCell>
								{idls && (
									<TableCell align='left'>
										<div className='button_modal button_modal_1'>
											<div className=' button_modal_1'>
												<Link Link to={`/shifokor/${row.id}`} className='single_info'>
													<img className='delete_icon' src={l1} alt='batafsil' />
												</Link>
											</div>
										</div>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{get(doctors, "meta.total_pages") > 1 && (
				<Stack spacing={2} mt={4} justifyContent={"flex-end"} alignItems={"flex-end"}>
					{" "}
					<Pagination
						onChange={(e, value) => setCurrentPage(value)}
						count={get(doctors, "meta.total_pages")}
						color='primary'
						page={currentPage}
					/>
				</Stack>
			)}
		</div>
	);
};

export default DoctorsTable;

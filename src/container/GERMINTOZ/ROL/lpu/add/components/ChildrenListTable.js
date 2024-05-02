import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ChildrenListTable = ({ bildirishnoma }) => {
	const { t } = useTranslation();
	let children_age =[], children_month=[]
	if (bildirishnoma?.bolalar) children_age = Object.entries(bildirishnoma?.bolalar);
	if (bildirishnoma?.bola_oy) children_month = Object.entries(bildirishnoma?.bola_oy);
	return (
		<div className='sarflov_block'>
			<h4 className='sarflov_block_title' style={{ marginBottom: "16px" }}>
				{t("bola.ball1")}
			</h4>
			<TableContainer component={Paper}>
				<Table style={{ minWidth: 100 }} size='small' aria-label='a dense table'>
					<TableHead>
						<TableRow>
							<TableCell>{t("input.toif")}</TableCell>
							<TableCell>{t("bildirishnoma.single.bolalar")}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{bildirishnoma && children_age.length ? (
							children_age.map(([key, value], index) => {
								return (
									<TableRow key={index}>
										<TableCell>{key}</TableCell>
										<TableCell>{value}</TableCell>
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell style={{ textAlign: "center" }} colSpan={12}>
									{t("input.mavjud")}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					<TableHead>
						<TableRow>
							<TableCell>{t("modalariza.toif")}</TableCell>
							<TableCell>{t("bildirishnoma.single.bolalar")}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{children_month?.length ? (
							children_month.map(([key, value], index) => {
								return (
									<TableRow key={index}>
										<TableCell>{key}</TableCell>
										<TableCell>{value}</TableCell>
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell style={{ textAlign: "center" }} colSpan={12}>
									{t("input.mavjud")}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default ChildrenListTable;

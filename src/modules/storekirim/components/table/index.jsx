import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';


const TableComponent = ({ heads, selectedItem }) => {
	const { t } = useTranslation();
	console.log(selectedItem);

	
	return (
		<TableContainer style={{ borderRadius: "12px" }} component={Paper}>
			<Table style={{ minWidth: 650 }} size='small'>
				<TableHead>
					<TableRow>
						{heads.map(el => (
							<TableCell align='center' key={el.id}>
								{el.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{!!selectedItem?.vositalar?.length ? (
						selectedItem?.vositalar.map(el => {
							return (
								<TableRow key={el.id}>
									<TableCell align='center'>{el.vosita_turi.nomi}</TableCell>
									<TableCell align='center'>{el.vosita_nomi.nomi || t("input.mavjud")}</TableCell>
									<TableCell align='center'>
										{(selectedItem?.status === "kirim" ? el.vosita_seryasi : el.vosita_seriyasi) || t("input.mavjud")}
									</TableCell>
									<TableCell align='center'>{el.vosita_miqdori || t("input.mavjud")}</TableCell>
									<TableCell align='center'>
										{(selectedItem?.kirim && selectedItem?.kirim?.partiya_raqam) || t("input.mavjud")}
									</TableCell>
									<TableCell align='center'>
										{selectedItem?.status === "kirim" ? t("bildirishnoma.kirim") : t("bildirishnoma.chiqim")}
									</TableCell>
									<TableCell align='center'>
										{selectedItem?.kirim?.image && selectedItem?.status === "kirim" ? (
											<a href={`https://admin-mpbt.ssv.uz/static${selectedItem?.kirim?.image}`} target='_blank'>
												{t("yuklab olish")}
											</a>
										) : (
											t("input.mavjud")
										)}
									</TableCell>
								</TableRow>
							);
						})
					) : (
						<TableRow>
							<TableCell colSpan={12} align='center'>
								{t("input.mavjud")}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableComponent;

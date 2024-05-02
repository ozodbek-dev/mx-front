import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { request } from "api/request";
import { useTranslation } from "react-i18next";
import Loading from "components/loading/loading";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export default function BasicTableVitamin() {
	const [vosita, setVosita] = React.useState([]);
	const token = localStorage.getItem("token");
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	React.useEffect(() => {
		request
			.get(`/omborxona/vssb/malumotlar`, config)
			.then(function (res) {
				setVosita(res?.data);
			})
			.catch(function (err) {
				console.log(err);
			});
	}, []);
	const { t } = useTranslation();
	if (!vosita?.otgan_oy_qoldiq) return <Loading />;
	return (
		<TableContainer>
			<Table sx={{ minWidth: "33%" }} aria-label='simple table'>
				<TableHead style={{ backgroundColor: "#ffff !important" }}>
					<TableRow style={{ backgroundColor: "#ffff !important" }}>
						<TableCell style={{ width: "120px" }}>{t("vosita.i")}</TableCell>
						<TableCell align='center' style={{ width: "112px" }}>
							{t("bildirishnoma.q1")}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{vosita?.otgan_oy_qoldiq?.data.map((i, k) => (
						<TableRow key={k} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<StyledTableCell component='th' scope='row'>
								{i.vosita_nomi}
							</StyledTableCell>
							<StyledTableCell align='center'>{i.otgan_oy_qoldiq}</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { request } from "../../../api/request";
import { useTranslation } from "react-i18next";
import Loading from "components/loading/loading";

export default function BasicTable() {
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
	if (!vosita?.shu_oy_mavjud?.data) return <Loading />;
	return (
		<div>
			<Table sx={{ minWidth: "33%" }} aria-label='simple table'>
				<TableHead style={{ backgroundColor: "#fff !important" }}>
					<TableRow style={{ backgroundColor: "#fff !important" }}>
						<TableCell style={{ width: "120px" }}>{t("vosita.i")}</TableCell>
						<TableCell align='center' style={{ width: "112px" }}>
							{t("bildirishnoma.q1")}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{vosita?.shu_oy_mavjud?.data.map((i, k) => (
						<TableRow key={k} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell>{i.vosita_nomi}</TableCell>
							<TableCell align='center'>{i.shu_oy_qoldiq}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { request } from "../../../api/request";
import { useTranslation } from "react-i18next";
import Loading from "components/loading/loading";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
			.get(`/omborxona/ttb/malumotlar`, config)
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
		<TableContainer component={Paper}>
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
					{vosita?.shu_oy_mavjud?.data.map((i, k) => (
						<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<StyledTableCell component='th' scope='row'>
								{i.vosita_nomi}
							</StyledTableCell>
							<StyledTableCell align='center'>{i.shu_oy_qoldiq}</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

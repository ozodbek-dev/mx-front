import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button, IconButton, Stack, Tab, Tabs, TextField } from "@mui/material";
import { get } from "lodash";
import moment from "moment";
import {  useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useGet from "hooks/useGet";
import Income from "./components/income";
import Expence from "./components/expence";
import Loading from "components/loading/loading";
import TableComponent from "./components/table";
import useDebounce from "hooks/useDebounce";
import dayjs from "dayjs";

const Storekirim = () => {
	const [value, setValue] = useState(0);
	const [selectedItem, setSelectedItem] = useState({
		status: "kirim",
	});
  const [dateInput, setDateInput] = useState("");
  	const [currentPage, setCurrentPage] = useState(1);
	const date = useDebounce(dateInput, 1000);
	const { data } = useGet({
		url: `/omborxona/lpu/kirim/chiqim/malumotlar?page=${currentPage}${date ? `&date=${date}` : ""}`,
	});
	useEffect(() => {
		setCurrentPage(1);
	}, [value]);
	const clearInput = () => {
		setDateInput("");
	};

	const handleChanges = (event, newValue) => {
		setValue(newValue);
	};

	const expansesExcelHeader = key => {
		const response = [];
		let max = 0;
		for (let i = 0; i < max; i++) {
			response.push(
				{
					label: "Vosita turi",
					key: `vositalar[${i}].vosita_turi.nomi`,
				},
				{
					label: "Vosita nomi",
					key: `vositalar[${i}].vosita_nomi.nomi`,
				},
				{
					label: "Vosita miqdori",
					key: `vositalar[${i}].vosita_miqdori`,
				}
			);
		}
		return response;
	};

	const { t } = useTranslation();
	if (!data?.kirim || !data?.chiqim) return <Loading />;
	return (
		<div className='prihod'>
			<div className='prihod_top'>
				<div className='prihod_top_inner'>
					<Link to='/skladM'>
						<Button startIcon={<ArrowBackIcon />} variant='contained' disableRipple style={{ textTransform: "capitalize" }}>
							{t("bildirishnoma.single.ortga")}
						</Button>
					</Link>
					<h4 className='monitoring_top_inner_title'>{t("input.a1")}</h4>
				</div>
				<div className='excel_bl'>
					<Button variant='contained' size='large' startIcon={<DescriptionIcon />}>
						{value === 0 && data.kirim && (
							<CSVLink
								filename='Kirimlar'
								headers={[
									{ label: "ID", key: "kirim.id" },
									{ label: "Izoh", key: "kirim.comment" },
									{ label: "Kimdan kelgan", key: "kirim.kimdan_kelgan" },
									{
										label: "Qabul qilish statusi",
										key: "kirim.qabul_qilish_status",
									},
									{
										label: "Partiya raqami",
										key: "kirim.partiya_raqam",
									},
									{
										label: "Sanasi",
										key: "kirim.created_at",
									},
									...expansesExcelHeader("kirim"),
								]}
								data={get(data, "kirim.data", []).map(item => ({
									...item,
									kirim: {
										...get(item, "kirim"),
										created_at: moment(get(item, "created_at")).format("YYYY-MM-DD"),
									},
								}))}
								separator=';'
								className='excel_download'
							>
								{t("bola.excel")}
							</CSVLink>
						)}
						{value === 1 && data.chiqim && (
							<CSVLink
								filename='Chiqimlar'
								headers={[
									{ label: "Ism", key: "bolalar.ism" },
									{ label: "Familiya", key: "bolalar.familiya" },
									{ label: "Jshshir", key: "bolalar.JSHSHIR" },
									...expansesExcelHeader("chiqim"),
								]}
								data={data.chiqim.data}
								separator=';'
								className='excel_download'
							>
								{t("bola.excel")}
							</CSVLink>
						)}
					</Button>
				</div>
			</div>
			<div className='prihod_block'>
				<div className='prihod_block_inner'>
					<div className='prihod_block_inner_top'>
						<h4 className='prihod_block_inner_title'>{t("input.sps")}</h4>
						<Stack direction='row' alignItems={"center"} spacing={2} gap={2}>
							<TextField
								// label={t("input.sps")}
								type='date'
								onChange={e => setDateInput(dayjs(e.target.value).format("YYYY-MM-DD"))}
								value={dateInput}
								id='outlined-basic'
								format='DD/MM/YYYY'
								variant='outlined'
							/>
							{dateInput && (
								<IconButton onClick={clearInput}>
									<CloseIcon />
								</IconButton>
							)}
						</Stack>
					</div>
					<div className='prihod_block_inner_middle' style={{ position: "relative" }}>
						<Tabs style={{ backgroundColor: "#fff" }} value={value} onChange={handleChanges}>
							<Tab value={0} label={t("bildirishnoma.kirim")} />
							<Tab value={1} label={t("bildirishnoma.chiqim")} />
						</Tabs>
						<div style={{ overflowY: "auto", height: "600px" }} className='card_blocks'>
							{value === 0 && data?.kirim && (
								<Income
									data={data.kirim}
									setSelectedItem={setSelectedItem}
									meta={data.kirim.meta}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
								/>
							)}
							{value === 1 && data?.chiqim && (
								<Expence
									data={data.chiqim}
									setSelectedItem={setSelectedItem}
									meta={data.chiqim.meta}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
								/>
							)}
						</div>
					</div>
				</div>
				<div className='prihod_block_inner'>
					<div className='kirim_right_inner_top'>
						<h4>{t("bildirishnoma.kir")}</h4>
						<Button
							onClick={() => {
								setSelectedItem({
									status: "kirim",
								});
							}}
							variant='contained'
							startIcon={<CloseIcon />}
						>
							{t("input.yop")}
						</Button>
					</div>
					<div className='kirim_right_inner_bottom'>
						<div className='kirim_right_inner_bottom_bottom'>
							<TableComponent
								heads={[
									{
										id: 1,
										label: t("vosita.vositaturi"),
									},
									{
										id: 2,
										label: t("bildirishnoma.single.nomi"),
									},
									{
										id: 3,
										label: t("input.ser"),
									},
									{
										id: 4,
										label: t("bildirishnoma.single.miqdori"),
									},
									{
										id: 5,
										label: t("vosita.partiys"),
									},
									{
										id: 6,
										label: t("bildirishnoma.status"),
									},
									{
										id: 7,
										label: t("input.rasm"),
									},
								]}
								selectedItem={selectedItem}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Storekirim;

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../../../../api/request";
import pdfDoc from "../../../../../assets/icon/pdf_doc.svg";
import scrip from "../../../../../assets/icon/scripka.svg";
import ChildrenListTable from "./components/ChildrenListTable";
import FromWhomAndToWhom from "./components/FromWhomAndToWhom";
import "./style.scss";
import useGet from "hooks/useGet";

const Addariza = () => {
	const { t } = useTranslation();
	const params = useParams();
	const navigate = useNavigate();
	const { mutate } = usePost();
	const token = window.localStorage.token;
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const [medicinesAndVitamins, setMedicinesAndVitamins] = useState([]);
	const [matn, setMatn] = useState("");
	const [file, setFile] = useState(null);
	const [notifications, setNotification] = useState();

	const fileRef = useRef();

	const deleteFile = () => {
		if (fileRef.current) {
			fileRef.current.value = "";
			setFile(null);
		}
	};

	function addFields() {
		setMedicinesAndVitamins(prev => [
			...prev,
			{
				id: prev.length + 1,
				vosita_turi: "",
				vosita_nomi: "",
				vosita_miqdori: "",
			},
		]);
	}

	function removeMedicinesAndVitamins(index) {
		const previusMedicinesAndVitamins = [...medicinesAndVitamins];
		previusMedicinesAndVitamins.splice(index, 1);
		setMedicinesAndVitamins(previusMedicinesAndVitamins);
	}

	const createMedicinesAndVitamins = ({ arizaID }) => {
		medicinesAndVitamins.forEach(el => {
			const formData = new FormData();
			formData.append("vosita_turi", el.vosita_turi.id);
			formData.append("vosita_nomi", el.vosita_nomi.id);
			formData.append("vosita_miqdori", el.vosita_miqdori);
			formData.append("vosita_seriyasi", "");
			formData.append("ariza", arizaID);
			request.post("/ariza/lpu/vosita/", formData, config);
		});
	};
	const [isLoading, setIsloading] = useState()

	function Send(e) {
		e.preventDefault();
		if (!file) {
			toast.error(t("Fayl kiritish majburiy"));
			return;
		}
		setIsloading(true)

		const formdata = new FormData();
		formdata.append("qoshimcha", matn);
		formdata.append("bildirishnoma", notifications.bildirishnoma);
		formdata.append("fayl", file);
		request
			.post(`/ariza/lpu/`, formdata, config)
			.then(function (res) {

				if (medicinesAndVitamins?.length) {
					createMedicinesAndVitamins({ arizaID: res.data.ariza });
				}
				const statusData = new FormData();
				statusData.append("status", "Javob berilmadi");
				statusData.append("ariza", res.data.ariza);
				request.post("/ariza/lpu/changestatus/", statusData, config);
				toast.success("Ariza yuborildi");
				
				navigate("/arizalpu");
			})
			.catch(function (err) {
				toast.error("Arizani yuborib bo'lmadi.");
			}).finally(()=>setIsloading(false))
	}

	const Status = () => {

		const formmdata = new FormData();
		const formdata = new FormData();
		formmdata.append("qoshimcha", matn);
		formmdata.append("bildirishnoma", notifications.bildirishnoma);
		formmdata.append("fayl", file);
		if (!file) {
			toast.error(t("Fayl kiritish majburiy"));
			return;
		}

		setIsloading(true)

		request
			.post(`/ariza/lpu/`, formmdata, config)
			.then(function (res) {
				toast.success("O'zgarishlar saqlandi.");
				console.log(res.data);
				formdata.append("ariza", res.data.ariza);
				formdata.append("status", "Yuborilmadi");
				formdata.append("file", file);
				request.post("/ariza/lpu/changestatus/", formdata, config);
				if (medicinesAndVitamins?.length) {
					createMedicinesAndVitamins({ arizaID: res.data.ariza });
				}

				if (res.data) {
					navigate(`/saveariza/${res.data.ariza}`);
				}
			})
			.catch(function (err) {
				toast.error("Ariza saqlanmadi.");
			}).finally(()=>setIsloading(false))
	};

	const handleChange = (e, index) => {
		const previusMedicinesAndVitamins = [...medicinesAndVitamins];
		previusMedicinesAndVitamins[index][e.target.name] = e.target.value;
		setMedicinesAndVitamins(previusMedicinesAndVitamins);
	};

	const {
		data: { data: vositalar = [] },
	} = useGet({ url: "/ariza/vositalar/" });

	useEffect(() => {
		const formData = new FormData();
		formData.append("bildirishnoma", params.id);
		mutate({
			url: "/ariza/lpu/bildirishnomatoariza/",
			data: formData,
			onSuccess: res => {
				setNotification(res.data);
			},
		});
	}, []);

	return (
		<div className='sarflov'>
			<div className='sarflov_inner'>
				<Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} variant='contained'>
					{t("bildirishnoma.single.ortga")}
				</Button>
			</div>

			<form onSubmit={Send}>
				<div className='grid grid-cols-2 gap-20'>
					<FromWhomAndToWhom bildirishnoma={notifications} />
					<ChildrenListTable bildirishnoma={notifications} />
				</div>
				<div className='grid grid-cols-2 gap-20'>
					<div>
						<div className='sarflov_block_comment w-full'>
							<h4 className='sarflov_block_title'>{t("sbola.p6")}</h4>
							<div className='sarflov_block_inner_div1'>
								<TextareaAutosize
									aria-label='minimum height'
									minRows={3}
									placeholder='...'
									name='qoshimcha_matn'
									onChange={e => setMatn(e.target.value)}
								/>
							</div>
						</div>
						<div className='sarflov_block_comment w-full'>
							<div className='sarflov_block_comment_inner'>
								<h4 className='sarflov_block_title'>{t("bildirishnoma.new.fail")}*</h4>
								<input
									ref={fileRef}
									onChange={e => setFile(e.target.files[0])}
									type='file'
									id='files'
									className='input_download'
								/>
								<label htmlFor='files' className='all_download'>
									<img className='scrip_file' src={scrip} alt='' />
									{file ? t("Faylni o'zgartirish") : t("Fayl qo'shish") + "*"}
								</label>
							</div>
							<div className=''>
								{file ? (
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: "10px",
											}}
										>
											<img src={pdfDoc} alt='' className='label_img' />
											<span className='file-name'>{file?.name}</span>
										</div>
										<div style={{ cursor: "pointer" }} onClick={deleteFile}>
											<CloseIcon />
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>
					<div
						className='sarflov_block'
						style={{
							height: "max-content",
							minHeight: "310px",
							maxHeight: "640px",
							overflowY: "auto",
						}}
					>
						<h4>{t("input.beril")}</h4>
						{medicinesAndVitamins.map((item, index) => (
							<div key={item.id} className='tools'>
								<h4 className='tools__title'>{index + 1}</h4>
								<div className='tools__fields'>
									<div>
										<FormControl fullWidth>
											<InputLabel id={`demo-simple-select-label${index}`}>{t("vosita.vositaturi")}</InputLabel>
											<Select
												onChange={e => handleChange(e, index)}
												labelId={`demo-simple-select-label${index}`}
												id={`demo-simple-select${index}`}
												name={`vosita_turi`}
												label={t("vosita.vositaturi")}
											>
												{vositalar.map((el, index) => {
													return (
														<MenuItem key={index} value={el}>
															{el.nomi}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
									</div>
									<div>
										<FormControl fullWidth>
											<InputLabel id={`demo-simple-select-label${index}`}>{t("bildirishnoma.single.nomi")}</InputLabel>
											<Select
												onChange={e => handleChange(e, index)}
												labelId={`demo-simple-select-label${index}`}
												id={`demo-simple-select${index}`}
												name='vosita_nomi'
												label={t("bildirishnoma.single.nomi")}
											>
												{get(medicinesAndVitamins[index]["vosita_turi"], "vosita_nomlari", []) &&
													get(medicinesAndVitamins[index]["vosita_turi"], "vosita_nomlari", []).map((el, index) => {
														return (
															<MenuItem key={index} value={el}>
																{el.nomi}
															</MenuItem>
														);
													})}
											</Select>
										</FormControl>
									</div>
									<div>
										<TextField
											onChange={e => handleChange(e, index)}
											style={{
												width: "100%",
											}}
											id='outlined-basic'
											variant='outlined'
											label={t("bildirishnoma.single.miqdori")}
											name='vosita_miqdori'
											type={"number"}
										/>
									</div>
								</div>
								<div className='tools__remove-btn'>
									<CloseIcon onClick={e => removeMedicinesAndVitamins(index)} />
								</div>
							</div>
						))}
						<div className='add_btn'>
							<Button onClick={() => addFields()} startIcon={<AddIcon />}>
								{t("vosita.qosh")}
							</Button>
						</div>
					</div>
				</div>
				<footer className='site-footer'>
					<div style={{ textAlign: "center" }}>
						<Button
							onClick={Status}
							style={{ marginRight: "1rem" }}
							size='large'
							variant='contained'
							color='success'
							disabled={isLoading}
						>
							{t("vosita.saq")}
						</Button>
						<Button type='submit' variant='contained' color='primary' size='large' disabled={isLoading}>
							{t("modalariza.arizayub")}
						</Button>
					</div>
				</footer>
			</form>
		</div>
	);
};

export default Addariza;

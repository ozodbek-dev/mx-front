import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import useGet from "hooks/useGet";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../../../../api/request";

const Notivsb = () => {
	let todayDate = moment().add(1, "days").format().split("T")[0];
	const [age, setAge] = useState("");
	const [pass, setPass] = useState();
	const [person, setPerson] = useState([]);
	const [tar, setTar] = useState();
	const [date, setDate] = useState(todayDate);
	const { type, id } = useParams();
	const [data, setData] = useState({
		whom: [],
		district: {},
		text: "",
		date: "",
		addition: "",
		file: null,
	});

	const File = e => {
		// setNames(true);
		setPass(e.target.files[0]);
	};

	const token = window.localStorage.token;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const [loader, setLoeder] = useState(true);
	useEffect(() => {
		request
			.get(`/hududlar/`, config)
			.then(function (res) {
				setLoeder(false);
			})
			.catch(function (err) {});
	}, [loader]);

	const [input, setInput] = useState([]);
	const [check, setCheck] = useState([]);

	const [ariza, setAriza] = useState({
		isFetched: false,
		data: [],
		error: false,
	});
	useEffect(() => {
		request
			.get(`/user/viloyat/tumanlar/`, config)
			.then(function (res) {
				setAriza({
					isFetched: true,
					data: res.data,
					error: false,
				});
				setLoeder(false);
			})
			.catch(function (err) {
				setAriza({
					isFetched: false,
					data: [],
					error: err,
				});
			});
	}, [loader]);

	const handleClick = () => {};

	const navigate = useNavigate();
	const handleChange = event => {
		setAge(event.target.value);
	};

	const { t } = useTranslation();
	useEffect(() => {
		request.get("/bildirishnoma/viloyatga/", config).then(data => setPerson(data.data.data.find(el => +el.id === +id)));
	}, [id]);
	function Heets(e) {
		if (data.whom.length === 0) toast.warning("Yuboriluvchi Muassasa Tanlanmadi!");

		e.preventDefault();
		const fordata = new FormData();
		fordata.append("fayl", pass);
		for (let [key, value] of Object.entries(input)) {
			fordata.append(key, value);
		}
		fordata.append(
			"kimga",
			data.whom.map(item => item.id)
		);
		fordata.append("yosh_toifa", person.yosh_toifa);
		fordata.append("oy_toifa", person.oy_toifa);
		fordata.append("qoshimcha", tar);
		fordata.append("muddati", !date ? person.muddati : date);
		request
			.post(`/bildirishnoma/viloyat/`, fordata, config)
			.then(function (res) {
				toast.success("Yuborildi!");
				navigate("/notification");
				setLoeder(false);
				handleClick(true);
			})
			.catch(function (err) {
				if (err?.response?.data?.message) {
					return toast.error(err.response.data.error);
				}
				toast.error("Yuborilmadi!");
			});
		setLoeder(true);
	}

	if (todayDate > date) {
		toast.error("Belgilangan Muddatdan Ortga Surib Bo'lmaydi!");
		setDate(todayDate);
	}

	const {
		data: { muassasalar: points = [] },
	} = useGet({
		url: `/user/viloyat/muassasalar/`,
	});

	const {
		data: { muassasalar: districts = [] },
	} = useGet({
		url: `/user/viloyat/tumanlar/`,
	});

	const fileRef = useRef();

	return (
		<div className='rol_ariza'>
			<div className='rol_ariza_top'>
				<Button onClick={() => window.history.back()} variant='contained'>
					{t("bildirishnoma.new.ortga")}
				</Button>
				<h3 className='rol_ariza_top_title'>{t("bildirishnoma.new.yaratish")}</h3>
			</div>
			<div className='rol_ariza_bottom'>
				<div className='rol_ariza_bottom_top'>
					<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.new.kimdankimga")}</h4>
					<div className='rol_ariza_bottom_bigbox'>
						<div className='rol_ariza_bottom_block'>
							<p className='rol_ariza_bottom_block_desc'>{t("bildirishnoma.new.kimdan")}</p>
							<Box
								component='form'
								sx={{
									"& > :not(style)": { m: 1, width: "25ch" },
								}}
								noValidate
								autoComplete='off'
							>
								<TextField id='outlined-basic' label='VSSB' disabled variant='outlined' />
							</Box>
						</div>
						<div className='rol_ariza_bottom_block'></div>
						{type == "tuman" ? (
							<div className='rol_ariza_bottom_block'>
								<p className='rol_ariza_bottom_block_desc'>{t("bildirishnoma.new.kimga")}</p>
								<Autocomplete
									multiple
									options={districts}
									onChange={(_, value) => setData({ ...data, whom: value })}
									getOptionLabel={option => option.nomi || ""}
									renderInput={params => <TextField {...params} label={t("pdf.rmo")} placeholder={t("bola.add")} />}
								/>
							</div>
						) : (
							<div className='rol_ariza_bottom_block'>
								<p className='rol_ariza_bottom_block_desc'>{t("bildirishnoma.new.kimga")}</p>
								<Autocomplete
									multiple
									options={points}
									onChange={(_, value) => setData({ ...data, whom: value })}
									getOptionLabel={option => option.nomi || ""}
									renderInput={params => <TextField {...params} label={t("pdf.oshp")} placeholder={t("bola.add")} />}
								/>
							</div>
						)}
					</div>
				</div>
				<div className='rol_ariza_flex'>
					<div className='rol_ariza_bottom_div'>
						<div className='rol_ariza_bottom_div_inner'>
							<div className='rol_ariza_bottom_div_inner_block'>
								<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.new.boshqa")}</h4>
								<div className='rol_ariza_bottom_div_t7'>
									<div className='rol_ariza_bottom_div_inner_block_select'>
										<p className='rol_ariza_bottom_block_desc'>{t("bildirishnoma.new.turi")}</p>
										<Box sx={{ minWidth: 120 }}>
											<FormControl fullWidth>
												<InputLabel id='demo-simple-select-label' disabled>
													{t("vosita.bola")}
												</InputLabel>
												<Select
													labelId='demo-simple-select-label'
													id='demo-simple-select'
													value={age}
													label='Age'
													onChange={handleChange}
													defaultValue="Bolalar va ehtiyojlar bo’ yicha so'rov"
													disabled
												>
													<MenuItem MenuItem value={10}>
														{" "}
														Bolalar va ehtiyojlar bo’ yicha so'rov
													</MenuItem>
												</Select>
											</FormControl>
										</Box>
									</div>
									<div className='rol_ariza_bottom_div_inner_block_select'>
										<p className='rol_ariza_bottom_block_desc'>{t("bildirishnoma.new.vazifasi")}</p>
										<TextField
											type='date'
											id='outlined-basic'
											variant='outlined'
											value={date}
											onChange={e => setDate(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='rol_ariza_bottom_div_inner'>
							<div className='rol_ariza_bottom_div_inner_block'>
								<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.new.inf")}</h4>
								<div className='rol_ariza_textarea'>
									<TextareaAutosize
										aria-label='empty textarea'
										onChange={e => setTar(e.target.value)}
										placeholder={t("bildirishnoma.new.infP")}
									/>
								</div>
							</div>
						</div>
						<Button variant='contained' onClick={e => Heets(e)}>
							{t("input.otp")}
						</Button>
					</div>
					<div className='rol_ariza_bottom_div'>
						<div className='t9'>
							<div className='rol_ariza_bottom_div_inner'>
								<h4 className='rol_ariza_bottom_title'>{t("input.toif")}</h4>
								<ul className='site-list'>
									{person.yosh_toifa &&
										JSON.parse(person.yosh_toifa).map(el => {
											return (
												<li className='site-list__items'>
													{t("input.yosh1")}: {el} {t("bola.yosh")}
												</li>
											);
										})}
								</ul>
							</div>
							<div className='rol_ariza_bottom_div_inner'>
								<h4 className='rol_ariza_bottom_title'>{t("modalariza.toif")}</h4>
								<ul className='silte-list'>
									{person.oy_toifa &&
										JSON.parse(person.oy_toifa).map(el => {
											return (
												<li className='site-list__items'>
													{t("input.oy1")}: {el} {t("vosita.oy")}
												</li>
											);
										})}
								</ul>
							</div>
						</div>
						<div className='rol_ariza_bottom_div_inner'>
							<div className='sarflov_top_blocks'>
								<h4 className='sarflov_block_title'>{t("bildirishnoma.new.fail")}</h4>

								{pass ? (
									<Button
										className='delets_icons_file'
										startIcon={<DeleteForeverIcon />}
										onClick={() => {
											setPass(null);
											fileRef.current.value = null;
										}}
										variant='contained'
										type='button'
									>
										{t("bildirishnoma.new.del")}
									</Button>
								) : (
									""
								)}
							</div>
							<input onChange={e => File(e)} type='file' ref={fileRef} id='files' className='file_add_input' />
							<label className='download_label' htmlFor='files'>
								<div className='files_block_title'>
									<p className='files_add_title'>{pass ? t("bildirishnoma.new.failinf1") : t("bildirishnoma.new.failinf")}</p>
								</div>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default Notivsb;

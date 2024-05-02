import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import "../../container/GERMINTOZ/ROL/bildirishnoma/singletable/singletable.scss";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import useGet from "hooks/useGet.js";
function Singlelpu() {
	const [person, setPerson] = useState({
		isFetched: false,
		data: [],
		error: null,
	});
	const { t } = useTranslation();
	const params = useParams();

	const { data, isLoading: freeNoticeLoading } = useGet({
		url: `/bildirishnoma/muassasa/erkin/?filter[id]=${params.id}`,
	});

	useEffect(() => {
		if(data?.data?.[0])
			setPerson(data?.data[0]);
	},[data])
	const navigate = useNavigate();
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, []);

	return (
		<>
			<div className='rol_ariza'>
				<div className='rol_ariza_top'>
					<Button
						onClick={() => navigate(-1)}
						style={{
							borderRadius: "12px",
							backgroundColor: "#DDEBFB",
							padding: "8px",
						}}
						variant='text'
					>
						{t("bildirishnoma.single.ortga")}
					</Button>
				</div>

				<div className='rol_ariza_bottom'>
					<div style={{ display: "flex", alignItems: "center" }}>
						<div className='rol_ariza_bottom_div'>
							<div className='rol_ariza_bottom_div_inner'>
								<div className='rol_ariza_bottom_div_inner_block'>
									<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.turi")}</h4>
									<div className='div-1'>{t("vosita.erkin")}</div>
								</div>
							</div>
						</div>

						<div style={{ marginLeft: "20px" }} className='rol_ariza_bottom_div'>
							<div className='rol_ariza_bottom_div_inner'>
								<div className='rol_ariza_bottom_div_inner_block'>
									<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.new.vazifasi")}</h4>
									<div className='div-1--1'>{(person && person.muddati) || t("Kiritilmagan")}</div>
								</div>
							</div>
						</div>
					</div>
					<div className='rol_ariza_bottom_top'>
						<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.iddata")}</h4>
						<div className='rol_ariza_bottom_bigbox rol_ariza_bottom_bigbox_info_1'>
							<div className='rol_ariza_bottom_block1'>
								<p className='info_single'>{t("bildirishnoma.single.id")}</p>
								<p className='info_single'>{person && person.id}</p>
							</div>
							<div className='rol_ariza_bottom_block1'>
								<p className='info_single'>{t("bildirishnoma.single.data")}</p>
								<p className='info_single'>{person && person.sana}</p>
							</div>
						</div>
					</div>
					<div className='rol_ariza_flex'>
						<div className='rol_ariza_bottom_div'>
							<div className='rol_ariza_bottom_div_inner'>
								<div className='rol_ariza_bottom_div_inner_block'>
									<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.kimdan")}</h4>
									<div className='rol_ariza_bottom_div_t6'>
										<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
											<p>{t("bildirishnoma.single.kimdan")}</p>
										</div>
										<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
											<p>{person && person.kimdan}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='rol_ariza_bottom_div'>
							<div className='rol_ariza_bottom_div_inner'>
								<div className='rol_ariza_bottom_div_inner_block'>
									<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.kimga")}</h4>
									<div className='rol_ariza_bottom_div_t6'>
										<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
											<p>{t("bildirishnoma.single.kimga")}</p>
										</div>
										<div className='rol_ariza_bottom_div_inner_block_select_inner1'>
											<p>{person && person.kimga}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='single_table_document'>
					<div className='t9'>
						<div className='rol_ariza_bottom_div_inner'>
							<div className='rol_ariza_bottom_div_inner_block'>
								<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.qoshimcha")}</h4>
								<div className='document_left_title_block'>
									<p>{person?.qoshimcha !== "undefined" && person?.qoshimcha?.trim() ? person.qoshimcha : t("input.mavjud")}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='t9'>
						<div className='rol_ariza_bottom_div_inner'>
							<div className='rol_ariza_bottom_div_inner_block'>
								<h4 className='rol_ariza_bottom_title'>{t("bildirishnoma.single.fayl")}</h4>
								<div className='rol_ariza_bottom_div_t6'>
									{person?.fayl ? (
										<a
											href={`https://admin-mpbt.ssv.uz/static/${person?.fayl.fayl}`}
											className='download_document_t9'
											target='_blank'
											download
										>
											<Button variant='contained' startIcon={<CloudDownloadIcon />}>
												{t("input.yuklab")}
											</Button>
										</a>
									) : (
										t("Fayl mavjud emas")
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Singlelpu;

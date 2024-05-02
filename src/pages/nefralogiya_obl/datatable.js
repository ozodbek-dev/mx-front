import { useEffect, useState } from "react";
import "./datatable.scss";
import BasicTable from "./jonatilganArizaTable";
import { request } from "../../api/request";
import BasicTabs from "./omborxona/omborxonaTab";
import { useTranslation } from "react-i18next";
import BasicTabsBildirishnoma from "./bildirishnoma/muiTab";
import Loading from "components/loading/loading";

const DataTableobl = () => {
	const { t } = useTranslation();
	const token = localStorage.getItem("token");
	const [vosita, setVosita] = useState([]);

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const formData = new FormData();
	formData.append("token", token);
	useEffect(() => {
		request
			.get(`/omborxona/vssb/malumotlar`, config)
			.then(function (res) {
				setVosita(res?.data);
			})
			.catch(function (err) {
				console.log(err);
			});
	}, []);

	if (!vosita?.hozirgi_oy_kirim) return <Loading />;

	return (
		<div>
			<div className='main-page !p-0'>
				<div className='box'>
					<h1>{t("input.qabul")}</h1>
					<div className='box-item'>
						<BasicTable />
					</div>
				</div>
				<div className='box'>
					<div className='dori_vitamin'>
						<div className='dorilar'>
							<h1>{t("Omborxona")}</h1>
							<div className='header_kirim_chiqim'>
								<div className='span'>{t("bildirishnoma.kirim")}</div>
								<div className='span'>{t("bildirishnoma.chiqim")}</div>
							</div>
							<div className='button_kir'>
								<div className='kirim'>
									{vosita?.hozirgi_oy_kirim?.data?.map(el => el.kirim).reduce((acc, cur) => acc + cur, 0)}
								</div>
								<div className='chiqim'>
									{vosita?.hozirgi_oy_chiqim?.data?.map(el => el.chiqim).reduce((acc, cur) => acc + cur, 0)}
								</div>
							</div>
						</div>
					</div>
					<div className='omborxona'>
						<BasicTabs />
					</div>
				</div>
				<div className='box'>
					<h1>{t("qabxar")}</h1>
					<div className='box-item'>
						<BasicTabsBildirishnoma />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataTableobl;

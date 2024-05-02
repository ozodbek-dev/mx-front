import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {request} from "../../api/request";
import BasicTabsBildirishnoma from "./bildirishnoma/muiTab";
import "./doctor.scss";
import BasicTable from "./jonatilganArizaTable";
import BasicTabs from "./omborxona/omborxonaTab";
import Loading from "components/loading/loading";

export default function Doctor() {
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
      .get(`/omborxona/ttb/malumotlar`, config)
      .then(function (res) {
        console.log(res.data, "setvosita");
        setVosita(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { t } = useTranslation();
  if (!vosita?.hozirgi_oy_chiqim) return <Loading/>
		return (
			<>
				<div className='main-page main-page-ttb'>
					<div className='box'>
						<h1 className='font-700 font-nunito'>{t("bildirishnoma.jariz")}</h1>
						<div className='box-item'>
							<BasicTable />
						</div>
					</div>
					<div className='box'>
						<div className='dori_vitamin'>
							<div className='dorilar'>
								<h1 className='font-700 font-nunito'>{t("Shu oyning vositalari")}</h1>
								<div className='header_kirim_chiqim'>
									<div className='span !font-700'>{t("bildirishnoma.kirim")}</div>
									<div className='span !font-700'>{t("bildirishnoma.chiqim")}</div>
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

						<div className='box-item'>
							<BasicTabs />
						</div>
					</div>
					<div className='box'>
						<h1 className='font-700 font-nunito'>{t("bildirishnoma.bil")}</h1>
						<div className='box-item'>
							<BasicTabsBildirishnoma />
						</div>
					</div>
				</div>
			</>
		);
}

import { Button, Pagination, Stack } from "@mui/material";
import { get } from "lodash";
import React from "react";
import l1 from "../../../../assets/icon/l1.svg";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { classes } from "modules/storekirim/classes";
import { useTranslation } from "react-i18next";
const Expence = ({ data, setSelectedItem, meta, currentPage, setCurrentPage }) => {
	const { t } = useTranslation();
	return (
		<>
			{data.data.map((el, index) => {
				return (
					<div className='kirim_card chiqim_card' key={index}>
						<div className='kirim_card_left chiqim_card_left'>
							<Button size='large' startIcon={<CallMadeIcon />}></Button>
							<p>
								{t("shifokor.jami")}: {el?.vositalar.map(el => el.vosita_miqdori).reduce((acc, cur) => acc + cur, 0)}
							</p>
						</div>
						<div className='chiqim_card_center'>
							<div className='kirim_card_center_top'>
								<div className='top_left' style={{ width: "100%", display: "flex" }}>
									<p>{t("bildirishnoma.send")}:</p>
									<h5 style={{ fontSize: "16px", width: "100%" }}>
										{el.bolalar.ism} {el.bolalar.familya} {el.bolalar.otasining_ismi}
									</h5>
								</div>
								<div className='top_right'>
									<div className='kirim_card_right_left'>
										<div className='kirim_card_right_left'>
											<p> {get(el, "vositalar[0].created_at", "")?.split(" ")[0]}</p>
											<span>{get(el, "vositalar[0].created_at", "")?.split(" ")[1]}</span>
										</div>
									</div>
									<div className='kirim_card_right_left'>
										<Button>
											<img onClick={() => setSelectedItem(prev => ({ ...prev, ...el, status: "chiqim" }))} src={l1} alt='' />
										</Button>
									</div>
								</div>
							</div>
							{el?.vositalar?.length ? (
								el.vositalar.map((el, idx) => (
									<div key={idx} className='bottom' style={{ width: "100%!important" }}>
										<div>
											<span>
												{t("vosita.vositaturi")}:{" "}
												<span style={{ marginRight: "4px" }}>{el?.vosita_turi?.nomi || t("Kiritilmagan")} </span>
											</span>
										</div>
										<div>
											<span>
												{t("bildirishnoma.single.nomi")}:{" "}
												<span style={{ marginRight: "4px" }}>{el.vosita_nomi.nomi || t("Kiritilmagan")}</span>
											</span>
										</div>
									</div>
								))
							) : (
								<h4>{`${t("bildirishnoma.single.vosi")} ${t("input.mavjud")}`.toLocaleLowerCase()}</h4>
							)}
						</div>

						{get(meta, "total_pages") > 1 && (
							<Stack
								spacing={2}
								mt={4}
								justifyContent={"flex-end"}
								alignItems={"flex-end"}
								style={{
									position: "absolute",
									right: "0",
									bottom: 0,
									width: "100%",
									paddingTop: "1rem",
									background: "#fff",
								}}
							>
								{" "}
								<Pagination
									onChange={(e, value) => setCurrentPage(value)}
									count={get(meta, "total_pages")}
									color='primary'
									page={currentPage}
								/>
							</Stack>
						)}
					</div>
				);
			})}
		</>
	);
};

export default Expence;

import React from "react";
import kirim from "../../../../assets/icon/kirim2.svg";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { Button, Pagination, Stack } from "@mui/material";
import l1 from "../../../../assets/icon/l1.svg";
const Income = ({ data, setSelectedItem,currentPage, setCurrentPage,meta }) => {
  const { t } = useTranslation();
	return (
		<div>
			{data.data.map((el, index) => {
				return (
					!!el.vositalar.length && (
						<div className='kirim_card chiqim_card' key={index}>
							<div className='kirim_card_left chiqim_card_left '>
								<img src={kirim} alt='' />
								<p>
									{t("shifokor.jami")}: {el.vositalar.map(el => el.vosita_miqdori).reduce((acc, cur) => acc + cur, 0)}
								</p>
							</div>
							<div className='chiqim_card_center'>
								<div className='kirim_card_center_top'>
									<div className='top_left'>
										<p>{t("bildirishnoma.single.kimdan")}:</p>
										<h5>{el.kirim.kimdan_kelgan}</h5>
									</div>
									<div className='top_right'>
										<div className='kirim_card_right_left'>
											<p> {get(el, "kirim.created_at").split(" ")[0]}</p>
											<span>{get(el, "kirim.created_at").split(" ")[1]}</span>
										</div>
										<div className='kirim_card_right_left'>
											<Button onClick={() => setSelectedItem(prev => ({ ...prev, ...el, status: "kirim" }))}>
												<img src={l1} alt='' />
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
									<h4>{`${t("bildirishnoma.single.vosi")} ${t("input.mavjud")}`}</h4>
								)}
							</div>
						</div>
					)
				);
			})}
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
};

export default Income;

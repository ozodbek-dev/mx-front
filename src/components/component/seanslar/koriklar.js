import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./style.scss";
import useGet from "hooks/useGet";
import { useParams } from "react-router-dom";
import KoriklarCard from "./components/KoriklarCard";
import { get } from "lodash";
import { useState } from "react";
import usePost from "hooks/usePost";
import { toast } from "react-toastify";

const Koriklar = ({ open, handleClose, ...props }) => {
  const idx = localStorage.getItem("id");
  const { t } = useTranslation();
  const { id } = useParams();
  const [hasMore, setHasMore] = useState({ modal: false, data: {} });
  const initialState = {
		create: false,
		data: {
			bola_malumoti: id ? id : props.id,
			bola_shifokori: "",
			ota_ona_shikoyati: "",
			korik_tarif: "",
			vositalar: [],
		},
	};
  const [modal, setModal] = useState(initialState);
  const {
    data: { koriklar_hammasi = [] },
    refetch,
    isLoading: getDataLoading,
  } = useGet({
    url: `/korik/bola/malumotlari/${id ? id : props.id}`,
    enabled: open && (id || props.id),
  });
  const handleMoreInfo = data => {
		setHasMore({ modal: true, data });
	};
  function addFields() {
		const initialItem = {
			id: modal.data.vositalar.length + 1,
			vosita_turi: "",
			vosita_nomi: "",
			vosita_miqdori: "",
		};
		setModal({
			...modal,
			data: {
				...modal.data,
				vositalar: [...modal.data.vositalar, initialItem],
			},
		});
	}

  function removeMedicinesAndVitamins(index) {
		if (modal.data.vositalar.length > 1) {
			const previusMedicinesAndVitamins = [...modal.data.vositalar];
			previusMedicinesAndVitamins.splice(index, 1);
			setModal({
				...modal,
				data: { ...modal.data, vositalar: previusMedicinesAndVitamins },
			});
		} else {
			setModal({
				...modal,
				data: { ...modal.data, vositalar: [] },
			});
		}
	}
	const handleChange = (e, index) => {
		if (typeof index === "number") {
			const previusMedicinesAndVitamins = [...modal.data.vositalar];
			previusMedicinesAndVitamins[index][e.target.name] = e.target.value;
			setModal({
				...modal,
				data: { ...modal.data, vositalar: previusMedicinesAndVitamins },
			});
		} else {
			setModal({
				...modal,
				data: { ...modal.data, [e.target.name]: e.target.value },
			});
		}
	};

	const {
		data: { data: vositalar = [] },
	} = useGet({ url: "/ariza/vositalar/" });
	const {
		data: { data: doctors = [] },
	} = useGet({ url: "/muassasa/shifokor/", enabled: idx });
	const { mutate, isLoading } = usePost();

	const createExamination = () => {
		if (!modal.data?.bola_shifokori) {
			toast.error(t("Shifokor kiritish majburiy"));
			return;
		}

		if (Object.entries(modal?.data?.vositalar).some(([_, value]) => value)) {
			return mutate({
				url: "/korik/yaratish/",
				data: {
					...modal.data,
					vositalar: modal.data.vositalar.map(item => ({
						...item,
						vosita_nomi: item.vosita_nomi.id,
						vosita_turi: item.vosita_turi.id,
					})),
				},
				onSuccess: () => {
					toast.success("Ko'rik yaratildi");
					setModal(initialState);
					refetch();
				},
				onError: error => {
					console.log(error);
					toast.error("Ko'rik yaratib bo'lmadi");
				},
			});
		}
		mutate({
			url: "/korik/yaratish/",
			data: {
				...modal.data,
				vositalar: [],
			},
			onSuccess: () => {
				toast.success("Ko'rik yaratildi");
				setModal(initialState);
				refetch();
			},
			onError: error => {
				console.log(error);
				toast.error("Ko'rik yaratib bo'lmadi");
			},
		});
	};
  return (
    <>
      <Modal
        className="modal"
        open={hasMore.modal}
        onClose={() => setHasMore({ data: {}, modal: false })}
        closeAfterTransition
      >
        <Fade in={hasMore.modal}>
          <div className="modal__body">
            <button
              className="modal__close-icon"
              onClick={() => setHasMore({ data: {}, modal: false })}
            >
              <CloseIcon />
            </button>
            <div className="modal__header">
              <h4 className="modal__title">
                {t("Ko'riklar haqida ma'lumot")}{" "}
              </h4>
            </div>
            <div className="examinations">
              <div className="examinations__item">
                <div className="examinations__item--header">
                  {/* <span className="examinations__item--number">
                    #{index < 10 ? "0" + index : index} {t("ko'rik")}
                  </span> */}
                </div>
                <div className="examinations__item--table">
                  <div className="bordered">{t("Shifokor")}</div>
                  <div className="bordered">
                    {get(hasMore, "data.korik.bola_shifokori.ismi")}{" "}
                    {get(hasMore, "data.korik.bola_shifokori.familiyasi")}{" "}
                    {get(hasMore, "data.korik.bola_shifokori.otasini_ismi")}
                  </div>
                  <div className="bordered">{t("Ko’rikdan o’tilgan sana")}</div>
                  <div className="bordered">
                    {get(hasMore, "data.korik.created_at")}
                  </div>
                  <div className="bordered">{t("Ko’rik tarifi")}</div>
                  <div className="bordered">
                    {get(hasMore, "data.korik.korik_tarif")}
                  </div>
                  <div className="bordered">{t("Ota ona shikoyati")}</div>
                  <div className="bordered">
                    {get(hasMore, "data.korik.ota_ona_shikoyati")}
                  </div>
                </div>
              </div>
            </div>
            <h4 className="modal__title">
              {t("Berilgan dori va vitaminlar")}{" "}
            </h4>
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("Soni")}</TableCell>
                      <TableCell>{t("Vosita turi")}</TableCell>
                      <TableCell>{t("Vosita nomi")}</TableCell>
                      <TableCell>{t("Vosita seriyasi")}</TableCell>
                      <TableCell>{t("Vosita miqdori")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {get(hasMore, "data.vositalar", []).map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{row.vosita_turi.nomi}</TableCell>
                        <TableCell>{row.vosita_nomi.nomi}</TableCell>
                        <TableCell>{row.vosita_seriyasi}</TableCell>
                        <TableCell>{row.vosita_miqdori}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {get(hasMore, "data.vositalar", []).length === 0 ? (
                <div className="no-data">{t("Ma'lumot mavjud emas")}</div>
              ) : null}
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        className="modal"
        open={open && !hasMore.modal && !modal.create}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open && !hasMore.modal && !modal.create}>
          <div className="modal__body">
            <button className="modal__close-icon" onClick={handleClose}>
              <CloseIcon />
            </button>
            <div className="modal__header">
              <h4 className="modal__title">{t("input.bk")} </h4>
              {idx && (
                <Button
                  onClick={() => setModal({ ...modal, create: true })}
                  startIcon={<AddIcon />}
                  variant="contained"
                >
                  {t("input.b2")}
                </Button>
              )}
            </div>
            <div className="examinations">
              {koriklar_hammasi?.length ? (
                koriklar_hammasi.map((item, index) => (
                  <KoriklarCard
                    handleClick={() => handleMoreInfo(item)}
                    key={get(item, "korik.id")}
                    index={index + 1}
                    {...item}
                  />
                ))
              ) : getDataLoading ? (
                <div>{t("Yuklanmoqda")}...</div>
              ) : (
                <div className="no-data">{t("Ma'lumot mavjud emas")}</div>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        className="modal"
        open={modal.create}
        onClose={() => setModal({ ...modal, create: false })}
        closeAfterTransition
      >
        <Fade in={modal.create}>
          <div className="modal__body">
            <button
              className="modal__close-icon"
              onClick={() => setModal({ ...modal, create: false })}
            >
              <CloseIcon />
            </button>
            <div className="modal__header">
              <h4 className="modal__title" style={{ marginBottom: "10px" }}>
                {t("Ko'rik qo'shish")}
              </h4>
            </div>
            <div>
              <h4 className="modal__title" style={{ marginBottom: "10px" }}>
                {t("Ko'rik haqida ma'lumot")}{" "}
              </h4>
              <div className="form__fields">
                <FormControl fullWidth required>
                  <InputLabel>{t("Shifokor")}</InputLabel>
                  <Select
                    onChange={handleChange}
                    required
                    name={`bola_shifokori`}
                    label={t("Shifokor")}
                  >
                    {doctors.map((el, index) => {
                      return (
                        <MenuItem key={index} value={el.id}>
                          {el.ism} {el.familiya} {el.otasining_ismi}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextareaAutosize
                  name="ota_ona_shikoyati"
                  placeholder={t("Ota ona yoki bemorning shikoyati") + "*"}
                  className="textarea"
                  onChange={handleChange}
                />
                <TextareaAutosize
                  placeholder={t("Ko'rik tarifi") + "*"}
                  className="textarea"
                  name="korik_tarif"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h4 className="modal__title" style={{ marginBottom: "10px" }}>
                {t("Berilgan dori va vitaminlar")}
              </h4>
              {modal.data.vositalar.map((item, index) => {
                const vositaNomlari = get(
                  modal.data.vositalar[index]["vosita_turi"],
                  "vosita_nomlari",
                  []
                );
                return (
									<div key={item.id} className='tools'>
										<h4 className='tools__title'>{index + 1}</h4>
										<div className='grid grid-cols-4 gap-10'>
											<div>
												{/* <h5 className="sarflov_block_inner_div_title">{t("vosita.vositaturi")}</h5> */}
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
														disabled={!vositaNomlari.length}
														onChange={e => handleChange(e, index)}
														labelId={`demo-simple-select-label${index}`}
														id={`demo-simple-select${index}`}
														name='vosita_nomi'
														label={t("bildirishnoma.single.nomi")}
													>
														{vositaNomlari &&
															vositaNomlari.map((el, index) => {
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
													onChange={e => {
														const value = e.target.value;
														const regex = /^[0-9]+$/g;
														if (!regex.test(value)) {
															e.target.value = value.substring(0, value.length - 1);
														}
														handleChange(e, index);
													}}
													style={{
														width: "100%",
													}}
													id='outlined-basic'
													variant='outlined'
													label={t("bildirishnoma.single.miqdori")}
													name='vosita_miqdori'
													type={"text"}
												/>
											</div>
											<div>
												<TextField
													onChange={e => handleChange(e, index)}
													style={{
														width: "100%",
													}}
													id='outlined-basic'
													variant='outlined'
													label={t("bildirishnoma.single.seriyasi")}
													name='vosita_seriyasi'
													type={"text"}
												/>
											</div>
										</div>
										<div className='tools__remove-btn'>
											<CloseIcon onClick={e => removeMedicinesAndVitamins(index)} />
										</div>
									</div>
								);
              })}
            </div>
            <div className="add_btn" style={{ marginBottom: "20px" }}>
              <Button onClick={() => addFields()} startIcon={<AddIcon />}>
                {t("vosita.qosh")}
              </Button>
            </div>
            <Button
              disabled={isLoading}
              variant="contained"
              color="info"
              className="w-full"
              type="submit"
              onClick={createExamination}
            >
              {isLoading ? t("Ko'rik yaratilmoqda...") : t("Ko'rik yaratish")}
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Koriklar;

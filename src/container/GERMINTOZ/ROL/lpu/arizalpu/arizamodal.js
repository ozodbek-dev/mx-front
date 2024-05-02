import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Box,
    Button,
    Modal,
    Paper,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {request} from "../../../../../api/request";
import l1 from "../../../../../assets/icon/l1.svg";

const Arizamodal = () => {
  const [open, setOpen] = useState(false);
  const [bola, setBola] = useState([]);
  const { t } = useTranslation();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vmax",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const token = window.localStorage.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    request
      .get("/bildirishnoma/muassasa/", config)
      .then((data) => setBola(data.data.data));
  }, []);
  return (
		<>
			<Button onClick={() => setOpen(true)} variant='contained' startIcon={<AddIcon />}>
				{t("input.ar")}
			</Button>

			<Modal
				keepMounted
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='keep-mounted-modal-title'
				aria-describedby='keep-mounted-modal-description'
			>
				<Box className='modal-one' sx={{ ...style }}>
					<Button
						style={{
							marginBottom: "14px",
							marginLeft: "-25px",
						}}
						variant='text'
						onClick={() => setOpen(false)}
					>
						<SvgIcon component={ArrowBackIcon} inheritViewBox />
					</Button>
					<h2>{t("bildirishnoma.bil")}</h2>
					<TableContainer component={Paper} style={{ overflowY: "scroll", height: "500px" }}>
						<Table aria-label='customized table'>
							<TableHead>
								<TableRow>
									<TableCell>{t("bildirishnoma.single.soni")}</TableCell>
									<TableCell>ID</TableCell>
									<TableCell>{t("bildirishnoma.send")}</TableCell>
									<TableCell>{t("bildirishnoma.sana")}</TableCell>
									<TableCell>{t("bildirishnoma.oz")}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{bola.map((el, index) => {
									return (
										<>
											<TableRow>
												<TableCell>{index + 1}</TableCell>
												<TableCell>{el.id}</TableCell>
												<TableCell>{el.kimga}</TableCell>
												<TableCell>{el.sana}</TableCell>
												<TableCell>
													<Link to={`/addariza/${el.id}`} className='single_info'>
														<img style={{ width: "40px" }} id={el.id} className='delete_icon' src={l1} alt='batafsil' />
													</Link>
												</TableCell>
											</TableRow>
										</>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Modal>
		</>
	);
};
export default Arizamodal;

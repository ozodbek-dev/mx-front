import { Box, TextField, SvgIcon, Modal, Button, Stack, IconButton } from "@mui/material";
import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const ParentsModal = ({ parentsModal, setParentsModal, onSubmit, fields, isLoading, reset, title, formName }) => {
  const { t } = useTranslation();
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 500,
		borderRadius: 2,
		bgcolor: "#fff",
		boxShadow: 24,
		p: 3,
	};
	const closeModal = () => {
		setParentsModal(prev => ({ ...prev, open: false }));
	};
	return (
		<>
			<Modal
				style={{
					zIndex: "1400",
				}}
        keepMounted
				open={parentsModal.open && formName===parentsModal.type}
				onClose={closeModal}
			>
				<Box sx={style}>
					<IconButton variant='text' color='primary' style={{marginBottom: "1rem" }} onClick={closeModal}>
						<SvgIcon component={ArrowBackIcon} inheritViewBox />
          </IconButton>
          <h1>{title}</h1>
					<form>
						<Stack gap={2} direction={"column"}>
							{fields.map(field => (
								<TextField
									key={field.name}
									className='w-full'
									variant='outlined'
									value={field.value}
									onChange={field.onChange}
									label={field.label}
									name={field.name}
									type={field.type}
									required={field?.required || false}
									disabled={field?.disabled || false}
								/>
							))}
						</Stack>
						<Button
							disabled={ isLoading || fields.some(field => !field.value)}
							style={{
								width: "100%",
								marginTop: "10px",
							}}
              type={"button"}
              onClick={closeModal}
							variant='contained'
						>
							{isLoading ? `${t("input.iz")}...` : t("shifokor.tasdiq")}
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default ParentsModal;

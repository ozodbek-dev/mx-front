import { Backdrop, Fade, Modal, Box, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import l1 from "assets/icon/l1.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Listofnamedetail({ data = "" }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <img src={l1} alt="detail" />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Button
              className="list-tools__btn-close"
              onClick={() => setOpen(false)}
              startIcon={<CloseIcon />}
            />
            <p className="">{data ? data : t("input.mavjud")}</p>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
export default Listofnamedetail;

import {
  Backdrop,
  Fade,
  Modal,
  Box,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import usePost from "hooks/usePost";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
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
function Listoftoolsmodal({ baseUrl = "", refetch, name, id = null }) {
  const [open, setOpen] = useState(false);
  const [field, setField] = useState(null);
  const [area, setArea] = useState({
    description: "",
  });
  const { t } = useTranslation();
  const { mutate, isLoading } = usePost();
  const handleChange = (e) => {
    setArea((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const createType = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!name) {
      for (let [key, value] of Object.entries(area)) {
        formData.append(key, value);
      }
      formData.append("vosita_turi_id", id);
      mutate({
        url: baseUrl,
        data: formData,
        onSuccess: () => {
          toast.success("Vosita Nomi yaratildi!");
          refetch();
          setOpen(false);
        },
        onError: (err) => {
          toast.error("Vosita Nomi yaratilmadi!");
          console.log(err);
        },
      });
    } else {
      formData.append("name", field);
      mutate({
        url: baseUrl,
        data: formData,
        onSuccess: () => {
          toast.success("Vosita turi yaratildi!");
          refetch();
          setOpen(false);
        },
        onError: (err) => {
          toast.error("Vosita turi yaratilmadi!");
          console.log(err);
        },
      });
    }
  };
  return (
    <div>
      <Button
        className="list-tools__btn"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
        variant="contained"
      >
        {t("Qo'shish")}
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
            <form onSubmit={createType} className="list-tools__modal">
              {!name ? (
                <>
                  <TextField
                    className="list-tools__modal-input"
                    onChange={(e) => handleChange(e)}
                    id="outlined-basic"
                    label="Vosita Nomi"
                    variant="outlined"
                    name="vosita_nomi"
                    required
                  />
                  <TextareaAutosize
                    className="list-tools__modal-input-text"
                    onChange={(e) => handleChange(e)}
                    placeholder="Qo'shimcha Ma'lumot"
                    name="qoshimcha_malumot"
                    aria-label="minimum height"
                    minRows={3}
                  />
                </>
              ) : (
                <TextField
                  className="list-tools__modal-input"
                  onChange={(e) => setField(e.target.value)}
                  id="outlined-basic"
                  label="Vosita Turi"
                  variant="outlined"
                  required
                />
              )}
              {isLoading ? (
                <LoadingButton
                  className="list-tools__modal-btn"
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                >
                  Saqlanmoqda
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  className="list-tools__modal-btn"
                  variant="contained"
                >
                  Saqlash
                </Button>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default Listoftoolsmodal;

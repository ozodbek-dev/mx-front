import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useState } from "react";
import l2 from "assets/icon/l2.svg";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import usePost from "hooks/usePost";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

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
function Listofedit({ name, isLoading, baseUrl = "", refetch, id }) {
  const [openmodal, setOpenmodal] = useState(false);
  const [area, setArea] = useState(null);
  const [field, setField] = useState();
  const params = useParams();
  const { mutate } = usePost();

  const handleChange = (e) => {
    setArea((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const editTypes = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    if (!name) {
      for (let [key, value] of Object.entries(area)) {
        formData.append(key, value);
      }
      formData.append("vosita_turi_id", params.id);

      mutate({
        url: baseUrl,
        method: "put",
        data: formData,
        onSuccess: () => {
          toast.success("Vosita Nomi o'zgartirildi!");
          refetch();
          setOpenmodal(false);
        },
        onError: (err) => {
          toast.error("Vosita Nomi o'zgartirilmadi!");
          console.log(err);
        },
      });
    } else {
      formData.append("name", field);
      mutate({
        url: baseUrl,
        method: "put",
        data: formData,
        onSuccess: () => {
          toast.success("Vosita turi o'zgartirildi!");
          refetch();
          setOpenmodal(false);
        },
        onError: (err) => {
          toast.error("Vosita turi o'zgartirilmadi!");
          console.log(err);
        },
      });
    }
  };
  return (
    <>
      <Button onClick={() => setOpenmodal(true)}>
        <img src={l2} alt="edit" />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openmodal}
        onClose={() => setOpenmodal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openmodal}>
          <Box sx={style}>
            <Button
              className="list-tools__btn-close"
              onClick={() => setOpenmodal(false)}
              startIcon={<CloseIcon />}
            />
            <form onSubmit={editTypes}>
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
                  O'zgartirilmoqda
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  className="list-tools__modal-btn"
                  variant="contained"
                >
                  O'zgartirish
                </Button>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
export default Listofedit;

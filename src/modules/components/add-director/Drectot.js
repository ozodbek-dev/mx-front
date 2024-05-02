import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, {useContext, useRef} from "react";
import {SvgIcon, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import {request} from "../../../api/request";
import {Contextvalue} from "../../../context/context";

function Drector() {
     const [open, setOpen] = React.useState(false);
    const {setInput} = useContext(Contextvalue)
    const nameRef = useRef()
    const telRef = useRef()
     const handleOpen = () => {
       setOpen(true);
     };
     const handleClose = () => {
       setOpen(false);
     };
     
     const style = {
       position: "absolute",
       top: "50%",
       left: "50%",
       transform: "translate(-50%, -50%)",
       width: 400,
       bgcolor: "background.paper",
       boxShadow: 24,
       pt: 2,
       px: 4,
       pb: 3,
     };
    
     const token = localStorage.getItem("token")
     const formData = new FormData()
     formData.append("token",token)
  const submit = (e) => {
    e.preventDefault();
    setInput({
      bosh_vrach: nameRef.current.value,
      bosh_vrach_tel_raqami: telRef.current.value,
    });
    for (let [key, value] of Object.entries({
      bosh_vrach: nameRef.current.value,
      bosh_vrach_tel_raqami: telRef.current.value,
      tel_raqami: "",
      address: "",
      email: "",
    })) {
      formData.append(key, value);
    }
      request
        .post("/muassasa/edit/", formData)
        setOpen(false)
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant={"contained"}
        startIcon={<AddIcon />}
        style={{
          borderRadius:"12px",
          backgroundColor:"#1464C0"
        }}
      >
        Direktor Qo'shish
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form onSubmit={submit}>
          <Box sx={{ ...style, width: 500 }}>
            <Button
              style={{
                marginBottom: "14px",
                marginLeft: "-25px",
              }}
              variant="text"
              onClick={handleClose}
            >
              <SvgIcon component={ArrowBackIcon} inheritViewBox />
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                style={{
                  marginBottom: "20px",
                }}
                id="outlined-basic"
                label="Direktor (FIO)"
                variant="outlined"
                required
                inputRef={nameRef}
              />
              <TextField
                id="outlined-basic"
                label="Direktor telefon raqami"
                variant="outlined"
                type={"number"}
                required
                inputRef={telRef}
              />
            </div>
            <Button
              style={{
                marginTop: "16px",
              }}
              startIcon={<AddIcon />}
              variant="contained"
              type="submit"
            >
              Qo'shish
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
}
export default Drector;

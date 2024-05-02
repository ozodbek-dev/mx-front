import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import l3 from "../../../../../assets/icon/l3.svg";
import "./modalchild.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Modalchild({
  setMonthfirst,
  setMonthtwo,
  setYear,
  setYear2,
  setArr,
  arr,
  monthfirst,
  monthtwo,
  year,
  year2,
}) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const { t } = useTranslation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitData = (e) => {
    e.preventDefault();
    if (+monthfirst >= +monthtwo) {
      setMonthtwo(`${+monthfirst + 1}`);
      toast.error("Iltimos Oy Toifalarini To'g'ri Kiriting!");
      return;
    }
    if (+year >= +year2) {
      setYear2(`${+year + 1}`);
      toast.error("Iltimos Yosh Toifalarini To'g'ri Kiriting!");
      return;
    }
    if (
      arr.some(
        (el) =>
          el.monthFirst === monthfirst &&
          el.monthTwo === monthtwo &&
          monthfirst &&
          monthtwo
      )
    ) {
      toast.error("Bir Xil Oy toifasi Kiritish Mumkin Emas!");
      return;
    }
    if (
      arr.some((el) => el.yearOne === year && el.yearTwo === year2) &&
      year &&
      year2
    ) {
      toast.error("Bir Xil Yosh toifasi Kiritish Mumkin Emas!");
      return;
    }
    setArr([
      ...arr,
      {
        ...(monthfirst && { monthFirst: monthfirst }),
        ...(monthtwo && { monthTwo: monthtwo }),
        ...(year && { yearOne: year }),
        ...(year2 && { yearTwo: year2 }),
      },
    ]);
    setMonthtwo();
    setMonthfirst();
    setYear();
    setYear2();
    setYear2();
    setOpen2(false);
  };
  const removeItem = (index) => {
    setArr([...arr.filter((item) => item !== arr[index])]);
  };

  return (
    <Box style={{ height: "100%" }}>
      <Button
        variant="contained"
        style={{ height: "100%" }}
        onClick={handleOpen}
      >
        {t("Yosh va Oy toifa kiritish")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose} startIcon={<ArrowBackIcon />} />
          <div
            style={{ overflowY: "auto", maxHeight: "300px", listStyle: "none" }}
          >
            {arr.map((el, index) => {
              return (
                <React.Fragment key={index}>
                  <ul
                    style={{
                      listStyle: "none",
                      border: "1px solid var(--greys-variants-200, #E1E1E1)",
                      borderRadius: "12px",
                      padding: "20px",
                    }}
                  >
                    <span
                      style={{
                        marginTop: "10px",
                        marginBottom: "14px",
                        marginLeft: "250px",
                      }}
                    >
                      {/* <Eyemodal/> */}
                      <button
                        onClick={() => removeItem(index)}
                        type={"button"}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <img src={l3} alt="delete" />
                      </button>
                      {/* <button
                    //  onClick={() => setEdittol(true)}
                     type={"button"}
                     style={{
                       border: "none",
                       backgroundColor: "transparent",
                     }}
                   >
                     <img src={l2} alt="edit" />
                   </button> */}
                    </span>
                    <li
                      style={{
                        marginBottom: "6px",
                        marginTop: "2px",
                        fontSize: "18px",
                      }}
                    >
                      #{index + 1}
                    </li>
                    <li className="list__items">
                      <tr>
                        <td>{t("vosita.oydan")} :</td>
                        <td>{el.monthFirst}</td>
                      </tr>
                      <tr>
                        <td>{t("vosita.oygacha")} :</td>
                        <td>{el.monthTwo}</td>
                      </tr>
                      <tr>
                        <td>{t("vosita.yoshdan")} :</td>
                        <td>{el.yearOne}</td>
                      </tr>
                      <tr>
                        <td>{t("vosita.yoshgacha")} :</td>
                        <td>{el.yearTwo}</td>
                      </tr>
                    </li>
                  </ul>
                </React.Fragment>
              );
            })}
          </div>
          {!arr[0] && <p style={{ textAlign: "center" }}>{t("tugma")}</p>}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              style={{ textAlign: "center" }}
              startIcon={<AddIcon />}
              onClick={() => setOpen2(true)}
            >
              {t("bola.add")}
            </Button>
            <Button
              style={{ marginTop: "10px", borderRadius: "12px" }}
              variant="contained"
              onClick={handleClose}
            >
              {t("Saqlash")}
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={() => setOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            onClick={() => setOpen2(false)}
            startIcon={<ArrowBackIcon />}
          />
          <form onSubmit={submitData}>
            <TextField
              onChange={(e) => setMonthfirst(getOnlyPositiveValues.call(e, 29))}
              style={{ width: "100%", marginBottom: "22px", marginTop: "12px" }}
              id="outlined-basic"
              label={t("Oy dan")}
              variant="outlined"
              required={!year}
            />
            <TextField
              onChange={(e) => {
                if (e.target.value >= 0)
                  setMonthtwo(getOnlyPositiveValues.call(e, 30));
                else e.target.value = "";
              }}
              style={{ width: "100%", marginBottom: "22px" }}
              id="outlined-basic"
              label={t("Oy gacha")}
              value={monthtwo}
              maxLength={2}
              variant="outlined"
              required={monthfirst}
            />

            <TextField
              onChange={(e) => setYear(getOnlyPositiveValues.call(e, 89))}
              style={{ width: "100%", marginBottom: "22px" }}
              id="outlined-basic"
              inputProps={{ min: 0 }}
              maxLength={2}
              label={t("Yosh dan")}
              variant="outlined"
              required={!monthfirst}
            />
            <TextField
              onChange={(e) => setYear2(getOnlyPositiveValues.call(e, 90))}
              style={{ width: "100%", marginBottom: "22px" }}
              id="outlined-basic"
              label={t("Yosh gacha")}
              value={year2}
              variant="outlined"
              required={year}
            />
            <Button variant="contained" type="submit">
              {t("Saqlash")}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

function getOnlyPositiveValues(maxValue) {
  const val = this.target.value;
  if (!/^\d+$/.test(val)) {
    this.target.value = "";
    return "";
  }
  if (this.target.value.length > 2)
    this.target.value = this.target.value.slice(0, 2);
  if (this.target.value > maxValue) this.target.value = maxValue;
  return this.target.value;
}

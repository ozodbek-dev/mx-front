import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {Contextvalue} from "../../../../../../context/context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ names }) {
  const [personName, setPersonName] = React.useState([]);
  console.log(
    "🚀 ~ file: uzmenu.js:24 ~ MultipleSelectCheckmarks ~ personName:",
    personName
  );
  const { setVss } = React.useContext(Contextvalue);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setVss(event.target.value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl style={{ margin: "0" }}>
        <InputLabel id="demo-multiple-checkbox-label">{t("pdf.vs")}</InputLabel>
        <Select
          style={{ color: "transparent" }}
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={t("pdf.vs")} />}
          renderValue={(selected) =>
            selected.map((item, index) => (
              <div className="" style={{ color: "#000" }} key={index}>
                {item.nomi}
              </div>
            ))
          }
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name.id} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name.nomi} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

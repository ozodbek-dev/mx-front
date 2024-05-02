import { Box, Button, Chip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { get } from "lodash";
import * as React from "react";
import { useTranslation } from "react-i18next";
import ClearIcon from "@mui/icons-material/Clear";
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

export default function Inputcheckboxes({
  data,
  label,
  setPersonName,
  personName,
  disable = false,
}) {
  const { t } = useTranslation();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl
        style={{
          // minWidth: 300,
          width: "100%",
          maxWidth: "100%",
          flexWrap: "wrap",
        }}
      >
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          disabled={disable}
          multiple
          required
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={t("pdf.vs")} />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                overflow: "auto",
              }}
            >
              {selected?.flat()?.map((value) => {
                return <Chip key={value?.id} label={get(value, "nomi")} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <MenuItem value={data}>
            <Checkbox
              checked={personName?.flat()?.length === data?.length ? -1 : 0}
            />
            <ListItemText primary={"Hammasi"} />
          </MenuItem>
          {data?.map((name) => (
            <MenuItem key={name?.id} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name?.nomi} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {personName.length > 0 ? (
        <Button startIcon={<ClearIcon />} onClick={() => setPersonName([])} />
      ) : null}
    </div>
  );
}

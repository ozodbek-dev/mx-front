import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import { useTranslation } from "react-i18next";
import { Contextvalue } from "../../../../../../context/context";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function Mohmenu({ names }) {
	const [personName, setPersonName] = React.useState([]);
	const { setMen } = React.useContext(Contextvalue);
	const { t } = useTranslation();

	const handleChange = (_, val) => {
		setMen(val);
		setPersonName(val);
	};

	const handleSelectAll = () => {
		if (personName.length !== names.length) {
			setMen(names);
			setPersonName(names);
		} else {
			setPersonName([]);
		}
	};

	return (
		<>
			<FormControl
				style={{
					width: "100%",
					maxWidth: "100%",
					flexWrap: "wrap",
				}}
			>
				<InputLabel id='demo-multiple-checkbox-label'></InputLabel>
				{names?.length && (
					<Autocomplete
						multiple
						id='checkboxes-tags-demo'
						value={personName}
						options={names}
						onChange={handleChange}
						getOptionLabel={option => option.nomi}
						renderOption={(props, option, { index, selected }, ownerState) => {
							return (
								<>
									{index === 0 && (
										<li style={{ marginLeft: "15px" }} onClick={handleSelectAll}>
											<Checkbox
												checked={personName.length === names.length}
												icon={icon}
												checkedIcon={checkedIcon}
												style={{ marginRight: 8 }}
											/>
											{t("Hammasi")}
										</li>
									)}

									<li {...props}>
										<Checkbox
											icon={icon}
											checkedIcon={checkedIcon}
											value={option.id}
											style={{ marginRight: 8 }}
											checked={selected}
										/>
										{option.nomi}
									</li>
								</>
							);
						}}
						renderInput={params => <TextField {...params} placeholder={`${t("pdf.vs")}*`} />}
					/>
				)}
			</FormControl>
		</>
	);
}

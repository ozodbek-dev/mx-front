import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Inputcheckboxes from "../components";
import Modalchild from "./modalchild";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function Mohchildren() {
  const [monthfirst, setMonthfirst] = useState();
  const [monthtwo, setMonthtwo] = useState();
  const [year, setYear] = useState();
  const [year2, setYear2] = useState();
  const [data, setData] = useState([]);
  const [arr, setArr] = useState([]);
  const [regionID, setRegionID] = useState(null);
  const [districtID, setDistrictID] = useState([]);
  console.log(
    "🚀 ~ file: mohchildren.js:52 ~ Mohchildren ~ districtID:",
    districtID
  );
  const [organizationID, setOrganizationID] = useState([]);
  const { t } = useTranslation();
  const { mutate } = usePost();
  const {
    data: { muassasalar: regionAll },
  } = useGet({
    url: "/user/respublika/viloyatlar/",
  });
  const {
    data: { muassasalar: district },
  } = useGet({
    url: `/user/respublika/tumanlar/?viloyat_id=${regionID}`,
    enabled: regionID,
  });
  const {
    data: { muassasalar: organization },
  } = useGet({
    url: `/user/respublika/muassasalar/${
      districtID?.flat()?.length > 0
        ? `?tuman_id=${JSON.stringify(districtID?.flat()?.map((el) => el?.id))}`
        : ""
    }`,
    enabled: districtID,
  });

  const update = () => {
    if (arr.length < 1) {
      toast.error("Iltimos oy va yosh toifalarini  kiriting!");
      return;
    }
    const body = {
      viloyat: [regionID],
      tuman:
        districtID?.length > 0 ? districtID?.flat()?.map((el) => el?.id) : null,
      muassasa:
        organizationID?.length > 0
          ? organizationID?.flat()?.map((el) => el?.id)
          : null,
      oy: arr[0].monthFirst
        ? arr.map((el) =>
            `${el.monthFirst},${el.monthTwo}`.split(",").map((el) => +el)
          )
        : null,
      yil: arr[0].yearOne
        ? arr.map((el) =>
            `${el.yearOne},${el.yearTwo}`.split(",").map((el) => +el)
          )
        : null,
    };
    mutate({
      url: "/bolalar/soni",
      data: body,
      onSuccess: (data) => {
        setData(data.data);
      },
      onError: (err) => {
        if (err.response.status === 500) {
          return toast.error(
            "Ma'lumotlar Xato yuborildi. Yoki serverda xatolik yuz berdi"
          );
        }
        toast.error(err.response.data.errors);
      },
    });
  };

  return (
    <>
      <h1 className="pl-24">{t("bola.ball1")}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat( auto-fit, minmax(150px, 1fr) )",
          gap: "1rem",
          padding: "2vmax",
        }}
      >
        {/* VSB */}
        <FormControl>
          <InputLabel>{t("bildirishnoma.viloyat")}</InputLabel>
          <Select
            style={{ height: "100%" }}
            input={<OutlinedInput label={t("bildirishnoma.viloyat")} />}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => {
              setRegionID(e.target.value);
              setData([]);
            }}
          >
            {regionAll?.map((el) => (
              <MenuItem key={el.id} value={el?.id}>
                {el?.nomi}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* TTB */}
        <Inputcheckboxes
          data={district}
          disable={!regionID}
          setPersonName={setDistrictID}
          personName={districtID}
          label={t("bildirishnoma.tuman1")}
        />
        {/* OSHP */}
        <Inputcheckboxes
          data={organization}
          disable={districtID.length < 1}
          setPersonName={setOrganizationID}
          personName={organizationID}
          label={t("bildirishnoma.single.muas")}
        />
        <Modalchild
          monthfirst={monthfirst}
          monthtwo={monthtwo}
          year={year}
          year2={year2}
          setMonthfirst={setMonthfirst}
          setMonthtwo={setMonthtwo}
          setYear={setYear}
          setYear2={setYear2}
          setArr={setArr}
          arr={arr}
        />
        <Button onClick={update} variant="contained" size="small">
          {t("Saralash")}
        </Button>
      </div>
      <div
        style={{ marginTop: "24px", paddingRight: "54px", paddingLeft: "54px" }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
                <TableCell>{t("sbola.hudud")}</TableCell>
                <TableCell>{t("Umumiy")} </TableCell>
                <TableCell>{t("Oraliqlar")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                return (
                  item.data &&
                  item.data.map((el, index) => {
                    return (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {el.viloyat
                            ? el.viloyat
                            : el.tuman
                            ? el.tuman
                            : el.muassasa}
                        </TableCell>
                        <TableCell>{el.soni}</TableCell>
                        <TableCell>
                          {item.oraliqlar &&
                            item.oraliqlar.oraliq.map((els) => (
                              <span>{els}-</span>
                            ))}
                          {item.oraliqlar.type === "yil"
                            ? t("Yosh")
                            : item.oraliqlar.type}
                        </TableCell>
                      </TableRow>
                    );
                  })
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Mohchildren;

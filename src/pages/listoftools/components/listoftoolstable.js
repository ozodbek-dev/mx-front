import {
  Button,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import l1 from "assets/icon/l1.svg";
import { useNavigate } from "react-router-dom";
import Listofnamedetail from "./listofnamedetail";
import Listofedit from "./listofedit";
const label = { inputProps: { "aria-label": "Switch demo" } };

function Listoftoolstable({ data = [], name, refetch, baseUrl = "" }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="list-tools container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell style={{ border: "none" }} align="right">
                ID
              </TableCell>
              <TableCell
                style={{ border: "none", paddingRight: "47px" }}
                align="center"
              >
                {!name ? t("Vosita Nomi") : t("Vosita Turi")}
              </TableCell>
              <TableCell style={{ border: "none" }} align="right">
                Harakatlar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((el, index) => {
              return (
                <TableRow key={el?.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="right">{el?.id}</TableCell>
                  <TableCell align="center">{el?.nomi}</TableCell>
                  <TableCell align="right">
                    {!name ? (
                      <Listofnamedetail data={el?.qoshimcha_malumot} />
                    ) : (
                      <Button onClick={() => navigate(`/listofname/${el?.id}`)}>
                        <img src={l1} alt="detail" />
                      </Button>
                    )}
                    <Listofedit
                      baseUrl={baseUrl}
                      refetch={refetch}
                      name={name}
                      id={el?.id}
                    />
                    {/* <Switch {...label} defaultChecked /> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Listoftoolstable;

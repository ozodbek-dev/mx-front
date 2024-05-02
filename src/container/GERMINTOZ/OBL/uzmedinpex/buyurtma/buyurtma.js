import {
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import l1 from "../../../../../assets/icon/l1.svg";
import "./buyurtma.scss";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Buyurtma() {
  const { t } = useTranslation();
  const uzb = localStorage.getItem("uzb");

  return (
    <div style={{ padding: "20px", paddingTop: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{t("input.bs1")}: 24</h2>
          <TextField
            className="search-ariza"
            //   onChange={ change}
            placeholder={t("input.qidir")}
            style={{ marginLeft: "40px" }}
            id="standard-basic"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment style={{ position: "absolute", right: "18px" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="green_block">
          {uzb && (
            <Link to={"/createorder"}>
              <Button startIcon={<AddIcon />} variant="contained">
                {t("bildirishnoma.add")}
              </Button>
            </Link>
          )}
          <Button
            style={{ backgroundColor: "#18CF6C", marginLeft: "20px" }}
            variant="contained"
            // color="primary"
            size="large"
            startIcon={<DescriptionIcon />}
          >
            {t("bola.excel")}
            {/* <CSVLink  className="excel_download"> */}
            {/* </CSVLink> */}
          </Button>
        </div>
      </div>
      <TableContainer style={{ borderRadius: "12px" }} component={Paper}>
        <Table
          className="table-container"
          style={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>{t("bildirishnoma.single.soni")}</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>{t("input.yt")}</TableCell>
              <TableCell>{t("input.shart")}</TableCell>
              <TableCell>{t("input.qs")}</TableCell>
              <TableCell>{t("input.qb")}</TableCell>
              <TableCell>{t("bildirishnoma.harakat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>YООО «Samo»</TableCell>
              <TableCell>1234567891011121314</TableCell>
              <TableCell>04.01.2023</TableCell>
              <TableCell>
                <div className="table-load"></div> 0%
              </TableCell>
              <TableCell>
                <Link to={"/uzbuyin"}>
                  {" "}
                  <img src={l1} />
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Buyurtma;

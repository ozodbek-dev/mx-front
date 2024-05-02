import { Box } from "@mui/material";
import "./loading.scss";

function Loading() {
  return (
    <Box style={{ display: "grid", placeContent: "center", width:"100%", height:"100%", padding:"4rem" }}>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Box>
  );
}
export default Loading;

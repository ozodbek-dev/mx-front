import {Button} from "@mui/material";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import {Link} from "react-router-dom";
import l1 from "../../../../../assets/icon/l1.svg";
import '../../../../../components/component/RMO/kirimcard/kirimcard.scss';

const Kirimcard = ({classes}) => {
    return (
      <>
      <div className="kirim_card">
        <div className="kirim_card_left">
          <Button
            // variant="contained"
            // color="primary"
            size="large"
            className={classes.button}
            startIcon={<CallReceivedIcon />}
          ></Button>
          <p>{t("shifokor.jami")}: 18</p>
        </div>
        <div className="kirim_card_center">
          <div>
            <span>Dori: 4</span>
          </div>
          <div>
            <span>Vitamin: 4</span>
          </div>
        </div>
        <div className="kirim_card_right">
          <div className="kirim_card_right_left">
            <p>2023-01-04</p>
            <span>13:15</span>
          </div>
          <div className="kirim_card_right_left">
            <Link to={`#`}>
              <img src={l1} />
            </Link>
          </div>
        </div>
      </div>
      </>
    );
}
 
export default Kirimcard;
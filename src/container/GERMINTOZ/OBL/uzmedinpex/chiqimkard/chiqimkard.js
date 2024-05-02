import {Button} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import {Link} from "react-router-dom";
import l1 from "../../../../../assets/icon/l1.svg";
import '../../../../../components/component/RMO/kirimcard/kirimcard.scss';

function Chiqimkard ({classes}){
  
    return(
        <div className="kirim_card chiqim_card">
        <div div className="kirim_card_left chiqim_card_left">
          <Button
            // variant="contained"
            // color="primary"
            size="large"
            className={classes.button}
            startIcon={<CallMadeIcon />}
          ></Button>
          <p>{t("shifokor.jami")}: 20</p>
        </div>
        <div className="chiqim_card_center">
          <div className="kirim_card_center_top">
            <div className="top_left">
              <p>{t("bildirishnoma.send")}:</p>
              <h5>3 ta muassasaga</h5>
            </div>
            <div className="top_right">
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
          <div className="bottom">
            <div>
              <span>Dori: 4</span>
            </div>
            <div>
              <span>Vitamin: 4</span>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Chiqimkard;
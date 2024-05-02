import {Button} from "@mui/material";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import {Link} from "react-router-dom";
import l1 from "../../../../assets/icon/l1.svg";
import './kirimcardobl.scss'

const Kirimcardobl = ({classes, sin,setSin, kirim}) => {
  console.log(kirim,'kirim');
  
    return (
      <div className="kirim_card">
        <div className="kirim_card_left">
          <Button
            // variant="contained"
            // color="primary"
            size="large"
            className={classes.button}
            startIcon={<CallReceivedIcon />}
          ></Button>
          <p>{t("shifokor.jami")}{kirim?.map((el) => (
    el?.vositalar.map((e) => (
      e.vosita_miqdori
    )).reduce((acc,cur) =>acc+cur,0)
  ))}</p>
        </div>
        <div className="kirim_card_center">
          <div>
            <span>{t("vosita.vositaturi")}: {kirim?.map((el) => (
                el?.vositalar.map((e) => (
                  e.vosita_nomi.nomi
                )).join(', ')
              ))} </span>
          </div>
          <div>
            <span>{t("bildirishnoma.single.nomi")}: {kirim?.map((el) => (
                el?.vositalar.map((e) => (
                  e.vosita_turi.nomi
                )).join(', ')
              ))}</span>
          </div>
        </div>
        <div className="kirim_card_right">
          <div className="kirim_card_right_left">
            <p>{kirim?.map((el) => (
              el?.kirim?.created_at.slice(0,10)
            ))}</p>
            <span>13:15</span>
          </div>
          <div  className = "kirim_card_right_left"
          onClick={() => setSin(!sin)} >
            <Link to={`#`}>
              <img src={l1} />
            </Link>
          </div>
        </div>
      </div>
    );
}
 
export default Kirimcardobl;
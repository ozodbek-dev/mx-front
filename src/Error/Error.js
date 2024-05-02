import {useNavigate} from "react-router-dom";
import "./error.scss";

function  Error() {
 const navigate = useNavigate();
    return (
      <>
        <div className="site">
          <div className="sketch">
            <div className="bee-sketch red"></div>
            <div className="bee-sketch blue"></div>
          </div>

          <h1 className="site-head">
            404:
            <small>Sahifa Mavjud emas!</small>
          </h1>
        </div>
        <button className="site-button" onClick={() => navigate(-1)}>ortga</button>
      </>
    );
}
export default Error;
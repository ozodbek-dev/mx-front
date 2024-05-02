import "./../tab.scss";
import KirimChiqim from "./kirimQilingan/kirimChiqim";
import Royxat from "./royxat/royxat";

const Tab1 = ({ searchValue }) => {
  return (
    <div className="dflex">
      <div className="kirimChiqim">
        <KirimChiqim searchValue={searchValue} />
      </div>
      <div className="royxat">
        <Royxat />
      </div>
    </div>
  );
};

export default Tab1;

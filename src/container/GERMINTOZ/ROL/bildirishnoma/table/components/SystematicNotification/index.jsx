import { Pagination } from "@mui/material";
import SystematicNotificationTable from "components/component/RMO/tableBlock/SystematicNotificationTable";
import useGet from "hooks/useGet";

const SystematicNotification = ({
  search = "",
  setNotificationCount,
  handleChangePage = () => {},
  page = 1,
}) => {
  const {
    data: { data = [], meta },
  } = useGet({
    url: `/omborxona/tizimli/xabarnoma/ttb?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setNotificationCount(meta?.total);
    },
  });
  return (
    <div>
      <SystematicNotificationTable
        data={data}
        handleNavigate={(item) => `/tizimttb/${item.id}`}
      />
      <div className="table-pagination-content">
        <Pagination
          page={page}
          count={meta?.total_pages ?? 1}
          onChange={(e, page) => handleChangePage(page)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default SystematicNotification;

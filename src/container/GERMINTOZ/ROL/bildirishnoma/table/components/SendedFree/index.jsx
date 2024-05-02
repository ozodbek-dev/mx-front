import { Pagination } from "@mui/material";
import NotificationMTable from "components/component/RMO/tableBlock/NotificationMTable";
import useGet from "hooks/useGet";

const SendedFree = ({
  search = "",
  setNotificationCount,
  handleChangePage = () => {},
  page = 1,
}) => {
  const {
    data: { data = [], meta },
  } = useGet({
    url: `/bildirishnoma/erkin/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setNotificationCount(meta?.total);
    },
  });
  return (
    <div>
      <NotificationMTable
        data={data}
        handleNavigate={(item) => `/ttbcom/${item.id}`}
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

export default SendedFree;

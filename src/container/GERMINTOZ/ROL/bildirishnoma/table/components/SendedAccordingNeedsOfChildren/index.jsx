import { Pagination } from "@mui/material";
import NotificationMTable from "components/component/RMO/tableBlock/NotificationMTable";
import useGet from "hooks/useGet";

const SendedAccordingNeedsOfChildren = ({
  search = "",
  setNotificationCount,
  handleChangePage = () => {},
  page = 1,
}) => {
  const {
    data: { data = [], meta },
  } = useGet({
    url: `/bildirishnoma/tuman/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setNotificationCount(meta?.total);
    },
  });
  return (
    <div>
      <NotificationMTable
        data={data}
        handleNavigate={(item) => `/ttbbol/${item.id}`}
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

export default SendedAccordingNeedsOfChildren;

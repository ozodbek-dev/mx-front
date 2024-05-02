import { Pagination } from "@mui/material";
import NotificationMTable from "components/component/RMO/tableBlock/NotificationMTable";
import useGet from "hooks/useGet";
import usePagination from "hooks/usePagination";
import { useEffect } from "react";

const ReceivedAccordingNeedsOfChildren = ({
  handleStatusChange = () => {},
  search = "",
  setNotificationCount,
}) => {
  const { page, changePage: handleChangePage } = usePagination();
  useEffect(() => {
    if (search) {
      handleChangePage(1);
    }
  }, [search]);
  const {
    data: { data = [], meta },
  } = useGet({
    url: `/bildirishnoma/viloyatga/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setNotificationCount(meta?.total);
    },
  });
  return (
    <div>
      <NotificationMTable
        data={data}
        handleClick={(item) => handleStatusChange(item)}
        handleNavigate={(item) => `/Comsbol/${item.id}`}
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

export default ReceivedAccordingNeedsOfChildren;

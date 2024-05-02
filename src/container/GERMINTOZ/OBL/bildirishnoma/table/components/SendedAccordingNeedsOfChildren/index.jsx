import { Pagination } from "@mui/material";
import NotificationMTable from "components/component/RMO/tableBlock/NotificationMTable";
import useGet from "hooks/useGet";
import usePagination from "hooks/usePagination";
import { useEffect } from "react";

const SendedAccordingNeedsOfChildren = ({
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
    url: `/bildirishnoma/viloyat/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setNotificationCount(meta?.total);
    },
  });
  return (
    <div>
      <NotificationMTable
        data={data}
        handleNavigate={(item) => `/Combol/${item.id}`}
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

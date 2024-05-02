import { Pagination } from "@mui/material";
import SystematicNotificationTable from "components/component/RMO/tableBlock/SystematicNotificationTable";
import useGet from "hooks/useGet";
import usePagination from "hooks/usePagination";
import { useEffect } from "react";

const SystematicNotification = ({ search = "", setNotificationCount }) => {
  const { page, changePage: handleChangePage } = usePagination();
  useEffect(() => {
    if (search) {
      handleChangePage(1);
    }
  }, [search]);
  const {
    data: { data = [], meta },
  } = useGet({
    url: `/omborxona/tizimli/xabarnoma/vssb?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setNotificationCount(meta?.total);
    },
  });
  return (
    <div>
      <SystematicNotificationTable
        data={data}
        handleNavigate={(item) => `/inner-combol/${item.id}`}
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

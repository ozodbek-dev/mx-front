import { Pagination } from "@mui/material";
import NotificationMTable from "components/component/RMO/tableBlock/NotificationMTable";
import useGet from "hooks/useGet";
import usePagination from "hooks/usePagination";
import { useEffect } from "react";

const ReceivedFree = ({
  handleStatusChange = () => {},
  search = "",
  setNotificationCount,
}) => {
  const { page, changePage } = usePagination();
  useEffect(() => {
    if (search) {
      changePage(1);
    }
  }, [search]);

  const {
    data: { data = [], meta },
  } = useGet({
    url: `/bildirishnoma/viloyat/erkin/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setNotificationCount(meta?.total);
    },
  });
  return (
    <div>
      <NotificationMTable
        data={data}
        handleClick={(item) => handleStatusChange(item)}
        handleNavigate={(item) =>
          `/Singlermo_viloyat/${item.id}/${item.Yuboruvchi}`
        }
      />
      <div className="table-pagination-content">
        <Pagination
          page={page}
          count={meta?.total_pages ?? 1}
          onChange={(e, page) => changePage(page)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ReceivedFree;

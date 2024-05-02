import { Pagination } from "@mui/material";
import NotificationMTable from "components/component/RMO/tableBlock/NotificationMTable";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";

const ReceivedFree = ({
  search = "",
  setNotificationCount,
  handleChangePage = () => {},
  page = 1,
}) => {
  const {
    data: { data = [], meta },
  } = useGet({
    url: `/bildirishnoma/tuman/erkin/?page=${page}&search=${search}`,
    onSuccess: ({ data: { meta } }) => {
      setNotificationCount(meta?.total);
    },
  });
  const { mutate } = usePost();
  const handleStatusChange = (e) => {
    const formData = new FormData();
    formData.append("id", e.id);
    formData.append("status", "O'qildi");
    formData.append("kimdan", e.Yuboruvchi);
    mutate({ url: "/bildirishnoma/tuman/erkin/", data: formData });
  };
  return (
    <div>
      <NotificationMTable
        data={data}
        handleClick={(item) => handleStatusChange(item)}
        handleNavigate={(item) =>
          `/ttberkin/${item.id}/${item.Yuboruvchi}?kimdan=${item.kimdan}`
        }
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

export default ReceivedFree;

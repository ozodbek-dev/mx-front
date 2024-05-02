import { Button, Table } from "antd";
import Drug from "assets/icon/Drug";
import NotFoundTableIcon from "assets/icon/NotFoundTableIcon";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const DetailTable = ({ data, tab }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <Table
        className={`[&_.ant-table-cell]:text-[16px] [&_.ant-table-cell]:not-italic [&_.ant-table-cell]:leading-[20px]  [&_.ant-table-cell]:h-[56px] [&_.ant-table-cell]:!text-[#4D4D4D] [&_.ant-table-cell]:!font-normal [&_.ant-pagination]:p-[12px] [&_.ant-pagination]:rounded-b-[8px] [&_.antd-row:nth-child(even)]:bg-white  [&_.ant-pagination]:bg-white [&_.ant-table-thead_.ant-table-cell]:bg-white [&_.ant-table-row:nth-child(odd)]:bg-[#E7EBF2] [&_.ant-pagination-next]:w-[42px] [&_.ant-pagination-next]:h-[42px] [&_.ant-pagination-next]:flex [&_.ant-pagination-next]:items-center [&_.ant-pagination-next]:justify-center [&_.ant-pagination-next]:order-last [&_.ant-pagination-prev]:w-[42px] [&_.ant-pagination-prev]:h-[42px] [&_.ant-pagination-prev]:flex [&_.ant-pagination-prev]:items-center [&_.ant-pagination-prev]:justify-center [&_.ant-pagination-prev]:order-last [&_.ant-pagination-item]:w-[42px] [&_.ant-pagination-item]:h-[42px] [&_.ant-pagination-item]:flex [&_.ant-pagination-item]:items-center [&_.ant-pagination-item]:justify-center [&_.ant-pagination-item_a]:text-[#1464C0] [&_.ant-pagination-item]:rounded-[12px] [&_.ant-table-thead_.ant-table-cell]:before:!w-0 [&_.ant-table-cell]:!py-[0px] [&_.ant-pagination-item-active]:w-[42px] [&_.ant-pagination-item-active]:h-[42px] [&_.ant-pagination-item-active]:flex [&_.ant-pagination-item-active]:items-center [&_.ant-pagination-item-active]:justify-center [&_.ant-pagination-item-active]:rounded-[12px] [&_.ant-pagination-item-active]:bg-[#1464C0] [&_.ant-pagination-item-active_a]:!text-[#ffffff] [&_.ant-pagination-item]:text-[16px] [&_.ant-pagination-item]:not-italic [&_.ant-pagination-item]:font-semibold [&_.ant-pagination-item]:leading-[24px]`}
        locale={{
          emptyText: (
            <div className="flex justify-center items-center flex-col pt-[32px] pb-[32px]">
              <NotFoundTableIcon />
              <h2 className="mt-[20px] ">
                {t("Sizning so'rovingiz bo'yicha hech qanday natija topilmadi")}
              </h2>
            </div>
          ),
        }}
        dataSource={get(data, "medicine_name", [])}
        columns={[
          {
            key: "1",
            title: "Dori turi",
            render: (_, value) => {
              return <>{get(value, "medicine_type__name_uz")}</>;
            },
          },
          {
            key: "2",
            dataIndex: "name",
            title: "Dori nomi",
            render: (_, value) => {
              return <>{get(value, "medicine_name__name_uz", "-")}</>;
            },
          },
          {
            key: "3",
            dataIndex: "doza",
            title: "Dori do'zasi (mg)",
            render: (_, value) => {
              return <>{get(value, "dosage", "-")}</>;
            },
          },
          {
            key: "4",
            title: "Miqdori",
            render: (_, value) => {
              return <>{get(value, "quantity", "-")}</>;
            },
          },
          {
            key: "5",
            dataIndex: "werehouse",
            title: "Omborxonada",
          },
        ]}
      />
      <Button
        onClick={() => navigate(`view/${tab}`)}
        className="flex items-center justify-center bg-[#F0F7FF] mt-[20px] w-[100%]  hover:!bg-[#F0F7FF] !text-[#1464C0] border-[0px] !rounded-[12px] h-[40px]"
        icon={<Drug />}
      >
        {t("Dorilar haqida batafsil")}
      </Button>
    </div>
  );
};
export default DetailTable;

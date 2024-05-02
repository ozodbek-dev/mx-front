import { Button, Modal } from "antd";
import CloseIcon from "assets/icon/CloseIcon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const OpenModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      maskClosable={false}
      footer={null}
      closeIcon={
        <Button className="w-[40px] h-[40px] bg-[#A6A6A6] flex items-center justify-center p-[10px] border-0 rounded-[12px] hover:!bg-[#A6A6A6]">
          <CloseIcon fill="#fff" />
        </Button>
      }
    >
      <div className="bg-[#F0F7FF] px-[28px] py-[20px] rounded-[12px]  ">
        <h1 className="text-[#1464C0] mb-[20px] text-[24px] leading-[32px] font-semibold">
          {t("Chiqim qilish")}
        </h1>
        <p className="text-[#111] mb-[16px] text-[16px] font-normal leading-[20px]">
          {t("Quyidagilardan birini tanlang")}{" "}
        </p>
        <Button
          onClick={() => navigate("create/region")}
          className="mb-[16px]  border-[0px] bg-[#F0F7FF] hover:!bg-[#1464C0] hover:!text-[#FFF]  rounded-[12px] h-[40px]  w-[100%] text-[#1464C0] text-[16px] leading-[24px] font-semibold"
        >
          {t("Viloyat SSV")}
        </Button>
        <Button
          onClick={() => navigate("create/center")}
          className="w-[100%]  border-[0px] bg-[#F0F7FF] hover:!bg-[#1464C0] hover:!text-[#FFF]  rounded-[12px] h-[40px]   text-[#1464C0] text-[16px] leading-[24px] font-semibold "
        >
          {t("Transplantologiya markazi")}
        </Button>
      </div>
    </Modal>
  );
};
export default OpenModal;

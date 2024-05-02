import { Button, Select } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const CreateCenterForm = ({ change, data, query }) => {
  const { t } = useTranslation();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        change(true, "open");
      }}
    >
      <p className="input__label">{t("Transplantologiya markazi")}</p>
      <Select
        className="w-full"
        onChange={(e) => change(e, "tab")}
        placeholder={t("Transplantologiya markazini tanlang")}
        value={get(query, "tab", "")}
        required
      >
        {data?.map((el) => {
          return (
            <Select.Option key={get(el, "id", 0)} value={get(el, "id", 0)}>
              {t(get(el, "name", ""))}
            </Select.Option>
          );
        })}
      </Select>
      <Button
        htmlType="submit"
        className="w-full bg-[#1464C0] rounded-xl border-none text-white hover:!bg-[#1464C0] mt-20 h-[40px]"
      >
        {t("Davom etish")}
      </Button>
    </form>
  );
};
export default CreateCenterForm;

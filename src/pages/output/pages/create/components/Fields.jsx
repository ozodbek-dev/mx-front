import { Add } from "@mui/icons-material";
import { Button, DatePicker, Input, InputNumber, Select } from "antd";
import { requestIMMUNO } from "api/request";
import PlusIcon from "assets/icon/PlusIcon";
import DrugComponentWrapper from "components/drug-wrraper";
import FormWrapper from "components/form-wrraper";
import dayjs from "dayjs";
import useGet from "hooks/useGet";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  addChildField,
  addField,
  handleChange,
  removeChildField,
  removeParentField,
} from "../utils/fields";

const Fields = ({ fields, setFields, initialState }) => {
  const { t } = useTranslation();
  const [drugMade, setDrugMade] = useState([]);
  console.log("🚀 ~ Fields ~ drugMade:", drugMade);
  const [drugDose, setDrugDose] = useState({});
  const { data: drugType } = useGet({
    url: "/storehouse/list/medicine/type",
    api: requestIMMUNO,
  });
  const fetchDrugDose = async (parentIndex, medicineName, childIndex) => {
    try {
      const response = await requestIMMUNO.get(
        `/storehouse/list/dose/medicine/name/${medicineName}`
      );
      const doseData = response.data;
      setDrugDose((prevDose) => ({
        ...prevDose,
        [parentIndex]: {
          ...prevDose[parentIndex],
          [childIndex]: doseData,
        },
      }));
    } catch (error) {
      console.error("Error fetching drug dose data:", error);
    }
  };

  useEffect(() => {
    /**
     * This function fetches the drug made data for each field from the backend.
     * It does this by mapping over the fields array and making a request for
     * the drug names of that type to the backend.
     *
     * It then waits for all of these requests to resolve and stores the data
     * in an array, which is then set as the state for the drugMade variable.
     */
    const fetchDrugMade = async () => {
      const promises = fields.map((item) =>
        requestIMMUNO.get(
          `/storehouse/list/medicine/name/medicine/type/${item.medicine_type}`
        )
      );
      const responses = await Promise.all(promises);
      const drugMadeData = responses.map((response) => response.data);
      setDrugMade(drugMadeData);
    };
    fetchDrugMade();
  }, [fields]);

  return (
    <div>
      {fields?.map((item, parentIndex) => {
        return (
          <DrugComponentWrapper
            key={parentIndex}
            onDelete={() => removeParentField(parentIndex, fields, setFields)}
          >
            <div className="p-[12px]">
              <p className="input_label">{t("Dori turi")}</p>
              <Select
                className="w-[347px]"
                value={item.medicine_type}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[parentIndex] = {
                    ...newFields[parentIndex],
                    medicine_type: e,
                    childField: newFields[parentIndex].childField.map(
                      (child) => ({
                        ...child,
                        medicine_type: e,
                      })
                    ),
                  };
                  setFields(newFields);
                }}
              >
                {drugType?.map((el) => {
                  return (
                    <Select.Option
                      value={get(el, "id", "")}
                      key={get(el, "id", "")}
                    >
                      {get(el, "name_uz", "-")}
                    </Select.Option>
                  );
                })}
              </Select>
              {get(item, "childField", []).map((el, index) => {
                return (
                  <div key={index}>
                    <FormWrapper
                      className="mt-[20px]"
                      onClick={() =>
                        removeChildField(parentIndex, index, fields, setFields)
                      }
                      count={index + 1}
                      title="Dori"
                      hasDelete={true}
                    >
                      <div className="gap-[12px] px-[12px] pb-[12px]">
                        <div className="flex items-center gap-[16px] ">
                          <div>
                            <p className="input_label">{t("Dori nomi")}</p>
                            <Select
                              className="w-[160px]"
                              value={
                                drugMade[parentIndex]?.length > 0
                                  ? el?.medicine_name
                                  : ""
                              }
                              onChange={(event) => {
                                handleChange(
                                  index,
                                  "medicine_name",
                                  event,
                                  parentIndex,
                                  fields,
                                  setFields
                                );
                                fetchDrugDose(parentIndex, event, index);
                              }}
                            >
                              {drugMade[parentIndex]?.map((el) => {
                                return (
                                  <Select.Option
                                    value={get(el, "id", "")}
                                    key={get(el, "id", "")}
                                  >
                                    {get(el, "name_uz", "-")}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </div>
                          <div>
                            <p className="input_label">
                              {t("Dori dozasi (mg)")}
                            </p>
                            <Select
                              className="w-[160px]"
                              value={
                                drugMade[parentIndex]?.length > 0
                                  ? el?.dosage
                                  : ""
                              }
                              onChange={(event) =>
                                handleChange(
                                  index,
                                  "dosage",
                                  event,
                                  parentIndex,
                                  fields,
                                  setFields
                                )
                              }
                            >
                              {drugDose?.[parentIndex]?.[index]?.map((el) => {
                                return (
                                  <Select.Option
                                    value={get(el, "id", "")}
                                    key={get(el, "id", "")}
                                  >
                                    {get(el, "dosage", "-")}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </div>
                          <div>
                            <p className="input_label">{t("Miqdori")}</p>
                            <InputNumber
                              className="w-[160px]"
                              type={"number"}
                              value={el?.quantity}
                              onChange={(event) =>
                                handleChange(
                                  index,
                                  "quantity",
                                  event,
                                  parentIndex,
                                  fields,
                                  setFields
                                )
                              }
                            />
                          </div>
                          <div>
                            <p className="input_label">{t("Seriya raqami")}</p>
                            <Input
                              className="w-[160px]"
                              value={el?.series_number}
                              onChange={(event) =>
                                handleChange(
                                  index,
                                  "series_number",
                                  event.target.value,
                                  parentIndex,
                                  fields,
                                  setFields
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-[16px] mt-[20px]">
                          <div>
                            <p className="input_label">
                              {t("Ishlab chiqrilgan sana")}
                            </p>
                            <DatePicker
                              className="w-[335px]"
                              value={
                                el?.made_date ? dayjs(el?.made_date) : null
                              }
                              onChange={(_, value) =>
                                handleChange(
                                  index,
                                  "made_date",
                                  value,
                                  parentIndex,
                                  fields,
                                  setFields
                                )
                              }
                            />
                          </div>
                          <div>
                            <p className="input_label">
                              {t("Yaroqli muddati")}
                            </p>
                            <DatePicker
                              className="w-[335px]"
                              value={
                                el?.expiration_date
                                  ? dayjs(el?.expiration_date)
                                  : null
                              }
                              onChange={(_, value) =>
                                handleChange(
                                  index,
                                  "expiration_date",
                                  value,
                                  parentIndex,
                                  fields,
                                  setFields
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormWrapper>
                  </div>
                );
              })}
              <Button
                onClick={() =>
                  addChildField(parentIndex, fields, setFields, initialState)
                }
                className="[&_path]:fill-[#1464C0] flex items-center justify-center bg-[#F0F7FF] mt-[24px] w-[100%]  hover:!bg-[#F0F7FF] !text-[#1464C0] text-[16px] font-semibold leading-[24px] border-[0px] !rounded-[12px] h-[40px]"
                icon={<Add />}
              >
                {t("Dori qo'shish")}
              </Button>
            </div>
            <Button
              onClick={() => addField(fields, setFields, initialState)}
              className=" flex items-center justify-center bg-[#1464C0] mt-[24px] w-[100%]  hover:!bg-[#1464C0] text-white  text-[16px] font-semibold leading-[24px] border-[0px] !rounded-[12px] h-[40px]"
              icon={<PlusIcon />}
            >
              {t("Dori turi qo'shish")}
            </Button>
          </DrugComponentWrapper>
        );
      })}
    </div>
  );
};
export default Fields;

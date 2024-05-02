import DrugIcon from "assets/icon/DrugIcon";
import FormWrapper from "components/form-wrraper";
import ItemWrapper from "components/item-wrraper";
import SimpleTable from "components/simple-table";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const RecommendDrugs = ({ data }) => {
  const { t } = useTranslation();
  return (
    <ItemWrapper
      id={"drugs"}
      className="mb-[20px]"
      title="Tavsiya etilgan dorilar"
    >
      {data?.map((el, index) => {
        return (
          <div key={index}>
            <div className=" rounded-t-[8px]  p-[18px] w-[100%] h-[59px] bg-[#07F] flex items-center justify-between  ">
              <p className=" text-[#FFF] text-[20px] font-semibold leading-[20px] flex items-center gap-1">
                <DrugIcon /> {t("Dori turi")}
              </p>
            </div>
            <SimpleTable
              data={[
                {
                  title: "Dori turi",
                  value: get(el, "medicine_type.name_uz", "-"),
                },
              ]}
            />
            {get(el, "medicine", []).map((item, ind) => {
              return (
                <FormWrapper
                  className="mt-[8px]"
                  count={ind + 1}
                  title="Dori"
                  hasDelete={false}
                >
                  <SimpleTable
                    data={[
                      {
                        title: "Dori nomi",
                        value: get(item, "medicine_name__name_uz", "-"),
                      },
                      {
                        title: "Dori dozasi (mg)",
                        value: get(item, "dosage", "-"),
                      },
                      {
                        title: "Miqdori",
                        value: get(item, "quantity", "-"),
                      },
                      {
                        title: "Seriya raqami",
                        value: get(item, "series_number", "-"),
                      },
                      {
                        title: "Ishlab chiqrilgan sana",
                        value: dayjs(get(item, "made_date", "")).format(
                          "DD.MM.YYYY"
                        ),
                      },
                      {
                        title: "Yaroqlilik muddati",
                        value: dayjs(get(item, "expiration_date", "")).format(
                          "DD.MM.YYYY"
                        ),
                      },
                    ]}
                  />
                </FormWrapper>
              );
            })}
          </div>
        );
      })}
    </ItemWrapper>
  );
};
export default RecommendDrugs;

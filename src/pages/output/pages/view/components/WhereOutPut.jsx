import ItemWrapper from "components/item-wrraper";
import SimpleTable from "components/simple-table";
import dayjs from "dayjs";
import { get } from "lodash";

const WhereOutPut = ({ data }) => {
  return (
    <ItemWrapper
      id={"where"}
      className="mb-[20px]"
      title="Qayerga chiqim amalga oshiriladi"
    >
      <SimpleTable
        data={[
          {
            title:
              get(data, "to_expense_name", "-") === "Institution"
                ? "Transpatalogiya"
                : "Viloyat SSV",
            value: get(data, "storehouse.region.name")
              ? get(data, "storehouse.region.name", "-")
              : get(data, "storehouse.institution.name", "-"),
          },
          {
            title: "Sana",
            value: dayjs(get(data, "storehouse.created_at", "")).format(
              "DD.MM.YYYY"
            ),
          },
        ]}
      />
    </ItemWrapper>
  );
};
export default WhereOutPut;

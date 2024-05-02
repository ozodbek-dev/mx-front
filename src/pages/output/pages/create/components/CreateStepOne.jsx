import { requestIMMUNO } from "api/request";
import ItemWrapper from "components/item-wrraper";
import useGet from "hooks/useGet";
import { useParams } from "react-router-dom";
import CreateCenterForm from "./CreateCenterForm";
import CreateRegionForm from "./RegionCreateForm";
const CreateStepOne = ({ change, query }) => {
  const { type } = useParams();
  //   region
  const { data } = useGet({
    url: "/storehouse/list/region",
    api: requestIMMUNO,
  });
  // center
  const { data: CenterData } = useGet({
    url: "/institutions/",
    api: requestIMMUNO,
  });
  return (
    <div className="flex items-center justify-center mt-[24rem]">
      <ItemWrapper
        className="w-[520px]"
        id={"where"}
        title="Qayerga chiqim amalga oshiriladi"
      >
        {type === "region" ? (
          <CreateRegionForm data={data} change={change} query={query} />
        ) : (
          <CreateCenterForm
            data={CenterData?.data}
            change={change}
            query={query}
          />
        )}
      </ItemWrapper>
    </div>
  );
};
export default CreateStepOne;

export const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImViODk3YWQ0MjRjYmQ0ZWNmY2MxMjliZDA5MWFiMDgyYzliYjU2YTlkNTYzZWQ5YTcyNzZkMjY1MGFjYWFmYjJmMGVmZDBiYWUwNDVkMDcwIn0.eyJhdWQiOiI5YWU2OWExMS0yYWUyLTQzYTctYTU0Yi1jYzVlYjBiOGE0ZjUiLCJqdGkiOiJlYjg5N2FkNDI0Y2JkNGVjZmNjMTI5YmQwOTFhYjA4MmM5YmI1NmE5ZDU2M2VkOWE3Mjc2ZDI2NTBhY2FhZmIyZjBlZmQwYmFlMDQ1ZDA3MCIsImlhdCI6MTcxMzE4NzQ1NCwibmJmIjoxNzEzMTg3NDU0LCJleHAiOjE3MTMxOTgyNTQsInN1YiI6ImJhNDE3YmYzLWI5ZDEtNDBhMS05MWYxLTMxMzIwYTU0ZTIwMSIsInNjb3BlcyI6W10sInVzZXJfaW5mbyI6eyJuYW1lIjoiVEVTVF9BTElZRVYgVEVTVC1PRElMSk9OIFRFU1QtTklHTUFUT1ZJQ0giLCJvcmdhbml6YXRpb24iOlt7InV1aWQiOiIxYWIyNGMzMi04NjA2LTQ3MjktYjUyNi0wYTU1MjhmNzNlZTUiLCJuYW1lIjoiU1NWYXppcmxpayIsImFjdGl2ZSI6dHJ1ZSwicHJhY3RpdGlvbmVyX3JvbGUiOlt7InV1aWQiOiI2ZDM4MTc5ZS05NzkwLTRmOWYtODFlOC1jYmU3NmIyNjhlYWIiLCJjb2RlIjoiMzY3In1dfV0sInByYWN0aXRpb25lciI6IjMzYzE3NmU5LTllOTAtNDVmMy1iYzkwLTI0ZDY2OTQwMzVlMSIsInJvbGVzIjpbImhlYWRfaW5wYXRpZW50IiwiaGVhZF9vdXRwYXRpZW50IiwiY2FyZGlvX3JlZ2lzdGFyIl19LCJjbGllbnRfaWQiOiJiYTQxN2JmMy1iOWQxLTQwYTEtOTFmMS0zMTMyMGE1NGUyMDEifQ.y5VP7E1AcEqyr0L_l1zG5GKEFrE746aViMnEb43-wdM8sVXFqcbDdMz1gU2WFOYD2E1_YXz3uVsdGJFVpJYegCm1U8l6mRYwpf868eE7BBPM74AcqI4aOhlubrsb1vzMlT2XLEL1is3hzi52nTEtBPkwiplAJq73CEhEQqqHmOrsjNmN8UWVcxVliLX9LPRbj4eYN20JtinDQTl3sAfAwSpdB7YUSgtPSIzrSKEbJbMMJwLXs86nHd1hI0Lw5uLRUrIPddqC0q9pU0EVUvnPLm40-iaCxf1HX_Y2oro7OKDJYXC0slVjDeBjYscxT9qjM6_gzCaIbadzn-TmXY7DAqnWX1rBmbSPuS7gX4tqq4AsQjnMbdbVJAPeUtDua75VF2AQDySgjg-LXiVC_xR0P9tHzfPDp0WNJlvZA81j3xQtHycRz1_8nvjH_m_DhX8qNYhjOrLaXEnIooBZyTbUkGNu_cruQxCG-ASXeYUUhXMoRYh6aPoeQUDAtreduIzBOx9J5wsdXpec0_7tsfBBrjxsxZhsNVSIrWNU5FgNVCt4NQ_1pJe1ceCW2yq_q7_DqLF1XtsmEGm45EfuFxwpocz73wrpPLVkyPkJHWNLnGrqD0gKkEd3a1DZ9Pe4LNXon-kFk5z1CYlWPh_9zUn5Gig63PwpSmH-in4qmXj1O-w";

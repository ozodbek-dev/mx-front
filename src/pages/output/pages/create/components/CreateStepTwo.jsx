import { Button } from "antd";
import { requestIMMUNO } from "api/request";
import Output from "assets/icon/Output";
import FixedBox from "components/fixed-box";
import ItemWrapper from "components/item-wrraper";
import SimpleTable from "components/simple-table";
import dayjs from "dayjs";
import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import RightMenu from "../../components/rightMenu";
import Fields from "./Fields";
import FileUpload from "./FileUpload";
const initialState = {
  medicine_name: 0,
  medicine_type: 0,
  dosage: 0,
  quantity: 0,
  made_date: null,
  expiration_date: null,
  series_number: "",
};
const CreateStepsTwo = ({ query }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { type } = useParams();
  const [files, setFiles] = useState([]);

  const [fields, setFields] = useState([
    {
      medicine_type: 0,
      childField: [initialState],
    },
  ]);
  // Conditon function -> deffirent region or center
  const conditionUrl = Condition(
    type,
    `/regions/${get(query, "tab", "0")}`,
    `/institutions/${get(query, "tab", "0")}`
  );
  const { data } = useGet({
    url: conditionUrl,
    api: requestIMMUNO,
  });
  const { mutate } = usePost();
  /**
   * Handles click event on the submit button
   * This function sends the data to the server
   * to create a new immunization output.
   */
  const handleClick = () => {
    // Create a formData object to send to the server
    const formData = new FormData();
    // Append the array of medicines to the form data
    formData.append(
      "medicine",
      JSON.stringify(fields.map((el) => el.childField).flat())
    );
    // Append the region or institution ID to the form data
    formData.append(Condition(type, "region", "institution"), "1");
    // Append the files array to the form data
    formData.append("files", JSON.stringify(files?.data));

    // Send a POST request to the server
    mutate({
      url: Condition(
        type,
        "/storehouse/expense/uzmedimpeks/region",
        "/storehouse/expense/uzmedimpeks/institution"
      ),
      data: formData,
      api: requestIMMUNO,

      // Callback function to handle successful response
      onSuccess: () => {
        // Display success toast message
        toast.success(t("Chiqim Qilindi"));
        // Navigate to the output page
        navigate("/output/immuno/");
      },

      // Callback function to handle error response
      onError: (err) => {
        // Display error toast message
        toast.error("Chiqim qilinmadi");
        // Display the error message
        toast.error(err.message);
      },
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className=" flex items-center justify-center mr-[16px]">
          <div className="w-[790px] mt-[24px]">
            <ItemWrapper
              className="mb-[20px]"
              title={"Qayerga chiqim amalga oshiriladi"}
              id="where"
            >
              <SimpleTable
                data={[
                  {
                    title: Condition(
                      type,
                      "Viloyat SSV",
                      "Transplantologiya markazi"
                    ),
                    value: Condition(
                      type,
                      get(data, "to_expense.name", "-"),
                      get(data, "storehouse.institution.name", "-")
                    ),
                  },
                  {
                    title: "Sana",
                    value: dayjs(new Date()).format("DD.MM.YYYY"),
                  },
                ]}
              />
            </ItemWrapper>
            <ItemWrapper title={"Dorilar"} id="drugs">
              <Fields fields={fields} setFields={setFields} />
            </ItemWrapper>
            <ItemWrapper
              className="mt-[20px]"
              title={"Fayl biriktirish"}
              id="docs"
            >
              <FileUpload setFiles={setFiles} files={files} />
            </ItemWrapper>
          </div>
        </div>
        <RightMenu className={"mt-[26px] top-[90px] w-[385px] h-[168px]"} />
      </div>
      <FixedBox rootClassName="w-full">
        <Button
          onClick={handleClick}
          className="[&_path]:fill-[#FFF] flex items-center bg-[#1464C0] h-[40px] text-[#FFF] text-[16px]  leading-[24px] font-semibold rounded-xl"
          icon={<Output width={20} height={20} />}
        >
          {t("Chiqim qilish")}
        </Button>
      </FixedBox>
    </div>
  );
};
export default CreateStepsTwo;

export const institutionToken =
  "m6IuuE37Brlh40GQhst74ZUY9OlyiJ66x4kiZpROio2LDKHQTmDZalg4m4S589UC0c1JC0v0j96gml-qYYWqYQ";
export const regionToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImViODk3YWQ0MjRjYmQ0ZWNmY2MxMjliZDA5MWFiMDgyYzliYjU2YTlkNTYzZWQ5YTcyNzZkMjY1MGFjYWFmYjJmMGVmZDBiYWUwNDVkMDcwIn0.eyJhdWQiOiI5YWU2OWExMS0yYWUyLTQzYTctYTU0Yi1jYzVlYjBiOGE0ZjUiLCJqdGkiOiJlYjg5N2FkNDI0Y2JkNGVjZmNjMTI5YmQwOTFhYjA4MmM5YmI1NmE5ZDU2M2VkOWE3Mjc2ZDI2NTBhY2FhZmIyZjBlZmQwYmFlMDQ1ZDA3MCIsImlhdCI6MTcxMzE4NzQ1NCwibmJmIjoxNzEzMTg3NDU0LCJleHAiOjE3MTMxOTgyNTQsInN1YiI6ImJhNDE3YmYzLWI5ZDEtNDBhMS05MWYxLTMxMzIwYTU0ZTIwMSIsInNjb3BlcyI6W10sInVzZXJfaW5mbyI6eyJuYW1lIjoiVEVTVF9BTElZRVYgVEVTVC1PRElMSk9OIFRFU1QtTklHTUFUT1ZJQ0giLCJvcmdhbml6YXRpb24iOlt7InV1aWQiOiIxYWIyNGMzMi04NjA2LTQ3MjktYjUyNi0wYTU1MjhmNzNlZTUiLCJuYW1lIjoiU1NWYXppcmxpayIsImFjdGl2ZSI6dHJ1ZSwicHJhY3RpdGlvbmVyX3JvbGUiOlt7InV1aWQiOiI2ZDM4MTc5ZS05NzkwLTRmOWYtODFlOC1jYmU3NmIyNjhlYWIiLCJjb2RlIjoiMzY3In1dfV0sInByYWN0aXRpb25lciI6IjMzYzE3NmU5LTllOTAtNDVmMy1iYzkwLTI0ZDY2OTQwMzVlMSIsInJvbGVzIjpbImhlYWRfaW5wYXRpZW50IiwiaGVhZF9vdXRwYXRpZW50IiwiY2FyZGlvX3JlZ2lzdGFyIl19LCJjbGllbnRfaWQiOiJiYTQxN2JmMy1iOWQxLTQwYTEtOTFmMS0zMTMyMGE1NGUyMDEifQ.y5VP7E1AcEqyr0L_l1zG5GKEFrE746aViMnEb43-wdM8sVXFqcbDdMz1gU2WFOYD2E1_YXz3uVsdGJFVpJYegCm1U8l6mRYwpf868eE7BBPM74AcqI4aOhlubrsb1vzMlT2XLEL1is3hzi52nTEtBPkwiplAJq73CEhEQqqHmOrsjNmN8UWVcxVliLX9LPRbj4eYN20JtinDQTl3sAfAwSpdB7YUSgtPSIzrSKEbJbMMJwLXs86nHd1hI0Lw5uLRUrIPddqC0q9pU0EVUvnPLm40-iaCxf1HX_Y2oro7OKDJYXC0slVjDeBjYscxT9qjM6_gzCaIbadzn-TmXY7DAqnWX1rBmbSPuS7gX4tqq4AsQjnMbdbVJAPeUtDua75VF2AQDySgjg-LXiVC_xR0P9tHzfPDp0WNJlvZA81j3xQtHycRz1_8nvjH_m_DhX8qNYhjOrLaXEnIooBZyTbUkGNu_cruQxCG-ASXeYUUhXMoRYh6aPoeQUDAtreduIzBOx9J5wsdXpec0_7tsfBBrjxsxZhsNVSIrWNU5FgNVCt4NQ_1pJe1ceCW2yq_q7_DqLF1XtsmEGm45EfuFxwpocz73wrpPLVkyPkJHWNLnGrqD0gKkEd3a1DZ9Pe4LNXon-kFk5z1CYlWPh_9zUn5Gig63PwpSmH-in4qmXj1O-w";
function Condition(type = "", regiondata = null, centerdata = null) {
  if (type === "region") return regiondata;
  else return centerdata;
}

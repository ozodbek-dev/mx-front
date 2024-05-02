import { Button, Steps } from "antd";
import BackArrowIcon from "assets/icon/BackArrowIcon";
import useParamsall from "hooks/useParamsall";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CreateStepOne from "./components/CreateStepOne";
import CreateStepsTwo from "./components/CreateStepTwo";

const CreateOutput = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { query, change } = useParamsall(["tab", "open"]);
  return (
    <div className="p-20">
      <div className="flex items-center gap-[2rem]">
        <Button
          onClick={() => navigate("/output/immuno/")}
          type="primary"
          className="flex items-center bg-[#DDEBFB] hover:!bg-[#DDddFb] !text-[#1464C0] !rounded-[12px] h-[40px]"
          icon={<BackArrowIcon />}
        >
          {t("Ortga")}
        </Button>
        <h1 className="font-semibold text-[#111111] text-[24px] min-w-max">
          {t("Chiqim qilish")}
        </h1>
      </div>
      <div className="flex justify-center">
        <Steps
          className="w-[520px] "
          current={get(query, "open", "") && get(query, "tab", "") ? 1 : 0}
          labelPlacement="vertical"
          items={[
            {
              title: "",
            },
            {
              title: "",
            },
          ]}
        />
      </div>

      {get(query, "open", "") && get(query, "tab", "") ? (
        <CreateStepsTwo query={query} />
      ) : (
        <CreateStepOne change={change} query={query} />
      )}
    </div>
  );
};
export default CreateOutput;

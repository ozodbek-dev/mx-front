import useGet from "hooks/useGet";
import usePost from "hooks/usePost";
import { get } from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Createorderspart from "./components";
import "./singlebuy.scss";

function Createorder() {
  const navigate = useNavigate();
  const [down, setDown] = useState([]);
  const [edittool, setEdittol] = useState(false);
  const [opentool, setOpentool] = useState(false);
  const [filetool, setFiletool] = useState([]);
  const [sendevent, setSendevent] = useState(false);
  const [fields, setFields] = useState({});
  const [amount, setAmount] = useState({});
  const { commonmoney = 0, separetademoney = 0 } = amount;

  const { mutate } = usePost();
  const {
    data: { data },
  } = useGet({
    url: "/ariza/vositalar/",
  });

  function addFiles(e) {
    setDown([
      ...down,
      {
        filename: e.target.value,
        fil: e.target.files[0],
      },
    ]);
  }
  function delFiles(index) {
    let sss = [];
    sss.push(...down);
    sss.splice(index, 1);
    setDown(sss);
  }

  const handleChange = (e) => {
    typeof e === "number"
      ? setFields({
          ...fields,
          vosita_nomi: e,
        })
      : setFields({
          ...fields,
          [e.target.name]: e.target.value,
        });
  };
  const Send = (e) => {
    e.preventDefault();
    if (get(fields, "shartnoma_qilingan_sana")) {
      const formData = new FormData();
      for (let [key, value] of Object.entries(fields)) {
        formData.append(key, value);
      }
      formData.append("shartnomaning_umumiy_pul_miqdori", commonmoney);
      formData.append("ajratilgan_pul_miqdori", separetademoney);
      formData.append("file", down.length > 0 ? get(down, "[0].fil") : null);
      mutate({
        url: "/omborxona/buyurtma/yaratish",
        data: formData,
        onSuccess: () => {
          if (opentool) {
            toast.success("Buyurtma Yaratildi!");
            setTimeout(() => {
              navigate(-1);
            }, 1500);
          }
        },
        onError: () => {
          toast.error("Buyurtma Yaratilmadi!");
        },
      });
      setTimeout(() => {
        const formDatas = new FormData();
        for (let [key, value] of Object.entries(fields)) {
          formDatas.append(key, value);
        }
        formDatas.append("file", get(filetool, "[0].typefile"));
        mutate({
          url: "/omborxona/buyurtma/vositalari",
          data: formDatas,
          onSuccess: () => {
            toast.success("Vosita Yaratildi!");
          },
          onError: () => {
            toast.error("Vosita Qo'shilmadi!");
          },
        });
      }, 1000);
      setDown([]);
    } else {
      toast.warning("Iltimos Qolip Ketgan Maydonlarni To'ldiring!");
    }
    setSendevent(true);
  };
  const Removetool = () => {
    setFields((prev) => ({
      ...prev,
      vosita_turi: null,
      vosita_nomi: null,
      olchov_birligi: "",
      vosita_miqdori: "",
      omborxona_nomi: "",
      olchov_birligi_narxi: "",
    }));
    setOpentool(false);
  };

  return (
    <>
      <Createorderspart
        Send={Send}
        Removetool={Removetool}
        handleChange={handleChange}
        delFiles={delFiles}
        addFiles={addFiles}
        edittool={edittool}
        setEdittol={setEdittol}
        fields={fields}
        filetool={filetool}
        filterTool={data?.find((el) => el?.id === fields?.vosita_turi)}
        data={data}
        sendevent={sendevent}
        setFiletool={setFiletool}
        opentool={opentool}
        setOpentool={setOpentool}
        down={down}
        setAmount={setAmount}
        commonmoney={commonmoney}
        separetademoney={separetademoney}
      />
    </>
  );
}
export default Createorder;

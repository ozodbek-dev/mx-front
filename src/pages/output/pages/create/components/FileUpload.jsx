import { Button } from "antd";
import { requestIMMUNO } from "api/request";
import pdfDoc from "assets/icon/pdf_doc.svg";
import scrip from "assets/icon/scripka.svg";
import TrashIcon from "assets/icon/TrashIcon";
import usePost from "hooks/usePost";
import { get } from "lodash";

import { useTranslation } from "react-i18next";

const FileUpload = ({ setFiles, files, remove }) => {
  const { mutate } = usePost();
  const handleFileChange = (e) => {
    const formData = new FormData();
    const fileList = e.target.files;

    formData.append("file", e.target.files[0]);
    mutate({
      url: "/file/upload/",
      api: requestIMMUNO,
      data: formData,
      onSuccess: (res) => {
        setFiles({
          ...files,
          data: res.data,
        });
      },
    });
  };

  const { t } = useTranslation();
  return (
    <div>
      {files?.data?.length > 0 ? (
        files?.data?.map((item, index) => {
          return (
            <div key={index} className="sarflov_block_download_file">
              <label className="input_tyle_download">
                <img src={pdfDoc} alt="" className="label_img" />
                {item.file_name}
                <div className="close_file">
                  <Button
                    onClick={() => {
                      const newFile = [...files];
                      newFile.splice(index, 1);
                      setFiles(newFile);
                    }}
                    className="border-none"
                    icon={<TrashIcon fill={"red"} />}
                  ></Button>
                </div>
              </label>
            </div>
          );
        })
      ) : (
        <label className={"input_tyle_download fix-file"} id="f1">
          <input
            onChange={(e) => handleFileChange(e)}
            value={files}
            className="visually-hidden"
            id="f1"
            type="file"
          />
          <img
            style={{
              display: "block",
              margin: "0 auto",
              marginBottom: "14px",
            }}
            src={scrip}
            alt="..."
          />
          <div className="flex items-center flex-col">
            {t("Faylni bu yerga tashlang yoki biriktiring")}
            <span className="text-sm font-normal">{t("(maksimal 5 mb)")}</span>
          </div>
        </label>
      )}
    </div>
  );
};
export default FileUpload;

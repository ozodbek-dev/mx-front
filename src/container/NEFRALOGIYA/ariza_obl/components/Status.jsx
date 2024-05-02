import React from "react";
import "../ariza.scss";
import ChecksIcon from "../../../../assets/icon/Checks.svg";
import CircleIcon from "../../../../assets/icon/new.svg";
import {useTranslation} from "react-i18next";

const StatusBtn = ({children, status}) => {
  switch (status) {
    case "Yangi":
      return (
        <button
          className={`notification_btn new_notification
      }`}
        >
          <img src={CircleIcon} alt="icon" />
          {children}
        </button>
      );
    case "O'qildi":
      return (
        <button
          className={`notification_btn read_notification
    }`}
        >
          <img src={ChecksIcon} alt="icon" />
          {children}
        </button>
      );
    default:
      return (
        <button
          className={`notification_btn
}`}
        >
          {children}
        </button>
      );
  }
};
export default function Status({status, label}) {
  const { t } = useTranslation();
  return (
   <StatusBtn status={status}>
     { label ? label:t(status)}
   </StatusBtn>
  );
}

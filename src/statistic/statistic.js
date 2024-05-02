import "./statistic.scss";
import React, { useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import useGet from "hooks/useGet";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statis() {
  const { t } = useTranslation();
  const { data: Data } = useGet({ url: "stats/" });
  console.log("🚀 ~ file: statistic.js:39 ~ Statis ~ Data:", Data);
  const labels = Data.length > 0 ? Data?.map((el) => el?.viloyat) : [];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: t("bildirishnoma.single.vaertikal"),
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: t("shifokor.bemorlar"),
        backgroundColor: "#1464C0",
        data: Data?.map((el) => el?.bolalar),
      },
      {
        label: t("shifokor.shifokorlar"),
        backgroundColor: "#9AC4F4",
        data: Data?.map((el) => el?.shifokorlar),
      },
      {
        label: t("Muassasalar"),
        backgroundColor: "#070a4d",
        data: Data?.map((el) => el?.muassasalar),
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <>
      <h2 className="chart-head">{t("bildirishnoma.single.vaertikal")}</h2>
      <Bar className="chart-width" options={options} data={data} />
    </>
  );
}
export default Statis;

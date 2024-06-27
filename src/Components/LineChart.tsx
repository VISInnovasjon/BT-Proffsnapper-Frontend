import React from "react";
import { economicCodes } from "../data/economicCodes";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Skeleton from "@mui/material/Skeleton";

Chart.register(...registerables);

type ValueRecord = Record<string, number | string>;

type CollectedValues = Record<string, ValueRecord>;

type YearlyValues = Record<string, CollectedValues | number>;

type KeyedValues = Record<string, YearlyValueObject[]>;

type ValueObject = {
  Value: number;
  Delta: number;
  Description: string;
  UniqueCompanyCount: number;
} & ValueRecord;
type CodeValueObject = {
  [key: string]: ValueObject;
} & CollectedValues;

type YearlyValueObject = {
  Year: number;
  values: CodeValueObject;
} & YearlyValues;

interface LineChartComponentProps {
  //lage en interface som er bÃ¥de lik som JSON ser ut og en som er lik linechartData.
  data: KeyedValues;
  selectedAgeGroups: string[];
  selectedFases: string[];
  selectedBrands: string[];
  ecoKey: string;
  monetaryKey: string;
  yearRange: number[];
  loading: boolean;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  loading,
  selectedAgeGroups,
  selectedFases,
  selectedBrands,
  ecoKey,
  monetaryKey,
  yearRange,
}) => {
  const selectedKeys = [
    "Total Gjennomsnitt",
    ...selectedAgeGroups,
    ...selectedFases,
    ...selectedBrands,
  ];

  const colors = [
    "#2E5F65",
    "#FF5733",
    "#332006",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#47100D",
    "#053D40",
    "#800000",
    "#FF00FF",
    "#008080",
    "#0000FF",
    "#620E22",
    "#91770C",
    "#4F4507",
    "#0A2E27",
    "#4B0082",
    "#FF4500",
    "#650707",
    "#1F2176",
    "#8A2BE2",
  ];
  const SelectedValue = economicCodes[ecoKey]; //Setter verdien i SelectedValue (H2)

  const chartData = //lage en metode som bygger om JSON til linechartData.
    data[selectedKeys[0]] != undefined //selectedKeys.length > 0
      ? yearRange.map((_, idx) => {
          const dataPoint: { [key: string]: number | string | null } = {
            year: yearRange[idx],
          };
          selectedKeys.forEach((key) => {
            const entry = data[key].find(
              (entry) => entry.Year === yearRange[idx]
            );
            const point =
              entry == undefined
                ? null
                : entry.values == undefined
                ? null
                : entry.values[ecoKey] == undefined
                ? null
                : entry.values[ecoKey][monetaryKey] == undefined
                ? null
                : entry.values[ecoKey][monetaryKey];
            dataPoint[key] = point === null ? point : (point as number) / 1000;
            dataPoint.AntallCompanies =
              entry?.values[ecoKey].UniqueCompanyCount ?? null;
          });
          console.log(dataPoint);
          return dataPoint;
        })
      : undefined;
  console.log(chartData);
  console.log(selectedKeys);
  const labels = chartData?.map((item) => item.year);
  const currentYear = new Date().getFullYear();
  const datasets = selectedKeys.map((key, index) => {
    return {
      label: `${key}`,
      tension: 0.5,

      data: chartData?.map((item) => ({
        x: item.year,
        y: item[key],
        AntallCompanies: item.AntallCompanies,
      })),
      borderColor: colors[index % colors.length],
      segment: {
        borderDash: (ctx: any) => {
          const isLastSegment =
            ctx.p0.raw.x === currentYear - 2 &&
            ctx.p1.raw.x === currentYear - 1;
          console.log(isLastSegment);
          return isLastSegment ? [6, 6] : [];
        },
      },
      spanGaps: true,
    };
  });

  const dataComponents = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.raw.y;
            const antallCompanies = context.raw.AntallCompanies;
            return `${label}: ${value} (Antall bedrifter: ${antallCompanies})`;
          },
        },
      },
    },

    elements: {
      point: {
        radius: 5,
        backgroundColor: "#DFFBF5",
        borderColor: "rgba(75, 192, 192, 0.5)",
      },
      line: {
        tension: 0.4,
        borderWidth: 3,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "#DFFBF5",
      },
    },

    scales: {
      y: {
        title: {
          display: true,
          text: "Mill. NOK.",
          color: "#2E5F65",
          font: {
            family: "SystemUi",
            size: 18,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 10 },
        },
        grid: {
          color: (context: any) => {
            if (context.tick.value === 0) {
              return "#2E5F65";
            }
            return "#e0e0e0";
          },
          lineWidth: (context: any) => {
            if (context.tick.value === 0) {
              return 2;
            }
            return 1;
          },
        },
      },
    },
  };

  return (
    <div className=" relative w-full shadow-lg rounded-lg text-[#2E5F65]">
      <h2 className="pb-4">{SelectedValue}</h2>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-[#AED9E0] bg-opacity-75 z-10">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>
      )}
      <Line data={dataComponents} options={options} />
    </div>
  );
};

export default LineChartComponent;

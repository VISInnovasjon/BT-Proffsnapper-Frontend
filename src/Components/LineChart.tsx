import React from "react";
import { economicCodes } from "../data/economicCodes";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export type ValueRecord = Record<string, number | string>;

export type CollectedValues = Record<string, ValueRecord>;

export type YearlyValues = Record<string, CollectedValues | number>;

export type KeyedValues = Record<string, YearlyValueObject[]>;

export type ValueObject = {
  Value: number;
  Delta: number;
  Description: string;
  UniqueCompanyCount: number;
} & ValueRecord;
type CodeValueObject = {
  [key: string]: ValueObject;
} & CollectedValues;

export type YearlyValueObject = {
  Year: number;
  values: CodeValueObject;
} & YearlyValues;

export interface LineChartComponentProps {
  //lage en interface som er både lik som JSON ser ut og en som er lik linechartData.
  data: KeyedValues;
  selectedAgeGroups: string[];
  selectedFases: string[];
  selectedBrands: string[];
  ecoKey: string;
  monetaryKey: string;
  yearRange: number[];
}
type DataPoint = {
  year: number;
  [key: string]:
    | {
        value: number | null;
        numberOfCompanies: number | null;
      }
    | number;
};

const objectVerifier = (
  obj: any
): obj is { value: number; numberOfCompanies: number } => {
  return (
    typeof obj === "object" && "value" in obj && "numberOfCompanies" in obj
  );
};

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
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
    "#000111",
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
          const dataPoint: DataPoint = {
            year: yearRange[idx],
          };
          selectedKeys.forEach((key) => {
            const entry = data[key]?.find(
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
            const value = point === null ? point : (point as number) / 1000;
            const numberOfCompanies =
              entry?.values[ecoKey]?.UniqueCompanyCount ?? 0;
            dataPoint[key] = {
              value: value,
              numberOfCompanies: numberOfCompanies,
            };
          });
          return dataPoint;
        })
      : undefined;
  console.log(chartData);
  const labels = chartData?.map((item) => item.year);
  const currentYear = new Date().getFullYear();
  const datasets = selectedKeys.map((key, index) => {
    return {
      label: `${key}`,
      tension: 0.4,
      data: chartData?.map((item) => {
        let obj = item[key];
        if (objectVerifier(obj))
          return {
            x: item.year,
            y: obj.value,
            AntallCompanies: obj.numberOfCompanies,
          };
      }),
      borderColor: colors[index % colors.length],
      segment: {
        borderDash: (ctx: any) => {
          const isLastSegment =
            ctx.p0.raw.x === currentYear - 2 &&
            ctx.p1.raw.x === currentYear - 1;
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
    aspectRatio: 3,
    animation: {
      duration: 500,
    },
    elements: {
      point: {
        borderWidth: 4,
      },
    },
    plugins: {
      legend: {
        position: "top" as "top",
        labels: {
          font: {
            family: "system-ui",
            size: 14,
          },
          usePointStyle: true,
          pointStyle: "circle",
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
    scales: {
      y: {
        title: {
          display: true,
          text: "I mill NOK.",
          color: "#000111",
          font: {
            family: "System-ui",
            size: 20,
            weight: "bold" as "bold",
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
        grid: {
          color: (context: any) => {
            if (context.tick.value === 0) {
              return "#000111";
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
    <div className="text-1vw text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[#1e2222] flex flex-col justify-center item">
      <div>
        <h2>{SelectedValue}</h2>
        <Line data={dataComponents} options={options} />
      </div>
    </div>
  );
};

export default LineChartComponent;

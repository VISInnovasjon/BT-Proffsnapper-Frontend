import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { CircularProgress } from "@mui/material";
import "@fontsource/poppins";

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

interface LineChartComponentProps {
  //lage en interface som er bÃ¥de lik som JSON ser ut og en som er lik linechartData.
  data: KeyedValues;
  selectedAgeGroups: string[];
  selectedFases: string[];
  selectedBrands: string[];
  selectedSexes: string[];
  ecoKey: string;
  monetaryKey: string;
  yearRange: number[];
  loading: boolean;
  economicCodes: Record<string, string>;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any
): obj is { value: number; numberOfCompanies: number } => {
  return (
    typeof obj === "object" && "value" in obj && "numberOfCompanies" in obj
  );
};

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  loading,
  selectedAgeGroups,
  selectedFases,
  selectedBrands,
  selectedSexes,
  ecoKey,
  monetaryKey,
  yearRange,
  economicCodes,
}) => {
  const selectedKeys = [
    "Total",
    ...selectedAgeGroups,
    ...selectedFases,
    ...selectedBrands,
    ...selectedSexes,
  ];

  const colors = [
    "#022447",
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
  const [SelectedValue, setSelectedValue] = useState<string>(
    economicCodes[ecoKey]
  );

  useEffect(() => {
    setSelectedValue(economicCodes[ecoKey]);
  }, [economicCodes, ecoKey]);

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
  const labels = chartData?.map((item) => item.year);
  const currentYear = new Date().getFullYear();
  const datasets = selectedKeys.map((key, index) => {
    return {
      label: `${key}`,
      tension: 0.5,
      data: chartData?.map((item) => {
        const obj = item[key];
        if (objectVerifier(obj))
          return {
            x: item.year,
            y: obj.value,
            AntallCompanies: obj.numberOfCompanies,
          };
      }),
      borderColor: colors[index % colors.length],
      segment: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        borderDash: (ctx: any) => {
          const isLastSegment =
            ctx.p0.raw.x === currentYear - 2 &&
            ctx.p1.raw.x === currentYear - 1;
          return isLastSegment ? [4, 4] : [];
        },
      },
      spanGaps: true,
    };
  });

  const dataComponents = {
    labels,
    datasets,
  };

  const plugin = {
    id: "customCanvasBackgroundColor",
    // @ts-expect-error args any must be included for function to run.
    beforeDraw: (chart: any, args: any, options: any) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    aspectRatio: 3,
    plugins: {
      customCanvasBackgroundColor: {
        color: "#f8f9fa",
      },
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          font: {
            size: 12,
          },

          usePointStyle: true,
          pointStyle: "circle",
        },
      },

      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        borderWidth: 3,
        backgroundColor: "#DADDE2",
        borderColor: "#2E5F65",
      },
      line: {
        tension: 0.5,
        borderWidth: 3,
        borderColor: "#2E5F65",
        backgroundColor: "#DFFBF5",
      },
    },

    scales: {
      y: {
        title: {
          display: true,
          text: "I mill NOK.",
          color: "#1e2222",
          font: {
            family: "Poppins, Arial, sans-serif",
            size: 16,
            weight: "normal" as const,
            lineHeight: 1.2,
          },
          padding: { top: 0, left: 0, right: 0, bottom: 10 },
        },

        grid: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: (context: any) => {
            if (context.tick.value === 0) {
              return "#000111";
            }
            return "#e0e0e0";
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="px-4  w-full shadow-md rounded-md text-[#1e2222]">
      <h2 className="pb-2">{SelectedValue}</h2>

      {loading && <CircularProgress />}
      <Line data={dataComponents} options={options} plugins={[plugin]} />
    </div>
  );
};

export default LineChartComponent;

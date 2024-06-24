import React from "react";
import { economicCodes } from "../data/economicCodes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  ReferenceLine,
} from "recharts";

type ValueRecord = Record<string, number | string>;

type CollectedValues = Record<string, ValueRecord>;

type YearlyValues = Record<string, CollectedValues | number>;

type KeyedValues = Record<string, YearlyValueObject[]>;

type ValueObject = {
  Value: number;
  Delta: number;
  Description: string;
} & ValueRecord;
type CodeValueObject = {
  [key: string]: ValueObject;
} & CollectedValues;

type YearlyValueObject = {
  Year: number;
  values: CodeValueObject;
} & YearlyValues;

interface LineChartComponentProps {
  //lage en interface som er både lik som JSON ser ut og en som er lik linechartData.
  data: KeyedValues;
  selectedAgeGroups: string[];
  selectedFases: string[];
  selectedBrands: string[];
  ecoKey: string;
  monetaryKey: string;
  yearRange: number[];
}

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

  const ageGroupColors = [
    "#FF5733",
    "#332006",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#47100D",
    "#053D40",
  ];
  const faseColors = [
    "#800000",
    "#FF00FF",
    "#008080",
    "#0000FF",
    "#620E22",
    "#91770C",
  ];
  const brandColors = [
    "#4F4507",
    "#0A2E27",
    "#4B0082",
    "#FF4500",
    "#650707",
    "#1F2176",
    "#8A2BE2",
  ];

  const years = Array.from({ length: 10 }, (_, idx) => 2014 + idx);
  const defaultData = years.map((year, idx) => ({ year, Default: idx * 10 }));

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
          });
          console.log(dataPoint);
          return dataPoint;
        })
      : defaultData;

  return (
    <div className="text-1vw text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[#1e2222]">
      <h2 className="">{SelectedValue}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2222" />
          <XAxis dataKey="year" />
          <YAxis>
            <Label
              value="MILL. NOK"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
              fill="#1e2222"
            />
          </YAxis>
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#010101" strokeWidth={2} />
          {selectedKeys.length === 0 && (
            <Line type="monotone" dataKey="Default" stroke="#c48484" />
          )}

          <Line
            key={"Total Gjennomsnitt"}
            strokeWidth={3}
            type="monotone"
            animationDuration={500}
            dataKey={"Total Gjennomsnitt"}
            stroke="#013B02"
          />

          {selectedAgeGroups.map((key, index) => (
            <Line
              strokeWidth={3}
              key={key}
              type="monotone"
              animationDuration={500}
              dataKey={key}
              stroke={ageGroupColors[index % brandColors.length]}
            />
          ))}
          {selectedFases.map((key, index) => (
            <Line
              strokeWidth={3}
              key={key}
              type="monotone"
              animationDuration={500}
              dataKey={key}
              stroke={faseColors[index % brandColors.length]}
            />
          ))}
          {selectedBrands.map((key, index) => (
            <Line
              strokeWidth={3}
              key={key}
              type="monotone"
              animationDuration={500}
              dataKey={key}
              stroke={brandColors[index % brandColors.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;

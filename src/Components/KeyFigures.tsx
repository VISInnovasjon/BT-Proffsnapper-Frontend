import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

type KeyFigures = {
  text: string;
  number: number;
};
const fetchAndPushData = async (url: string, resultArr: KeyFigures[]) => {
  const response = await fetch(url);
  const result: KeyFigures = await response.json();
  resultArr.push(result);
};

const KeyFigures: React.FC = () => {
  const { language } = useLanguage();
  const [keyFigureData, setKeyFigureData] = useState<KeyFigures[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultArr: KeyFigures[] = [];
      await fetchAndPushData(
        "http://192.168.9.78:5000" + "/api/companycount",
        resultArr
      );
      await fetchAndPushData(
        "http://192.168.9.78:5000" + "/api/totalturnover",
        resultArr
      );
      await fetchAndPushData(
        "http://192.168.9.78:5000" + "/api/workercount",
        resultArr
      );
      await fetchAndPushData(
        "http://192.168.9.78:5000" + "/api/workyear",
        resultArr
      );
      setKeyFigureData(resultArr);
    };

    fetchData();
  }, []);

  return (
    <div className="mb-10 flex flex-col items-center justify-center p-4">
      <h1 className="my-10 text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
        {translations[language].keyFiguresHeader}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 my-6 w-full max-w-8xl">
        {keyFigureData.map((data, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow-lg text-center"
          >
            <h3 className="text-2xl font-bold mb-4 marker-underline">
              {data.text}
            </h3>
            <CountUp
              end={data.number}
              duration={3}
              className="text-3xl font-bold text-red-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFigures;

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

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
  const [keyFigureData, setKeyFigureData] = useState<KeyFigures[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultArr: KeyFigures[] = [];
      await fetchAndPushData("/api/companycount", resultArr);
      await fetchAndPushData("/api/totalturnover", resultArr);
      await fetchAndPushData("/api/workercount", resultArr);
      await fetchAndPushData("/api/workyear", resultArr);
      setKeyFigureData(resultArr);
    };

    fetchData();
  }, []);

  return (
    <div className="mb-10 flex flex-col items-center justify-center p-4">
      <h1 className="my-10 text-5xl font-bold tracking-wide">Key Figures</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 my-6 w-full max-w-6xl">
        {keyFigureData.length > 0
          ? keyFigureData.map((data, index) => (
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
                  className="text-2xl font-bold text-red-500"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default KeyFigures;

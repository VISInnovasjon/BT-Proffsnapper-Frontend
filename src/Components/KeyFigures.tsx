import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const KeyFigures: React.FC = () => {
  const keyFigureData = [
    { text: "Årsverk", number: 1234 },
    { text: "Arbeidsplasser", number: 5678 },
    { text: "Total Omsetning", number: 98765 },
    { text: "Antall Bedrifter", number: 4321 },
  ];

  const [figures, setFigures] = useState(keyFigureData.map(() => 0));

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setFigures(keyFigureData.map((data) => data.number));
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div className="mb-10 flex flex-col items-center justify-center p-4">
      <h1 className="my-10 text-5xl font-bold tracking-wide">Key Figures</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 my-6 w-full max-w-6xl">
        {keyFigureData.map((data, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow-lg text-center"
          >
            <h3 className="text-2xl font-bold mb-4 marker-underline">
              {data.text}
            </h3>
            <CountUp
              end={figures[index]}
              duration={3}
              className="text-2xl font-bold text-red-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFigures;

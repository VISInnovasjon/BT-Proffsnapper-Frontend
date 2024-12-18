import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useLanguage } from "./LanguageContext";
import { CircularProgress } from "@mui/material";

type KeyFigureProps = {
  endYear: number;
  startYear: number;
};

type KeyFigures = {
  text: string;
  number: number;
};
const fetchAndPushData = async (
  url: string,
  language: string,
  resultArr: KeyFigures[],
  endYear: string,
  startYear: string
) => {
  const searchParams = new URLSearchParams({
    EndYear: endYear,
    StartYear: startYear,
    Language: language,
  });
  const response = await fetch(url + "?" + searchParams.toString());
  const result: KeyFigures = await response.json();
  resultArr.push(result);
};

const KeyFigures: React.FC<KeyFigureProps> = (props) => {
  const { language, languageSet } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [keyFigureData, setKeyFigureData] = useState<KeyFigures[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (keyFigureData.length === 0) setLoading(true);
      const resultArr: KeyFigures[] = [];

      await fetchAndPushData(
        import.meta.env.VITE_API_COMPANYCOUNT_URL,
        language,
        resultArr,
        props.endYear.toString(),
        props.startYear.toString()
      );
      await fetchAndPushData(
        import.meta.env.VITE_API_TOTALTURNOVER_URL,
        language,
        resultArr,
        props.endYear.toString(),
        props.startYear.toString()
      );
      await fetchAndPushData(
        import.meta.env.VITE_API_WORKERCOUNT_URL,
        language,
        resultArr,
        props.endYear.toString(),
        props.startYear.toString()
      );
      await fetchAndPushData(
        import.meta.env.VITE_API_WORKYEAR_URL,
        language,
        resultArr,
        props.endYear.toString(),
        props.startYear.toString()
      );
      await fetchAndPushData(
        import.meta.env.VITE_API_TOTALCOMPANYCOUNT_URL,
        language,
        resultArr,
        props.endYear.toString(),
        props.startYear.toString()
      );
      try {
        setKeyFigureData(resultArr);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyFigureData.length, props.endYear, props.startYear, language]);

  return (
    <div className="mb-10 flex flex-col items-center px-4 ">
      <h1 className="my-2 md:my-6 text-2xl md:text-4xl lg:text-4xl font-bold tracking-wide">
        {languageSet.keyFiguresHeader}
      </h1>

      <h3 className=" md:my-3 text-xl md:text-2xl lg:text-2xl font-bold tracking-wide">
        {`${languageSet.keyFiguresSubHeader} ${props.endYear}.`}
      </h3>
      {loading && <CircularProgress />}
      <div className="flex flex-col justify-center  lg:flex-row lg:justify-between  gap-4 my-6 w-full max-w-8xl">
        {keyFigureData.map((data, index) => (
          <div
            key={index}
            className="bg-white py-4 rounded-md px-4 shadow-lg text-center"
          >
            <h3 className="text-base md:text-base  lg:text-lg  font-bold mb-4 marker-underline">
              {data.text}
            </h3>
            <CountUp
              end={data.number}
              duration={3}
              className="text-2xl lg:text-3xl font-bold text-red-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFigures;

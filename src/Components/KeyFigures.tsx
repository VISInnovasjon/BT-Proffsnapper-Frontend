import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";
import { CircularProgress } from "@mui/material";

type KeyFigureProps = {
  year: number;
};

type KeyFigures = {
  text: string;
  number: number;
};
const fetchAndPushData = async (
  url: string,
  resultArr: KeyFigures[],
  lang: string,
  endYear: string
) => {
  const searchParams = new URLSearchParams({
    Language: lang,
    Year: endYear.toString(),
  });
  const response = await fetch(url + "?" + searchParams.toString());
  const result: KeyFigures = await response.json();
  resultArr.push(result);
};

const KeyFigures: React.FC<KeyFigureProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const [keyFigureData, setKeyFigureData] = useState<KeyFigures[]>([]);
  console.log(props.year);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resultArr: KeyFigures[] = [];

      await fetchAndPushData(
        import.meta.env.VITE_API_COMPANYCOUNT_URL,
        resultArr,
        language,
        props.year.toString()
      );
      await fetchAndPushData(
        import.meta.env.VITE_API_TOTALTURNOVER_URL,
        resultArr,
        language,
        props.year.toString()
      );
      await fetchAndPushData(
        import.meta.env.VITE_API_WORKERCOUNT_URL,
        resultArr,
        language,
        props.year.toString()
      );
      await fetchAndPushData(
        import.meta.env.VITE_API_WORKYEAR_URL,
        resultArr,
        language,
        props.year.toString()
      );
      try {
        setKeyFigureData(resultArr);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language, props.year]);

  return (
    <div className="mb-10 flex flex-col items-center px-4 ">
      <h1 className="my-2 md:my-6 text-2xl md:text-4xl lg:text-4xl font-bold tracking-wide">
        {translations[language].keyFiguresHeader}
      </h1>

      <h3 className="my-1.5 md:my-3 text-1xl md:text-1xl lg:text-1xl font-bold tracking-wide">
        {`${translations[language].keyFiguresSubHeader} ${props.year}.`}
      </h3>
      {loading && <CircularProgress />}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6 w-full max-w-8xl">
        {keyFigureData.map((data, index) => (
          <div
            key={index}
            className="bg-white py-4 rounded shadow-lg text-center"
          >
            <h3 className="text-base md:text-lg  lg:text-xl  font-bold mb-4 marker-underline">
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

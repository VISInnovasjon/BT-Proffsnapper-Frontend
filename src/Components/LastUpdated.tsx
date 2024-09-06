import React, { useEffect, useState } from "react";

type TextStylingProp = {
  className: string;
};

export const LastUpdatedText: React.FC<TextStylingProp> = ({ className }) => {
  const [updateText, setUpdateText] = useState<string>();
  useEffect(() => {
    const fetchDateText = async () => {
      const url = import.meta.env.VITE_API_UPDATEDATE_URL;
      const response = await fetch(url);
      const result = await response.json();
      setUpdateText(result.text);
    };
    fetchDateText();
  }, []);
  return <p className={className}>{updateText}</p>;
};

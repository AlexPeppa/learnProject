import React, { useEffect, useState } from "react";

export const Timer = ({ carCode }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      setSeconds((seconds) => {
        if (seconds < 60) {
          return seconds + 1;
        } else {
          setSeconds(0);
          setMinutes((minutes) => minutes + 1);
        }
      });
    };

    let timeId = setInterval(updateTime, 100);
    return () => {
      clearInterval(timeId);
      setSeconds(0);
      setMinutes(0);
    };
  }, [carCode]);

  return (
    <div>
      {minutes} : {seconds}
    </div>
  );
};

import { useEffect, useState } from "react";

export const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      setSeconds((seconds) => seconds < 60 ? seconds + 1 : (setSeconds(0), setMinutes((minutes) => minutes + 1)))
    };
    let timeId = setInterval(updateTime, 100);
    return () => {
      clearInterval(timeId);
      setSeconds(0)
      setMinutes(0)
    };
  }, [props]);

  return (
    <div>
      {minutes} : {seconds}
    </div>
  );
};

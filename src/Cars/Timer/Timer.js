import { useEffect, useState } from "react";

export const Timer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

  const updateSeconds = () => {
    setSeconds( (seconds)=> seconds <=60 ? seconds +1 : 0 )
  };

  const updateMinutes =() => {
    if(seconds > 60) {
        setMinutes(minutes + 1)
        setSeconds(0)
       }
  }

  useEffect(()=>{
    updateMinutes()
  })
  
  useEffect(() => {
    let secondsId = setInterval(updateSeconds, 100);
    return () => {
      clearInterval(secondsId);
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

import React, { useEffect, useState } from "react";

let id;

const Taimer = ({
  setIsStart,
  dontShowResult,
  showResult,
  taimerRef,
  onTimerEnd,
}) => {
  const [taimerTime, setTimerTime] = useState(taimerRef.current);

  const chagneStart = () => {
    setIsStart(false);
  };

  useEffect(() => {
    dontShowResult();
    if (taimerTime > 0) {
      let time = taimerTime;
      id = setInterval(() => {
        setTimerTime(time - 1);
        if (time - 1 <= 0) {
          clearInterval(id);
          chagneStart();
          onTimerEnd();
          showResult();
        }
        time--;
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="taimerCount">{taimerTime}</div>;
};

export default Taimer;

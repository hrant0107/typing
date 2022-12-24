import React, { useEffect, useRef, useState } from "react";

const Taimer = ({
  setIsStart,
  dontShowResult,
  showResult,
  taimerRef,
  onTimerEnd,
}) => {
  const [taimerTime, setTimerTime] = useState(taimerRef.current);
  const idRef = useRef();
  const chagneStart = () => {
    setIsStart(false);
  };

  useEffect(() => {
    dontShowResult();
    if (taimerTime > 0) {
      let time = taimerTime;
      idRef.current = setInterval(() => {
        setTimerTime(time - 1);
        if (time - 1 <= 0) {
          clearInterval(idRef);
          chagneStart();
          onTimerEnd();
          showResult();
        }
        time--;
      }, 1000);
    }

    return () => {
      clearInterval(idRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="taimerCount">{taimerTime}</div>;
};

export default Taimer;

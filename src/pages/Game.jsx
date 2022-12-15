import { useCallback, useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import "../App.css";
import TypingInput from "../components/game/TypingInput";
import Words from "../components/game/Words";
import StartButton from "../components/game/StartButton";
import Taimer from "../components/game/Taimer";
import Result from "../components/game/Result";
import { useParams } from "react-router-dom";
import levels from "../db.json";

function Game() {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [value, setValue] = useState("");
  const [words, setWords] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [hasTaimer, setHasTaimer] = useState(0);
  const [countWrongs, setCountWrongs] = useState(0);
  const inputRef = useRef();
  const taimerRef = useRef({});
  // const time = data.time;

  useEffect(() => {
    setData(levels.filter((obj) => obj.id === +id));
    setValue("");
    setWords("");
    setIsStart(false);
    setIsShowResult(false);
    setCountWrongs(0);
    setHasTaimer(0);
  }, [id]);

  useEffect(() => {
    if (data[0]) {
      setWords(randomWords(data[0].quantity).join(" "));
      taimerRef.current = data[0].time;
    } else {
      setWords(randomWords(0));
    }
  }, [data]);

  const getClassName = (leter, i) => {
    if (value[i] === undefined) {
      return "";
    }

    if (value[i] === leter) {
      return "exact";
    }
    if (value[i] !== leter) {
      return "wrong";
    }
  };

  const onClickStart = () => {
    if (hasTaimer > 0) {
      setWords(randomWords(data[0].quantity).join(" "));
      setValue("");
      setCountWrongs(0);
    }
    setIsStart(true);
    setHasTaimer(hasTaimer + 1);

    setTimeout(() => {
      inputRef.current.focus();
    }, 10);
  };

  const handleInputChange = (value) => {
    setCountWrongs([...value].filter((item, i) => words[i] !== item).length);
    setValue(value);

    if (value.length >= words.length) {
      setIsStart(false);
      setIsShowResult(true);
    }
  };

  const dontShowResult = () => {
    setIsShowResult(!isShowResult);
  };
  const showResult = () => {
    setIsShowResult(false);
  };

  const accurancy = useCallback(() => {
    console.log("hii");
    return ((countWrongs * 100) / words.length).toFixed(0);
  }, [countWrongs]);

  return (
    <div className="App">
      <Words getClassName={getClassName} words={words} />
      <StartButton onClick={onClickStart} />
      {isStart ? (
        <Taimer
          setIsStart={setIsStart}
          dontShowResult={dontShowResult}
          showResult={showResult}
          taimerRef={taimerRef}
        />
      ) : null}
      <TypingInput
        value={value}
        setValue={handleInputChange}
        disabled={!isStart}
        inputRef={inputRef}
      />
      {isShowResult && (
        <Result
          id={id}
          countWrongs={countWrongs}
          words={words}
          accurancy={accurancy}
          showResult={showResult}
        />
      )}
    </div>
  );
}

export default Game;

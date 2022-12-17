import { useEffect, useMemo, useRef, useState } from "react";
import randomWords from "random-words";
import "../App.css";
import TypingInput from "../components/game/TypingInput";
import Words from "../components/game/Words";
import StartButton from "../components/game/StartButton";
import Taimer from "../components/game/Taimer";
import Result from "../components/game/Result";
import { useParams } from "react-router-dom";
import levels from "../db.json";
import { useNavigate } from "react-router-dom";

function Game({ addLevelDataToUserData, userData }) {
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

  const navigate = useNavigate();
  // const time = data.time;

  // const prevLevelUserData = useMemo(
  //   () => userData.find((item) => item.prevId === id - 1),
  //   [userData, id]
  // );
  // console.log(prevLevelUserData);

  const accurancy = useMemo(() => {
    if (countWrongs === 0) {
      return 0;
    }
    const acc = (countWrongs * 100) / words.length;
    return acc.toFixed(0);
  }, [countWrongs, words.length]);

  useEffect(() => {
    const prevLevelData = userData.find((item) => item.id === `${id - 1}`);
    console.log(prevLevelData, id);
    if ((!prevLevelData || prevLevelData.accurancy < 90) && id !== "1") {
      return navigate("/");
    }
    setData(levels.filter((obj) => obj.id === id));
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

  const updateUserData = (newAccuracy = accurancy) => {
    addLevelDataToUserData({
      accurancy: 100 - newAccuracy,
      lock: true,
      id: id,
    });
  };

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
    setCountWrongs(0);
    setIsStart(true);
    setHasTaimer(hasTaimer + 1);

    setTimeout(() => {
      inputRef.current.focus();
    }, 10);
  };

  const handleInputChange = (value) => {
    const wrongs = [...value].filter((item, i) => words[i] !== item).length;
    setCountWrongs(wrongs);
    setValue(value);

    if (value.length >= words.length) {
      const newAccuracy = ((wrongs * 100) / words.length || 0).toFixed(0);
      updateUserData(newAccuracy);
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
          updateUserData={updateUserData}
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

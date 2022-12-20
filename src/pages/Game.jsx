import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { AppContext } from "../App";

function Game() {
  const { userData, addLevelDataToUserData } = useContext(AppContext);
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

  const accurancy = useMemo(() => {
    return countWrongs === 0
      ? 0
      : ((countWrongs * 100) / words.length || 0).toFixed(0);
  }, [countWrongs, words.length]);

  const updateUserData = useCallback(
    (newAccuracy = accurancy) => {
      addLevelDataToUserData({
        accurancy: 100 - newAccuracy,
        lock: true,
        id: id,
      });
    },
    [accurancy, addLevelDataToUserData, id]
  );

  const getClassName = useCallback(
    (leter, i) => {
      if (value[i] === undefined) {
        return "";
      } else if (value[i] === leter) {
        return "exact";
      } else if (value[i] !== leter) {
        return "wrong";
      }
    },
    [value]
  );

  const onClickStart = useCallback(() => {
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
  }, [data, hasTaimer]);

  const handleInputChange = useCallback(
    (value) => {
      setValue(value);
      const wrongs = [...value].filter((item, i) => words[i] !== item).length;

      setCountWrongs(wrongs);
      if (value.length >= words.length) {
        const newAccuracy = ((wrongs * 100) / words.length || 0).toFixed(0);
        updateUserData(newAccuracy);
        setIsStart(false);
        setIsShowResult(true);
      }
    },
    [updateUserData, words]
  );

  const showResult = () => {
    setIsShowResult(true);
  };

  const dontShowResult = () => {
    setIsShowResult(false);
  };

  const onTimerEnd = useCallback(() => {
    const lastValue = inputRef.current.value;
    let wrongs = [...lastValue].filter((item, i) => words[i] !== item).length;

    if (lastValue.length < words.length) {
      wrongs = wrongs + words.length - lastValue.length;
    }
    setCountWrongs(wrongs);
    const newAccuracy = ((wrongs * 100) / words.length || 0).toFixed(0);
    updateUserData(newAccuracy);
    setIsStart(false);
  }, [updateUserData, words]);

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
          onTimerEnd={onTimerEnd}
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

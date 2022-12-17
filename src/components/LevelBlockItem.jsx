import React from "react";
import ClosedLockIcon from "./assets/ClosedLockIcon";
import OpenedLockIcon from "./assets/OpenedLockIcon";

const LevelBlockItem = ({ title, expectedLevelUserData, isOpen, onClick }) => {
  return (
    <div className="levelBlock" onClick={onClick}>
      <div className="levelTitle">{title}</div>
      <div className="lock">
        {isOpen ? <OpenedLockIcon /> : <ClosedLockIcon />}
      </div>
      <div className="block level__acurancy__block">
        <span className="name">accurancy:</span>
        <span className="procent">
          {expectedLevelUserData ? expectedLevelUserData.accurancy : 0}%
        </span>
      </div>
    </div>
  );
};

export default LevelBlockItem;

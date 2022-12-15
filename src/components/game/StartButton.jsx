import React from "react";

const StartButton = ({ onClick }) => {
  return (
    <div className="startBtnBlock">
      <button onClick={onClick} className="startBtn">
        Start
      </button>
    </div>
  );
};

export default StartButton;

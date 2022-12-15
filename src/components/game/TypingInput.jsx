import React from "react";

const TypingInput = ({ value, setValue, disabled, inputRef }) => {
  return (
    <div className="inputContent">
      <textarea
        ref={inputRef}
        autoFocus
        className="textArea"
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TypingInput;

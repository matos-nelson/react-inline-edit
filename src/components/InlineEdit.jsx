import React, { useState, useEffect, useRef } from "react";
import { useKeypress, useOnClickOutside } from "hooks";

function InlineEdit(props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.defaultValue);
  const isEnterKeyPressed = useKeypress("Enter");
  const isEscapeKeyPressed = useKeypress("Escape");

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);
  const editViewProps = {
    ref: inputRef,
    value: inputValue,
    className: "inline-edit-active",
    onChange: (e) => setInputValue(e.target.value),
  };

  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      props.onConfirm(inputValue);
      setIsInputActive(false);
    }
  });

  function handleConfirm() {
    props.onConfirm(inputValue);
    setIsInputActive(false);
  }

  function handleCancel() {
    setInputValue(props.defaultValue);
    setIsInputActive(false);
  }

  useEffect(() => {
    if (isInputActive) {
      if (isEnterKeyPressed && inputRef.current.type !== "textarea") {
        handleConfirm();
      } else if (isEscapeKeyPressed) {
        handleCancel();
      }
    }
  });

  return (
    <span ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        className={`inline-text--${!isInputActive ? "active" : "hidden"}`}
      >
        {props.defaultValue}
      </span>
      {isInputActive && props.editView(editViewProps)}
      {isInputActive && (
        <span className="inline-edit-options">
          <button onClick={handleConfirm}>Y</button>
          <button onClick={handleCancel}>N</button>
        </span>
      )}
    </span>
  );
}

export default InlineEdit;

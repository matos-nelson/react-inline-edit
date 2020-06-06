import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import useKeypress from "../useKeypress";

const enterKeyText = "Enter";
const escapeKeyText = "Escape";

function TestHelper(props) {
  const enterKey = useKeypress(enterKeyText);
  useEffect(() => {
    if (enterKey) {
      props.onKeyEvent();
    } else if (props.onKeyUp) {
      props.onKeyUp();
    }
  });

  return <span></span>;
}

describe("useKeyPress Hook", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    // Act
    ReactDOM.render(<TestHelper />, div);
    ReactDOM.unmountComponentAtNode(div);

    //Assert
  });

  it("should execute key down event when proper key is registered", () => {
    // Arrange
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onEnterKeyDown = jest.fn();

    // Act
    mount(<TestHelper onKeyEvent={onEnterKeyDown} />);
    act(() => {
      map.keydown({ key: enterKeyText });
    });

    //Assert
    expect(onEnterKeyDown).toHaveBeenCalled();
  });

  it("should not execute key down event when improper key is registered", () => {
    // Arrange
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onEscapeKeyDown = jest.fn();

    // Act
    mount(<TestHelper onKeyEvent={onEscapeKeyDown} />);
    act(() => {
      map.keydown({ key: escapeKeyText });
    });

    //Assert
    expect(onEscapeKeyDown).not.toHaveBeenCalled();
  });

  it("should execute key up event when proper key is registered", () => {
    // Arrange
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onEnterKeyUp = jest.fn();

    // Act
    mount(<TestHelper onKeyUp={onEnterKeyUp} />);
    act(() => {
      map.keyup({ key: enterKeyText });
    });

    //Assert
    expect(onEnterKeyUp).toHaveBeenCalledTimes(1);
  });

  it("should not execute key up event when improper key is registered", () => {
    // Arrange
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onEnterKeyUp = jest.fn();

    // Act
    mount(<TestHelper onKeyUp={onEnterKeyUp} />);
    act(() => {
      map.keyup({ key: enterKeyText });
      map.keyup({ key: escapeKeyText });
    });

    //Assert
    expect(onEnterKeyUp).toHaveBeenCalledTimes(1);
  });
});

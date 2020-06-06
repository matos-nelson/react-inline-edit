import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import useOnClickOutside from "../useOnClickOutside";

function TestHelper(props) {
  const wrapperRef = useRef(null);

  useOnClickOutside(wrapperRef, () => {
    props.onMouseDownEvent();
  });

  return (
    <span ref={wrapperRef}>
      <h1>child element</h1>
    </span>
  );
}

describe("useOnClickOutside Hook", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    // Act
    ReactDOM.render(<TestHelper />, div);
    ReactDOM.unmountComponentAtNode(div);

    //Assert
  });

  it("should not execute mouse down event when mousedown executes on reference", () => {
    // Arrange
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onMouseDownEvent = jest.fn();

    // Act
    const wrapper = mount(
      <div>
        <TestHelper onMouseDownEvent={onMouseDownEvent} />
      </div>
    );
    act(() => {
      map.mousedown({ target: wrapper.find("span").getDOMNode() });
    });

    //Assert
    expect(onMouseDownEvent).not.toHaveBeenCalled();
  });

  it("should execute mouse down event when mousedown event executes outside reference", () => {
    // Arrange
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onMouseDownEvent = jest.fn();

    // Act
    const wrapper = mount(
      <div>
        <TestHelper onMouseDownEvent={onMouseDownEvent} />
      </div>
    );
    act(() => {
      map.mousedown({ target: wrapper.find("div").getDOMNode() });
    });

    //Assert
    expect(onMouseDownEvent).toHaveBeenCalledTimes(1);
  });

  it("should not execute mouse down event when touchstart executes on reference", () => {
    // Arrange
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onMouseDownEvent = jest.fn();

    // Act
    const wrapper = mount(
      <div>
        <TestHelper onMouseDownEvent={onMouseDownEvent} />
      </div>
    );
    act(() => {
      map.touchstart({ target: wrapper.find("span").getDOMNode() });
    });

    //Assert
    expect(onMouseDownEvent).not.toHaveBeenCalled();
  });

  it("should execute mouse down event when touchstart event executes outside reference", () => {
    // Arrange
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onMouseDownEvent = jest.fn();

    // Act
    const wrapper = mount(
      <div>
        <TestHelper onMouseDownEvent={onMouseDownEvent} />
      </div>
    );
    act(() => {
      map.touchstart({ target: wrapper.find("div").getDOMNode() });
    });

    //Assert
    expect(onMouseDownEvent).toHaveBeenCalledTimes(1);
  });
});

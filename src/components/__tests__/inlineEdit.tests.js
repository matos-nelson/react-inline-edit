import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import InlineEdit from "../InlineEdit";

describe("InlineEdit Component", () => {
  it("renders without crashing", () => {
    // Arrange
    const span = document.createElement("span");

    // Act
    ReactDOM.render(
      <InlineEdit defaultValue="Default" editView={() => {}} />,
      span
    );
    ReactDOM.unmountComponentAtNode(span);

    //Assert
  });

  it("should render default read view when mounted", () => {
    // Arrange
    const defaultText = "Default Value";

    // Act
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" />}
        />
      </p>
    );

    //Assert
    const rootInstance = wrapper.find("span").at(1);
    expect(rootInstance.props().className).toBe("inline-text--active");
    expect(rootInstance.props().children).toBe(defaultText);
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });

  it("should render edit view when content is clicked", () => {
    // Arrange
    const defaultText = "Default Text";
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" autoFocus />}
        />
      </p>
    );

    // Act
    const rootInstance = wrapper.find("span").at(1);
    rootInstance.simulate("click");

    //Assert
    expect(wrapper.find({ className: "inline-text--active" })).toEqual({});
    expect(wrapper.find({ className: "inline-text--hidden" })).toBeTruthy();
    const editElement = wrapper.find("input");
    expect(editElement).toHaveLength(1);
    expect(editElement.props().value).toBe(defaultText);
    expect(editElement.props().autoFocus).toBe(true);
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(1);
  });

  it("should call onConfirm prop when confirm button is clicked", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" autoFocus />}
          onConfirm={onConfirm}
        />
      </p>
    );
    const rootInstance = wrapper.find("span").at(1);
    rootInstance.simulate("click");

    // Act
    const editElement = wrapper.find("input");
    editElement.simulate("change", { target: { value: defaultText } });
    const confirmButton = wrapper
      .find({ className: "inline-edit-options" })
      .find("button")
      .at(0);
    confirmButton.simulate("click");

    //Assert
    expect(onConfirm).toHaveBeenCalledTimes(1);
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--active");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });

  it("should call onConfirm prop when enter key is pressed", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      if (!map[event]) {
        map[event] = [];
      }
      map[event].push(cb);
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" autoFocus />}
          onConfirm={onConfirm}
        />
      </p>
    );
    wrapper.find("span").at(1).simulate("click");

    // Act
    const editElement = wrapper.find("input");
    editElement.simulate("change", { target: { value: defaultText } });
    act(() => {
      map.keydown[0]({ key: "Enter" });
    });

    //Assert
    expect(onConfirm).toHaveBeenCalledTimes(1);
    wrapper.update();
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--active");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });

  it("should not call onConfirm prop when enter key is pressed on text area", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      if (!map[event]) {
        map[event] = [];
      }
      map[event].push(cb);
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => (
            <textarea {...props} name="test-input" autoFocus />
          )}
          onConfirm={onConfirm}
        />
      </p>
    );
    wrapper.find("span").at(1).simulate("click");

    // Act
    const editElement = wrapper.find("textarea");
    editElement.simulate("change", { target: { value: defaultText } });
    act(() => {
      map.keydown[0]({ key: "Enter" });
    });

    //Assert
    expect(onConfirm).not.toHaveBeenCalled();
    wrapper.update();
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--hidden");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(1);
  });

  it("should cancel changes when cancel button is clicked", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" autoFocus />}
          onConfirm={onConfirm}
        />
      </p>
    );
    const rootInstance = wrapper.find("span").at(1);
    rootInstance.simulate("click");

    // Act
    const editElement = wrapper.find("input");
    editElement.simulate("change", { target: { value: defaultText } });
    const cancelButton = wrapper
      .find({ className: "inline-edit-options" })
      .find("button")
      .at(1);
    cancelButton.simulate("click");

    //Assert
    expect(onConfirm).not.toHaveBeenCalled();
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--active");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });

  it("should cancel changes when escape key is pressed", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      if (!map[event]) {
        map[event] = [];
      }
      map[event].push(cb);
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" autoFocus />}
          onConfirm={onConfirm}
        />
      </p>
    );
    const rootInstance = wrapper.find("span").at(1);
    rootInstance.simulate("click");

    // Act
    const editElement = wrapper.find("input");
    editElement.simulate("change", { target: { value: defaultText } });
    act(() => {
      map.keydown[1]({ key: "Escape" });
    });

    //Assert
    expect(onConfirm).not.toHaveBeenCalled();
    wrapper.update();
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--active");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });

  it("should call onConfirm prop when mousedown event executes outside reference", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" autoFocus />}
          onConfirm={onConfirm}
        />
      </p>
    );
    wrapper.find("span").at(1).simulate("click");

    // Act
    const editElement = wrapper.find("input");
    editElement.simulate("change", { target: { value: defaultText } });
    act(() => {
      map.mousedown({ target: wrapper.find("p").getDOMNode() });
    });

    //Assert
    expect(onConfirm).toHaveBeenCalledTimes(1);
    wrapper.update();
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--active");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });

  it("should not call onConfirm prop when mousedown executes on reference", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => (
            <textarea {...props} name="test-input" autoFocus />
          )}
          onConfirm={onConfirm}
        />
      </p>
    );
    wrapper.find("span").at(1).simulate("click");

    // Act
    const spanWrapper = wrapper.find("span").at(0).getDOMNode();
    const editElement = wrapper.find("textarea");
    editElement.simulate("change", { target: { value: defaultText } });
    act(() => {
      map.mousedown({ target: spanWrapper });
    });

    //Assert
    expect(onConfirm).not.toHaveBeenCalled();
    wrapper.update();
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--hidden");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(1);
  });

  it("should call onConfirm prop when touchstart event executes outside reference", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" autoFocus />}
          onConfirm={onConfirm}
        />
      </p>
    );
    wrapper.find("span").at(1).simulate("click");

    // Act
    const editElement = wrapper.find("input");
    editElement.simulate("change", { target: { value: defaultText } });
    act(() => {
      map.touchstart({ target: wrapper.find("p").getDOMNode() });
    });

    //Assert
    expect(onConfirm).toHaveBeenCalledTimes(1);
    wrapper.update();
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--active");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });

  it("should not call onConfirm prop when touchstart executes on reference", () => {
    // Arrange
    const defaultText = "Default Text";
    const onConfirm = jest.fn();
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => (
            <textarea {...props} name="test-input" autoFocus />
          )}
          onConfirm={onConfirm}
        />
      </p>
    );
    wrapper.find("span").at(1).simulate("click");

    // Act
    const spanWrapper = wrapper.find("span").at(0).getDOMNode();
    const editElement = wrapper.find("textarea");
    editElement.simulate("change", { target: { value: defaultText } });
    act(() => {
      map.touchstart({ target: spanWrapper });
    });

    //Assert
    expect(onConfirm).not.toHaveBeenCalled();
    wrapper.update();
    const readView = wrapper.find("span").at(1);
    expect(readView.props().className).toBe("inline-text--hidden");
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(1);
  });

  it("should not call onConfirm prop when not editing and mousedown executes outside reference", () => {
    // Arrange
    const defaultText = "Default Value";
    const onConfirm = jest.fn();
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" />}
          onConfirm={onConfirm}
        />
      </p>
    );

    // Act
    const paragraphWrapper = wrapper.find("p").getDOMNode();
    act(() => {
      map.mousedown({ target: paragraphWrapper });
    });

    //Assert
    const rootInstance = wrapper.find("span").at(1);
    expect(rootInstance.props().className).toBe("inline-text--active");
    expect(rootInstance.props().children).toBe(defaultText);
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });

  it("should not call onConfirm prop when not editing and touchstart executes outside reference", () => {
    // Arrange
    const defaultText = "Default Value";
    const onConfirm = jest.fn();
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount(
      <p>
        <InlineEdit
          defaultValue={defaultText}
          editView={(props) => <input {...props} name="test-input" />}
          onConfirm={onConfirm}
        />
      </p>
    );

    // Act
    const paragraphWrapper = wrapper.find("p").getDOMNode();
    act(() => {
      map.touchstart({ target: paragraphWrapper });
    });

    //Assert
    const rootInstance = wrapper.find("span").at(1);
    expect(rootInstance.props().className).toBe("inline-text--active");
    expect(rootInstance.props().children).toBe(defaultText);
    const editOptions = wrapper.find({ className: "inline-edit-options" });
    expect(editOptions).toHaveLength(0);
  });
});

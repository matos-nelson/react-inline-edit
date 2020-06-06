import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { InlineEdit } from "components";
import "./App.css";

class App extends Component {
  state = {
    heading1: "This is a Heading 1 element",
    heading2: "This is a Heading 2 element",
    heading3: "This is a Heading 3 element",
    heading4: "This is a Heading 4 element",
    heading5: "This is a Heading 5 element",
    heading6: "This is a Heading 6 element",
    paraValue: "This is an inline paragraph element",
    spanValue: "This is an inline span element",
    paraWrapper:
      "Inline Edit component inside a paragraph element that will convert to textarea upon edit...",
    spanWrapper:
      "Inline Edit component inside a span element that will convert to textarea upon edit...",
  };

  render() {
    return (
      <div className="flex-row justify-content-center pt-2">
        <Container>
          <h1>
            <InlineEdit
              defaultValue={this.state.heading1}
              editView={(props) => <input {...props} autoFocus />}
              onConfirm={(heading1) => this.setState({ heading1 })}
            />
          </h1>
          <br />

          <h2>
            <InlineEdit
              defaultValue={this.state.heading2}
              editView={(props) => <input {...props} autoFocus />}
              onConfirm={(heading2) => this.setState({ heading2 })}
            />
          </h2>
          <br />

          <h3>
            <InlineEdit
              defaultValue={this.state.heading3}
              editView={(props) => <input {...props} autoFocus />}
              onConfirm={(heading3) => this.setState({ heading3 })}
            />
          </h3>
          <br />

          <h4>
            <InlineEdit
              defaultValue={this.state.heading4}
              editView={(props) => <input {...props} autoFocus />}
              onConfirm={(heading4) => this.setState({ heading4 })}
            />
          </h4>
          <br />

          <h5>
            <InlineEdit
              defaultValue={this.state.heading5}
              editView={(props) => <input {...props} autoFocus />}
              onConfirm={(heading5) => this.setState({ heading5 })}
            />
          </h5>
          <br />

          <h6>
            <InlineEdit
              defaultValue={this.state.heading6}
              editView={(props) => <input {...props} autoFocus />}
              onConfirm={(heading6) => this.setState({ heading6 })}
            />
          </h6>
          <br />

          <p>
            <InlineEdit
              defaultValue={this.state.paraValue}
              editView={(props) => <input {...props} autoFocus />}
              onConfirm={(paraValue) => this.setState({ paraValue })}
            />
          </p>
          <br />

          <span>
            <InlineEdit
              defaultValue={this.state.spanValue}
              editView={(props) => <input {...props} autoFocus />}
              onConfirm={(spanValue) => this.setState({ spanValue })}
            />
          </span>

          <Row className="mt-5">
            <Col md="12">
              <p>
                <InlineEdit
                  defaultValue={this.state.paraWrapper}
                  editView={(props) => (
                    <textarea rows="4" cols="50" {...props} autoFocus />
                  )}
                  onConfirm={(paraWrapper) => this.setState({ paraWrapper })}
                />
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md="12">
              <span>
                <InlineEdit
                  defaultValue={this.state.spanWrapper}
                  editView={(props) => (
                    <textarea {...props} rows="4" cols="50" autoFocus />
                  )}
                  onConfirm={(spanWrapper) => this.setState({ spanWrapper })}
                />
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

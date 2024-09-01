import React from "react";

class ReactTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  onClick() {
    this.setState((prevState, props) => {
      console.log("1", prevState);
      return { count: prevState.count + 1 };
    });
    this.setState((prevState, props) => {
      console.log("2", prevState);
      return { count: prevState.count + 1 };
    });
  }

  render() {
    return (
      <>
        <h1>test33</h1>
        <div>
          <button onClick={() => this.onClick()}>测试批量更新</button>
        </div>
      </>
    );
  }
}

export default ReactTest;

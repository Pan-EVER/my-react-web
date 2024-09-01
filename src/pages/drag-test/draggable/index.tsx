import React, { useState } from "react";
import Draggable from "react-draggable";
import "./index.less";

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const list = [
    {
      name: "车陂",
    },
    {
      name: "大沙地",
    },
    {
      name: "体育西",
    },
    {
      name: "林和西",
    },
  ];
  const handleDrag = (e, ui) => {
    const { y } = ui;
    setPosition((prev) => ({ ...prev, y }));
  };

  return (
    <div className="container">
      {list.map((ele) => (
        <Draggable
          key={ele.name}
          axis="y" // 只允许y轴拖动
          position={{ x: 0, y: position.y + 50 }}
          onDrag={handleDrag}
          bounds={{ top: 0 }}
        >
          <div className="draggable">{ele.name}</div>
        </Draggable>
      ))}
      {/* <Draggable
        axis="y" // 只允许y轴拖动
        position={position}
        onDrag={handleDrag}
        bounds={{ top: 0 }}
      >
        <div className="draggable">大沙地</div>
      </Draggable> */}
    </div>
  );
};

export default App;

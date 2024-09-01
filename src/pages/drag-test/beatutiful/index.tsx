import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRef } from "react";
import { HTML5Backend } from "react-beautiful-dnd";

// 模拟的列表项数据
const initialItems = [
  { id: "item-1", content: "Item 1" },
  { id: "item-2", content: "Item 2" },
  // ... 更多项
];

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function DraggableList() {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    console.log("result", result);

    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  const dragRef = useRef(null);
  const dragStart = (e) => {
    console.log("start", e);
  };
  const dragEnd = (e) => {
    console.log("end", e);
  };

  const drag = (e) => {
    console.log("drag", e);
  };
  // useEffect(() => {
  //   if (dragRef.current) {
  //     console.log("dragRef.current", dragRef.current);

  //     dragRef.current.addEventListener("mousedown", dragStart, false);
  //     dragRef.current.addEventListener("mouseup", dragEnd, false);
  //     dragRef.current.addEventListener("mousemove", drag, false);
  //   }
  // }, [dragRef]);
  const onDragStart: React.DragEventHandler<any> = (e) => {
    console.log("22", e);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      backend={HTML5Backend}
    >
      <Droppable droppableId="droppable" direction="vertical">
        {(provided, snapshot) => {
          //   useEffect(() => {
          //     if (provided.innerRef) {
          //       console.log("22", provided.innerRef.current);
          //     }
          //   });

          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}  style={{  

                  minHeight: '100px', // 设置最小高度  
        
                  border: '1px solid #ccc',  
        
                  padding: '10px',  
        
                  overflow: 'hidden', // 防止内容溢出  
        
                }}  >
                  {(provided, snapshot) => {
                    // console.log("provided", provided, snapshot);

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          // // 注意：不要在这里设置会影响拖拽的样式，如 position: absolute（除非你有特殊需求）
                          // // 但你可以添加其他样式，如 padding, margin, backgroundColor 等
                          // userSelect: "none" /* 防止文本选择 */,
                          // padding: "10px",
                          // margin: "5px 0",

                          backgroundColor: snapshot.isDragging
                            ? "#007bff"
                            : "#f9f9f9",
                          // color: snapshot.isDragging ? "white" : "black",
                          // cursor: "move",
                        }}
                      >
                        {item.content}
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default DraggableList;

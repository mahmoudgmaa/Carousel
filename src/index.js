import React, { useEffect, useState, useRef } from "react";
import "./carousel.css";
import Item from "./item";

const initialOptions = {
  isDown: false,
  startX: null,
  transLeftOffset: null,
  dragSpeed: 1.25,
  itemWidth: 380,
  itemHeight: 480,
  itemSideOffsets: 15,
  x: 0,
};

const Index = ({ data }) => {
  const myRef = useRef(null);
  const [dragOptions, setDragOptions] = useState(initialOptions);
  const cWrapperStyle = {
    width: `${data.length * (itemWidth + 2 * itemSideOffsets)}px`,
    height: `${itemHeight}px`,
  };

  useEffect(() => {
    const slide = myRef.current;
    if (dragOptions.isDown) {
      const { startX, transLeftOffset, dragSpeed, x } = dragOptions;
      const walk = (x - startX) * dragSpeed;
      slide.firstChild.style.cssText = `
        transform: translateX(${transLeftOffset + walk}px);
        transition: transform 0.0s ease-in-out;
      `;
    }
  }, [dragOptions]);

  const onMouseDown = (e) => {
    const slide = myRef.current;
    e.persist();
    slide.classList.add("active");
    const _startX = e.pageX - slide.offsetLeft;
    const _transLeftOffset = giveMeIntValOf(slide.firstChild.style.transform);
    const _x = e.pageX - slide.offsetLeft;
    setDragOptions({
      ...dragOptions,
      isDown: true,
      startX: _startX,
      transLeftOffset: _transLeftOffset,
      x: _x,
    });
  };

  const onMouseMove = (e) => {
    const { isDown } = dragOptions;
    const slide = myRef.current;
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slide.offsetLeft;
    setDragOptions({ ...dragOptions, x: x });
  };

  const handleSnap = () => {
    const slide = myRef.current;
    setDragOptions({ ...dragOptions, isDown: false });
    slide.classList.remove("active");
    const tempThresholdOffset = giveMeIntValOf(
      slide.firstChild.style.transform
    );
    const end =
      data.length *
        (initialOptions.itemWidth + 2 * initialOptions.itemSideOffsets) -
      30 -
      slide.offsetWidth;
    if (tempThresholdOffset > end) {
      setDragOptions({ ...dragOptions, isDown: false });
      slide.firstChild.style.cssText = `
        transform: translateX(${-0}%);
        transition: transform 0.9s ease-in-out;
      `;
    } else if (tempThresholdOffset < 0) {
      setDragOptions({ ...dragOptions, isDown: false });
      slide.firstChild.style.cssText = `
        transform: translateX(${end}px);
        transition: transform 0.9s ease-in-out;
      `;
    }
  };

  const giveMeIntValOf = (el) => {
    // extracting 20 from translateX(20px) and converting it to integer with parsInt
    return parseInt(el.replace("translateX(", "").replace("px)", ""), 10);
  };

  const onTouchMove = (e) => {
    if (e.changedTouches && e.changedTouches.length) {
      const { isDown } = dragOptions;
      if (!isDown) return;
      const slide = myRef.current;
      const touch = e.changedTouches[0];
      const x = touch.clientX - slide.offsetLeft;
      setDragOptions({ ...dragOptions, x: x });
    }
  };

  const onTouchStart = (e) => {
    const slide = myRef.current;
    e.persist();
    slide.classList.add("active");
    const touch = e.changedTouches[0];
    const _startX = touch.clientX - slide.offsetLeft;
    const _transLeftOffset = giveMeIntValOf(slide.firstChild.style.transform);
    const _x = touch.clientX - slide.offsetLeft;
    setDragOptions({
      ...dragOptions,
      isDown: true,
      startX: _startX,
      transLeftOffset: _transLeftOffset,
      x: _x,
    });
  };

  return (
    <div className="wrapper">
      <div
        className="app"
        ref={myRef}
        onMouseDown={onMouseDown}
        onMouseLeave={() => handleSnap()}
        onMouseUp={() => handleSnap()}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onTouchEnd={() => handleSnap()}
        onTouchCancel={() => handleSnap()}
      >
        <div
          className="cWrapper"
          style={{ ...cWrapperStyle, transform: "translateX(0px)" }}
        >
          {data.map((d, index) => {
            return (
              <Item
                initialOptions={initialOptions}
                imgSrc={d.imgSrc}
                title={d.title}
                description={d.description}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;

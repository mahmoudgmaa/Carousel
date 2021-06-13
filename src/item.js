import React from "react";

const Item = ({ initialOptions, imgSrc, title, description }) => {
  const { itemWidth, itemHeight, itemSideOffsets } = initialOptions;
  const itemStyle = {
    width: `${itemWidth}px`,
    height: `${itemHeight}px`,
    margin: `0px ${itemSideOffsets}px`,
  };
  return (
    <div className="item" style={itemStyle}>
      <img src={imgSrc} alt={title} />
      <div className="cardBody">
        <h2>{title}</h2>
        <p>{description}</p>
        <a href="/">Article</a>
      </div>
    </div>
  );
};

export default Item;

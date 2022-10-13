import React from "react";

interface Flat {
  title: string;
  img: string;
  url: string;
  locality: string;
}

const Item: React.FC<Flat> = ({ title, img, url, locality }) => {
  return (
    <div className="item">
      <img src={img} alt="" />
      <div className="item-text">
        <h3>{title}</h3>
        <h6>{locality}</h6>
        <a href={url}>Víc informací naleznete zde</a>
      </div>
    </div>
  );
};

export default Item;

import React from 'react'
import PropTypes from "prop-types";

export default function Rate({ currentRate, rateSize }) {
  let arrOfStar = [];
  for (let i = 0; i < 5; i++) {
    if (i >= currentRate) {
      arrOfStar.push(<i key={i} className="far text-warning fa-star"></i>);
    } else {
      arrOfStar.push(<i key={i} className="fas text-warning fa-star"></i>);
    }
  }
  return <div className={`rate ${rateSize}`}>{arrOfStar}</div>;
}

Rate.propTypes = {
  currentRate: PropTypes.number,
};


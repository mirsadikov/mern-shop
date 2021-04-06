import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, color, fromscreen }) => {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      {fromscreen === "cardlist" ? (
        <br className="d-block d-md-none" />
      ) : (
        <br className="d-none d-md-block d-lg-none" />
      )}

      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#FECB00",
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
  fromscreen: PropTypes.string,
};

export default Rating;

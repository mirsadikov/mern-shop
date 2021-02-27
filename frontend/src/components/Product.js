import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";

const Product = ({ product }) => {
  return (
    <Card
      bg="light"
      border="secondary"
      className="mt-3 my-sm-3 p-1 p-sm-3 rounded"
    >
      <Link to={`/product/${product._id}`}>
        <div style={{ width: "100%", height: "auto" }}>
          <ResponsiveEmbed aspectRatio="4by3">
            <Card.Img src={product.image} variant="top" />
          </ResponsiveEmbed>
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} ta izohlar`}
            fromscreen={"cardlist"}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

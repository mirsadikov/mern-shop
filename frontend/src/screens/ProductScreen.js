import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import products from "../data/products.js";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = ({ match }) => {
  // const product = products.find((p) => p._id === match.params.id);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        <i className="fas fa-chevron-left mr-1"></i>
        Orqaga
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6} className="imgAndBtn">
            {product.images ? (
              <Carousel>
                {product.images.map((image) => (
                  <Carousel.Item key={image._id} interval={10000}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Image src={product.image} alt={product.name} fluid />
            )}
            {/*  */}
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <Rating
                  text={`${product.numReviews} ta izohlar`}
                  value={product.rating}
                />
                <Button variant="primary">Primary</Button>
              </ListGroup.Item>
              <ListGroup.Item>Narxi: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Tavsif: {product.description}</ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary">Primary</Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;

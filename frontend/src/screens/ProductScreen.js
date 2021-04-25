import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Button, ListGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductScreen = ({ history, match }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: errorProductReview,
    success: succesProductReview,
  } = productReviewCreate;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (succesProductReview) {
      alert("Izoh qabul qilindi!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, succesProductReview]);

  const saveHandler = async () => {
    history.push(`/saved/${match.params.id}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Button className="btn btn-light my-3" onClick={() => history.goBack()}>
        <i className="fas fa-chevron-left mr-1"></i>
        Orqaga
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
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
                  <Button variant="primary" onClick={saveHandler}>
                    Saqlash
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  Narxi:{" "}
                  <h3 style={{ display: "inline-block", marginLeft: "5px" }}>
                    ${product.price}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>Tavsif: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h3>Izohlar</h3>
              {product.reviews.length === 0 && <Message>Izohlar yoq</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  <h2> Izoh qoldiring:</h2>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                          }}
                        >
                          <option value="">Tanlang...</option>
                          <option value="1">1 - Yomon</option>
                          <option value="2">2 - O'rtacha</option>
                          <option value="3">3 - Yaxshi</option>
                          <option value="4">4 - Juda yaxshi</option>
                          <option value="5">5 - Alo</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Izoh</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Izoh qoldirish
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Iltimos <Link to="/login">tizimga kiring</Link>
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

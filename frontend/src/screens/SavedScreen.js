import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { save, removeFromSaved } from "../actions/savedActions";

const SavedScreen = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const saved = useSelector((state) => state.saved);
  const { savedItems } = saved;

  useEffect(() => {
    if (productId) {
      dispatch(save(productId));
    }
  }, [dispatch, productId]);

  const removeFromSavedHandler = (id) => {
    dispatch(removeFromSaved(id));
  };
  return (
    <Row>
      <Col md={10} className="mx-auto">
        <Button className="btn btn-light my-3" onClick={() => history.goBack()}>
          <i className="fas fa-chevron-left mr-1"></i>
          Orqaga
        </Button>
        <h1>Tanlanganlar</h1>
        {savedItems.length === 0 ? (
          <Message>
            Sizda hech qanday saqlangan mahsulotlar yo'q.{"   "}
            <Link to="/"> Bosh sahifa</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {savedItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2} xs={3} className="p-0 d-flex align-items-center">
                    <Link to={`/product/${item.product}`}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Link>
                  </Col>
                  <Col md={5} xs={5} className="d-flex align-items-center">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col
                    md={3}
                    xs={2}
                    className="text-center d-flex align-items-center"
                  >
                    ${item.price}
                  </Col>
                  <Col md={2} xs={2} className="d-flex align-items-center">
                    <Button
                      type="button"
                      variant="light"
                      className="mx-auto"
                      onClick={() => {
                        removeFromSavedHandler(item.product);
                      }}
                    >
                      <i className="fas fa-trash mx-auto d-block"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default SavedScreen;

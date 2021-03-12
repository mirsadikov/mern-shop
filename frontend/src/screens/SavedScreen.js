import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  // Form,
  Button,
  // Card,
} from "react-bootstrap";
import Message from "../components/Message";
import {
  removeFromSaved,
  getSavedItems,
  saveToSaved,
} from "../actions/savedActions";
import Loader from "../components/Loader";

const SavedScreen = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const savedItemsList = useSelector((state) => state.savedItems);
  const { loading, error, items } = savedItemsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!productId) {
      dispatch(getSavedItems());
    } else {
      dispatch(saveToSaved(productId));
    }
  }, [dispatch, productId, history, userInfo]);

  const removeFromSavedHandler = (id) => {
    // console.log(id);
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
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : !items ||
          items[0] === "notLoaded" ||
          (items[0] === "noItems" && loading) ? (
          <Loader />
        ) : items[0] === "noItems" && !loading ? (
          <Message>
            Sizda hech qanday saqlangan mahsulotlar yo'q.{"   "}
            <Link to="/"> Bosh sahifa</Link>
          </Message>
        ) : items.length !== 0 ? (
          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2} xs={3} className="p-0 d-flex align-items-center">
                    <Link to={`/product/${item._id}`}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Link>
                  </Col>
                  <Col md={5} xs={5} className="d-flex align-items-center">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
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
                        removeFromSavedHandler(item._id);
                      }}
                    >
                      <i className="fas fa-trash mx-auto d-block"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            {loading && <Loader />}
          </ListGroup>
        ) : (
          <Message>
            Sizda hech qanday saqlangan mahsulotlar yo'q.{"   "}
            <Link to="/"> Bosh sahifa</Link>
          </Message>
        )}
      </Col>
    </Row>
  );
};

export default SavedScreen;

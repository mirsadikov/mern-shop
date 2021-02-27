import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy;
            <Badge
              pill
              variant="primary"
              className="ml-1 rounded-5"
              style={{ borderRadius: 10 + "px", fontSize: 13 + "px" }}
            >
              Electro.uz
            </Badge>{" "}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

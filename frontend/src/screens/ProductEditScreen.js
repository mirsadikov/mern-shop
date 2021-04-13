import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingMultiple, setUploadingMultipe] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setImages(product.images);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("image", files);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const uploadFilesHandler = async (e) => {
    const files = e.target.files;
    const length = files.length;
    const formData = new FormData();
    for (var i = 0; i < length; i++) {
      formData.append("images", files[i]);
    }
    setUploadingMultipe(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/upload/multiple",
        formData,
        config
      );
      setImages(data);
      setUploadingMultipe(false);
    } catch (error) {
      console.log(error);
      setUploadingMultipe(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let productToUpdate = {
      _id: productId,
      name,
      price,
      image,
      images,
      brand,
      category,
      description,
    };

    console.log(productToUpdate);
    dispatch(updateProduct(productToUpdate));
  };

  return (
    <>
      <Button className="btn btn-light my-3" onClick={() => history.goBack()}>
        <i className="fas fa-chevron-left mr-1"></i>
        Orqaga
      </Button>

      <FormContainer>
        <h1 className="py-3">Mahsulotni yangilash</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">errorUpdate</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Ism</Form.Label>
              <Form.Control
                type="name"
                placeholder="Ism kiriting"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Narx</Form.Label>
              <Form.Control
                type="number"
                placeholder="Narx kiriting"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Asosiy rasm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rasm linkini kiriting"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Fayl tanlang"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Qoshimcha rasmlar</Form.Label>
              <Form.File
                id="image-files"
                label="Fayl tanlang"
                custom
                multiple
                onChange={uploadFilesHandler}
              ></Form.File>
              {uploadingMultiple && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brend</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brendni kiriting"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Kategoriya</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kategoriyani kiriting"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Tavsif</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                placeholder="Tavsif kiriting"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Yangilash
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

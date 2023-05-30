import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";

// id, title, description, price, brand, categoryId

const UpdateProductForm = () => {
  const { register, handleSubmit } = useForm();
  const [productData, setProductData] = useState({});
  const [cat, setCat] = useState(0);

  const [productId, setProductId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  //   const [image, setImage] = useState("");

  useEffect(() => {
    let data = { title, description, price, quantity };
    setProductData(data);
  }, [title, description, price, quantity, productId]);

  const updProduct = () => {
    let valid = true;
    for (const att in productData) {
      if (!productData[att]) {
        valid = false;
      }
    }
    if (!productId) {
      valid = false;
    }
    if (!valid) {
      return alert("Por favor llena todos los campos");
    }
    axios
      .put(`https://backend-ecommerce-production-645d.up.railway.app/api/v1/products/${productId}`, productData)
      .then((res) => {
        if (res.data[0]) {
          alert("updated");
        }
      });
  };

  const getData = (product) => {
    const { id } = product;
    setProductId(id);
    axios.get(`https://backend-ecommerce-production-645d.up.railway.app/api/v1/products/${id}`).then((res) => {
      setTitle(res.data.title);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setQuantity(res.data.available_qty);
      //   setImage(res.data.images[0].url);
    });
  };

  return (
    <div className="update-main-container">
      <Form className="search-form" onSubmit={handleSubmit(getData)}>
        <Form.Group className="mb-3 id-input" controlId="formBasicPrice">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Id del producto"
            {...register("id")}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="search-button">
          Submit
        </Button>
      </Form>

      <Form onSubmit={handleSubmit(updProduct)} className="update-product-form">
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <label htmlFor="title">Titulo</label>
          <input
            type="title"
            placeholder="Ingresa el titulo"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDesc">
          <label htmlFor="description">Descripcion</label>
          <input
            type="text"
            placeholder="Descripcion"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            placeholder="Precio"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <label htmlFor="quantity">Cantidad disponible</label>
          <input
            type="number"
            placeholder="Disponibilidad"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-submit">
          Submit
        </Button>
        <Button
          variant="primary"
          type="button"
          className="btn-submit"
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProductForm;

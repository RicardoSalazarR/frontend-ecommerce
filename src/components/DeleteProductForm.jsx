import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";

// id, title, description, price, brand, categoryId

const DeleteProductForm = () => {
  const { register, handleSubmit } = useForm();
  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState(0);
  const [product, setProduct] = useState({});

  const [categories, setCategories] = useState([]);
  const [cat, setCat] = useState(0);

  useEffect(() => {
    axios
      .get("https://backend-ecommerce-production-645d.up.railway.app/api/v1/categories")
      .then((res) => setCategories(res.data));
  }, []);
  const confirm = (data) => {
    const { id } = data;
    setProductId(id);
    axios.get(`https://backend-ecommerce-production-645d.up.railway.app/api/v1/products/${id}`).then((res) => {
      setProduct(res.data);
      if (!res.data) {
        return alert("No se encontró un producto con el id");
      } else {
        setVisible(true);
      }
    });
  };

  const deleteProduct = () => {
    axios
      .delete(`https://backend-ecommerce-production-645d.up.railway.app/api/v1/products/${productId}`)
      .then((res) => {
        alert("producto eliminado exitosamente");
      })
      .catch((err) => alert("algo salió mal"));
  };

  return (
    <div className="delete-main-container">
      <Form onSubmit={handleSubmit(confirm)} className="add-product-form">
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Id del producto</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa el id del producto a eliminar"
            {...register("id")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <div className={visible ? "delete-product-container" : "hide"}>
        <h3>Estas a punto de eliminar el siguiente producto:</h3>
        <span className="product-to-delete">{product?.title}</span>
        <div className="buttons-to-delete">
          <button onClick={deleteProduct}>try</button>
          <button onClick={() => setVisible(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductForm;

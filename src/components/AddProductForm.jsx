import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import getConfig from '../utils/getConfig'

// id, title, description, price, brand, categoryId

const AddProductForm = () => {
  const { register, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const [cat, setCat] = useState(0)

  useEffect(() => {
    axios
      .get("https://backend-ecommerce-production-645d.up.railway.app/api/v1/categories")
      .then((res) => setCategories(res.data));
  }, []);

  const addProduct = (data) => {
    if(cat !== '0'){
      data.category_id = cat
    }else{
      return alert('error')
    }
    for (const item in data) {
      if(!data[item]){
        return alert('error')
      }
    }

    axios.post('https://backend-ecommerce-production-645d.up.railway.app/api/v1/products/',data,getConfig())
    .then(res => res.data==="Product created"?alert('Product created'):alert('error'))
    console.log(data);
  

  };

  return (
    <Form onSubmit={handleSubmit(addProduct)} className="add-product-form">
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Titulo</Form.Label>
        <Form.Control
          type="title"
          placeholder="Ingresa el titulo"
          {...register("title")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDesc">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="desc"
          placeholder="Descripcion"
          {...register("description")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          placeholder="Precio"
          {...register("price")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Cantidad disponible</Form.Label>
        <Form.Control
          type="number"
          placeholder="Disponibilidad"
          {...register("available_qty")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBrand">
        <Form.Label>Marca</Form.Label>
        <Form.Control
          type="brand"
          placeholder="Marca"
          {...register("brand")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Categoria</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={e=>setCat(e.target.value)}
        >
          <option value='0'>Selecciona una categoria</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBrand">
        <Form.Label>Imagen</Form.Label>
        <Form.Control
          type="url"
          placeholder="Inserta la url de la imagen"
          {...register("image")}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddProductForm;

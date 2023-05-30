import React from "react";
import { useState} from "react";
import AddProductForm from "../components/AddProductForm";
import UpdateProductForm from "../components/UpdateProductForm";
import DeleteProductForm from "../components/DeleteProductForm";

const ManageProducts = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="manage-products-main">
      <div className="actions-container">
        <h2>Selecciona la accion que deseas realizar</h2>
        <div className="options-container">
          <button className={selected === 1 ? "selected-option" : "btn-option"} onClick={()=>setSelected(1)}>
            Insertar Producto
          </button>
          <button className={selected === 2 ? "selected-option" : "btn-option"} onClick={()=>setSelected(2)}>
            {" "}
            Editar producto
          </button>
          <button className={selected === 3 ? "selected-option" : "btn-option"} onClick={()=>setSelected(3)}>
            Eliminar producto
          </button>
        </div>
      </div>
      <div className="manage-products-content">
            <div className={selected!==1?'hide':''}><AddProductForm/></div>
            <div className={selected!==2?'hide':''}><UpdateProductForm/></div>
            <div className={selected!==3?'hide':''}><DeleteProductForm/></div>
      </div>
    </div>
  );
};

export default ManageProducts;

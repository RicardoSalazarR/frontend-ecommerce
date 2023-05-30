import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);
  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  const date = (purchaseDate) => {
    const timeStamp = new Date(purchaseDate).getTime();

    const day = new Date(timeStamp).getDate();
    const month = new Date(timeStamp).toLocaleString("default", {
      month: "long",
    });
    const year = new Date(timeStamp).getFullYear();

    return month + " " + day + " " + year;
  };
  const handlePrint = (id) => {
    const elementoImprimir = document.getElementById(id);
    if (elementoImprimir) {
      const ventanaImpresion = window.open('', '_blank');
      ventanaImpresion.document.write('<html><head><title>Imprimir</title>');
      ventanaImpresion.document.write('</head><body>');
      ventanaImpresion.document.write(elementoImprimir.innerHTML);
      ventanaImpresion.document.write('</body></html>');
      ventanaImpresion.document.close();
      ventanaImpresion.print();
      ventanaImpresion.close();
    }
  };
  return (
    <div>
      <h1>Purchases</h1>
      <ul className="purchases">
        {purchases.map((purchase) => (
          <div
            className="purchases-card"
            key={purchase.id}
            id={`${purchase.id}`}
          >
            <h2 className="purchase-created">{date(purchase.dateOf)}</h2>
            <div>
              {purchase.products_in_order.map((product) => (
                <div className="product-info" key={product.id}>
                  <div className="purchases-title" key={product.id}>
                    {product.product.title}
                  </div>
                  <div className="purchases-quantity">
                    {product.productsInCart?.quantity}
                  </div>
                  <span className="product-price">$ {product.price}</span>
                </div>
              ))}
            </div>
            <h4>Precio total: ${purchase.totalPrice}</h4>
              <button onClick={() => handlePrint(purchase.id)}>Imprimir</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;

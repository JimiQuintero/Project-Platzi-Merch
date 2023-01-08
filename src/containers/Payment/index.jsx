import React, { useContext } from "react";
import "./Payment.css";
import AppContext from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

const Payment = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const history = useHistory();

  // Configuración parametros que están dentro de PaypalButton
  const paypalOptions = {
    clientId:
      "AUS0XEEjZh8tWJAKf7m6ZFYWKZLrsluN-2m6i34sNEYdyYdXCTOTRKFEp9QP8NracFsM-IxNVvQiaGpl",
    intent: "capture",
    currency: "USD",
  };

  // configuración estilos del botón
  const buttonStyles = {
    layout: "vertical",
    shape: "rect",
  };

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === "COMPLETED") {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      history.push("/checkout/success");
    }
  };

  // Configuración (metodo) para amount
  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del Pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            // Estilos para el botón
            buttonStyles={buttonStyles}
            // Valor del pago total
            amount={handleSumTotal()}
            // Información requerida
            onPaymentStart={() => console.log("Start Payment")}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;

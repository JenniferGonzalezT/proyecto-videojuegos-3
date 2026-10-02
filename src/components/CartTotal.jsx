import { precioCLP } from '../utils/formatters';

const CartTotal = ({ carrito }) => {
  // Multiplicar el precio de oferta por la cantidad de cada producto agrupado.
  const total = carrito.reduce(
    (acumulador, item) => acumulador + item.precio_oferta * item.cantidad,
    0
  );

  return (
    <h5 className="fw-bold m-0">
      Total: $<span id="total-carrito">{precioCLP(total)}</span>
    </h5>
  );
};

export default CartTotal;
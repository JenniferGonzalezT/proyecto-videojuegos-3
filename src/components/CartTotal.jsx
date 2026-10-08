import { precioCLP } from '../utils/formatters';
import { calcularTotalCarrito } from '../utils/calculations';

const CartTotal = ({ carrito }) => {
  // Calcular el total del carrito usando un helper centralizado.
  const total = calcularTotalCarrito(carrito);

  return (
    <h5 className="fw-bold m-0">
      Total: $<span id="total-carrito">{precioCLP(total)}</span>
    </h5>
  );
};

export default CartTotal;
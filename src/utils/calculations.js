// Calcular el subtotal de un producto (precio * cantidad)
export const calcularSubtotal = (precio, cantidad) => {
  return precio * cantidad;
};

// Calcular el valor total del carrito completo
export const calcularTotalCarrito = (carrito) => {
  return carrito.reduce(
    (acumulador, item) => acumulador + calcularSubtotal(item.precio_oferta, item.cantidad), 
    0
  );
};

// Calcular el total de unidades de juegos que hay en el carrito
export const contarUnidadesCarrito = (carrito) => {
  return carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
};

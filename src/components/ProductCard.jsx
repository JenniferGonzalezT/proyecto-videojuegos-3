import { precioCLP } from '../utils/formatters';

const ProductCard = ({ producto, agregarAlCarrito, carrito, mostrarToast }) => {
  // Buscar si el producto actual ya existe dentro del estado global del carrito.
  const productoEnCarrito = carrito.find((item) => item.id === producto.id);

  // Extraer la cantidad (si no existe, es 0).
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;

  const manejarClickAgregar = () => {
    agregarAlCarrito(producto);
    // Disparar el Toast global.
    mostrarToast(`¡Se agregó "${producto.nombre}" al carrito!`);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <article className="card h-100 shadow-sm">
        <img
          src={`${producto.imagen}`}
          className="card-img-top"
          alt={`Portada videojuego ${producto.nombre}`}
        />
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-center">{producto.nombre}</h3>
          <p className="card-text mb-4">{producto.descripcion}</p>

          <div className="mt-auto">
            <p className="text-decoration-line-through text-muted mb-0 small">
              Precio Normal: ${precioCLP(producto.precio_normal)}
            </p>

            <div className="precio-card p-1 mb-3 text-center fw-bold fs-5">
              Oferta: ${precioCLP(producto.precio_oferta)}
            </div>

            {/* Renderizado Condicional del Botón según la cantidad en el carrito */}
            <button 
              className={`btn w-100 fw-bold rounded-3 ${cantidadEnCarrito > 0 ? 'btn-carrito-agregado' : 'btn-carrito'}`}
              onClick={manejarClickAgregar}
            >
              {cantidadEnCarrito > 0 
                ? `Agregar otro (${cantidadEnCarrito} en carrito)` 
                : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProductCard;
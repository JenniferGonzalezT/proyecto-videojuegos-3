import { useState } from 'react';

const precioCLP = (valor) => {
  return valor.toLocaleString('es-CL');
};

const ProductCard = ({ producto, agregarAlCarrito }) => {
  // Estado local para mostrar confirmación al agregar al carrito
  const [agregado, setAgregado] = useState(false);

  const manejarClickAgregar = () => {
    agregarAlCarrito(producto);
    setAgregado(true);

    // Ocultamos el mensaje después de 3 segundos
    setTimeout(() => {
      setAgregado(false);
    }, 3000);
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

            <button 
              className="btn btn-carrito w-100 fw-bold rounded-3"
              onClick={manejarClickAgregar}
            >
              {agregado ? '¡Agregado al carrito!' : 'Agregar al Carrito'}
            </button>

            {/* Renderizado condicional: Alerta de confirmación */}
            {agregado && (
              <p className="alerta-carrito text-center fw-bold mt-2 mb-0">
                Producto añadido exitosamente
              </p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProductCard;
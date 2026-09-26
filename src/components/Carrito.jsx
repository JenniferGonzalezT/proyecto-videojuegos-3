import CartTotal from './CartTotal';

const precioCLP = (valor) => valor.toLocaleString('es-CL');

const Carrito = ({ 
  carrito, 
  agregarAlCarrito, 
  disminuirCantidad, 
  eliminarDelCarrito 
}) => {
  return (
    <div 
      className="modal fade" 
      id="modalCarrito" 
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          {/* Encabezado del Modal */}
          <div className="modal-header border-secondary">
            <h4 className="modal-title fw-bold" id="modalCarritoLabel">
              Tu Carrito de Compras
            </h4>
            <button
              type="button" 
              className="btn-close btn-close-white"
              data-bs-dismiss="modal" 
              aria-label="Cerrar"
            ></button>
          </div>
          
          {/* Cuerpo del Modal con Renderizado Condicional */}
          <div className="modal-body" id="cuerpo-carrito">
            {carrito.length === 0 ? (
              <p className="text-center mt-3">Tu carrito está vacío.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {carrito.map((item) => (
                  <li 
                    key={item.id} 
                    className="list-group-item bg-transparent text-light border-secondary 
                               d-flex justify-content-between align-items-center py-3"
                  >
                    <div className="d-flex align-items-center">
                      <img 
                        src={`${item.imagen}`} 
                        alt={item.nombre} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="rounded me-3"
                      />
                      <div>
                        <h6 className="mb-0 fw-bold">
                          {item.nombre}{' '}
                          <span className="badge bg-secondary ms-1">
                            x{item.cantidad}
                          </span>
                        </h6>
                        <small className="text-secondary d-block">
                          Unitario: ${precioCLP(item.precio_oferta)}
                        </small>
                        <small className="fw-bold text-light">
                          Subtotal: ${precioCLP(item.precio_oferta * item.cantidad)}
                        </small>
                      </div>
                    </div>

                    {/* Controles de cantidad y eliminación por ID único */}
                    <div className="d-flex align-items-center gap-1">
                      <button 
                        className="btn btn-outline-light btn-sm px-2"
                        onClick={() => disminuirCantidad(item.id)}
                        title="Restar 1 unidad"
                      >
                        -
                      </button>
                      <button 
                        className="btn btn-outline-light btn-sm px-2"
                        onClick={() => agregarAlCarrito(item)}
                        title="Sumar 1 unidad"
                      >
                        +
                      </button>
                      <button 
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => eliminarDelCarrito(item.id)}
                        title="Eliminar producto"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Pie del Modal */}
          <div className="modal-footer border-secondary d-flex justify-content-between">
            <CartTotal carrito={carrito} />
            <button 
              type="button" 
              className="btn btn-primary fw-bold"
              disabled={carrito.length === 0}
            >
              Proceder al pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
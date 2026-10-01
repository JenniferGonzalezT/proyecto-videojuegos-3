const Toast = ({ mostrar, mensaje, onClose }) => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
      <div 
        className={`toast align-items-center alerta-carrito border-0 ${mostrar ? 'show' : 'hide'}`} 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body fw-bold">
            {mensaje}
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white me-2 m-auto" 
            onClick={onClose}
            aria-label="Cerrar"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { esProductoValido } from "../utils/validators";

const ProductList = ({ agregarAlCarrito, carrito, mostrarToast }) => {
  // useState: Gestionar la lista de productos del catálogo.
  const [productos, setProductos] = useState([]);

  // useState: Gestionar el estado de carga y posibles errores.
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // useState: Contador para volver a disparar el useEffect si el usuario presiona "Reintentar".
  const [intentos, setIntentos] = useState(0);

  //  useState: Búsqueda de juegos por texto y filtro de categorías
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // useState: Definir Debounce para búsquedas por texto
  const [terminoDebounce, setTerminoDebounce] = useState("");

  // useEffect Debounce: Espera 300ms antes de aplicar el filtro de texto
  useEffect(() => {
    const temporizador = setTimeout(() => {
      setTerminoDebounce(textoBusqueda);
    }, 300);
    return () => clearTimeout(temporizador);
  }, [textoBusqueda]);

  // useEffect Fetch de datos con Abort Controller: Manejo de efectos secundarios.
  // Simulamos la carga asíncrona de datos desde una fuente externa 
  // (nuestro archivo productos.json local).
  useEffect(() => {
    // Instanciar el controlador
    const controlador = new AbortController();
    const señal = controlador.signal;

    // Llamada asíncrona con Fetch API pasando la señal.
    fetch('data/productos.json', { signal: señal })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el catálogo de productos');
        }
        return respuesta.json();
      })
      .then((datos) => {
        if (!Array.isArray(datos)) {
          throw new Error('El formato de datos recibido no es una lista válida.');
        }

        const productosValidos = datos.filter(esProductoValido);

        if (productosValidos.length === 0) {
          throw new Error('Ningún producto del catálogo cumple con el formato requerido.');
        }

        // Actualizar el estado con los datos cargados correctamente
        setProductos(productosValidos);
        setCargando(false);
      })
      .catch((err) => {
        // Verificar si el error fue por cancelación intencional
        if (err.name === 'AbortError') {
          console.log('Fetch cancelado: El componente se desmontó antes de terminar la petición.');
        } else {
          console.error('Error al cargar productos:', err);
          setError(err.message);
          setCargando(false);
        }
      });

    // Cleanup function: cancela la petición si el componente desaparece de la pantalla
    return () => controlador.abort();
  }, [intentos]);

  // Función para el botón de reintento.
  const manejarReintento = () => {
    setCargando(true);
    setError(null);
    setIntentos((prev) => prev + 1);
  };

  // Extracción dinámica: Obtener las categorías únicas disponibles en los datos
  const categoriasUnicas = ["Todas", ...new Set(productos.map(p => p.categoria))];
  const textoLimpio = terminoDebounce.trim().toLowerCase();
  
  // Filtrar productos según la búsqueda por texto y por el filtro de categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideTexto = producto.nombre.toLowerCase().includes(textoLimpio);
    const coincideCategoria = categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;
    
    return coincideTexto && coincideCategoria;
  });

  // Renderizado condicional: Mostrar un spinner mientras los datos se están cargando.
  if (cargando) {
    return (
      <div className="col-12 text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mensajeCarga mt-3 fw-bold">
          Cargando catálogo de juegos...
        </p>
      </div>
    );
  }

  // Renderizado condicional: Mostrar un mensaje y botón de reintento si ocurre un error.
  if (error) {
    return (
      <div className="alert alert-danger text-center my-4" role="alert">
        <p className="mb-3">
          Lo sentimos, hubo un problema al cargar el catálogo.
        </p>
        <button
          className="btn btn-outline-danger fw-bold"
          onClick={manejarReintento}
        >
          Reintentar carga
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Panel de búsqueda: Título y Categorías */}
      <div className="row justify-content-center align-items-center panel-busqueda rounded mb-4 p-3">
        
      {/* Buscador por texto */}
        <div className="col-12 col-md-6 p-2">
          <div className="input-group">
            <span className="input-group-text barra-busqueda-nombre">
              Buscar
            </span>
            <input
              type="text"
              className="form-control barra-busqueda-input"
              placeholder="Ej: Mario, Auto, etc..."
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />
          </div>
        </div>

        {/* Filtro por Categoría (Dropdown Custom de Bootstrap) */}
        <div className="col-12 col-md-4 p-2">
          <div className="dropdown d-grid">
            <button 
              className="btn btn-outline-light dropdown-toggle d-flex justify-content-between align-items-center"
              type="button"
              data-bs-toggle="dropdown" 
              aria-expanded="false">
              <span> Categoría: <strong className="ms-1">{categoriaSeleccionada}</strong></span>
            </button>
            <ul className="dropdown-menu w-100 selector-categoria">
              {categoriasUnicas.map((categoria) => (
                <li key={categoria}>
                  <button
                    className={`dropdown-item ${categoriaSeleccionada === categoria ? 'active fw-bold' : ''}`}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                  >
                    {categoria}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Botón para limpiar filtros (Búsqueda y Categoría) */}
        <div className="col-12 col-md-auto text-center p-2">
          <button 
            className="btn btn-primary" 
            onClick={() => { setTextoBusqueda(""); setCategoriaSeleccionada("Todas"); }}
            title="Limpiar búsqueda y categoría"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Renderizado del catálogo */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center my-5">
          <p className="alerta-busqueda fs-5 fw-bold">
            No se encontraron videojuegos en la categoría "{categoriaSeleccionada}" que coincidan con "{terminoDebounce}".
          </p>
        </div>
      ) : (
        <div className="row g-4 justify-content-center" id="contenedor-productos">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
              carrito={carrito}
              mostrarToast={mostrarToast}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
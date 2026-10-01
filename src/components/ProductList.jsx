import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

// Función reutilizable para validar estructura, propiedades y tipos de cada producto del JSON
const esProductoValido = (item) => {
  return (
    item &&
    (typeof item.id === "number" || typeof item.id === "string") &&
    typeof item.nombre === "string" && item.nombre.trim() !== "" &&
    typeof item.descripcion === "string" &&
    typeof item.precio_normal === "number" && item.precio_normal >= 0 &&
    typeof item.precio_oferta === "number" && item.precio_oferta >= 0 &&
    typeof item.imagen === "string" && item.imagen.trim() !== ""
  );
};

const ProductList = ({ agregarAlCarrito, terminoBusqueda = "", carrito, mostrarToast }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  // Estado contador para volver a disparar el useEffect si el usuario presiona "Reintentar"
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    // Llamada asíncrona con Fetch API
    fetch('data/productos.json')
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

        setProductos(productosValidos);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al cargar productos:', err);
        setError(err.message);
        setCargando(false);
      });
  }, [intentos]); // Se ejecuta al montar y cada vez que aumente "intentos"

  // Función para el botón de reintento
  const manejarReintento = () => {
    setCargando(true);
    setError(null);
    setIntentos((prev) => prev + 1);
  };

  // Filtramos los productos según el término de búsqueda
  const textoLimpio = terminoBusqueda.trim().toLowerCase();
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(textoLimpio)
  );

  // Renderizado condicional: Cargando
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

  // Renderizado condicional: Error con botón de reintento
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

  // Renderizado condicional: Sin resultados en la búsqueda
  if (productosFiltrados.length === 0) {
    return (
      <div className="text-center my-5">
        <p className="alerta-busqueda fs-5 fw-bold">
          No se encontraron videojuegos que coincidan con "{terminoBusqueda}".
        </p>
      </div>
    );
  }

  // Renderizado normal: Catálogo de productos
  return (
    <div className="row g-4" id="contenedor-productos">
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
  );
};

export default ProductList;
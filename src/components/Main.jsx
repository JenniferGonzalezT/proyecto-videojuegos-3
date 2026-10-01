import ProductList from './ProductList';

const Main = ({ agregarAlCarrito, terminoBusqueda, carrito, mostrarToast }) => {
  return (
    <main className="container my-5">
      {/* Título principal oculto para validadores y SEO */}
      <h1 className="visually-hidden">TeenGames - Tienda de Videojuegos</h1>

      {/* Descripción tienda */}
      <div className="text-center mb-5">
        <p className="lead">
          TeenGames es una tienda de videojuegos donde podrá encontrar todo
          tipo de juegos, de distintas épocas y para distintos dispositivos.
          Esperamos que encuentre su videojuego favorito, ya sea que se
          encante con uno nuevo o que se reencuentre con los clásicos.
        </p>
      </div>

      {/* Título "Productos Destacados" */}
      <h2 className="text-center mb-4" id="productos">Productos Destacados</h2>

      {/* Aquí insertamos los productos */}
      <ProductList 
        agregarAlCarrito={agregarAlCarrito} 
        terminoBusqueda={terminoBusqueda}
        carrito={carrito}
        mostrarToast={mostrarToast}
      />
    </main>
  );
};

export default Main;
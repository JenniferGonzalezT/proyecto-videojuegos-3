import { useState, useEffect } from 'react';

const Header = ({ totalProductos, onBuscar }) => {
  // Estado local para capturar lo que el usuario escribe en tiempo real.
  const [textoBusqueda, setTextoBusqueda] = useState('');

  // Aplicar Debounce (300ms) para evitar renderizados continuos en el catálogo.
  useEffect(() => {
    const temporizador = setTimeout(() => {
      onBuscar(textoBusqueda);
    }, 300);

    // Si el usuario sigue escribiendo antes de los 300ms, reiniciar el reloj.
    return () => clearTimeout(temporizador);
  }, [textoBusqueda, onBuscar]);

  // Al presionar Enter o el botón "Buscar", filtrar y bajar a la sección #productos.
  const manejarSubmitBusqueda = (e) => {
    // Evitar recarga de la página.
    e.preventDefault();
    onBuscar(textoBusqueda);

    const seccionProductos = document.getElementById('productos');
    if (seccionProductos) {
      seccionProductos.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Al presionar "Inicio" o el logo, limpiar la búsqueda para mostrar todos los productos.
  const manejarClickInicio = () => {
    setTextoBusqueda('');
    onBuscar('');
  };

  return (
    <header id="inicio">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4">
        {/* Brand */}
        <a 
          href="#inicio" 
          className="navbar-brand me-4"
          onClick={manejarClickInicio}
        >
          TeenGames
        </a>

        {/* Button collapse */}
        <button
          className="navbar-toggler ms-auto me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#contenido-nav"
          aria-controls="contenido-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav content */}
        <div className="collapse navbar-collapse" id="contenido-nav">
          {/* Categorías menú */}
          <ul className="navbar-nav ms-auto me-2 align-items-lg-center text-lg-center">
            {/* Inicio */}
            <li className="nav-item">
              <a 
                href="#inicio" 
                className="nav-link active"
                onClick={manejarClickInicio}
              >
                Inicio
              </a>
            </li>

            {/* Productos destacados */}
            <li className="nav-item">
              <a href="#productos" className="nav-link text-nowrap">
                Productos destacados
              </a>
            </li>

            {/* Catálogo */}
            <li className="nav-item dropdown">
              {/* BTN */}
              <a
                href="#"
                role="button"
                className="nav-link dropdown-toggle"
                id="btn-dropdown-catalogo"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Catálogo
              </a>

              {/* Contenido */}
              {/* Esta sección haría referencia a otra páginas con el catálogo de Videojuegos, Consolas y Accesorios. */}
              <div className="dropdown-menu" aria-labelledby="btn-dropdown-catalogo" role="menu">
                <a href="#" className="dropdown-item">Videojuegos</a>
                <a href="#" className="dropdown-item">Consolas</a>
                <a href="#" className="dropdown-item">Accesorios</a>
              </div>
            </li>

            {/* Contacto */}
            <li className="nav-item">
              <a href="#contacto" className="nav-link">Contacto</a>
            </li>
          </ul>

          {/* Formulario Barra de búsqueda */}
          <form 
            className="d-flex me-2" 
            id="form-busqueda" 
            role="search"
            onSubmit={manejarSubmitBusqueda}
          >
            {/* Busqueda */}
            <input
              type="search"
              className="form-control me-1"
              id="input-busqueda"
              placeholder="Buscar juego..."
              aria-label="Buscar"
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />

            {/* Botón Buscar */}
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </form>
        </div>

        {/* Botón Carrito */}
        <button
          className="btn btn-primary my-2 fw-bold text-nowrap"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#modalCarrito"
        >
          Carrito (<span id="contador-carrito">{totalProductos}</span>)
        </button>
      </nav>
    </header>
  );
};

export default Header;
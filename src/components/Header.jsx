const Header = ({ totalProductos }) => {
  return (
    <header id="inicio">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4">
        {/* Brand */}
        <a 
          href="#inicio" 
          className="navbar-brand me-4"
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
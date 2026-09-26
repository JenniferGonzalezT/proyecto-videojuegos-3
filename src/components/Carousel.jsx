const Carousel = () => {
  return (
    <div
      id="carrusel-promociones"
      className="carousel slide carousel-fade mb-4"
      data-bs-ride="carousel"
    >
      {/* Indicadores */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carrusel-promociones"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Diapositiva 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carrusel-promociones"
          data-bs-slide-to="1"
          aria-label="Diapositiva 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carrusel-promociones"
          data-bs-slide-to="2"
          aria-label="Diapositiva 3"
        ></button>
      </div>

      {/* Diapositivas */}
      <div className="carousel-inner">
        {/* #1 Videojuegos */}
        <div className="carousel-item active" data-bs-interval="3000">
          <img
            src="assets/img/portada-videojuegos.webp"
            alt="Portada Videojuegos"
            loading="eager"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block">
            <h2>Videojuegos</h2>
          </div>
        </div>

        {/* #2 Consolas */}
        <div className="carousel-item" data-bs-interval="3000">
          <img
            src="assets/img/portada-consolas.webp"
            alt="Portada Consolas"
            loading="lazy"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block">
            <h2>Consolas</h2>
          </div>
        </div>

        {/* #3 Accesorios */}
        <div className="carousel-item" data-bs-interval="3000">
          <img
            src="assets/img/portada-accesorios.webp"
            alt="Portada Accesorios"
            loading="lazy"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block">
            <h2>Accesorios</h2>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carrusel-promociones"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carrusel-promociones"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carousel;
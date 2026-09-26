import { useState, useEffect } from 'react';

const Footer = () => {
  // Estados para los campos del formulario
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  // Estados para errores de validación y mensaje de éxito
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Ocultar automáticamente el mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (enviado) {
      const temporizador = setTimeout(() => {
        setEnviado(false);
      }, 5000);

      // Limpiamos el temporizador si el componente se desmonta o cambia antes de los 5 segundos
      return () => clearTimeout(temporizador);
    }
  }, [enviado]);

  // Función reutilizable para validar cada campo
  const validarCampo = (nombreCampo, valor) => {
    const texto = valor.trim();
    if (nombreCampo === 'nombre') {
      return texto.length >= 3 && texto.length <= 30;
    }
    if (nombreCampo === 'correo') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
    }
    if (nombreCampo === 'mensaje') {
      return texto.length >= 10 && texto.length <= 200;
    }
    return true;
  };

  // Evento onChange para actualizar los inputs en tiempo real
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    setEnviado(false);

    // Validar en tiempo real mientras escribe
    setErrores({
      ...errores,
      [name]: !validarCampo(name, value)
    });
  };

  // Evento onSubmit al enviar el formulario
  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevosErrores = {
      nombre: !validarCampo('nombre', formulario.nombre),
      correo: !validarCampo('correo', formulario.correo),
      mensaje: !validarCampo('mensaje', formulario.mensaje)
    };

    setErrores(nuevosErrores);

    // Si ningún campo tiene error, enviamos y limpiamos
    if (!nuevosErrores.nombre && !nuevosErrores.correo && !nuevosErrores.mensaje) {
      setEnviado(true);
      setFormulario({ nombre: '', correo: '', mensaje: '' });
      setErrores({});
    }
  };

  return (
    <footer className="py-5">
      <div className="container">
        <h2 className="text-center mb-4" id="contacto">Contacto</h2>

        <div className="row">
          {/* Columna Datos de contacto */}
          <div className="col-12 col-lg-4 text-lg-center">
            <h3>Datos de contacto</h3>
            <ul className="list-unstyled">
              <li>
                <strong>Dirección:</strong> Av. Santa Ana 1234, Providencia, Santiago
              </li>
              <li>
                <strong>Teléfono:</strong> +56 9 1234 5678
              </li>
              <li>
                <strong>Correo:</strong>{' '}
                <a href="mailto:teengames@gmail.com" className="text-decoration-none">
                  teengames@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Redes sociales */}
          <div className="col-12 col-lg-4 text-lg-center">
            <h3>Redes sociales</h3>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Ponte en contacto */}
          <div className="col-12 col-lg-4 text-lg-center">
            <h3>¡Ponte en contacto con nosotros!</h3>

            {/* Formulario de contacto */}
            <form id="form-contacto" noValidate onSubmit={manejarEnvio}>
              {/* Campo Nombre */}
              <div className="mb-3">
                <input
                  type="text" 
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                  id="form-nombre" 
                  placeholder="Ingresa tu nombre"
                  required
                />
                <div className="invalid-feedback text-start">
                  Por favor, ingresa un nombre válido (entre 3 a 30 caracteres).
                </div>
              </div>

              {/* Campo Correo */}
              <div className="mb-3">
                <input
                  type="email"
                  name="correo"
                  value={formulario.correo}
                  onChange={manejarCambio}
                  className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                  id="form-correo"
                  placeholder="Ingresa tu correo"
                  required
                />
                <div className="invalid-feedback text-start">
                  Por favor, ingresa un correo electrónico válido.
                </div>
              </div>

              {/* Campo Mensaje */}
              <div className="mb-3">
                <textarea
                  name="mensaje"
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                  id="form-mensaje"
                  rows="3"
                  placeholder="Ingresa tu mensaje o consulta"
                  required
                ></textarea>
                <div className="invalid-feedback text-start">
                  Por favor, detalla brevemente tu consulta (entre 10 a 200 caracteres).
                </div>
              </div>

              {/* Botón Enviar */}
              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Enviar mensaje
              </button>

              {/* Renderizado condicional de éxito */}
              {enviado && (
                <div className="alert alert-success mt-3 py-2 text-center" role="alert">
                  ¡Mensaje enviado con éxito! Te contactaremos pronto.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Ir al comienzo */}
        <div className="text-end my-3">
          <a href="#inicio" aria-label="Volver arriba" className="text-decoration-none">
            Ir al comienzo
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-4 border-top border-secondary pt-3">
          <p><small>Copyright &copy; 2026 TeenGames. Todos los derechos reservados.</small></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
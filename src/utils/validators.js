// Utilidad para validar la estructura de los productos del JSON
export const esProductoValido = (item) => {
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

// Utilidad para validar los campos del formulario de contacto
export const validarCampoContacto = (nombreCampo, valor) => {
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

import { useState, useEffect } from 'react';
import { contarUnidadesCarrito } from './utils/calculations';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Main from './components/Main';
import Carrito from './components/Carrito';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './index.css';

function App() {
  // useState: Gestionar el estado del carrito. 
  // Inicializar leyendo desde localStorage para persistir los datos entre recargas.
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito_teengames');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error('Error al leer localStorage:', error);
      return [];
    }
  });

  // useState: Gestionar la visibilidad y el mensaje del Toast global.
  const [toast, setToast] = useState({ mostrar: false, mensaje: '' });

  // useEffect: Efecto secundario que sincroniza el estado del carrito 
  // con el localStorage cada vez que el carrito se actualiza.
  useEffect(() => {
    localStorage.setItem('carrito_teengames', JSON.stringify(carrito));
  }, [carrito]);

  // Agregar productos al carrito y agrupar repetidos mediante "cantidad" e "id" único.
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existeProducto = carritoActual.find((item) => item.id === producto.id);

      if (existeProducto) {
        // Si ya existe en el carrito, incrementamos su cantidad.
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si es nuevo, lo agregamos con cantidad inicial de 1.
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Disminuir cantidad o eliminar producto usando su ID único.
  const disminuirCantidad = (idProducto) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === idProducto ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // Eliminar completamente un producto por su ID único.
  const eliminarDelCarrito = (idProducto) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== idProducto)
    );
  };

  // Función para disparar el Toast desde las tarjetas.
  const mostrarToast = (mensaje) => {
    setToast({ mostrar: true, mensaje });
    // Ocultar el Toast automáticamente después de 5 segundos.
    setTimeout(() => {
      setToast({ mostrar: false, mensaje: '' });
    }, 5000);
  };

  // Calcular el total de unidades en el carrito para mostrar en el contador del Header.
  // Utilizando un helper centralizado.
  const totalUnidades = contarUnidadesCarrito(carrito);
  
  return (
    <>
      <Header
        totalProductos={totalUnidades}
      />

      <Carousel />

      <Main 
        agregarAlCarrito={agregarAlCarrito}
        carrito={carrito}
        mostrarToast={mostrarToast}
      />

      <Footer />

      <Carrito 
        carrito={carrito} 
        agregarAlCarrito={agregarAlCarrito}
        disminuirCantidad={disminuirCantidad}
        eliminarDelCarrito={eliminarDelCarrito} 
      />

      <Toast 
        mostrar={toast.mostrar} 
        mensaje={toast.mensaje} 
        onClose={() => setToast({ mostrar: false, mensaje: '' })} 
      />
    </>
  );
}

export default App;
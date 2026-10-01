import { useState, useEffect } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Main from './components/Main';
import Carrito from './components/Carrito';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './index.css';

function App() {
  // Inicializar estado del carrito desde localStorage con validación segura
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito_teengames');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error('Error al leer localStorage:', error);
      return [];
    }
  });

  // Estado para manejar un Toast global
  const [toast, setToast] = useState({ mostrar: false, mensaje: '' });

  // Sincronizar el carrito con localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito_teengames', JSON.stringify(carrito));
  }, [carrito]);

  // Agrupar productos repetidos mediante "cantidad" e "id" único
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existeProducto = carritoActual.find((item) => item.id === producto.id);

      if (existeProducto) {
        // Si ya existe en el carrito, incrementamos su cantidad
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si es nuevo, lo agregamos con cantidad inicial de 1
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Disminuir cantidad o eliminar producto usando su ID único
  const disminuirCantidad = (idProducto) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === idProducto ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // Eliminar completamente un producto por su ID único
  const eliminarDelCarrito = (idProducto) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== idProducto)
    );
  };

  // Función para disparar el Toast desde las tarjetas
  const mostrarToast = (mensaje) => {
    setToast({ mostrar: true, mensaje });
    setTimeout(() => {
      setToast({ mostrar: false, mensaje: '' });
    }, 5000);
  };

  // Calcular el total de unidades en el carrito para el contador del Header
  const totalUnidades = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Estado para almacenar el término de búsqueda con debounce
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  
  return (
    <>
      <Header
        totalProductos={totalUnidades}
        onBuscar={setTerminoBusqueda}
      />

      <Carousel />

      <Main 
        agregarAlCarrito={agregarAlCarrito}
        terminoBusqueda={terminoBusqueda}
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
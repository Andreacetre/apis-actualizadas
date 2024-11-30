// Controllers/CarritoController.js
const Carrito = require('../Models/CarritoModel');

// Crear un carrito nuevo
const crearCarrito = async (req, res) => {
  try {
    const carritoData = req.body;

    // Calcular subtotales
    carritoData.productos.forEach((producto) => {
      producto.subtotal = producto.cantidad * producto.precioUnitario;
    });

    // Calcular subtotal general y total
    carritoData.subtotal = carritoData.productos.reduce((acc, producto) => acc + producto.subtotal, 0);
    carritoData.total = carritoData.subtotal; // Si no hay impuestos, total es igual al subtotal

    const nuevoCarrito = new Carrito(carritoData);
    const carritoGuardado = await nuevoCarrito.save();

    res.status(201).json(carritoGuardado);
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el carrito",
      error,
    });
  }
};


// Obtener el carrito (si solo hay uno por usuario)
const obtenerCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({ estado: 'activo' });
        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
};

// Actualizar el carrito (agregar o quitar productos)
const actualizarCarrito = async (req, res) => {
    const { id } = req.params;
    const { productos, total } = req.body;

    try {
        const carritoActualizado = await Carrito.findByIdAndUpdate(
            id,
            { productos, total },
            { new: true }
        );

        if (!carritoActualizado) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json(carritoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el carrito', error });
    }
};

// Eliminar el carrito (finalizarlo)
const eliminarCarrito = async (req, res) => {
    const { id } = req.params;

    try {
        const carritoEliminado = await Carrito.findByIdAndDelete(id);

        if (!carritoEliminado) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json({ message: 'Carrito eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el carrito', error });
    }
};

module.exports = { crearCarrito, obtenerCarrito, actualizarCarrito, eliminarCarrito };

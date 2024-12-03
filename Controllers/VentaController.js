const Venta = require('../Models/VentaModel');
const Producto = require('../Models/VentaModel');

exports.crearVenta = async (req, res) => {
    try {
        const { cliente, productos } = req.body;
        let total = 0;

        // Calcular el total y actualizar el stock
        for (let item of productos) {
            const producto = await Producto.findById(item.producto);
            if (!producto) {
                return res.status(404).json({ mensaje: `Producto ${item.producto} no encontrado` });
            }
            if (producto.stock < item.cantidad) {
                return res.status(400).json({ mensaje: `Stock insuficiente para el producto ${producto.nombre}` });
            }
            total += item.cantidad * producto.precio;
            producto.stock -= item.cantidad;
            await producto.save();
        }

        const nuevaVenta = new Venta({
            cliente,
            productos: productos.map(item => ({
                producto: item.producto,
                cantidad: item.cantidad,
                precio: item.precio
            })),
            total
        });

        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la venta', error: error.message });
    }
};

exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('cliente').populate('productos.producto');
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
    }
};

exports.obtenerVentaPorId = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id).populate('cliente').populate('productos.producto');
        if (!venta) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la venta', error: error.message });
    }
};

exports.actualizarVenta = async (req, res) => {
    try {
        const ventaActualizada = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ventaActualizada) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }
        res.status(200).json(ventaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la venta', error: error.message });
    }
};

exports.eliminarVenta = async (req, res) => {
    try {
        const ventaEliminada = await Venta.findByIdAndDelete(req.params.id);
        if (!ventaEliminada) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }
        res.status(200).json({ mensaje: 'Venta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la venta', error: error.message });
    }
};


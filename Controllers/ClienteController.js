const Cliente = require('../Models/ClienteModel');

exports.crearCliente = async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el cliente', detalle: error.message });
    }
};

exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes', detalle: error.message });
    }
};

exports.obtenerClientePorId = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente', detalle: error.message });
    }
};

exports.actualizarCliente = async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!clienteActualizado) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json(clienteActualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el cliente', detalle: error.message });
    }
};

exports.eliminarCliente = async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
        if (!clienteEliminado) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente', detalle: error.message });
    }
};


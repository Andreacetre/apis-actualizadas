const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo válido.']
    },
    telefono: {
        type: String,
        required: true,
        match: [/^\d+$/, 'Por favor ingrese un número de teléfono válido.']
    },
    direccion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;


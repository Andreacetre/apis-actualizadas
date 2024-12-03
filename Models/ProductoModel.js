const mongoose = require('mongoose');

// Definir el esquema para el producto
const productoSchema = new mongoose.Schema({
    barcode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: { // Cambiado a 'category' para coincidir con el populate
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',  // Relacionado con el modelo de categoría
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
}, {
    timestamps: true
});

// Crear el modelo si no existe
const Producto = mongoose.models.Producto || mongoose.model('Producto', productoSchema);

module.exports = Producto;

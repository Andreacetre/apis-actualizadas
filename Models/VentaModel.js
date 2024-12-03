const mongoose = require('mongoose');

const productoVendidoSchema = new mongoose.Schema({
    producto: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Producto', 
        required: true 
    },
    cantidad: { 
        type: Number, 
        required: true 
    },
    precio: { 
        type: Number, 
        required: true 
    }
});

const ventaSchema = new mongoose.Schema({
    cliente: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cliente', 
        required: true 
    },
    productos: [productoVendidoSchema],
    total: { 
        type: Number, 
        required: true 
    }
}, {
    timestamps: true
});

const Venta = mongoose.models.Venta || mongoose.model('Venta', ventaSchema);
module.exports = Venta;


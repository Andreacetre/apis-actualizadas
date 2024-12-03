const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Importar las rutas
const rolRutas = require('./Routes/RolRoutes');
const usuarioRoutes = require('./Routes/UsuarioRoutes');
const categoriaRutas = require('./Routes/CategoriaProductoRoutes');
const productoRutas = require('./Routes/ProductoRoutes');
const proveedorRutas = require('./Routes/ProveedorRoutes');
const compraRoutes = require('./Routes/CompraRoutes');
const clientesRoutes = require('./Routes/ClienteRoutes');
const pedidoRoutes = require('./Routes/PedidoRoutes');
const ventaRoutes = require('./Routes/VentasRoutes');
const DevolucionRoutes = require('./Routes/DevolucionRoutes');
const carritoRoutes = require('./Routes/CarritoRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Conectar rutas
app.use('/api/rol', rolRutas);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/categorias', categoriaRutas);
app.use('/api/producto', productoRutas);
app.use('/api/proveedor', proveedorRutas);
app.use('/api/compra', compraRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedido', pedidoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/devolucion', DevolucionRoutes);
app.use('/api/carrito', carritoRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error conectando a MongoDB:', error));

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


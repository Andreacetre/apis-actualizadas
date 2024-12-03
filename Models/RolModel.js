const mongoose = require('mongoose');

const PermisoSchema = new mongoose.Schema({
  crear: { type: Boolean, default: false },
  modificar: { type: Boolean, default: false },
  cambiarEstado: { type: Boolean, default: false },
  ver: { type: Boolean, default: false },
  eliminar: { type: Boolean, default: false },
  listar: { type: Boolean, default: false },
  buscar: { type: Boolean, default: false }
});

const RolSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, required: true },
  permisos: {
    configuracion: PermisoSchema,
    usuarios: PermisoSchema,
    compras: PermisoSchema,
    ventas: PermisoSchema
  }
});

module.exports = mongoose.model('Rol', RolSchema);


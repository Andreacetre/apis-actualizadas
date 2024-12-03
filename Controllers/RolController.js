const Rol = require('../Models/RolModel');

exports.crearRol = async (req, res) => {
  try {
    const { nombre, estado, permisos } = req.body;
    const nuevoRol = new Rol({ nombre, estado, permisos });
    await nuevoRol.save();
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.obtenerRolPorId = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (!rol) return res.status(404).json({ mensaje: 'Rol no encontrado' });
    res.status(200).json(rol);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.actualizarRol = async (req, res) => {
  try {
    const { nombre, estado, permisos } = req.body;
    const rolActualizado = await Rol.findByIdAndUpdate(
      req.params.id,
      { nombre, estado, permisos },
      { new: true, runValidators: true }
    );
    if (!rolActualizado) return res.status(404).json({ mensaje: 'Rol no encontrado' });
    res.status(200).json(rolActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.eliminarRol = async (req, res) => {
  try {
    const rolEliminado = await Rol.findByIdAndDelete(req.params.id);
    if (!rolEliminado) return res.status(404).json({ mensaje: 'Rol no encontrado' });
    res.status(200).json({ mensaje: 'Rol eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};


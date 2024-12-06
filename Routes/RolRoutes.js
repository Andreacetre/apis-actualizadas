const express = require('express');
const router = express.Router();
const rolController = require('../Controllers/RolController');

router.post('/', rolController.crearRol);
router.get('/', rolController.obtenerRoles);
router.get('/:id', rolController.obtenerRolPorId);
router.put('/:id', rolController.actualizarRol);
router.delete('/:id', rolController.eliminarRol);
router.patch('/:id/observacion', rolController.actualizarObservacion); // Nueva ruta para actualizar solo la observación

module.exports = router;
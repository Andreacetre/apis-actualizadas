const express = require('express');
const router = express.Router();
const rolController = require('../Controllers/rolController');

router.post('/', rolController.crearRol);
router.get('/', rolController.obtenerRoles);
router.get('/:id', rolController.obtenerRolPorId);
router.put('/:id', rolController.actualizarRol);
router.delete('/:id', rolController.eliminarRol);

module.exports = router;



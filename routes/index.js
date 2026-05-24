const router = require('express').Router();
const userRoutes = require('./userRoutes');
const noteRoutes = require('./bookmarkRoutes');

router.use('/user', userRoutes);
router.use('/notes', noteRoutes);

module.exports = router;
const express = require('express')
let router = express.Router()

router.get('', getBrands);
router.get(':id', getBrandById);

module.exports = router
const parser = require("./../controllers/resume-parser.js")
const bulkParser = require("./../controllers/bulk-parser.js")
const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer()

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
// router.use('/docs', express.static('docs'));

// router.route('/parser').post(upload.any(), parser.analizer);
router.route('/parser').post(upload.any(), bulkParser.analizer);

module.exports = router;

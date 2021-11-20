const express = require ('express');
const router = express.Router();

const studentRouter = require('./student.routes');
const graduateRouter = require('./graduate.routes');

router.use('/student', studentRouter);
router.use('/graduate', graduateRouter);

module.exports = router;
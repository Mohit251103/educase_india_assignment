const { getSchools, addSchool } = require("../controllers/schoolController");
const router = require("express").Router();

router.get('/listSchools', getSchools);
router.post('/addSchool', addSchool);

module.exports = router;
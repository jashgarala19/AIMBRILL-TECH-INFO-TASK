const router = require("express").Router();

const getEmployees = require("../controllers/employee/list");
const createEmployee = require("../controllers/employee/add");
const createEmployees = require("../controllers/employee/addMany");
const deleteEmployee = require("../controllers/employee/delete");
const updateRole = require("../controllers/employee/update");

router.get("/", getEmployees);
router.post("/", createEmployee);
router.post("/bulk", createEmployees);

router.delete("/", deleteEmployee);
router.put("/:id", updateRole);

module.exports = router;

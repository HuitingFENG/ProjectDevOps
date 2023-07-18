const imageUpload = require('../middleware/imageUpload')
module.exports = (app) => {
    const employees = require("../controllers/Employees.controller.js");
    const router = require("express").Router();
    router.post("/", imageUpload, employees.create);
    router.get("/", employees.findAll);
    router.get("/published", employees.findAllPublished);
    router.get("/:id", employees.findOne);
    router.put("/:id", employees.update);
    router.delete("/:id", employees.delete);
    router.delete("/", employees.deleteAll);
    app.use("/api/employees", router);
};
// Appelle aux méthodes des controllers Employees.
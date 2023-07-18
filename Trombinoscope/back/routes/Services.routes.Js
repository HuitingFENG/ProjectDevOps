module.exports = (app) => {
    const services = require("../controllers/Services.controller.js");
    const router = require("express").Router();
    router.post("/", services.create);
    router.get("/", services.findAll);
    router.get("/published", services.findAllPublished);
    router.get("/:id", services.findOne);
    router.put("/:id", services.update);
    router.delete("/:id", services.delete);
    router.delete("/", services.deleteAll);
    app.use("/api/services", router);
};
// Appelle aux méthodes des controllers Services.
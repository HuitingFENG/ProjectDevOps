module.exports = (app) => {
    const agences = require("../controllers/Agences.controller.js");
    const router = require("express").Router();
    router.post("/", agences.create);
    router.get("/", agences.findAll);
    router.get("/published", agences.findAllPublished);
    router.get("/:id", agences.findOne);
    router.put("/:id", agences.update);
    router.delete("/:id", agences.delete);
    router.delete("/", agences.deleteAll);
    app.use("/api/agences", router);
};
// Appelle aux méthodes des controllers Agences
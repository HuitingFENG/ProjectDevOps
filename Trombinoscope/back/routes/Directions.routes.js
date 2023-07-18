module.exports = (app) => {
    const directions = require("../controllers/Directions.controller.js");
    const router = require("express").Router();
    router.post("/", directions.create);
    router.get("/direction-services", directions.findAllDirectionServices);
    router.get("/", directions.findAll);
    router.get("/published", directions.findAllPublished);
    router.get("/:id", directions.findOne);
    router.put("/:id", directions.update);
    router.delete("/:id", directions.delete);
    router.delete("/", directions.deleteAll);
    app.use("/api/directions", router);
};
// Appelle aux méthodes des controllers Directions

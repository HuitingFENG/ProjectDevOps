module.exports = (app) => {
    const pilotage = require("../controllers/Pilotages.controller");
    const router = require("express").Router();
    router.post("/", pilotage.create);
    router.get("/", pilotage.findAll);
    router.get("/published", pilotage.findAllPublished);
    router.get("/:id", pilotage.findOne);
    router.put("/:id", pilotage.update);
    router.delete("/:id", pilotage.delete);
    router.delete("/", pilotage.deleteAll);
    app.use("/api/pilotages", router);
};
// Appelle aux méthodes des controllers Pilotages.
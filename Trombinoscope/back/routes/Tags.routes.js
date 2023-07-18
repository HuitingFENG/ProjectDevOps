module.exports = (app) => {
  const tags = require("../controllers/Tags.controller.js");
  const router = require("express").Router();
  router.post("/", tags.create);
  router.get("/", tags.findAll);
  router.get("/published", tags.findAllPublished);
  router.get("/:id", tags.findOne);
  router.put("/:id", tags.update);
  router.delete("/:id", tags.delete);
  router.delete("/", tags.deleteAll);
  app.use("/api/tags", router);
};
// Appelle aux méthodes des controllers Tags.
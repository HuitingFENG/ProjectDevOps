const db = require("../models");
const Directions = db.directions;
const Services = db.services;
// const Services_Direction = db.services_direction;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const directions = {
        name: req.body.name,
    };

    Directions.create(directions)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Directions.",
            });
        });
};

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {direction_id: {[Op.like]: `%${id}%`}}
        : null;

    Directions.findAll({where: condition})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Directions.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Directions with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Directions with id=" + id,
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Directions.update(req.body, {
        where: {id: id},
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Directions.destroy({
        where: {id: id},
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Directions.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({message: `${nums} Tutorials were deleted successfully!`});
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials.",
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Directions.findAll({where: {published: true}})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

// Find all Direction-belinging-services Tutorials
exports.findAllDirectionServices = (req, res) => {
    Directions.findAll(
    {
      include: [{
        model: Services,
      }],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

//Directions controller est une classe qui va contenir différentes méthodes.
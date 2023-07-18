const db = require("../models");
const Services = db.services;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const services = {
        name: req.body.name,
    };

    Services.create(services)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Services_activites.",
            });
        });
};

exports.findAll = (req, res) => {
    Services.findAll()
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    Services.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Services_activites with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Services_activites with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Services.update(req.body, {
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

exports.delete = (req, res) => {
    const id = req.params.id;

    Services.destroy({
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

exports.deleteAll = (req, res) => {
    Services.destroy({
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

exports.findAllPublished = (req, res) => {
    Services.findAll({where: {published: true}})
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
//Services controller est une classe qui va contenir différentes méthodes.
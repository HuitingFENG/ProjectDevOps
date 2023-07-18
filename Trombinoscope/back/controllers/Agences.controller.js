const db = require("../models");
const Agences = db.agences;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const agences = {
        city: req.body.city,
    };

    Agences.create(agences)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Agences.",
            });
        });
};

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {id: {[Op.like]: `%${id}%`}} : null;

    Agences.findAll({where: condition})
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

    Agences.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Agences with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Agences with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Agences.update(req.body, {
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

    Agences.destroy({
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
    Agences.destroy({
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
    Agences.findAll({where: {published: true}})
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
//Agence controller est une classe qui va contenir différentes méthodes.
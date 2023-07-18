const db = require("../models");
const Pilotages = db.pilotages;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const pilotages = {
        pilotages: req.body.name,
    };

    Pilotages.create(pilotages)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pilotages.",
            });
        });
};

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {agence_id: {[Op.like]: `%${id}%`}} : null;

    Pilotages.findAll({where: condition})
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

    Pilotages.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Pilotages with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Pilotages with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Pilotages.update(req.body, {
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

    Pilotages.destroy({
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
    Pilotages.destroy({
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
    Pilotages.findAll({where: {published: true}})
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
// Pilotages controller est une classe qui va contenir différentes méthodes.
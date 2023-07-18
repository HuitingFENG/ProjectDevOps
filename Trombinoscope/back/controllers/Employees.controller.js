const { employees_tags } = require("../models");
const db = require("../models");
const Employees = db.employees;
const Employees_Tags = db.employees_tags;
const Tags = db.tags;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  const {
    name,
    surname,
    email,
    mobilefixe,
    mobile,
    active,
    Tags,
    AgenceId,
    ServicesActiviteId,
    PilotageId,
    DirectionId,
  } = req.body;
  console.log(req.body);
  const employeeData = {
    // ...req.body,
    name: name,
    surname: surname,
    email: email,
    mobilefixe: mobilefixe,
    mobile: mobile,
    active: active,
    image: req.files[0]?.path,
    //include: db.tags,
  };
  if (AgenceId != "") {
    employeeData["AgenceId"] = AgenceId;
  }
  if (ServicesActiviteId != "") {
    employeeData["ServicesActiviteId"] = ServicesActiviteId;
  }
  if (PilotageId != "") {
    employeeData["PilotageId"] = PilotageId;
  }
  if (DirectionId != "") {
    employeeData["DirectionId"] = DirectionId;
  }
  if (Tags != "") {
    employeeData["Tags"] = Tags;
  }
  Employees.create(employeeData)
    .then((employee) => {
      if (Tags != "") {
        Tags.split("|")
          .map((tag) => JSON.parse(tag))
          .forEach((tag) => {
            Employees_Tags.create({ EmployeeId: employee.id, TagId: tag.id });
          });
      }
      res.send(employee);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employees.",
      });
    });
};

exports.findAll = async (req, res) => {
  const id = req.query.id;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  Employees.findAll({
    where: condition,
    include: [
      {
        model: Tags,
      },
    ],
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  Employees.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Employees with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employees with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const {
    name,
    surname,
    email,
    mobilefixe,
    mobile,
    active,
    AgenceId,
    ServicesActiviteId,
    PilotageId,
    DirectionId,
    Tags,
  } = req.body;
  Employees.findOne({ where: { id: req.params.id } })
    .then((data) => {
      const employeesData = {
        name: name ?? data.name,
        surname: surname ?? data.surname,
        email: email ?? data.email,
        mobilefixe: mobilefixe ?? data.mobilefixe,
        mobile: mobile ?? data.mobile,
        active: active ?? data.active,
      };

      employeesData["AgenceId"] = AgenceId || null;
      employeesData["ServicesActiviteId"] = ServicesActiviteId || null;
      employeesData["PilotageId"] = PilotageId || null;
      employeesData["DirectionId"] = DirectionId || null;

      const TagsPayload =
        Tags?.map((t) => ({ TagId: t, EmployeeId: req.params.id })) || [];
      Employees.update(employeesData, { where: { id: req.params.id } })
        .then(async (updateData) => {
          await Employees_Tags.destroy({
            where: { EmployeeId: req.params.id },
          });
          await Employees_Tags.bulkCreate(TagsPayload, {
            updateOnDuplicate: ["TagId"],
          });
          res.status(200).json({
            success: true,
            msg: "Employee info updated successfully",
            updateData,
          });
        })
        .catch((err) => {
          res.status(200).json({
            success: false,
            msg: "Employee info updated faild!",
          });
        });
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({
          success: false,
          msg: "Employee not found",
          errorMsg: err,
        });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Employees.destroy({
    where: { id: id },
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
  Employees.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  Employees.findAll({ where: { published: true } })
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
//Employees controller est une classe qui va contenir différentes méthodes.
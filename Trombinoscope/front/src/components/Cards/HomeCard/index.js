import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { NavLink } from "react-router-dom";
import "./index.css";
import { Avatar, Typography } from "@mui/material";
const HomeCard = ({ employee, setActif, setupdated }) => {
  const [service, setService] = useState(employee?.service);
  const [pilotage, setPilotage] = useState(employee?.pilotage);
  const [tag, setTag] = useState(employee?.tag);

  const [agence, setAgence] = useState(employee?.agence);
  const [direction, setDirection] = useState(employee?.direction);
  useEffect(() => {
    if (employee.ServicesActiviteId) {
      axios
        .get("/services/" + employee.ServicesActiviteId)
        .then((res) => setService(res.data));
    }
    if (employee.AgenceId) {
      axios
        .get("/agences/" + employee.AgenceId)
        .then((res) => setAgence(res.data));
    }
    if (employee.PilotageId) {
      axios
        .get("/pilotages/" + employee.PilotageId)
        .then((res) => setPilotage(res.data));
    }
    if (employee.DirectionId) {
      axios
        .get("/directions/" + employee.DirectionId)
        .then((res) => setDirection(res.data));
    }
    if (employee.TagId) {
      axios
        .get("/directions/" + employee.TagId)
        .then((res) => setTag(res.data));
    }
  }, []);

  return (
    // Permet de dire que la redirection est uniquement faite sur les chefs (ie : faut que le ServicesId ne soit pas 17 ou que le PilotageId soit nulle.)
    <NavLink
      to={
        employee.ServicesActiviteId == 17 || employee.PilotageId
          ? employee.PilotageId
          : "/Direction"
      }
      state={{
        data: {
          DirectionId: employee.DirectionId,
          AgenceId: employee.AgenceId,
        },
      }}
    >
      <div className="user">
        <p>{direction?.name}</p>
        <p>{service?.name}</p>

        <p>{pilotage?.name}</p>
        <h4>{employee.surname + " " + employee.name}</h4>

        <div className="cart_img">
          <Avatar
            color={"primary"}
            sx={{
              height: "100px",
              width: "100px",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              border: "2px solid #CBB780FF",
            }}
            src={`http://localhost:8080/${employee.image}`}
          >
            <Typography variant={"h5"}>
              {employee.image === null &&
                employee.name[0] + employee.surname[0]}
            </Typography>
          </Avatar>
        </div>
      </div>
    </NavLink>
  );
};

export default HomeCard;

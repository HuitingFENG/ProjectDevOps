import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { NavLink } from "react-router-dom";

import "./index.css";
const DirectionCard = ({ employee }) => {
  const [service, setService] = useState(employee?.service);
  // const [pilotage, setPilotage] = useState(employee?.agence);
  const [agence, setAgence] = useState(employee?.agence);
  const [direction, setDirection] = useState(employee?.direction);
  useEffect(() => {
    axios
      .get("/services/" + employee.ServicesActiviteId)
      .then((res) => setService(res.data));
    axios
      .get("/agences/" + employee.AgenceId)
      .then((res) => setAgence(res.data));
    // axios
    // .get("/pilotages/" + employee.PilotageId)
    // .then((res) => setPilotage(res.data));
    axios
      .get("/directions/" + employee.DirectionId)
      .then((res) => setDirection(res.data));
  }, []);
  // Ici on return la Card de Direction avec une image, nom et prénom et l'agence si y a. 
  // Navlink permet de dire que lorsqu'on clique sur Fiche détaillée on est dirigée vers la page Details
  return (
      <div className="emp">
        <div className="empimg">
            <img src={`http://localhost:8080/${employee.image}`} alt="" />
        </div>
        <h4>{employee.surname + " " + employee.name}</h4>

        <p>{agence?.city}</p>
        <NavLink to="/Details" state={{ data: employee }}>
            Fiche détaillée
        </NavLink>
       
      </div>
  );
};

export default DirectionCard;

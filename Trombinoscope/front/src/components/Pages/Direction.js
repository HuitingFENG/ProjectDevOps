import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ServicesCard from "../Cards/ServicesCard";
import { NavLink } from "react-router-dom";
import axios from "../../axios";

import "../Cards/DirectionCard/index.css";
const Direction = (employee) => {
  const directionbyservice = [
    {
      id: 1,
      name: "Direction administrative et financière France ",
      services: [
        { id: 1, name: "Resp. comptable groupe " },
        { id: 2, name: "Gestionnaires ADV" },
        { id: 3, name: "Contrôleurs de gestion" },
        { id: 4, name: "Directeur Achats " },
        { id: 5, name: "DSI " },
      ],
    },
    {
      id: 2,
      name: "Direction commerciale France",
      services: [
        { id: 6, name: "Commerciaux DMAX IDF/AURA,  DMAX SO et DMAX HDF" },
      ],
    },
    {
      id: 3,
      name: "Direction des opérations France ",
      services: [
        { id: 7, name: "Responsables d’exploitations" },
        { id: 8, name: "Coordinateurs" },
        { id: 9, name: "Chefs d’équipes / Contremaîtres" },
        { id: 10, name: "Déménageurs" },
      ],
    },
    {
      id: 4,
      name: "Direction des RH France",
      services: [
        { id: 11, name: "Chargée SIAE" },
        { id: 12, name: "Gestionnaires RH" },
        { id: 13, name: "Responsable paie" },
        { id: 14, name: "Responsable QHSE" },
        { id: 15, name: "Gestionnaire parc roulant" },
        { id: 16, name: "Gestion immobilière" },
      ],
    },
  ];
  const [direction, setDirection] = useState([]);
  const location = useLocation();
  const [agence, setAgence] = useState(employee?.agence);
  // const [emp, setEmp] = useState([]);
  const { DirectionId, AgenceId } = location.state?.data;
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("/employees").then((res) => setEmployees(res.data));
    axios.get("/agences/" + AgenceId).then((res) => setAgence(res.data));

    axios
      .get("/directions/" + DirectionId)
      .then((res) => setDirection(res.data));
  }, [DirectionId]);

  const dirandservicelist = directionbyservice.filter(
    (e) => e.id === DirectionId
  );
  const diremp = employees.filter((demp) => demp.DirectionId === DirectionId);
  const dirchief = diremp.filter((dchief) => dchief.ServicesActiviteId === 18);
  const servicelist = dirandservicelist.map((d) =>
    d.services.map((aaa) => aaa)
  );
  console.log({ agence });
  console.log({dirchief});
  console.log({employee});
  return (
    <div className="directionpage">
      <div className="direction-head">
        <h3 key={direction.name}>{direction.name} </h3>
        <NavLink to="/">
          Retour
        </NavLink>
      </div>
      <div className="diremplist">
        {dirchief.map((ce, index) => (
          <div className="emp" key={index}>
            <div className="empimg">
              <img src={`http://localhost:8080/${ce.image}`} alt="" />
            </div>
            <h4>{ce.surname + " " + ce.name}</h4>
            <p>{agence?.city}</p>

            <NavLink to="/Details" state={{ data: ce }}>
              Fiche détaillée
            </NavLink>

          </div>
        ))}
      </div>
      {servicelist.map((e) =>
        e.map((data,index) => (

          <div key={index}>
            <div className="servicename">
              <h2>{data.name}</h2>
            </div>

            <ServicesCard sid={data.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default Direction;

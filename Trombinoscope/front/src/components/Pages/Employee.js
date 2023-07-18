import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";




const Employee = () => {
  const location = useLocation();

  const [tags, setTags] = useState([]);
  // const [emp, setEmp] = useState([]);
  const employee = location.state?.data;
  const [service, setService] = useState(employee?.service);
  const [pilotage, setPilotage] = useState(employee?.pilotage);
  const [tag, setTag] = useState(employee?.tag);
  const [empTags, setEmpTags] = useState(employee?.Tags);

  const [agence, setAgence] = useState(employee?.agence);
  const [direction, setDirection] = useState(employee?.direction);
  const navigate = useNavigate();

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
      axios.get("/tag/" + employee.Tags).then((res) => setTag(res.data));
    }
    if (employee.Tags) {
      setEmpTags(employee.Tags);
    }
  }, [
    employee.ServicesActiviteId,
    employee.AgenceId,
    employee.PilotageId,
    employee.DirectionId,
    // employee.Tags,
    employee.TagId,

  ]);
  return (
    console.log({ tags }),
    console.log({ empTags }),
    console.log({ tags }),
    
    (
      <div className="empcontainer">
        <button className="gobackbutton" onClick={() => navigate(-1)}>
          Retour
        </button>
        <div className="employee">
          <div className="card-header">
            <div className="agence">
              <img
                className="avatarDetail"
                src={`http://localhost:8080/${employee.image}`}
                alt=""
              />
            </div>
            <div className="name_back_card">
              <h2>{employee.name}</h2>
              <h2>{employee.surname}</h2>
            </div>
          </div>

          <div className="card-content">
            <p>Email : {employee.email}</p>
            <p>Fixe: {employee.mobilefixe}</p>
            <p>Mobile: {employee.mobile}</p>
            <p>Agence: {agence?.city}</p>
            <p>Direction : {direction?.name}</p>
            <p>Service: {service?.name}</p>

            <p>Tags: </p>

            {employee?.Tags.map((t) => (
              <div key={t.name} className="Tags_itemss">
                <Badge color="secondary" badgeContent={t.name}></Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Employee;

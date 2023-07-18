import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import "./index.css";
import DirectionCard from "../DirectionCard";
const ServicesCard = ({ sid }) => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        axios.get("/employees").then((res) => setEmployees(res.data));
    }, []);
    const empdata = employees.filter((emp)=>emp.ServicesActiviteId === sid);
  return (
        <>
        <div className="diremplist">
            {empdata.map((semp,index)=>(
              <DirectionCard key={index} employee={semp}/>
            ))}
        </div>
        </>

       
   );
};

export default ServicesCard;

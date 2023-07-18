import React, { useEffect, useState } from "react";
import axios from "../../axios";
import HomeCard from "../Cards/HomeCard";
import { Box } from "@mui/material";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const empceo = employees.filter(
    (emp) => emp.ServicesActiviteId === 17 && emp.active !== false
  );
  const emppilotage = employees.filter(
    (emp) => emp.PilotageId !== null && emp.active !== false
  );
  const empchief = employees.filter(
    (emp) => emp.ServicesActiviteId === 18 && emp.active !== false
  );
  // const empservices = employees.filter(
  //   (emp) =>
  //     (emp.ServicesActiviteId !== 17) &
  //     (emp.ServicesActiviteId !== 18) &
  //     (emp.PilotageId === null)
  // );

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "primary.contrastText",
          minHeight: "calc(100vh - 80px)",
          p: 3,
        }}
        component={"div"}
      >
        <div className="usercontainer ceo">
          {empceo?.map((employee) => {
            if(employee.active ==true){
            return <HomeCard key={employee.id} employee={employee} />;
          }})}
        </div>
        <div className="usercontainer pilotage">
          {emppilotage?.map((employee) => {
            if(employee.active){
            return <HomeCard key={employee.id} employee={employee} />;
          }})}
        </div>
        <div className="usercontainer pilotage">
          {empchief?.map((employee) => {
            if(employee.active ){
            return <HomeCard key={employee.id} employee={employee} />;
          }})}
        </div>
        {/* <div className="usercontainer pilotage">
          {empservices?.map((employee) => {
          if(employee.active){
            return <User key={employee.id} employee={employee} />
          }})}
        </div> */}
      </Box>
    </Box>
  );
};
export default Home;

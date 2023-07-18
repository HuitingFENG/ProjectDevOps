import React, { useEffect, useState } from "react";
import axios from "../../axios";
import SearchCard from "../Cards/SearchCard";


import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const Employees = () => {
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState(null);
  const [updated, setupdated] = useState(0);

  useEffect(() => {
    const initialRequests = [
      axios.get("/employees"),
      axios.get("/services"),
      axios.get("/agences"),
      axios.get("/directions"),
      axios.get("/tags"),
    ];
    Promise.all(initialRequests).then((responses) => {
      const temp = [];
      const values = responses.map((value) => value.data);
      for (const employee of values[0]) {
        employee.service = values[1].find(
          (s) => s.id === employee?.ServicesActiviteId
        );
        employee.agence = values[2].find((a) => a.id === employee?.AgenceId);
        employee.direction = values[3].find(
          (d) => d.id === employee?.service?.DirectionId
        );
        employee.Tags = employee?.Tags.map((eTags) => {
          return {
            id: eTags.id,
            name: eTags.name,
            createdAt: eTags.createdAt,
            updatedAt: eTags.updatedAt,
          };
        });
        temp.push(employee);
      }
      setEmployees(temp);
    });
  }, [updated]);

  return (
    <Box
      sx={{
        backgroundColor: "primary.contrastText",
        display: "flex",
        justifyContent: "center",
        minHeight: "calc(100vh - 80px)",
        height: "100vh",
        overflow: "auto",
        borderColor: "red",
        p: 3,
      }}
      component={"div"}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          mx: 5,
        }}
      >
        <FormControl sx={{ m: 1, width: "20rem" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Recherche
          </InputLabel>
          <OutlinedInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Search aria-label="toggle password visibility" edge="end" />
              </InputAdornment>
            }
            label="Recherche"
          />
        </FormControl>
        <Grid container spacing={2} mt={1}>
          {employees
            ?.filter((employee) => {
              const searchFields = [
                employee.surname,
                employee.name,
                employee.surname + " " + employee.name,
                employee?.service?.name,
                employee?.direction?.name,
                employee?.agence?.city,
                employee?.Tags.map(obj=> obj.name).join(),
              ]
                .filter((item) => item != null)
                .map((str) => str.toLowerCase());
              for (const searchField of searchFields) {
                if (searchField.includes(query.toLowerCase())) {
                  return true;
                }
              }
              console.log({employee});
              return false;
            })
            .filter((e) => e.active === true)
            .map((employee) => (
              <Grid key={employee.id} item xs={12} sm={6} md={3}>
                <SearchCard
                  setupdated={setupdated}
                  key={employee.id}
                  employee={employee}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default Employees;

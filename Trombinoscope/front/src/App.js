import "./App.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Add from "./components/Pages/Add";

import Search from "./components/Pages/Search";
// import Box from "@mui/material/Box";
import Connexion from "./components/Pages/Connexion";
import Direction from "./components/Pages/Direction";
import Employee from "./components/Pages/Employee";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div
        sx={{
          backgroundColor: "primary.contrastText",
          // display: "flex",
          // justifyContent: "center",
          minHeight: "calc(100vh - 80px)",
          p: 3,
        }}
        component={"div"}
      >
        {/* Navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Accueil" element={<Home/>} />
          <Route path="/Ajouter" element={<Add />} />
          <Route path="/Rechercher" element={<Search />} />
          <Route path="/Direction" element={<Direction />} />
          <Route path="/Details" element={<Employee />} />
          <Route path="/Se-connecter" element={<Connexion />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

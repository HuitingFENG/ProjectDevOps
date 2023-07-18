import React, { useState } from "react";
import logo from '../../assets/image/logo.jpg'
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box
} from "@mui/material";
 
import { useNavigate } from "react-router-dom";

const Log_in = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const heandelButton = (e) => {
    e.preventDefault();
    if (email ===  process.env.REACT_APP_EMAIL && password === process.env.REACT_APP_PASSWORD) {
      localStorage.setItem("logsuccess", true);
      navigate("/");
 
    }
  };

  return (
    <Box sx={{
      backgroundColor: "primary.contrastText",
      display: "flex",
      justifyContent: "center",
      minHeight: "calc(100vh - 80px)",
      p: 3,
      fontSize: 'large'
  }} component={"div"}>
    <div className="Form">
      <img
        className="logo"
        style={{display:"block",margin:"0 auto"}}
        src={logo}
        alt="Logo dmax"
      />
      <Grid>
        <Card style={{ fontSize: 'large',maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Se connecter
            </Typography>

            <form onSubmit={heandelButton}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Entrez votre mail"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Entrez votre mot de passe "
                    label="Mot de passe"
                    variant="outlined"
                    value={password}
                    fullWidth
                    required
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Se connecter
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
    </Box>
  );
};
export default Log_in;

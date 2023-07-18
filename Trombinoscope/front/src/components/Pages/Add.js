import React, { useEffect, useState } from "react";

import axios from "../../axios";
import Autocomplete from "@mui/material/Autocomplete";
import logo from "../../assets/image/logo.jpg";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";

const Ajouter = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [mobilefixe, setMobilefixe] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const [inputTags, setInputTags] = useState([]);
  const [inputAgence, setInputAgence] = useState("");
  const [inputPilotage, setInputPilotage] = useState("");
  const [inputDirection, setInputDirection] = useState("");
  const [inputService, setInputService] = useState("");
  const [ModalShow, setModalShow] = useState(false);

  const [agence, setAgence] = useState();
  const [service, setService] = useState("");
  const [pilotage, setPilotage] = useState();
  const [tags, setTags] = useState([]);
  const [direction, setDirection] = useState("");
  const [agences, setAgences] = useState([]);
  const [services, setServices] = useState([]);
  const [pilotages, setPilotages] = useState([]);
  const [directions, setDirections] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [directionServicesList, setDirectionServicesList] = useState([]);

  const [alertMsg, setAlertMsg] = useState({ message: "", type: "info" });
  const [open, setOpen] = useState(false);

  const handleClose = (event) => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("/agences").then((res) => setAgences(res.data));
    axios.get("/tags").then((res) => setTags(res.data));
    axios.get("/services").then((res) => setServices(res.data));
    axios.get("/pilotages").then((res) => setPilotages(res.data));
    axios.get("/directions").then((res) => setDirections(res.data));
    axios.get("/employees").then((res) => setEmployees(res.data));
    axios
      .get("/directions/direction-services")
      .then((res) => setDirectionServicesList(res.data));
  }, []);

  const ImageUpModal = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  const validateForm = () => {
    if (pilotage) {
      if (employees.find((emp) => emp.PilotageId === pilotage?.id)) {
        return { message: "Impossible", type: "error", isApproved: false };
      }
    } else if (direction && service) {
      if (
        employees.find(
          (emp) =>
            emp.DirectionId === direction?.id &&
            emp.ServicesActiviteId === service?.id &&
            service?.id === 18
        )
      ) {
        return { message: "Impossible", type: "error", isApproved: false };
      }
    }
   
    return { message: "Success!", type: "success", isApproved: true };
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { isApproved, message, type } = validateForm();

    setAlertMsg({ message, type });
    setOpen(true);

    if (isApproved) {
      console.log("This is our Image : " + image);
      const formData = new FormData();
      const data = {
        name: name,
        surname: surname,
        email: email,
        mobilefixe: mobilefixe,
        mobile: mobile,
        Tags: inputTags.map((inputTag) => JSON.stringify(inputTag)).join("|"),
        AgenceId: agence?.id ?? "",
        PilotageId: pilotage?.id ?? "",
        DirectionId: direction?.id ?? "",
        ServicesActiviteId: service?.id ?? "",
        image: image ?? "",
        active: true,
      };
      console.log(data);
      for (const item in data) {
        formData.append(item, data[item]);
      }
      const config = { headers: { "content-type": "multipart/from-data" } };
      axios
        .post("/employees", formData, config)
        .then((res) => {
          navigate("/");
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  };
  console.log({ directionServicesList });
  console.log({ pilotage });
  console.log({ employees });

  const preparedServicesOptions = () => {
    const options = services?.map((s) => {
      return { label: s.name, ...s };
    });

    if (direction) {
      const selectedDirection = directionServicesList.find(
        (dirS) => dirS.id === direction.id
      );
      if (selectedDirection) {
        const selectedDirectionServices = selectedDirection.Services_Activites
        console.log({ services });
        console.log({ selectedDirectionServices });
        return options.filter(function (o1) {
          return selectedDirectionServices.some(function (o2) {
            return o1.id == o2.id;
          });
        });
      }
      return options;
    } else {
      return options;
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "primary.contrastText",
        display: "flex",
        justifyContent: "center",
        minHeight: "calc(100vh - 80px)",
        p: 3,
      }}
      component={"div"}
    >
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pb: 1,
          }}
        >
          <img className="logo" src={logo} alt="Logo dmax" />
        </Box>
        <Grid>
          <Card sx={{ maxWidth: 450, py: 3, px: 2 }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Ajouter un salarié
              </Typography>

              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="surname"
                      placeholder="Entrez le Prénom"
                      label="Prénom"
                      variant="outlined"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="name"
                      placeholder="Entrez le Nom"
                      label="Nom"
                      variant="outlined"
                      value={name}

                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      placeholder="Entrez l'email "
                      label="Email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="tel"
                      placeholder="Entrez le numéro de téléphone fixe"
                      label="Numéro fixe"
                      variant="outlined"
                      value={mobilefixe}
                      onChange={(e) => setMobilefixe(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="tel"
                      placeholder="Entrez le numéro mobile "
                      label="Numéro mobile"
                      variant="outlined"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      value={agence}
                      onChange={(e, nv) => setAgence(nv)}
                      inputValue={inputAgence}
                      onInputChange={(e, nv) => setInputAgence(nv)}
                      disablePortal
                      options={agences?.map((a) => {
                        return { label: a.city, ...a };
                      })}
                      renderInput={(params) => (
                        <TextField {...params} label="Agence" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      onChange={(e, nv) => setPilotage(nv)}
                      inputValue={inputPilotage}
                      onInputChange={(e, nv) => setInputPilotage(nv)}
                      disablePortal
                      options={pilotages?.map((p) => {
                        return { label: p.name, ...p };
                      })}
                      renderInput={(params) => (
                        <TextField {...params} label="Pilotage" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      onChange={(e, nv) => {
                        setDirection(nv);
                        setService("");
                      }}
                      inputValue={inputDirection}
                      onInputChange={(e, nv) => setInputDirection(nv)}
                      disablePortal
                      options={directions?.map((d) => {
                        return { label: d.name, ...d };
                      })}
                      renderInput={(params) => (
                        <TextField {...params} label="Direction" />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      onChange={(e, nv) => setService(nv)}
                      inputValue={inputService}
                      value={service}
                      onInputChange={(e, nv) => setInputService(nv)}
                      disablePortal
                      options={preparedServicesOptions()}
                      renderInput={(params) => (
                        <TextField {...params} label="Service" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      // id="size-small-filled-multi"
                      value={inputTags}
                      onChange={(e, nv) => setInputTags(nv.map((_) => _))}
                      getOptionLabel={(option) => option.name}
                      disablePortal
                      options={tags}
                      renderInput={(params) => (
                        <TextField {...params} label="Tag" />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* <input
                    name="upload-photo"
                    type="file"
                    placeholder="Entrez le lien de l'image"
                    onChange={(e) => setImage(e.target.files[0])}
                  /> */}
                    {image && (
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ mb: 2 }}
                        src={URL.createObjectURL(image)}
                      />
                    )}
                    <button className="upload_img" onClick={ImageUpModal}>
                      Choisir image
                    </button>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        border: "solid",
                        borderColor: "black",
                        backgroundColor: "#CBB780FF",
                        color:"black"
                        
                      }}
                      fullWidth
                      onClick={onSubmit}
                    >
                      Ajouter
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertMsg.type}
          sx={{ width: "100%",marginTop:"0" }}
        >
          {alertMsg.message}
        </Alert>
      </Snackbar>
      {ModalShow ? (
        <Modal
          setprofilePicture={setImage}
          setModalShow={setModalShow}
        />
      ) : null}
    </Box>
  );
};
export default Ajouter;

import { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Save } from "@mui/icons-material";
import axios from "../../axios";
import Autocomplete from "@mui/material/Autocomplete";
import "./index.css";


const EditCard = ({ employee, setEditMode, setupdated }) => {
  const [name, setName] = useState(employee.name);
  const [surname, setSurname] = useState(employee.surname);
  const [email, setEmail] = useState(employee.email);
  const [mobilefixe, setMobilefixe] = useState(employee.mobilefixe);
  const [mobile, setMobile] = useState(employee.mobile);
  const [image, setImage] = useState(employee.image);
  const [inputTags, setInputTags] = useState(employee?.tag?.name);
  const [inputAgence, setInputAgence] = useState(employee?.agence?.city);
  const [inputService, setInputService] = useState(employee?.service?.name);
  const [inputPilotage, setInputPilotage] = useState(employee?.pilotage?.name);
  const [inputDirection, setInputDirection] = useState(
    employee?.direction?.name
  );
  const [agence, setAgence] = useState(employee?.agence);
  const [service, setService] = useState(employee?.service);
  const [pilotage, setPilotage] = useState(employee?.pilotage);
  const [direction, setDirection] = useState(employee?.direction);
  const [empTags, setEmpTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [agences, setAgences] = useState([]);
  const [services, setServices] = useState([]);
  const [pilotages, setPilotages] = useState([]);
  const [directions, setDirections] = useState([]);
  const [isFormLoading, setFormLoading] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/employees/" + employee.id, {
        name: name,
        surname: surname,
        email: email,
        mobilefixe: mobilefixe,
        mobile: mobile,
        AgenceId: agence?.id ?? "",
        PilotageId: pilotage?.id ?? "",
        DirectionId: direction?.id ?? "",
        ServicesActiviteId: service?.id ?? "",
        Tags: empTags.map((tagObj) => tagObj.id),

        image: image,
        actif: true,
      })
      .then((res) => {
        console.log("Updated");
        setupdated((prev) => prev + 1);
      })
      .catch((e) => console.log(e));
    setEditMode(false);
  };

  useEffect(() => {
    axios.get("/agences").then((res) => setAgences(res.data));
    axios.get("/tags").then((res) => setTags(res.data));

    axios.get("/services").then((res) => setServices(res.data));
    axios.get("/pilotages").then((res) => setPilotages(res.data));

    axios.get("/directions").then((res) => setDirections(res.data));
  }, []);

  useEffect(() => {
    employee.ServicesActiviteId &&
      axios
        .get("/services/" + employee.ServicesActiviteId)
        .then((res) => setService(res.data));

    employee.AgenceId &&
      axios
        .get("/agences/" + employee.AgenceId)
        .then((res) => setAgence(res.data));

    employee.PilotageId &&
      axios
        .get("/pilotages/" + employee.PilotageId)
        .then((res) => setPilotage(res.data));

    employee.DirectionId &&
      axios
        .get("/directions/" + employee.DirectionId)
        .then((res) => setDirection(res.data));

    if (employee.Tags) {
      setEmpTags(employee.Tags);
    }
    setTimeout(() => {
      setFormLoading(false);
    }, 1000);
  }, [employee]);

  // console.log({ tags });
  // console.log({ empTags });
  // console.log({ agence });
  // console.log({ pilotage });
  // console.log({ direction });
  // console.log({ employee });

  function getSelectedTagOptions() {
    return tags.filter(function (o1) {
      return empTags.some(function (o2) {
        return o1.id == o2.id;          // id is unnique both array object
      });
    });
  }
  return (
    <div className="popup">
      <div className="popup_box">
        <Grid
          container
          spacing={isFormLoading ? 0 : 2}
          sx={{ borderRadius: 3, p: 2, pl: 1, backgroundColor: "#ffffff" }}
        >
          {isFormLoading ? (
            <Grid display={"flex"} justifyContent="center" item xs={12}>
              Patientez.....{" "}
            </Grid>
          ) : (
            <>
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
                  onChange={(e, nv) => setAgence(nv)}
                  inputValue={inputAgence}
                  onInputChange={(e, nv) => setInputAgence(nv)}
                  disablePortal
                  options={agences?.map((agc) => {
                    return { label: agc?.city, ...agc };
                  })}
                  defaultValue={agence ? { label: agence?.city, ...agence } :  undefined}
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
                  defaultValue={ pilotage ? { label: pilotage?.name, ...pilotage } : undefined}
                  renderInput={(params) => (
                    <TextField {...params} label="Pilotage" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  onChange={(e, nv) => setDirection(nv)}
                  inputValue={inputDirection}
                  onInputChange={(e, nv) => setInputDirection(nv)}
                  disablePortal
                  options={directions?.map((d) => {
                    return { label: d.name, ...d };
                  })}
                  defaultValue={direction ?{ label: direction?.name, ...direction } : undefined}
                  renderInput={(params) => (
                    <TextField {...params} label="Direction" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  onChange={(e, nv) => setService(nv)}
                  inputValue={inputService}
                  onInputChange={(e, nv) => setInputService(nv)}
                  disablePortal
                  options={services?.map((s) => {
                    return { label: s.name, ...s };
                  })}
                  defaultValue={service ? { label: service?.name, ...service } : undefined}
                  renderInput={(params) => (
                    <TextField {...params} label="Service" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="size-small-filled-multi"
                  defaultValue={getSelectedTagOptions}
                  onChange={(e, data) => setEmpTags(data)}
                  getOptionLabel={(option) => option.name}
                  disablePortal
                  options={tags}
                  renderInput={(params) => (
                    <TextField {...params} label="Tag" />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <input
                  name="upload-photo"
                  type="file"
                  placeholder="Entrez le lien de l'image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid> */}
              <Grid item xs={6}>
                <Button
                  onClick={onSubmit}
                  variant="contained"
                  endIcon={<Save fontSize={"inherit"} />}
                >
                  Mettre à jour
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => setEditMode(false)} variant="contained">
                  Fermer
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default EditCard;

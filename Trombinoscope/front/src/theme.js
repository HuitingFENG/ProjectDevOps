import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
            contrastText: "#CBB780FF",
        },
        secondary: {
            main: "#CBB780FF",
            contrastText: "#000000",
        },
    },
});

export default theme

// On stock dans des variables des couleurs, pour permettre d'aller plus vite dans le code, de plus, si on change la couleur, cela va s'appliquer partout.
// Couleur global.
const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const csrf = require('csurf');

dotenv.config()

const apiRouter = require('./api.js')

const app = express()

const corsOptions = {
    origin: process.env.CORS_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SECRET,
    name: 'sessionId',
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 15*24*60*60*1000, // 15 jours
    },
}))

// CSRF attack protection
// Sources : https://stackoverflow.com/a/57391494
//           https://stackoverflow.com/a/31700668
app.use(csrf());
app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
})
// Gestion custom des erreurs Csurf : https://www.npmjs.com/package/csurf#custom-error-handling
app.use((err, req, res, next) => {
    // On gère l'erreur en cas de token invalide ici pour éviter d'afficher un message d'erreur dans la console du backend
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    // Dans le cas où le token est invalide, on en renvoie un valide en cookie.
    // Cela permet à l'utilisateur de renvoyer la requête une deuxième fois et qu'elle fonctionne.
    // Mais ne change rien dans le cas d'une attaque puisqu'il ne pourra pas être lu par un autre site.
    res.cookie('XSRF-TOKEN', req.csrfToken());
    // Et on renvoie le message d'erreur
    res.status(403).json({message: "Invalid CSRF token"});
})

// Configuration des routes
app.use('/api/', apiRouter)

module.exports = app



const express = require('express');
require ('dotenv').config({path : './config/.env'});
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Connection à la base de donnée
require('./models/db_config');
const cardsRoutes = require('./controller/cardsController');
const usersRoutes = require('./controller/userController');

// Body Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// Donne accès à tout le monde à l'API
// app.use(cors());
// Donne accès à l'api à ce qui est sur le port 3000 ( REACT )
app.use(cors({origin: 'http://localhost:3000'}));

// Routes
app.use('/cards/', cardsRoutes);
app.use('/users/', usersRoutes);

// Lancement server
app.listen(process.env.PORT,()=>{ console.log(`Listening on port ${process.env.PORT}`);})
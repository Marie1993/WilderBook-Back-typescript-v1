import { Request, Response } from 'express';

const express = require('express');

const cors = require('cors');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const wilders = require('./controllers/wildersController');
require('./database');

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// //routing
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
app.post('/api/wilder/create', asyncHandler(wilders.create));
app.get('/api/wilder/:id', asyncHandler(wilders.read));
app.get('/api/wilder', asyncHandler(wilders.readAll));
app.post('/x', asyncHandler(wilders.filterLte));
app.put('/api/wilder/update/:id', asyncHandler(wilders.update));
app.delete('/api/wilder/delete/:id', asyncHandler(wilders.delete));

// //TODO trouver type pour l'erreur
app.use((error: any, req: Request, res: Response) => {
  // Sets HTTP status code
  res.status(error.status || 500);
  // Sends response
  res.json({ message: error.message });
});

// //Start Server
app.listen(4000, () => console.log('Server started on http://localhost:4000/'));

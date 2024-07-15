import express from 'express';
import { validarConexion } from './database/connection.js';
const app = express();

app.listen(4000)

console.log('listening on port 4000')
validarConexion();

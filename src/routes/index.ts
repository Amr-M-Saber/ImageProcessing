import express from 'express';
import imgProRoutes from './api/imgPro';
const routes = express.Router();

routes.use('/imgpro', imgProRoutes);

export default routes;

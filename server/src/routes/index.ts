// import ClientRoutes from "./ClientRoutes.js";
// import GeneralRoutes from "./GeneralRoutes.js";
// import ManagementRoutes from "./ManagementRoutes.js";
// import SalesRoutes from "./SalesRoutes.js";
// export {ClientRoutes, GeneralRoutes, SalesRoutes, ManagementRoutes}

import express from 'express';
import clientRouter from './ClientRoutes';
import managementRouter from './ManagementRoutes';
import salesRoutes from './SalesRoutes';
import generalRoutes from './GeneralRoutes';
const router = express.Router();

router.use('/client', clientRouter);
router.use('/management', managementRouter);
router.use('/sales', salesRoutes);
router.use('/general', generalRoutes);

export default router;

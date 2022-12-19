import { Router } from 'express';
import * as mw from './controllers';

const requestsRoutes = Router();

requestsRoutes
    .get('/', mw.getWithQueryParams)
    .post('/upload', mw.postWithFileUpload)
    .get('/:id', mw.getWithRouteParams)
    .delete('/:id', mw.deleteWithRouteParams)
    .post('/:id', mw.postWithRouteParamsAndBody);

export { requestsRoutes };
import express from 'express';
import { authRoutes } from '../api/auth/routes';
import { requestsRoutes } from '../api/basic_requests/routes';
import { genericResponse, otherResponse, ResponseError } from '../services/response.service';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

export default async (app: express.Express) => {
  // Parse requests of content-type - application/json
  app.use(express.json())
  // Parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }))

  app.use((req, _res, next) => {
    console.log(`${new Date(Date.now()).toISOString()} - Request received on ${req.url}`)
    next()
  });

  // API
  app.use('/basic-requests', requestsRoutes)
  app.use('/auth', authRoutes)
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/', (req, res) => {
    res.send('Node.JS template')
  })

  // No endpoint
  app.use((req, res, next) => {
    return otherResponse.noEndPoint.send(
      res,
      { method: req.method, path: req.path }
    )
  })

  // On error
  app.use((err, req, res, next) => {
    if (err instanceof ResponseError) {
      return err.response.send(res, err.data);
    }

    console.log(err);
    return genericResponse.internalServerError.send(res);
  })

  return app;
};
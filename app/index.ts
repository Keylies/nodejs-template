'use strict';

import express from 'express';
import databaseLoader from './loaders/database.loader';
import expressLoader from './loaders/express.loader';
import serverLoader from './loaders/server.loader';

(async () => {
    try {
        const app = express();

        console.info('> Connecting to MongoDB database...');
        await databaseLoader();

        console.info('> Configure Express...')
        expressLoader(app);

        console.info('> Starting server...');
        serverLoader(app).listen(process.env.PORT);
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
})()
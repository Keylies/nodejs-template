import { Router } from 'express';
import { isAuthenticated } from '../../services/user.service';
import * as mw from './controllers';

const authRoutes = Router();

authRoutes
    .post('/sign-up', mw.signUp)
    .post('/sign-in', mw.signIn)
    .post('/sign-out', mw.signOut)
    .get('/test', isAuthenticated, mw.test);

export { authRoutes };
import {Router} from 'express'
import { deleteUser, getProfile, getUsers, signIn, signUp } from '../controllers/user.controller';
import { validateToken } from '../middlewares/validateToken';


const router = Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/users', validateToken, getUsers);

router.get('/profile', validateToken,getProfile);

router.delete('/users/:id', deleteUser);

export default router;
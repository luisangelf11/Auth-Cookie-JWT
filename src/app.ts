import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import {PORT} from './config/config'
import userRoutes from './routes/user.routes'
import taskRouter from './routes/task.routes'
//Initializations
const app = express();

//Settings
app.set('PORT', PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use('/api', userRoutes);
app.use('/api', taskRouter);
export default app;
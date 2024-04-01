import {primsa} from '../libs/prisma'
import { Request, Response } from 'express'

export const createTask =async(req: Request, res: Response)=>{
    try {
        const {title, description} = req.body;
        const newTask = await primsa.task.create({
            data: {
                title,
                description,
                userId: Number(req.userId)
            }
        });
        res.json(newTask);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
          }
    }
}

export const getTasks = async(req: Request, res: Response)=>{
    try {
        const tasks  = await primsa.task.findMany({
            where:{
                userId: Number(req.userId)
            },
            include:{
                user: true
            }
        });
        res.json(tasks);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
          }
    }
}
import { Tasks } from '../entity/tasks'
import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'


export const getTasks = async ( request: Request, response: Response) => {
    const tasks = await AppDataSource.getRepository(Tasks).find()
    return response.json(tasks)
}

export const saveTasks = async ( request: Request, response: Response) => {
    const task = await AppDataSource.getRepository(Tasks).save(request.body)
    return response.json(task)
}

export const getTask = async ( request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).findOne({where: {id: Number(id)}})
    return response.json(task)
}

export const updateTask = async ( request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).update(id, request.body)
    if(task.affected === 1){
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({where: {id: Number(id)}})
        return response.json(taskUpdated)
    }
    return response.status(404).json({ message: "Task not found"})
}

export const statusTask = async ( request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).update(id, {
        status: true
    })
    if(task.affected === 1){
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({where: {id: Number(id)}})
        return response.json({ message: "Task finished"})
    }
    return response.status(404).json({ message: "Task not found"})
}

export const removeTask = async ( request: Request, response: Response) => {
    const { id } = request.params
    const task = await AppDataSource.getRepository(Tasks).delete(id)
    if(task.affected === 1){
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({where: {id: Number(id)}})
        return response.json({ message: "Task removed"})
    }
    return response.status(404).json({ message: "Task not found"})
}

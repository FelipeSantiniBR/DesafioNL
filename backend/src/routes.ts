import { Router, Request, Response } from 'express'

import { getTask, getTasks, removeTask, saveTasks, statusTask, updateTask } from './controller/TasksControllers'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World' })
})

routes.get('/tasks', getTasks)
routes.post('/tasks', saveTasks)
routes.get('/tasks/:id', getTask)
routes.put('/tasks/:id', updateTask)
routes.patch('/tasks/:id', statusTask)
routes.delete('/tasks/:id', removeTask)

export default routes
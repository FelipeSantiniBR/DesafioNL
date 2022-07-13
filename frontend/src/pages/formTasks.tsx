import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import api from "../services/apis";

import '../styles/Tasks.css'

interface userTasks {
    id: number;
    title: string;
    description: string;
    status: boolean;
  }

const FormTasks: React.FC = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<userTasks[]>([])

  useEffect(() => {
    loadTasks()
   }, [])

    async function loadTasks() {
        const response = await api.get('/tasks')
        setTasks(response.data)
    }

    async function statusTask( id: number){
        await api.patch(`/tasks/${id}`)
        loadTasks()
    }

    async function deleteTask( id: number){
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }

    function editTask(id: number){
        navigate(`/create_tasks/${id}`, { state: tasks });
    }

    function newTask () {
      navigate(`/create_tasks`, { state: tasks });
  }


    return(
      <div className="container">
        <button className="newTaskButton" onClick={newTask}>Nova Tarefa</button>
          <Table striped bordered hover >
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <Badge bg={ task.status ? "success" : "warning" }>
                  {task.status ? "Finalizado" : "Pendente"}
                </Badge>
              </td>
              <td>
                <Button size="sm" variant="primary" disabled={task.status} onClick={() => editTask(task.id)}>Editar</Button>{' '}
                <Button size="sm" variant="success" disabled={task.status} onClick={() => statusTask(task.id)}>Finalizar</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)}>Remover</Button>{' '}
              </td>
            </tr>
            ))}
          </tbody>
          </Table>
      </div>
    )
}

export default FormTasks
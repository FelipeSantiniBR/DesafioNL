import React, { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/apis";


interface NewTask {
  title: string;
  description: string;

}

const Tasks: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [newTask, setNewTask] = useState<NewTask>({
        title: '',
        description: '',
    })

    useEffect(() => {
        if (id !== undefined) {
            infoTask(id)
        }
    }, [id])

    function updateTask (e: ChangeEvent<HTMLInputElement>){
        setNewTask({
        ...newTask,
        [e.target.name]: e.target.value
    })
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {

            const response = await api.put(`/tasks/${id}`, newTask)
        } else {

            const response = await api.post('/tasks', newTask)
        }
        returnPage()

    }

    async function infoTask (id: string){
        const response = await api.get(`tasks/${id}`)
        setNewTask({
            title: response.data.title,
            description: response.data.description
        })
    }

    function returnPage () {
        navigate(`/tasks`);
    }

  return(
    <div className="container">
        <h2>Criar nova Tarefa</h2>
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateTask(e)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={newTask.description}
                    name="description"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateTask(e)}
                />
            </Form.Group>
            <button className="saveButton" type="submit">
                Salvar
            </button>{' '}
            <button className="backButton" onClick={returnPage}>
                Voltar
            </button>
        </Form>
    </div>
  )
}

export default Tasks
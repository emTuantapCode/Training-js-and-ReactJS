import { useState } from 'react'
import TaskComponent from './TaskComponent'

function CardComponent({ index, card, render, setRender }) {
    const [inputCard, setInputCard] = useState('')

    const handleDeleteCard = () => {
        const option = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch('http://localhost:8080/card/' + card._id, option)
            .then(res => {
                if (res.status === 200) setRender(!render)
            })
    }
    const handleAddTask = () => {
        if (inputCard === '') return
        const data = {
            cardID: card._id,
            title: inputCard
        }
        const option = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        fetch('http://localhost:8080/task', option)
            .then(res => {
                if (res.status === 200) {
                    setInputCard('')
                    setRender(!render)
                }
            })
    }
    return (
        <div key={index} className="contaner-cards">
            <div className="card-header">
                <div className="title-card">{card.title}</div>
                <div
                    onClick={() => handleDeleteCard()}
                    className="delete-card-btn">Delete Task</div>
            </div>
            <div className="card-body">
                <ul className="container-tasks">

                    {card.arraytasks?.map((task, index) => {
                        return (
                            <TaskComponent
                                index={index}
                                task={task}
                                render={render}
                                setRender={setRender}
                            />
                        )
                    })}

                </ul>
            </div>
            <div className="card-footer">
                <input
                    value={inputCard}
                    className="add-task-input"
                    type="text"
                    required
                    onChange={(e) => setInputCard(e.target.value)} />
                <div
                    onClick={() => handleAddTask()}
                    className="add-task-btn">Add Task...</div>
            </div>
        </div>
    )
}
export default CardComponent;

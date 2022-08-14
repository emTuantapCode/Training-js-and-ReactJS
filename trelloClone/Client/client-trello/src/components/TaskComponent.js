
function TaskComponent({ index, task, setRender, render }) {

    const handleDeleteTask = () => {
        const option = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch('http://localhost:8080/task/' + task._id, option)
            .then(res => {
                if (res.status === 200) setRender(!render)
            })
    }
    return (
        <div key={index} className="task-body">
            <div className="task-title">{task.title}</div>
            <div
                onClick={() => handleDeleteTask()}
                className="delete-task-btn">Delete</div>
        </div>
    )
}
export default TaskComponent;

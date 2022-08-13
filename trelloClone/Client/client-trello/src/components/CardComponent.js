import TaskComponent from './TaskComponent'

function CardComponent(props) {
    return (
        <div key={props.index} className="contaner-cards">
            <div className="card-header">
                <div className="title-card">{props.data.title}</div>
                <div className="delete-card-btn">Delete Task</div>
            </div>
            <div className="card-body">
                <ul className="container-tasks">

                    {props.data.arraytasks?.map((task, index) => {
                        return (
                            <TaskComponent
                                key={index}
                                data={task}
                            />
                        )
                    })}

                </ul>
            </div>
            <div className="card-footer">
                <input className="add-task-input" type="text" required />
                <div className="add-task-btn">Add Task...</div>
            </div>
        </div>
    )
}
export default CardComponent;

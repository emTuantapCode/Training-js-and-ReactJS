
function TaskComponent(props) {
    return (
        <div key={props.data.key} className="task-body">
            <div className="task-title">{props.data.title}</div>
            <div className="delete-task-btn">Delete</div>
        </div>
    )
}
export default TaskComponent;

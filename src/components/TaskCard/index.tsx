import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import { TaskCardProps } from '../../App';

const TaskCard = ({ task, onDeleteClick, onStatusChange, onEditClick }: TaskCardProps) => {
  const { id, title, priority, status, progress } = task

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={() => onStatusChange(id)}>{status}</button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={() => onEditClick(id)} />
        <DeleteIcon className="cp" onClick={() => onDeleteClick(task.id)} />
      </div>
    </div>
  )
}

export default TaskCard

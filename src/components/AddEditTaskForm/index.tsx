import React, { useState } from "react";
import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import { TaskType } from '../../App';

interface AddEditTaskFormProps {
  task?: TaskType | null;
  onAdd: (taskTitle: string, taskPriority: string) => void;
  onEdit: (id: string, taskTitle: string, taskPriority: string) => void;
  onClose: () => void;
}


const AddEditTaskForm = ({ onAdd, onEdit, onClose, task = null }: AddEditTaskFormProps) => {
  const isEditing = !!task;
  const [selectedPriority, setSelectedPriority] = useState(isEditing ? task.priority : "low");
  const [taskValue, setTaskValue] = useState(isEditing ? task.title : '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskValue(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskValue) {
      if (isEditing) {
        onEdit(task.id, taskValue, selectedPriority);
      } else {
        onAdd(taskValue, selectedPriority);
      }
      onClose();
    }
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{isEditing ? "Edit Task" : "Add Task"}</span>
            <Close className="cp" onClick={onClose} />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={handleInputChange}
            name="title"
            value={taskValue}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li
                  key={priority}
                  className={classNames({
                    [`${priority}-selected`]: priority === selectedPriority
                  }, priority)}
                  onClick={() => setSelectedPriority(priority)}
                >
                  {priority}
                </li>
              ))}
            </ul>

          </div>
          <div className="flx-right mt-50">
            <button type="submit" className="button" disabled={!taskValue}>
              {isEditing ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm

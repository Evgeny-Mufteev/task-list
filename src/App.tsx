import React, { useState } from 'react';
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"

export type TaskType = {
  id: string;
  title: string;
  priority: string;
  status: string;
  progress: number;
};

export interface TaskCardProps {
  task: TaskType;
  onDeleteClick: (id: string) => void;
  onStatusChange: (id: string) => void;
  onEditClick: (id: string) => void;
}

const App = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState(taskList);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);

  const addTask = (taskTitle: string, taskPriority: string) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      priority: taskPriority,
      status: "To Do",
      progress: 0,
    };

    setTasks([newTask, ...tasks]);
  }

  const editTask = (id: string, taskTitle: string, taskPriority: string) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, title: taskTitle, priority: taskPriority };
        }
        return task;
      });
    });
    setEditingTask(null);
  }

  const handleDeleteClick = (taskId: string) => {
    setDeletingTaskId(taskId);
    setShowDeleteModal(true);
  }

  const handleDeleteConfirm = () => {
    if (deletingTaskId) {
      setTasks(tasks => tasks.filter(task => task.id !== deletingTaskId));
      setShowDeleteModal(false);
      setDeletingTaskId(null);
    }
  }

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setDeletingTaskId(null);
  }

  const changeTaskStatus = (taskId: string) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          let nextStatus;
          let progress;
          switch (task.status) {
            case "To Do":
              nextStatus = "In Progress";
              progress = 50;
              break;
            case "In Progress":
              nextStatus = "Done";
              progress = 100;
              break;
            default:
              nextStatus = "To Do";
              progress = 0;
              break;
          }
          return { ...task, status: nextStatus, progress };
        }
        return task;
      });
    });
  };

  const handleEditClick = (taskId: string) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTask(taskToEdit || null);
    if (taskToEdit) {
      setShowAddEditModal(true);
    }
  }


  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={() => { setShowAddEditModal(true) }} />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDeleteClick={handleDeleteClick} onStatusChange={changeTaskStatus} onEditClick={handleEditClick} />
          ))}
        </div>
      </div>
      {showAddEditModal && <AddEditTaskForm
        onAdd={addTask}
        onEdit={editTask}
        onClose={() => {
          setShowAddEditModal(false);
          setEditingTask(null);
        }}
        task={editingTask}
      />}
      {showDeleteModal && <DeleteModal onConfirm={handleDeleteConfirm} onClose={handleModalClose} />}
    </div>
  )
}

export default App

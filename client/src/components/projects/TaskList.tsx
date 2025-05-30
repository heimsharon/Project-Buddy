import React, { useState } from 'react';
import { Task } from '../../types/project';

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onTaskAdd: (description: string) => void;
}

export default function TaskList({ tasks, onTaskToggle, onTaskAdd }: TaskListProps) {
  const [newTask, setNewTask] = useState('');

  return (
    <div className="task-list">
      <h3>Project Tasks</h3>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button
          onClick={() => {
            if (newTask.trim()) {
              onTaskAdd(newTask);
              setNewTask('');
            }
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onTaskToggle(task.id)}
            />
            <span>{task.description}</span>
            {task.dueDate && (
              <span className="due-date">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
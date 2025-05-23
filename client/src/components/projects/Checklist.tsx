import React, { useState } from 'react';

interface Task {
    id: string;
    text: string;
    completed: boolean;
  }
  
  interface ChecklistProps {
    tasks: Task[];
    onTaskToggle: (id: string) => void;
    onTaskAdd?: (text: string) => void;
  }
  
  export default function Checklist({
    tasks,
    onTaskToggle,
    onTaskAdd,
  }: ChecklistProps) {
    const [newTaskText, setNewTaskText] = useState('');
  
    return (
      <div className="checklist">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onTaskToggle(task.id)}
              />
              <span>{task.text}</span>
            </li>
          ))}
        </ul>
        {onTaskAdd && (
          <div className="add-task">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="New task"
            />
            <button
              onClick={() => {
                onTaskAdd(newTaskText);
                setNewTaskText('');
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>
    );
  }
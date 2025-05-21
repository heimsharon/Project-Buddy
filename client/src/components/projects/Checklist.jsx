import { useState } from 'react';

export default function Checklist() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy materials", completed: false },
    { id: 2, text: "Cut wood", completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <ul className="checklist">
      {tasks.map(task => (
        <li key={task.id}>
          <input 
            type="checkbox" 
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.text}</span>
        </li>
      ))}
    </ul>
  );
}
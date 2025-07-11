import { useState } from 'react'
import { TaskContext } from './TaskContext.js'

// Provider do contexto
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const removeTask = (taskId) => {
    console.log('Remove task:', taskId)
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const toggleTask = (taskId) => {
    console.log('Toggle task:', taskId)
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const value = {
    tasks,
    addTask,
    removeTask,
    toggleTask
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
} 
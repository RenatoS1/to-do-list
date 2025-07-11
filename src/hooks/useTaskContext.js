import { useContext } from 'react'
import { TaskContext } from '../contexts/TaskContext.js'

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider')
  }
  return context
} 
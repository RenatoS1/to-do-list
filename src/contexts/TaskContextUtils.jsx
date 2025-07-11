import { createContext, useContext } from 'react'

// Criar o contexto
export const TaskContext = createContext()

// Hook personalizado para usar o contexto
export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider')
  }
  return context
} 
import { useContext } from 'react'
import { TaskContext } from '../contexts/TaskContext'

export function useTasks() {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTasks deve ser usado dentro de um TaskProvider')
    }
    return context
} 
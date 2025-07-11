import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from "../../components/Header"
import { useAuth } from '../../hooks/useAuth'
import { useTasks } from '../../hooks/useTasks'
import './styles.css'

export function Home() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const { tasks, addTask, toggleTask, removeTask } = useTasks()
    const [novaTarefa, setNovaTarefa] = useState('')

    const handleAdicionarTarefa = () => {
        if (novaTarefa.trim()) {
            addTask(novaTarefa)
            setNovaTarefa('')
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const tarefasConcluidas = tasks.filter(tarefa => tarefa.completed).length
    const totalTarefas = tasks.length

    return (
        <div className="home-container">
            <Header />
            
            <div className="todo-content">
                <div className="todo-header">
                    <div className="todo-title">
                        <h2>Minhas Tarefas</h2>
                        <p className="todo-stats">
                            {tarefasConcluidas} de {totalTarefas} tarefas concluídas
                        </p>
                        {user && (
                            <p className="user-info">
                                Olá, {user.nome}! 👋
                            </p>
                        )}
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        Sair
                    </button>
                </div>

                <div className="add-task">
                    <input
                        type="text"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        placeholder="Adicionar nova tarefa..."
                        onKeyPress={(e) => e.key === 'Enter' && handleAdicionarTarefa()}
                    />
                    <button onClick={handleAdicionarTarefa} className="add-btn">
                        Adicionar
                    </button>
                </div>

                <div className="tasks-list">
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>Nenhuma tarefa criada ainda.</p>
                            <p>Adicione sua primeira tarefa acima!</p>
                        </div>
                    ) : (
                        tasks.map(tarefa => (
                            <div key={tarefa.id} className={`task-item ${tarefa.completed ? 'completed' : ''}`}>
                                <div className="task-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={tarefa.completed}
                                        onChange={() => {
                                            console.log('Checkbox clicked:', tarefa.id)
                                            toggleTask(tarefa.id)
                                        }}
                                    />
                                </div>
                                <div className="task-content">
                                    <span className="task-text">{tarefa.text}</span>
                                    <span className="task-date">
                                        {new Date(tarefa.createdAt).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => {
                                        console.log('Remove button clicked:', tarefa.id)
                                        removeTask(tarefa.id)
                                    }}
                                    className="remove-btn"
                                    title="Remover tarefa"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
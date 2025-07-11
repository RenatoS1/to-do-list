import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export { AuthContext }

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Simular um banco de dados de usuários
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users')
        return savedUsers ? JSON.parse(savedUsers) : []
    })

    // Salvar usuários no localStorage
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    // Verificar se há usuário logado ao carregar a página
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
            setIsAuthenticated(true)
        }
    }, [])

    const register = (userData) => {
        // Verificar se o email já existe
        const existingUser = users.find(u => u.email === userData.email)
        if (existingUser) {
            throw new Error('Email já cadastrado')
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        }

        setUsers([...users, newUser])
        return newUser
    }

    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.senha === password)
        if (!user) {
            throw new Error('Email ou senha incorretos')
        }

        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem('currentUser', JSON.stringify(user))
        return user
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('currentUser')
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

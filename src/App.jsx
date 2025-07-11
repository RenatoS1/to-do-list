import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { TaskProvider } from './contexts/TaskContext.jsx'
import { Home } from './Pages/Home/Index'
import Login from './Pages/Login/Index'
import Cadastro from './Pages/Cadastro/Index'
import { ProtectedRoute } from './components/ProtectedRoute'
import NotFound from './Pages/NotFound/Index'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {/* Rota padrão - redireciona para login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Rotas das páginas */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            
            {/* Rota para páginas não encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
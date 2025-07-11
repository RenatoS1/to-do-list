import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './styles.css'

const Cadastro = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [aceiteTermos, setAceiteTermos] = useState(false)
  const [registerError, setRegisterError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    // Limpar erro de registro
    if (registerError) {
      setRegisterError('')
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres'
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.senha)) {
      newErrors.senha = 'Senha deve conter letra maiúscula, minúscula e número'
    }

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória'
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem'
    }

    if (formData.telefone && !/^[\d\s\-(\\)]+$/.test(formData.telefone)) {
        newErrors.telefone = 'Telefone inválido';
      }

    if (!aceiteTermos) {
      newErrors.termos = 'Você deve aceitar os termos de uso'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setRegisterError('')
    
    try {
      // Simular uma requisição de cadastro
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Registrar o usuário
      await register(formData)
      
      // Redirecionar para a página de login após cadastro bem-sucedido
      navigate('/login')
      
    } catch (error) {
      console.error('Erro no cadastro:', error)
      setRegisterError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h1>Criar Conta</h1>
          <p>Preencha os dados para começar</p>
        </div>

        {registerError && (
          <div className="error-alert">
            {registerError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="cadastro-form" autoComplete="off">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={errors.nome ? 'error' : ''}
              placeholder="Digite seu nome completo"
              disabled={isLoading}
              autoComplete="off"
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Digite seu email"
              disabled={isLoading}
              autoComplete="off"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone (opcional)</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className={errors.telefone ? 'error' : ''}
              placeholder="(11) 99999-9999"
              disabled={isLoading}
              autoComplete="off"
            />
            {errors.telefone && <span className="error-message">{errors.telefone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className={errors.senha ? 'error' : ''}
              placeholder="Digite sua senha"
              disabled={isLoading}
              autoComplete="off"
            />
            {errors.senha && <span className="error-message">{errors.senha}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className={errors.confirmarSenha ? 'error' : ''}
              placeholder="Confirme sua senha"
              disabled={isLoading}
              autoComplete="off"
            />
            {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={aceiteTermos}
                onChange={(e) => setAceiteTermos(e.target.checked)}
              />
              <span className="checkmark"></span>
              Aceito os <a href="#" className="terms-link">termos de uso</a> e <a href="#" className="terms-link">política de privacidade</a>
            </label>
            {errors.termos && <span className="error-message">{errors.termos}</span>}
          </div>

          <button 
            type="submit" 
            className={`cadastro-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
          </button>
        </form>

        <div className="cadastro-footer">
          <p>
            Já tem uma conta? <Link to="/login" className="login-link">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro

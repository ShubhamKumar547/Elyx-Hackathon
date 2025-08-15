import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  // const { login, currentUser } = useAuth(); // Removed: Using auth context for better state management

  // Redirect if already logged in
  // useEffect(() => {
  //   if (currentUser) {
  //     navigate('/dashboard');
  //   }
  // }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img 
          src="/health-ai.jpg" 
          alt="Health Automation AI" 
          className="login-image" 
          loading="lazy" // Better performance
        />
      </div>
      
      <div className="login-card">
        <header className="login-header">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to your health dashboard</p>
        </header>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="input-group">
            <label htmlFor="username">Username or Email</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
              aria-required="true"
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                aria-required="true"
                minLength="6"
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading || !formData.username || !formData.password}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="login-register-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
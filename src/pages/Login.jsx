import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ui/ParticleBackground';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const { loginUser } = useAppContext();
  const navigate = useNavigate();

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(captcha);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verify captcha
    if (captchaInput !== captchaCode) {
      alert('❌ Invalid captcha! Please try again.');
      generateCaptcha();
      return;
    }
    
    // API logic replaces mock logic
    const roleResponse = await loginUser({ email, password, role });
    
    if (roleResponse) {
      if (roleResponse === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } else {
      alert('❌ Invalid email or password!');
      generateCaptcha();
    }
  };

  return (
    <div className="login-container">
      <ParticleBackground />
      
      <motion.button
        className="back-home-btn"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        ← Back to Home
      </motion.button>

      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', duration: 0.5 }}
      >
        <motion.div
          className="login-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>University Portal</h1>
          <p>Login to access your academic achievements</p>
        </motion.div>
        
        <form onSubmit={handleLogin}>
          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, ease: 'easeOut', duration: 0.5 }}
          >
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35, ease: 'easeOut', duration: 0.5 }}
          >
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, ease: 'easeOut', duration: 0.5 }}
          >
            <label>Login As</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">🎓 Student</option>
              <option value="admin">⚙️ Admin</option>
            </select>
          </motion.div>

          <motion.div 
            className="form-group captcha-group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.45, ease: 'easeOut', duration: 0.5 }}
          >
            <label>Captcha Verification</label>
            <div className="captcha-container">
              <div className="captcha-display">
                <span className="captcha-text">{captchaCode}</span>
              </div>
              <motion.button
                type="button"
                className="captcha-refresh"
                onClick={generateCaptcha}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                title="Refresh Captcha"
              >
                🔄
              </motion.button>
            </div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter the captcha above"
              required
              maxLength={6}
            />
          </motion.div>
          
          <motion.button 
            type="submit" 
            className="login-btn"
            whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span>Login Now</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </form>

        <motion.div 
          className="register-link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don't have an account? 
          <button onClick={() => navigate('/register')}>Register here</button>
        </motion.div>
        

      </motion.div>
    </div>
  );
};

export default Login;

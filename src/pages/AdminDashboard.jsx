import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import AchievementForm from '../features/admin/AchievementForm';
import StudentList from '../features/admin/StudentList';
import AchievementChart from '../components/ui/AchievementChart';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('add-achievement');
  const { currentUser, setCurrentUser, achievementList, students } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const totalAchievements = achievementList.length;
  const totalAwards = achievementList.filter(a => a.category === 'award').length;
  const totalRecognitions = achievementList.filter(a => a.category === 'recognition').length;
  const totalParticipations = achievementList.filter(a => a.category === 'participation').length;

  const menuItems = [
    { id: 'add-achievement', icon: '➕', label: 'Add Achievement', color: '#667eea' },
    { id: 'students', icon: '👥', label: 'View Students', color: '#4ecdc4' },
    { id: 'overview', icon: '📊', label: 'Overview', color: '#ffd700' }
  ];

  return (
    <div className="dashboard-container">
      {/* Animated Background Elements */}
      <div className="dashboard-bg-elements">
        {['🏆', '⭐', '🥇', '🎯', '✨'].map((icon, i) => (
          <motion.div
            key={i}
            className="bg-float-icon"
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.1
            }}
            animate={{
              y: [null, Math.random() * 200, null],
              x: [null, Math.random() * 200, null],
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Sidebar */}
      <motion.nav 
        className="sidebar"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ ease: 'easeOut', duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>⚙️ Admin Panel</h2>
        </motion.div>
        
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="admin-avatar"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(255, 215, 0, 0.5)',
                '0 0 40px rgba(255, 215, 0, 0.8)',
                '0 0 20px rgba(255, 215, 0, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            👨‍💼
          </motion.div>
          <p><strong>{currentUser?.name}</strong></p>
          <span className="role-badge">
            <motion.span
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡
            </motion.span>
            Administrator
          </span>
        </motion.div>
        
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => setActiveTab(item.id)}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ x: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderLeft: activeTab === item.id ? `4px solid ${item.color}` : '4px solid transparent'
              }}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </motion.li>
          ))}
          
          <motion.li
            className="logout-btn"
            onClick={handleLogout}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ x: 10, backgroundColor: 'rgba(231, 76, 60, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="menu-icon">🚪</span>
            Logout
          </motion.li>
        </ul>
      </motion.nav>
      
      {/* Main Content */}
      <div className="main-content">
        <motion.header 
          className="dashboard-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="header-content">
            <div>
              <motion.h1
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Welcome, {currentUser?.name}! 
                <motion.span
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 0.5, delay: 1 }}
                  style={{ display: 'inline-block', marginLeft: '10px' }}
                >
                  👋
                </motion.span>
              </motion.h1>
              <p>Manage student achievements and records</p>
            </div>
            <motion.div
              className="header-trophy"
              animate={{ 
                y: [-5, 5, -5],
                y: [-2, 2, -2]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🏆
            </motion.div>
          </div>
        </motion.header>
        
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stats-container">
                {[
                  { icon: '🏆', label: 'Total Achievements', value: totalAchievements, color: '#667eea' },
                  { icon: '🥇', label: 'Awards', value: totalAwards, color: '#ffd700' },
                  { icon: '⭐', label: 'Recognitions', value: totalRecognitions, color: '#ff6b6b' },
                  { icon: '🎯', label: 'Participations', value: totalParticipations, color: '#4ecdc4' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-card-admin"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      ease: 'easeOut', duration: 0.5
                    }}
                    whileHover={{ 
                      y: -15, 
                      scale: 1.05,
                      boxShadow: `0 20px 50px ${stat.color}40`
                    }}
                    style={{ borderTop: `4px solid ${stat.color}` }}
                  >
                    <motion.span 
                      className="stat-icon-admin"
                      animate={{ 
                        opacity: [0.8, 1, 0.8],
                        y: [-2, 2, -2]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {stat.icon}
                    </motion.span>
                    <motion.h3 
                      style={{ color: stat.color }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              
              {achievementList.length > 0 && (
                <AchievementChart achievements={achievementList} />
              )}

              <motion.div
                className="total-students-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="students-card-content">
                  <motion.div
                    className="students-icon"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    👥
                  </motion.div>
                  <div>
                    <h3>{students.length}</h3>
                    <p>Total Students Registered</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {activeTab === 'add-achievement' && (
            <motion.div
              key="add"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementForm />
            </motion.div>
          )}
          
          {activeTab === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StudentList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;

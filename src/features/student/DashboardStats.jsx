import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const DashboardStats = ({ achievements, participations }) => {
  const stats = [
    {
      label: 'Total Achievements',
      value: achievements.length,
      icon: '🏛️',
      color: '#1e3a8a',
      gradient: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)'
    },
    {
      label: 'Awards Won',
      value: achievements.filter(a => a.category === 'award').length,
      icon: '🏆',
      color: '#d4af37',
      gradient: 'linear-gradient(135deg, #d4af37 0%, #fde047 100%)'
    },
    {
      label: 'Recognitions',
      value: achievements.filter(a => a.category === 'recognition').length,
      icon: '🎓',
      color: '#e11d48',
      gradient: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)'
    },
    {
      label: 'Participations',
      value: participations.length,
      icon: '📚',
      color: '#0ea5e9',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)'
    }
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <motion.div 
          key={index} 
          className="stat-card" 
          style={{ borderTop: `4px solid ${stat.color}` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ 
            y: -10,
            boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
            transition: { duration: 0.3 }
          }}
        >
          <motion.span 
            className="stat-icon"
            animate={{ 
              opacity: [0.8, 1, 0.8],
              y: [-2, 2, -2]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            {stat.icon}
          </motion.span>
          <h3 style={{ color: stat.color }}>
            <CountUp end={stat.value} duration={2} delay={index * 0.1} />
          </h3>
          <p>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;

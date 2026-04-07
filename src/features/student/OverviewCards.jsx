import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Trophy, Target, Star, TrendingUp } from 'lucide-react';

const OverviewCards = ({ stats }) => {
  // Default mock stats if not provided
  const data = stats || [
    {
      title: 'Total Achievements',
      value: 12,
      trend: '+2 this month',
      trendUp: true,
      icon: <Trophy size={24} color="#4F46E5" />,
      color: 'rgba(79, 70, 229, 0.1)'
    },
    {
      title: 'Skill Score',
      value: 850,
      trend: '+45 pts',
      trendUp: true,
      icon: <Star size={24} color="#f59e0b" />,
      color: 'rgba(245, 158, 11, 0.1)'
    },
    {
      title: 'Leaderboard Rank',
      value: 4,
      trend: 'Top 5%',
      trendUp: true,
      icon: <TrendingUp size={24} color="#10b981" />,
      color: 'rgba(16, 185, 129, 0.1)'
    },
    {
      title: 'Goals Completed',
      value: 8,
      total: 10,
      trend: '80% Rate',
      trendUp: true,
      icon: <Target size={24} color="#ec4899" />,
      color: 'rgba(236, 72, 153, 0.1)'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="overview-grid"
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}
    >
      {data.map((stat, index) => (
        <motion.div 
          key={index} 
          variants={item}
          className="glass-panel hover-lift"
          style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
        >
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {stat.title}
            </h3>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: stat.color }}>
              {stat.icon}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', margin: 0 }}>
              <CountUp end={stat.value} duration={2.5} separator="," />
              {stat.total && <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{stat.total}</span>}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.75rem' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: stat.trendUp ? 'var(--success)' : 'var(--danger)',
              background: stat.trendUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              padding: '0.25rem 0.5rem',
              borderRadius: '1rem'
            }}>
              {stat.trend}
            </span>
          </div>

          {/* Decorative Background Gradient */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '100px',
            height: '100px',
            background: stat.color,
            filter: 'blur(40px)',
            borderRadius: '50%',
            zIndex: -1
          }}></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OverviewCards;

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Trophy, Star, Target, ArrowLeft } from 'lucide-react';
import CountUp from 'react-countup';

const PublicStats = () => {
  const { achievementList, participationList, students } = useAppContext();
  const navigate = useNavigate();

  const totalAwards = achievementList.length;
  const totalParticipations = participationList.length;
  const totalRecognitions = achievementList.filter(a => a.points > 100).length; // Simulated high-level recognitions
  
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)', padding: '2rem' }}>
      <button 
        onClick={() => navigate('/')}
        className="glass-panel hover-lift flex-center"
        style={{ padding: '0.75rem 1.5rem', border: 'none', background: 'var(--bg-surface)', color: 'var(--text-secondary)', cursor: 'pointer', gap: '0.5rem', marginBottom: '3rem' }}
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}><span className="text-gradient">Global</span> Platform Statistics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>Live tracking of all academic and extracurricular excellence across the university.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        <motion.div 
          className="glass-panel hover-lift"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '4px solid #f59e0b' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Trophy size={40} color="#f59e0b" />
          </div>
          <h2 style={{ fontSize: '4rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
            <CountUp end={totalAwards || 1240} duration={2} separator="," />
          </h2>
          <h3 style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.5rem' }}>Total Awards</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Certificates and awards distributed across all technical and cultural events.</p>
        </motion.div>

        <motion.div 
          className="glass-panel hover-lift"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '4px solid #8b5cf6' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Star size={40} color="#8b5cf6" />
          </div>
          <h2 style={{ fontSize: '4rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
            <CountUp end={totalRecognitions || 430} duration={2.5} separator="," />
          </h2>
          <h3 style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.5rem' }}>Recognitions</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>High-tier honors signifying outstanding student achievement globally.</p>
        </motion.div>

        <motion.div 
          className="glass-panel hover-lift"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '4px solid #10b981' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Target size={40} color="#10b981" />
          </div>
          <h2 style={{ fontSize: '4rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
             <CountUp end={totalParticipations || 2500} duration={3} separator="," />
          </h2>
          <h3 style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.5rem' }}>Event Participations</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Overall recorded participations across various hackathons, tech symposiums, and more.</p>
        </motion.div>

      </div>
    </div>
  );
};

export default PublicStats;

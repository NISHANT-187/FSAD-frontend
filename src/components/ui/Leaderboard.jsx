import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Leaderboard = ({ achievementList = [], students = [] }) => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const studentScores = {};
    if (achievementList.length && students.length) {
      achievementList.forEach(ach => {
        const sid = String(ach.student?.id || ach.studentId);
        if (!studentScores[sid]) {
          studentScores[sid] = 0;
        }
        studentScores[sid] += ach.points || 50;
      });

      const computedLeaders = students.map(s => ({
        ...s,
        totalScore: studentScores[String(s._id) || String(s.id)] || 0
      }))
      .filter(s => s.role !== 'admin' && s.totalScore > 0)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3);

      setLeaders(computedLeaders);
    }
  }, [achievementList, students]);

  return (
    <div className="leaderboard-widget" style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1e293b', fontSize: '1.25rem' }}>Top Impact Performers 🏆</h3>
      <div style={{ display: 'grid', gap: '12px' }}>
        {leaders.map((student, index) => (
          <motion.div 
            key={student._id} 
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              padding: '16px', background: index === 0 ? '#fef3c7' : '#f8fafc', 
              borderRadius: '8px', border: index === 0 ? '1px solid #fde68a' : '1px solid transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontWeight: 'bold', color: index === 0 ? '#d97706' : '#64748b', fontSize: '1.1rem' }}>#{index + 1}</div>
              <img 
                src={student.avatar ? `http://localhost:8080${student.avatar}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${student._id}`}
                alt="Avatar"
                style={{ width: '40px', height: '40px', borderRadius: '20px', border: '2px solid #fff' }}
              />
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{student.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{student.department}</div>
              </div>
            </div>
            <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '1.1rem' }}>{student.totalScore} <span style={{fontSize: '0.8rem', color: '#64748b', fontWeight: 500}}>pts</span></div>
          </motion.div>
        ))}
        {leaders.length === 0 && <p style={{ color: '#64748b' }}>No data available.</p>}
      </div>
    </div>
  );
};

export default Leaderboard;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Link, ExternalLink, Award, TrendingUp, BookOpen } from 'lucide-react';
import '../styles/Dashboard.css';

const PublicPortfolio = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/students/portfolio/${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-state">Loading Portfolio...</div>;
  if (!data || !data.user) return <div className="error-state">Student not found.</div>;

  const { user, achievements } = data;
  const avatarUrl = user.avatar ? `http://localhost:8080${user.avatar}` : 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user._id;

  return (
    <div className="portfolio-container" style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px' }}>
      <motion.div 
        className="portfolio-hero"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', textAlign: 'center' }}
      >
        <img src={avatarUrl} alt="Avatar" style={{ width: '150px', height: '150px', borderRadius: '75px', border: '4px solid #fff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} />
        
        <h1 style={{ marginTop: '20px', fontSize: '2.5rem', color: '#1e293b' }}>{user.name}</h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', margin: '8px 0' }}>{user.department} | Cohort {user.cohort}</p>
        
        {user.bio && <p style={{ maxWidth: '600px', margin: '20px auto', color: '#334155', lineHeight: '1.6' }}>{user.bio}</p>}

        <div className="portfolio-socials" style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
          {user.socialLinks?.github && <a href={user.socialLinks.github} target="_blank" rel="noreferrer"><Code style={{ color: '#334155' }} /></a>}
          {user.socialLinks?.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noreferrer"><Link style={{ color: '#0077b5' }} /></a>}
          {user.socialLinks?.portfolio && <a href={user.socialLinks.portfolio} target="_blank" rel="noreferrer"><ExternalLink style={{ color: '#1e3a8a' }} /></a>}
        </div>

        {user.skills && user.skills.length > 0 && (
          <div className="portfolio-skills" style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {user.skills.map((skill, i) => (
              <span key={i} style={{ padding: '6px 14px', backgroundColor: '#f1f5f9', color: '#0f172a', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>{skill}</span>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div 
        className="portfolio-stats"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        style={{ maxWidth: '900px', margin: '40px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}
      >
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <TrendingUp style={{ color: '#10b981', width: '32px', height: '32px', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '2rem', color: '#0f172a', margin: '0' }}>{user.totalScore || 0}</h3>
          <p style={{ color: '#64748b', margin: '0', fontSize: '0.9rem' }}>Impact Score</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <BookOpen style={{ color: '#3b82f6', width: '32px', height: '32px', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '2rem', color: '#0f172a', margin: '0' }}>{user.cgpa || 'N/A'}</h3>
          <p style={{ color: '#64748b', margin: '0', fontSize: '0.9rem' }}>CGPA</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <Award style={{ color: '#f59e0b', width: '32px', height: '32px', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '2rem', color: '#0f172a', margin: '0' }}>{achievements.length}</h3>
          <p style={{ color: '#64748b', margin: '0', fontSize: '0.9rem' }}>Verified Achievements</p>
        </div>
      </motion.div>

      <motion.div 
        className="portfolio-achievements"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <h2 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px' }}>Recent Achievements</h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {achievements.map((ach) => (
            <div key={ach._id} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderLeft: '4px solid #1e3a8a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{ach.title}</h3>
                  <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.95rem' }}>{ach.description}</p>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{new Date(ach.date).toLocaleDateString()}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', padding: '4px 10px', backgroundColor: '#e0e7ff', color: '#3730a3', borderRadius: '12px' }}>{ach.category}</span>
                {ach.tags && ach.tags.map((tag, idx) => (
                  <span key={idx} style={{ fontSize: '0.8rem', padding: '4px 10px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '12px' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
          {achievements.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>No achievements recorded yet.</p>}
        </div>
      </motion.div>
    </div>
  );
};

export default PublicPortfolio;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { LayoutDashboard, Award, Activity, Target, Settings, User, LogOut, Bell, Search, Sparkles, TrendingUp } from 'lucide-react';

import OverviewCards from '../features/student/OverviewCards';
import PerformanceCharts from '../features/student/PerformanceCharts';
import ActivityHeatmap from '../components/ui/ActivityHeatmap';
import Leaderboard from '../components/ui/Leaderboard';
import AchievementShowcase from '../features/student/AchievementShowcase';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentUser, setCurrentUser, achievementList, participationList, students, fetchGlobalData } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-switch tab if navigated from Home step cards
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // Fetch latest data on mount
  useEffect(() => {
    fetchGlobalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myAchievements = achievementList.filter(a => {
    const userId = currentUser?.id || currentUser?._id;
    const achStudentId = a.studentId?.id || a.studentId?._id || a.studentId;
    return String(achStudentId) === String(userId);
  });

  const totalAchievements = myAchievements.length;
  // Filter achievements from the last 30 days
  const recentAchievements = myAchievements.filter(a => {
    const achDate = new Date(a.date || a.createdAt);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return achDate > thirtyDaysAgo;
  });

  const skillScore = totalAchievements * 50;
  const goalsCompleted = Math.min(10, totalAchievements);
  const leaderboardRank = Math.max(1, 100 - totalAchievements);

  const computedStats = [
    {
      title: 'Total Achievements',
      value: totalAchievements,
      trend: `+${recentAchievements.length} this month`,
      trendUp: recentAchievements.length > 0,
      icon: <Award size={24} color="#4F46E5" />,
      color: 'rgba(79, 70, 229, 0.1)'
    },
    {
      title: 'Skill Score',
      value: skillScore,
      trend: `+${recentAchievements.length * 50} pts`,
      trendUp: recentAchievements.length > 0,
      icon: <Activity size={24} color="#f59e0b" />,
      color: 'rgba(245, 158, 11, 0.1)'
    },
    {
      title: 'Leaderboard Rank',
      value: leaderboardRank,
      trend: leaderboardRank <= 10 ? 'Top 10%' : 'Top 50%',
      trendUp: true,
      icon: <TrendingUp size={24} color="#10b981" />,
      color: 'rgba(16, 185, 129, 0.1)'
    },
    {
      title: 'Goals Completed',
      value: goalsCompleted,
      total: 10,
      trend: `${Math.round((goalsCompleted / 10) * 100)}% Rate`,
      trendUp: goalsCompleted > 0,
      icon: <Target size={24} color="#ec4899" />,
      color: 'rgba(236, 72, 153, 0.1)'
    }
  ];


  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'achievements', label: 'Achievements', icon: <Award size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity size={20} /> },
    { id: 'goals', label: 'Goals & Progress', icon: <Target size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      
      {/* SaaS Glass Sidebar */}
      <motion.aside 
        className="glass-panel"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        style={{ 
          width: '280px', 
          margin: '1rem', 
          padding: '2rem 1.5rem', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'sticky',
          top: '1rem',
          height: 'calc(100vh - 2rem)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ padding: '0.5rem', background: 'var(--primary)', borderRadius: '0.75rem', color: 'white' }}>
            <Award size={24} />
          </div>
          <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>
            <span className="text-gradient">Student</span>Pro
          </h2>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: activeTab === item.id ? 'var(--primary)' : 'transparent',
                color: activeTab === item.id ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: activeTab === item.id ? 600 : 500,
                transition: 'all 0.2s',
                boxShadow: activeTab === item.id ? 'var(--shadow-md)' : 'none'
              }}
            >
              {item.icon}
              {item.label}
            </motion.button>
          ))}

          <div style={{ marginTop: '2rem', marginBottom: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem', paddingLeft: '1rem' }}>Account</h4>
            
            <button className="flex-center" style={{ width: '100%', justifyContent: 'flex-start', gap: '1rem', padding: '0.75rem 1rem', border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '0.75rem', transition: 'background 0.2s' }} onClick={() => navigate('/student/profile')} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-main)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <User size={20} /> Profile
            </button>
            <button className="flex-center" style={{ width: '100%', justifyContent: 'flex-start', gap: '1rem', padding: '0.75rem 1rem', border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '0.75rem', transition: 'background 0.2s' }} onClick={() => navigate(`/portfolio/${currentUser._id}`)} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-main)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <Settings size={20} /> Public Portfolio
            </button>
          </div>
        </nav>

        {/* Profile Snippet bottom sidebar */}
        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-main)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{currentUser?.name}</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student</p>
          </div>
          <motion.button whileHover={{ scale: 1.1, color: 'var(--danger)' }} onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <LogOut size={20} />
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem 3rem 2rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Top Navbar */}
        <header className="flex-between" style={{ marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Welcome back, {currentUser?.name?.split(' ')[0] || 'Student'} 👋</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Here is what's happening with your progress today.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', gap: '0.5rem', borderRadius: '2rem' }}>
              <Search size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Search achievements..." style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', width: '200px' }} />
            </div>
            <motion.div whileHover={{ scale: 1.1 }} className="glass-panel" style={{ padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, background: 'var(--danger)', borderRadius: '50%' }}></span>
            </motion.div>
          </div>
        </header>

        {/* AI Insight Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel hover-lift"
          style={{ padding: '1rem 1.5rem', marginBottom: '2rem', background: 'linear-gradient(to right, rgba(79, 70, 229, 0.1), rgba(139, 92, 246, 0.1))', borderLeft: '4px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <Sparkles color="var(--primary)" size={24} />
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--primary-dark)', fontSize: '0.875rem' }}>AI Insight</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {myAchievements.length > 0 
                ? `You have recorded ${myAchievements.length} achievements! Keep adding recent achievements to maintain your top ranking.`
                : 'Welcome! Start exploring your dashboard and add your first achievement to unlock insights.'}
            </p>
          </div>
        </motion.div>

        {/* Dynamic Content Based on Tabs */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <OverviewCards stats={computedStats} />
              <PerformanceCharts achievements={myAchievements} />
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '1.5rem' }}>
                <ActivityHeatmap achievements={myAchievements} />
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>Leaderboard (Top 3)</h3>
                  <Leaderboard achievementList={achievementList} students={students} currentUser={currentUser} />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div key="achievements" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Your Achievements Feed</h2>
                <AchievementShowcase achievements={myAchievements} />
              </div>
            </motion.div>
          )}

          {/* Additional specific tabs can be expanded here */}
          {(activeTab === 'analytics' || activeTab === 'goals') && (
            <motion.div key="coming-soon" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-panel flex-center" style={{ padding: '4rem', flexDirection: 'column', gap: '1rem' }}>
              <Target size={48} color="var(--text-muted)" />
              <h2>More Features Coming Soon</h2>
              <p style={{ color: 'var(--text-secondary)' }}>We're actively building the rest of the SaaS platform!</p>
            </motion.div>
          )}

        </AnimatePresence>

      </main>
    </div>
  );
};

export default StudentDashboard;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const StudentProfile = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: currentUser?.bio || '',
    skills: currentUser?.skills?.join(', ') || '',
    cgpa: currentUser?.cgpa || '',
    linkedin: currentUser?.socialLinks?.linkedin || '',
    github: currentUser?.socialLinks?.github || '',
    portfolio: currentUser?.socialLinks?.portfolio || ''
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update text fields
      const res = await fetch(`http://localhost:8080/students/${currentUser._id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          bio: formData.bio,
          skills: formData.skills.length > 0 ? formData.skills.split(',').map(s => s.trim()) : [],
          cgpa: Number(formData.cgpa) || 0,
          socialLinks: {
            linkedin: formData.linkedin,
            github: formData.github,
            portfolio: formData.portfolio
          }
        })
      });
      const updatedUser = await res.json();
      
      // Update avatar if provided
      if (avatarFile) {
        const formDataAvatar = new FormData();
        formDataAvatar.append('avatar', avatarFile);
        const avatarRes = await fetch(`http://localhost:8080/students/${currentUser._id}/avatar`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${currentUser.token}` },
          body: formDataAvatar
        });
        const userWithAvatar = await avatarRes.json();
        setCurrentUser({ ...userWithAvatar, token: currentUser.token });
      } else {
        setCurrentUser({ ...updatedUser, token: currentUser.token });
      }
      
      alert('Profile updated successfully!');
      navigate('/student');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <motion.nav 
        className="sidebar"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ ease: 'easeOut', duration: 0.5 }}
      >
        <div className="sidebar-header">
          <h2>Student Portal</h2>
        </div>
        <ul className="sidebar-menu">
          <motion.li onClick={() => navigate('/student')}>Dashboard</motion.li>
          <motion.li 
            className="active"
            style={{ borderLeft: '4px solid #1e3a8a', backgroundColor: 'rgba(30, 58, 138, 0.05)' }}
          >
            Profile Settings
          </motion.li>
          <motion.li className="logout-btn" onClick={() => navigate('/login')}>Logout</motion.li>
        </ul>
      </motion.nav>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Edit Profile</h1>
            <p>Update your hackathon portfolio and skills</p>
          </div>
        </header>

        <motion.div 
          className="profile-edit-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, ease: 'easeOut', duration: 0.5 }}
          style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
        >
          <form onSubmit={handleUpdate} className="profile-form" style={{ display: 'grid', gap: '16px' }}>
            <div className="form-group" style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontWeight: 600 }}>Profile Avatar</label>
              <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
            </div>
            
            <div className="form-group" style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontWeight: 600 }}>Bio</label>
              <textarea 
                value={formData.bio} 
                onChange={(e) => setFormData({...formData, bio: e.target.value})} 
                rows="3" 
                style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                placeholder="Aspiring Full Stack Developer..."
              />
            </div>

            <div className="form-group" style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontWeight: 600 }}>Skills (comma separated)</label>
              <input 
                type="text" 
                value={formData.skills} 
                onChange={(e) => setFormData({...formData, skills: e.target.value})} 
                style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="form-group" style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontWeight: 600 }}>Current CGPA</label>
              <input 
                type="number" 
                step="0.01" 
                value={formData.cgpa} 
                onChange={(e) => setFormData({...formData, cgpa: e.target.value})} 
                style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
              />
            </div>

            <div className="form-group" style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontWeight: 600 }}>LinkedIn URL</label>
              <input 
                type="url" 
                value={formData.linkedin} 
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})} 
                style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
              />
            </div>

            <div className="form-group" style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontWeight: 600 }}>GitHub URL</label>
              <input 
                type="url" 
                value={formData.github} 
                onChange={(e) => setFormData({...formData, github: e.target.value})} 
                style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
              />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '16px', padding: '12px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
              {loading ? 'Saving...' : 'Save Profile Updates'}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentProfile;

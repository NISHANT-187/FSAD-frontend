import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [userList, setUserList] = useState([]);
  const [achievementList, setAchievementList] = useState([]);
  const [participationList, setParticipationList] = useState([]);

  const activityCategories = [
    { id: 'technical', label: 'Technical' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'sports', label: 'Sports' }
  ];

  const fetchGlobalData = async () => {
    try {
      const [achRes, partRes, userRes] = await Promise.all([
        fetch(`${API}/api/achievements`),
        fetch(`${API}/api/participations`),
        fetch(`${API}/api/auth/students`)
      ]);

      if (achRes.ok) {
        const achData = await achRes.json();
        setAchievementList(achData);
      }
      if (partRes.ok) {
        const partData = await partRes.json();
        setParticipationList(partData);
      }
      if (userRes.ok) {
        const userData = await userRes.json();
        setUserList(userData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchGlobalData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // ── Auth ─────────────────────────────────────────────────────────────
  const registerStudent = async (userData) => {
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (res.ok) {
        await fetchGlobalData();
        return true;
      }
      return data.message || false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const loginUser = async (credentials) => {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        return user.role === 'admin' ? 'admin' : 'student';
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // ── Achievements ──────────────────────────────────────────────────────
  const addAchievement = async (achievement) => {
    try {
      const payload = { 
        ...achievement, 
        studentId: currentUser?.role === 'admin' && achievement.studentId ? achievement.studentId : (currentUser?.id || currentUser?._id)
      };
      const res = await fetch(`${API}/api/achievements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) fetchGlobalData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAchievement = async (id, updatedAchievement) => {
    try {
      const res = await fetch(`${API}/api/achievements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAchievement)
      });
      if (res.ok) fetchGlobalData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAchievement = async (id) => {
    try {
      const res = await fetch(`${API}/api/achievements/${id}`, { method: 'DELETE' });
      if (res.ok) fetchGlobalData();
    } catch (err) {
      console.error(err);
    }
  };

  // ── Participations ────────────────────────────────────────────────────
  const addParticipation = async (participation) => {
    try {
      const payload = { 
        ...participation, 
        studentId: currentUser?.role === 'admin' && participation.studentId ? participation.studentId : (currentUser?.id || currentUser?._id)
      };
      const res = await fetch(`${API}/api/participations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) fetchGlobalData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateParticipation = async (id, updatedParticipation) => {
    try {
      const res = await fetch(`${API}/api/participations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedParticipation)
      });
      if (res.ok) fetchGlobalData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteParticipation = async (id) => {
    try {
      const res = await fetch(`${API}/api/participations/${id}`, { method: 'DELETE' });
      if (res.ok) fetchGlobalData();
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    loginUser,
    logout,
    students: userList,
    achievementList,
    participationList,
    activityCategories,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addParticipation,
    updateParticipation,
    deleteParticipation,
    registerStudent,
    fetchGlobalData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

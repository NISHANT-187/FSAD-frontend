import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AchievementForm = () => {
  const { students, addAchievement, activityCategories } = useAppContext();
  const [formData, setFormData] = useState({
    studentId: '',
    title: '',
    category: 'award',
    activityCategory: '',
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAchievement(formData);

    toast.success('🎉 Achievement added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });

    setFormData({
      studentId: '',
      title: '',
      category: 'award',
      activityCategory: '',
      description: '',
      date: ''
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="form-container">
        <h2>➕ Add New Achievement</h2>
        <p className="form-description">
          Record student awards, recognitions, and participation
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Student *</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a student</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.rollNumber}) - {s.department}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Achievement Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., First Prize in Hackathon"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="award">🥇 Award</option>
              <option value="recognition">⭐ Recognition</option>
              <option value="participation">🎯 Participation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Activity Type *</label>
            <select
              name="activityCategory"
              value={formData.activityCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity Type</option>
              {activityCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the achievement in detail..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            ✅ Add Achievement
          </button>
        </form>
      </div>
    </>
  );
};

export default AchievementForm;

import React from 'react';
import { motion } from 'framer-motion';

const ActivityHeatmap = ({ achievements = [] }) => {
  // Generate real heatmap data
  const heatmapData = Array.from({ length: 52 }, () => Array(7).fill(0));
  
  if (achievements.length > 0) {
    const today = new Date();
    // populate simple density based on week
    achievements.forEach(a => {
        if (!a.date) return;
        const d = new Date(a.date);
        const diffDays = Math.floor((today - d) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 364) {
            const weekIndex = 51 - Math.floor(diffDays / 7);
            const dayIndex = d.getDay();
            if (weekIndex >= 0 && weekIndex < 52) {
                heatmapData[weekIndex][dayIndex] = Math.min(4, heatmapData[weekIndex][dayIndex] + 1);
            }
        }
    });
  }


  
  const getIntensityColor = (level) => {
    switch(level) {
      case 1: return 'rgba(79, 70, 229, 0.3)';
      case 2: return 'rgba(79, 70, 229, 0.6)';
      case 3: return 'rgba(79, 70, 229, 0.8)';
      case 4: return 'rgba(79, 70, 229, 1)';
      default: return 'var(--bg-main)'; 
    }
  };

  return (
    <motion.div 
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{ padding: '1.5rem', marginBottom: '2rem' }}
    >
      <h3 style={{ margin: '0 0 1rem 0' }}>Activity Calendar</h3>
      
      <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
        {heatmapData.map((week, wIndex) => (
          <div key={wIndex} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {week.map((dayIntensity, dIndex) => (
              <motion.div
                key={`${wIndex}-${dIndex}`}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  backgroundColor: getIntensityColor(dayIntensity),
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                title={`${dayIntensity} activities on this day`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex-between" style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <span>Learn how we calculate activity</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Less</span>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[0, 1, 2, 3, 4].map(level => (
              <div 
                key={level}
                style={{
                  width: '10px', height: '10px', borderRadius: '2px',
                  backgroundColor: getIntensityColor(level),
                  border: '1px solid var(--border-color)'
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityHeatmap;

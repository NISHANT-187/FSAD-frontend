import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#4F46E5', '#10b981', '#f59e0b', '#ec4899'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel" style={{ padding: '0.75rem', border: '1px solid var(--glass-border)' }}>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>{label || payload[0].name}</p>
        <p style={{ margin: 0, color: payload[0].color || 'var(--primary)' }}>
          {payload[0].value} pts
        </p>
      </div>
    );
  }
  return null;
};

const PerformanceCharts = ({ achievements = [] }) => {
  const [filter, setFilter] = useState('Monthly');

  // Compute dynamic LINE_DATA
  const monthlyData = {};
  achievements.forEach(a => {
    if (!a.date) return;
    const m = new Date(a.date).toLocaleString('default', { month: 'short' });
    monthlyData[m] = (monthlyData[m] || 0) + (a.points || 50);
  });
  let computedLine = Object.keys(monthlyData).map(m => ({ name: m, score: monthlyData[m] })).slice(-6);
  if (computedLine.length === 0) computedLine = [{ name: 'No Data', score: 0 }];

  // Compute dynamic PIE_DATA
  const pieMap = {};
  achievements.forEach(a => {
    const cat = a.category ? a.category.charAt(0).toUpperCase() + a.category.slice(1) : 'Other';
    pieMap[cat] = (pieMap[cat] || 0) + (a.points || 50);
  });
  let computedPie = Object.keys(pieMap).map(k => ({ name: k, value: pieMap[k] }));
  if (computedPie.length === 0) computedPie = [{ name: 'No Data', value: 1 }];

  // Compute dynamic BAR_DATA
  const barMap = {};
  achievements.forEach(a => {
    let barName = 'Activities';
    const titleLower = (a.title || '').toLowerCase();
    if(titleLower.includes('hackathon')) barName = 'Hackathons';
    else if(titleLower.includes('course') || titleLower.includes('cert')) barName = 'Courses';
    else if(a.category === 'award') barName = 'Awards';
    else barName = 'Projects';
    
    barMap[barName] = (barMap[barName] || 0) + 1;
  });
  let computedBar = Object.keys(barMap).map(k => ({ name: k, value: barMap[k] }));
  if (computedBar.length === 0) computedBar = [{ name: 'No Data', value: 0 }];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) minmax(300px, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
      {/* Line Chart Panel */}
      <motion.div 
        className="glass-panel" 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ padding: '1.5rem', minHeight: '350px' }}
      >
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Progress Over Time</h3>
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-main)', padding: '0.25rem', borderRadius: '0.5rem' }}>
            {['Weekly', 'Monthly', 'Yearly'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  border: 'none',
                  background: filter === f ? 'var(--bg-surface-solid)' : 'transparent',
                  color: filter === f ? 'var(--primary)' : 'var(--text-secondary)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontWeight: filter === f ? 600 : 400,
                  boxShadow: filter === f ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={computedLine}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="var(--primary)" 
              strokeWidth={4}
              dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--bg-main)' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Side Charts flex container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Pie Chart Panel */}
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{ padding: '1.5rem', flex: 1 }}
        >
          <h3 style={{ margin: '0 0 1rem 0' }}>Skill Distribution</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={computedPie}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {computedPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart Panel */}
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ padding: '1.5rem', flex: 1 }}
        >
          <h3 style={{ margin: '0 0 1rem 0' }}>Categories</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={computedBar} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'var(--bg-main)' }} content={<CustomTooltip />} />
              <Bar dataKey="value" fill="url(#colorUv)" radius={[0, 4, 4, 0]} animationDuration={1500}>
                {computedBar.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
};

export default PerformanceCharts;

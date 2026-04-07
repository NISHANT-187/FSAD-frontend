import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import PublicPortfolio from './pages/PublicPortfolio';
import PublicStats from './pages/PublicStats';
import DarkModeToggle from './components/ui/DarkModeToggle';
import { useAppContext } from './context/AppContext';
import './App.css';

function App() {
  return (
    <>
      <DarkModeToggle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stats" element={<PublicStats />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/student" 
            element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/student/profile" 
            element={
              <PrivateRoute role="student">
                <StudentProfile />
              </PrivateRoute>
            } 
          />
          <Route path="/portfolio/:id" element={<PublicPortfolio />} />
        </Routes>
      </HashRouter>
    </>
  );
}

function PrivateRoute({ children, role }) {
  const { currentUser } = useAppContext();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== role) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default App;

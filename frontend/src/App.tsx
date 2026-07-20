import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';

// Pages
import { Home } from './pages/Home';
import { ProjectCaseStudy } from './pages/ProjectCaseStudy';
import { AdminLogin } from './pages/Admin/AdminLogin';
import { AdminDashboard } from './pages/Admin/AdminDashboard';

// Route protection component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <PortfolioProvider>
          <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-violet-600/35 selection:text-white">
            
            {/* Global Visual Widgets */}
            <CommandPalette />
            <Navbar />

            {/* Scrollable Main Area */}
            <main className="flex-grow">
              <Routes>
                {/* Public landing layout */}
                <Route path="/" element={<Home />} />
                
                {/* Public Case Study page */}
                <Route path="/project/:id" element={<ProjectCaseStudy />} />
                
                {/* Admin login */}
                <Route path="/admin" element={<AdminLogin />} />
                
                {/* Protected Admin Console Dashboard */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />

                {/* Redirect all unmatched routes back to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </PortfolioProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

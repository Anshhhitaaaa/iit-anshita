import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { TransactionProvider } from './contexts/TransactionContext'
import { GoalProvider } from './contexts/GoalContext'

// Layout Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AddTransaction from './pages/AddTransaction'
import Transactions from './pages/Transactions'
import Forecast from './pages/Forecast'
import Goals from './pages/Goals'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Profile from './pages/Profile'

// Component to handle authenticated routes
const AuthenticatedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          {/* Public routes - accessible to everyone */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Auth routes - redirect to dashboard if already logged in */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} 
          />
          
          {/* Landing page - redirect to dashboard if logged in */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
          />
          
          {/* Protected routes - require authentication */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/add-transaction" element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          } />
          <Route path="/forecast" element={
            <ProtectedRoute>
              <Forecast />
            </ProtectedRoute>
          } />
          <Route path="/goals" element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <GoalProvider>
          <Router>
            <AuthenticatedRoutes />
          </Router>
        </GoalProvider>
      </TransactionProvider>
    </AuthProvider>
  )
}

export default App

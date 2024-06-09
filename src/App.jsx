import { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import { Home, Profile, Location, Weather } from "./_root/pages/index"
import Signin from "./_auth/Sign-in/Signin"
import Signup from "./_auth/Sign-up/Signup"

import { AuthProvider, AuthContext } from "./_auth/AuthContext";

import "./globals.css";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/sign-in" />;
}

function App() {
  return (
    <AuthProvider>
    <main>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* Rotas privadas */}
        <Route element={<RootLayout />}>
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Location /></PrivateRoute>} />
          <Route path="/weather" element={<PrivateRoute><Weather /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Route>
      </Routes>
    </main>
  </AuthProvider>
  )
}

export default App

import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import { Home, Profile, Location, Weather } from "./_root/pages/index";
import Signin from "./_auth/Sign-in/Signin";
import Signup from "./_auth/Sign-up/Signup";
import { useUserContext } from "./_auth/AuthContext";
import Loader from "./components/Loader/Loader"

import "./globals.css";

function App() {
  const { user, isLoading } = useUserContext();


  if (isLoading) {
    return <Loader /> 
  }
  
  return (
    <main>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* Rotas privadas */}
        {user ? (
          <>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="/search" element={<Location />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" />} />
        )}
      </Routes>
    </main>
  );
}

export default App;

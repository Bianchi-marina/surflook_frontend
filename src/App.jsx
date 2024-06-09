import { Routes, Route } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import {
  Home,
  Profile,
  Location,
  Weather
} from "./_root/pages/index"
import Signin from "./_auth/Sign-in/Signin"
import Signup from "./_auth/Sign-up/Signup"

import "./globals.css";

function App() {
  return (
    <main>
      <Routes>
        {/* rotas publicas */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* rotas privadas */}
        <Route element={<RootLayout />}>
            <Route index element= {<Home/>} />
            <Route path="/search" element={<Location/>} />
            <Route path="/weather" element={<Weather/>} />
            <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </main>
  )
}

export default App

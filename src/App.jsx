import { Routes, Route } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import {
  Home,
  Profile,
  Location,
  Weather
} from "./_root/pages/index"

import "./globals.css";

function App() {
  return (
    <main>
      <Routes>
        {/* //rotas privadas */}
        <Route element={<RootLayout />}>
            <Route index element= {<Home/>} />
            <Route path="/search-location" element={<Location/>} />
            <Route path="/weather" element={<Weather/>} />
            <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </main>
  )
}

export default App

import Header from "../components/Header/Header"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

import { Outlet } from "react-router-dom"


const RootLayout = () => {
  return (
    <div className="root-layout">
        <Header className="header" />

        <Navbar className="navbar" />

      <section>
        <Outlet className="main" />
      </section>

      <Footer className="footer" />
    </div>
  )
}

export default RootLayout

import { Outlet } from "react-router-dom"
import Nav from "../componentes/Nav"
import Footer from "../componentes/Footer"

export default function Layout() {
  return (
    <div>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

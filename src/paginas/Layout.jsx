import { Outlet, useLocation } from "react-router-dom";
import Nav from "../componentes/Nav";
import Footer from "../componentes/Footer";
import NubiInfo from "../componentes/NubiInfo";
import ChatWidget from "../componentes/BolinhaChat";

export default function Layout() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col relative">
      <Nav />
      <main className="flex-1 relative">
        <Outlet />
      </main>

      {!isHome && <Footer />}

      <NubiInfo />

      <div className="relative z-[2000]">
        <ChatWidget />
      </div>
    </div>
  );
}

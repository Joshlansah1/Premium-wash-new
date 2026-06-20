import { Outlet } from "react-router-dom";
import FloatingButtons from "./FloatingButtons";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "../utils/ScrollToTop";
import { useEffect, useState } from "react";

function HostLayout() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <FloatingButtons />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default HostLayout;

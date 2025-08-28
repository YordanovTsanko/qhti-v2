import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import PopUpAd from "./components/PopUpAd";
import SelectedAd from "./components/Ads/SelectedAd";

const AppContent = () => {
  const location = useLocation();


  const hideFooter =
    location.pathname === "/auth" || location.pathname.startsWith("/auth/");

  const hideNavBar =
    location.pathname === "/auth" ||
    location.pathname.startsWith("/auth/") ||
    location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavBar && <NavBar />}
      <main className="flex-grow flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/ads/:id" element={<SelectedAd />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
      <PopUpAd />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

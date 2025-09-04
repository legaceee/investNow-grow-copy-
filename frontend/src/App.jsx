import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./assets/Component/Footer";
import GuestNavbar from "./assets/Component/GuestNavbar";
import { ModalProvider } from "../Context/ModalContext";
import ModalRoot from "./assets/Component/ModalRoot";
import AccountPage from "./pages/AccountPage";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loggedIn" element={<AccountPage />} />
            <Route path="/foot" element={<Footer />} />
          </Routes>
          <ModalRoot />
        </ModalProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

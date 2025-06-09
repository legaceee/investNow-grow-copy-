import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="your_google_id">
      <Home />
    </GoogleOAuthProvider>
  );
}

export default App;

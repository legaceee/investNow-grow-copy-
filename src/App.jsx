import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [logInClicked, setLogInClicked] = useState(false);
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, NavLink } from "react-router-dom";
import AppRoutes from "./routes";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;

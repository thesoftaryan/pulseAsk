import "./theme/index.css";
// import Login from './pages/Auth/Login/Login';
import Register from "./pages/Auth/Register/Register";

function App(){
  // Testing the dark Theme
  document.documentElement.setAttribute("data-theme", "dark");
  return (
    <>
      <Register/>
    </>
  )
}

export default App

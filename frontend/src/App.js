import "./App.css";
import Login from "./context/login";
import BarMenu from "./components/BarMenu";

function App() {
  return (
    <div className="App">
      <BarMenu />
      <Login />
    </div>
  );
}

export default App;

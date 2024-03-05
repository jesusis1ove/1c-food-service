import "./App.css";
import Login from "./content/login";
import GeneralComponent from "./components/GeneralComponent";

function App() {
  return <GeneralComponent content={<Login />} maxWidth={"50%"} />;
}

export default App;

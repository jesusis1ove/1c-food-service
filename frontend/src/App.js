import "./App.css";
import GeneralComponent from "./components/GeneralComponent";

function App() {
  return <GeneralComponent children={<h1>HELLO</h1>} maxWidth={"50%"} />;
}

export default App;
